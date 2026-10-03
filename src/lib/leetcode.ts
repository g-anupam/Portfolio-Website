import snapshot from "@/content/leetcode-snapshot.json";

export type Difficulty = "Easy" | "Medium" | "Hard";

export type SolvedProblem = {
  title: string;
  slug: string;
  /** LeetCode's problem number, when known. */
  number: string | null;
  difficulty: Difficulty | null;
  /** ISO timestamp of the accepted submission. */
  solvedAt: string;
};

export type LeetCodeData = {
  username: string;
  solved: { all: number; easy: number; medium: number; hard: number };
  /** Submissions per day, keyed by the day's UTC midnight in Unix seconds. */
  calendar: Record<string, number>;
  /** Most recently solved problems, newest first, one entry per problem. */
  recent: SolvedProblem[];
  /** ISO timestamp of when this data was fetched. */
  fetchedAt: string;
};

const RECENT_COUNT = 3;

// LeetCode has no official API. This is the public GraphQL endpoint its own site uses,
// so it can change or rate-limit without notice; getLeetCode() handles failure.
const ENDPOINT = "https://leetcode.com/graphql";

const PROFILE_QUERY = `
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
    recentAcSubmissionList(username: $username, limit: 15) {
      title
      titleSlug
      timestamp
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
    recentAcSubmissionList:
      { title: string; titleSlug: string; timestamp: string }[] | null;
  };
};

type QuestionsResponse = {
  data?: Record<
    string,
    { difficulty: string; questionFrontendId: string } | null
  >;
};

async function query<T>(body: object, username: string): Promise<T> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/u/${username}/`,
      "User-Agent": "Mozilla/5.0 (compatible; portfolio-site)",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(`LeetCode responded with ${response.status}`);
  }
  return (await response.json()) as T;
}

/** Difficulty and number for each problem. Optional extra: on failure the list shows without them. */
async function describeProblems(slugs: string[], username: string) {
  const fields = slugs
    .map(
      (slug, i) =>
        `q${i}: question(titleSlug: ${JSON.stringify(slug)}) { difficulty questionFrontendId }`,
    )
    .join("\n");
  try {
    const json = await query<QuestionsResponse>(
      { query: `query { ${fields} }` },
      username,
    );
    return slugs.map((_, i) => json.data?.[`q${i}`] ?? null);
  } catch {
    return slugs.map(() => null);
  }
}

async function fetchLive(username: string): Promise<LeetCodeData> {
  const json = await query<ProfileResponse>(
    { query: PROFILE_QUERY, variables: { username } },
    username,
  );
  const user = json.data?.matchedUser;
  if (!user) throw new Error(`LeetCode has no user "${username}"`);

  const count = (difficulty: string) =>
    user.submitStatsGlobal.acSubmissionNum.find(
      (entry) => entry.difficulty === difficulty,
    )?.count ?? 0;

  // The list has one entry per accepted submission, so a problem can repeat.
  const seen = new Set<string>();
  const latest = (json.data?.recentAcSubmissionList ?? [])
    .filter((item) => !seen.has(item.titleSlug) && seen.add(item.titleSlug))
    .slice(0, RECENT_COUNT);
  const details = await describeProblems(
    latest.map((item) => item.titleSlug),
    username,
  );

  return {
    username,
    solved: {
      all: count("All"),
      easy: count("Easy"),
      medium: count("Medium"),
      hard: count("Hard"),
    },
    calendar: JSON.parse(user.userCalendar.submissionCalendar),
    recent: latest.map((item, i) => ({
      title: item.title,
      slug: item.titleSlug,
      number: details[i]?.questionFrontendId ?? null,
      difficulty: (details[i]?.difficulty as Difficulty | undefined) ?? null,
      solvedAt: new Date(Number(item.timestamp) * 1000).toISOString(),
    })),
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
      return snapshot as LeetCodeData;
    }
    throw error;
  }
}
