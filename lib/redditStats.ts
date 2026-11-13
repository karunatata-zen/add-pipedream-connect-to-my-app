import { promises as fs } from "fs";
import path from "path";

export type RedditStat = {
  date: string;
  subscribers: number | null;
  weeklyActive: number | null;
};

const toNum = (v: string | undefined) => {
  if (!v || !v.trim()) return null;
  const n = Number(v.trim());
  return Number.isFinite(n) ? n : null;
};

export async function readRedditStats(): Promise<RedditStat[]> {
  const file = path.join(process.cwd(), "reddit_stats.csv");
  let raw = "";
  try {
    raw = await fs.readFile(file, "utf8");
  } catch {
    return [];
  }
  return raw
    .split(/\r?\n/)
    .slice(1)
    .filter((l) => l.trim())
    .map((l) => {
      const [date, subs, active] = l.split(",");
      return { date: date.trim(), subscribers: toNum(subs), weeklyActive: toNum(active) };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}
