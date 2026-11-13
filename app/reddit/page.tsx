import { readRedditStats, type RedditStat } from "@/lib/redditStats";

export const dynamic = "force-dynamic";

function Chart({ data, field, color }: { data: RedditStat[]; field: "subscribers" | "weeklyActive"; color: string }) {
  const pts = data.filter((d) => d[field] !== null) as (RedditStat & Record<typeof field, number>)[];
  if (pts.length === 0) return <p className="text-sm text-gray-500">No data yet.</p>;
  const w = 600, h = 160, pad = 24;
  const vals = pts.map((p) => p[field]);
  const min = Math.min(...vals), max = Math.max(...vals);
  const span = max - min || 1;
  const x = (i: number) => (pts.length === 1 ? w / 2 : pad + (i * (w - 2 * pad)) / (pts.length - 1));
  const y = (v: number) => h - pad - ((v - min) / span) * (h - 2 * pad);
  const line = pts.map((p, i) => `${x(i)},${y(p[field])}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <polyline fill="none" stroke={color} strokeWidth="2" points={line} />
      {pts.map((p, i) => (
        <g key={p.date}>
          <circle cx={x(i)} cy={y(p[field])} r="4" fill={color} />
          <text x={x(i)} y={y(p[field]) - 8} textAnchor="middle" fontSize="11" fill="#555">{p[field]}</text>
          <text x={x(i)} y={h - 6} textAnchor="middle" fontSize="10" fill="#888">{p.date.slice(5)}</text>
        </g>
      ))}
    </svg>
  );
}

function delta(data: RedditStat[], field: "subscribers" | "weeklyActive") {
  const v = data.map((d) => d[field]).filter((n): n is number => n !== null);
  if (v.length < 2) return null;
  return v[v.length - 1] - v[v.length - 2];
}

export default async function RedditDashboard() {
  const stats = await readRedditStats();
  const latest = stats[stats.length - 1];
  const cards = [
    { label: "Subscribers", field: "subscribers" as const, color: "#ea580c" },
    { label: "Weekly active users", field: "weeklyActive" as const, color: "#2563eb" },
  ];
  return (
    <main className="mx-auto max-w-4xl p-8 space-y-8">
      <header>
        <a href="/" className="text-sm underline text-gray-500">&larr; Pipedream Connect</a>
        <h1 className="text-3xl font-bold">r/hopsai Dashboard</h1>
        <p className="text-gray-500">
          Daily stats from <a className="underline" href="https://www.reddit.com/r/hopsai/">reddit.com/r/hopsai</a>
          {latest ? ` · last updated ${latest.date}` : ""}
        </p>
      </header>
      <section className="grid gap-6 sm:grid-cols-2">
        {cards.map((c) => {
          const d = delta(stats, c.field);
          return (
            <div key={c.field} className="rounded-xl border p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">{c.label}</p>
                <p className="text-4xl font-bold">{latest?.[c.field] ?? "—"}</p>
                {d !== null && (
                  <p className={d >= 0 ? "text-green-600 text-sm" : "text-red-600 text-sm"}>
                    {d >= 0 ? "+" : ""}{d} vs previous
                  </p>
                )}
              </div>
              <Chart data={stats} field={c.field} color={c.color} />
            </div>
          );
        })}
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">History</h2>
        <table className="w-full text-sm border rounded-xl">
          <thead><tr className="text-left bg-gray-50"><th className="p-2">Date</th><th className="p-2">Subscribers</th><th className="p-2">Weekly active</th></tr></thead>
          <tbody>
            {[...stats].reverse().map((s) => (
              <tr key={s.date} className="border-t"><td className="p-2">{s.date}</td><td className="p-2">{s.subscribers ?? "—"}</td><td className="p-2">{s.weeklyActive ?? "—"}</td></tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
