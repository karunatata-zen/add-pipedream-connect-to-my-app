import { readStats, type Platform, type Post } from "@/lib/stats";

export const dynamic = "force-dynamic";

const sum = (xs: (number | undefined)[]) => xs.reduce<number>((a, b) => a + (b ?? 0), 0);
const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function ago(iso: string | null) {
  if (!iso) return "never";
  const m = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (m < 60) return `${m} min ago`;
  if (m < 1440) return `${Math.round(m / 60)} h ago`;
  return `${Math.round(m / 1440)} d ago`;
}

function Stat({ label, value }: { label: string; value: number | string | null | undefined }) {
  return (
    <div className="rounded-lg border border-zinc-700/50 p-4">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="text-2xl font-bold">{value ?? "—"}</p>
    </div>
  );
}

function PostRow({ p, a, b }: { p: Post; a: [string, number | undefined]; b: [string, number | undefined] }) {
  return (
    <li className="py-3 border-t border-zinc-700/50 first:border-t-0">
      <a href={p.url} className="font-medium hover:underline">{p.title}</a>
      <p className="text-xs text-zinc-500 mt-1">
        {fmt(p.date)} · {a[1] ?? 0} {a[0]} · {b[1] ?? 0} {b[0]}
      </p>
    </li>
  );
}

function Section({
  name, accent, data, headline, metricA, metricB, empty,
}: {
  name: string; accent: string; data: Platform;
  headline: [string, number | null | undefined][];
  metricA: [string, (p: Post) => number | undefined];
  metricB: [string, (p: Post) => number | undefined];
  empty: string;
}) {
  const posts = [...data.posts].sort((x, y) => y.date.localeCompare(x.date));
  const recent = posts.slice(0, 3);
  const A = (p: Post): [string, number | undefined] => [metricA[0], metricA[1](p)];
  const B = (p: Post): [string, number | undefined] => [metricB[0], metricB[1](p)];
  return (
    <section className="rounded-2xl border border-zinc-700/50 p-6 space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-bold" style={{ color: accent }}>{name}</h2>
        <div className="text-sm text-zinc-500">
          <span>Last refreshed: {ago(data.updatedAt)}</span>
          {data.updatedAt && <span> ({new Date(data.updatedAt).toLocaleString()})</span>}
          {" · "}
          <a className="underline" href={data.url}>open</a>
        </div>
      </header>

      {posts.length === 0 && !headline.some(([, v]) => v != null) ? (
        <p className="text-zinc-500">{empty}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {headline.map(([l, v]) => <Stat key={l} label={l} value={v} />)}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Recent 3 posts</h3>
            <ul>{recent.map((p) => <PostRow key={p.url} p={p} a={A(p)} b={B(p)} />)}</ul>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <Stat label={`${metricA[0]} (recent 3)`} value={sum(recent.map(metricA[1]))} />
              <Stat label={`${metricB[0]} (recent 3)`} value={sum(recent.map(metricB[1]))} />
              <Stat label="Posts" value={recent.length} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Overall ({posts.length} posts)</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label={`Total ${metricA[0]}`} value={sum(posts.map(metricA[1]))} />
              <Stat label={`Total ${metricB[0]}`} value={sum(posts.map(metricB[1]))} />
              <Stat label={`Avg ${metricA[0]}/post`} value={posts.length ? (sum(posts.map(metricA[1])) / posts.length).toFixed(1) : null} />
              <Stat label={`Avg ${metricB[0]}/post`} value={posts.length ? (sum(posts.map(metricB[1])) / posts.length).toFixed(1) : null} />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default async function Home() {
  const { reddit, linkedin } = await readStats();
  return (
    <main className="mx-auto max-w-4xl p-6 sm:p-10 space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold">Hops Community Stats</h1>
          <p className="text-zinc-500">Reddit and LinkedIn at a glance. Data refreshes daily.</p>
        </div>
        <a href="/pipedream" className="text-sm underline text-zinc-500">Pipedream Connect &rarr;</a>
      </header>

      <Section
        name="Reddit · r/hopsai" accent="#ea580c" data={reddit}
        headline={[["Subscribers", reddit.subscribers], ["Weekly active", reddit.weeklyActive]]}
        metricA={["upvotes", (p) => p.score]} metricB={["comments", (p) => p.comments]}
        empty="No Reddit data yet."
      />
      <Section
        name="LinkedIn · Hops AI" accent="#2563eb" data={linkedin}
        headline={[["Followers", linkedin.followers]]}
        metricA={["reactions", (p) => p.reactions]} metricB={["comments", (p) => p.comments]}
        empty="No LinkedIn data yet. LinkedIn requires login, so the daily job cannot read this page anonymously."
      />
    </main>
  );
}
