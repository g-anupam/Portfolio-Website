import snapshot from "@/content/leetcode-snapshot.json";

export type LeetCodeData = {
  username: string;
  solved: { all: number; easy: number; medium: number; hard: number };
  /** Submissions per day, keyed by the day's UTC midnight in Unix seconds. */
  calendar: Record<string, number>;
  /** ISO timestamp of when this data was fetched. */
  fetchedAt: string;
};

// LeetCode has no official API. This is the public GraphQL endpoint its own site uses,
// so it can change or rate-limit without notice; getLeetCode() handles failure.
const ENDPOINT = "https://leetcode.com/graphql";

const QUERY = `
  query profile($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      userCalendar {
        submissionCalendar
      }
    }
  }
`;

type ProfileResponse = {
  data?: {
    matchedUser: {
      submitStatsGlobal: {
        acSubmissionNum: { difficulty: string; count: number }[];
      };
      userCalendar: { submissionCalendar: string };
    } | null;
  };
};

async function fetchLive(username: string): Promise<LeetCodeData> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/u/${username}/`,
      "User-Agent": "Mozilla/5.0 (compatible; portfolio-site)",
    },
    body: JSON.stringify({ query: QUERY, variables: { username } }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(`LeetCode responded with ${response.status}`);
  }

  const json = (await response.json()) as ProfileResponse;
  const user = json.data?.matchedUser;
  if (!user) throw new Error(`LeetCode has no user "${username}"`);

  const count = (difficulty: string) =>
    user.submitStatsGlobal.acSubmissionNum.find(
      (entry) => entry.difficulty === difficulty,
    )?.count ?? 0;

  return {
    username,
    solved: {
      all: count("All"),
      easy: count("Easy"),
      medium: count("Medium"),
      hard: count("Hard"),
    },
    calendar: JSON.parse(user.userCalendar.submissionCalendar),
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Live data when LeetCode answers. If it doesn't:
 * - at build time or in dev, fall back to the committed snapshot so the build never breaks;
 * - during a background refresh in production, throw, which makes Next.js keep
 *   serving the last good page instead of replacing it with older data.
 */
export async function getLeetCode(username: string): Promise<LeetCodeData> {
  try {
    return await fetchLive(username);
  } catch (error) {
    const building = process.env.NEXT_PHASE === "phase-production-build";
    const developing = process.env.NODE_ENV !== "production";
    if (building || developing) {
      console.warn("LeetCode fetch failed, using the snapshot:", error);
      return snapshot;
    }
    throw error;
  }
}
