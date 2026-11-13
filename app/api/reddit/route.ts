import { NextResponse } from "next/server";
import { readRedditStats } from "@/lib/redditStats";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ subreddit: "hopsai", stats: await readRedditStats() });
}
