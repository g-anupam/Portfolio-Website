import type { LeetCodeData } from "./leetcode";

const DAY = 86_400; // seconds
const WEEKS = 53;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export type HeatmapDay = {
  /** 0 is no submissions; 1 to 4 are increasing intensity. */
  level: 0 | 1 | 2 | 3 | 4;
  tip: string;
};

export type HeatmapWeek = {
  /** Month name, set on the first week that starts in a new month. */
  label: string;
  /** Sunday to Saturday. Null for days after today. */
  days: (HeatmapDay | null)[];
};

export type PracticeYear = {
  weeks: HeatmapWeek[];
  submissions: number;
  activeDays: number;
  longestStreak: number;
};

/** "3 Oct 2026", in UTC to match LeetCode's calendar. */
export function formatDate(iso: string) {
  const date = new Date(iso);
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

function levelFor(count: number): HeatmapDay["level"] {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

/** The 53 weeks ending today (UTC, matching LeetCode's calendar), plus totals for that window. */
export function buildPracticeYear(
  calendar: LeetCodeData["calendar"],
  now: Date,
): PracticeYear {
  const today = Math.floor(now.getTime() / 1000 / DAY) * DAY;
  const weekday = new Date(today * 1000).getUTCDay();
  const start = today - ((WEEKS - 1) * 7 + weekday) * DAY;

  const weeks: HeatmapWeek[] = [];
  let submissions = 0;
  let activeDays = 0;
  let longestStreak = 0;
  let streak = 0;
  let previousMonth = -1;

  for (let w = 0; w < WEEKS; w++) {
    const weekStart = new Date((start + w * 7 * DAY) * 1000);
    const month = weekStart.getUTCMonth();
    // Skip the label on a first week that begins late in its month; the next one follows too closely.
    const label =
      month !== previousMonth && (w > 0 || weekStart.getUTCDate() <= 14)
        ? MONTHS[month]
        : "";
    previousMonth = month;

    const days: HeatmapWeek["days"] = [];
    for (let d = 0; d < 7; d++) {
      const timestamp = start + (w * 7 + d) * DAY;
      if (timestamp > today) {
        days.push(null);
        continue;
      }
      const count = calendar[String(timestamp)] ?? 0;
      const date = new Date(timestamp * 1000);

      submissions += count;
      if (count > 0) {
        activeDays += 1;
        streak += 1;
        longestStreak = Math.max(longestStreak, streak);
      } else {
        streak = 0;
      }

      days.push({
        level: levelFor(count),
        tip: `${count} ${count === 1 ? "submission" : "submissions"} on ${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`,
      });
    }
    weeks.push({ label, days });
  }

  return { weeks, submissions, activeDays, longestStreak };
}
