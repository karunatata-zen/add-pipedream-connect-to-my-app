import { promises as fs } from "fs";
import path from "path";

export type Post = {
  title: string;
  url: string;
  date: string;
  score?: number;
  comments?: number;
  reactions?: number;
  reposts?: number;
  impressions?: number;
};

export type Platform = {
  url: string;
  updatedAt: string | null;
  subscribers?: number | null;
  weeklyActive?: number | null;
  followers?: number | null;
  history: { date: string; [k: string]: string | number | null }[];
  posts: Post[];
};

export type Stats = { reddit: Platform; linkedin: Platform };

export async function readStats(): Promise<Stats> {
  const raw = await fs.readFile(path.join(process.cwd(), "data", "stats.json"), "utf8");
  return JSON.parse(raw);
}
