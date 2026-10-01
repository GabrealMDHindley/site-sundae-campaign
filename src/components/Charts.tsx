"use client";
import { useMemo, useRef, useState } from "react";

import { SERIES } from "@/content/palette";
export { SERIES };

type Series = { name: string; color: string; values: number[] };
const FORMATS = {
  number: (v: number) => v.toLocaleString("en-US", { maximumFractionDigits: 1 }),
  moneyShort: (v: number) => (v >= 1e6 ? "$" + (v / 1e6).toFixed(1) + "M" : "$" + Math.round(v / 1000) + "k"),
};
type Fmt = keyof typeof FORMATS;

function niceMax(v: number) {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const m = v / p;
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
}

function Legend({ series }: { series: Series[] }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
      {series.map((s) => (
        <span key={s.name} className="inline-flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />{s.name}</span>
      ))}
    </div>
  );
}

function Table({ labels, series, fmt }: { labels: string[]; series: Series[]; fmt: (v: number) => string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-sm">
        <thead><tr className="border-b border-rule text-left font-mono text-[11px] uppercase tracking-wider text-muted"><th className="py-2 pr-4">Month</th>{series.map((s) => <th key={s.name} className="py-2 pr-4 text-right">{s.name}</th>)}</tr></thead>
        <tbody>{labels.map((l, i) => <tr key={l} className="border-b border-rule/60"><td className="py-1.5 pr-4">{l}</td>{series.map((s) => <td key={s.name} className="py-1.5 pr-4 text-right tabular-nums">{fmt(s.values[i])}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function LineChart({ title, sub, labels, series, format = "number", height = 320 }: { title: string; sub?: string; labels: string[]; series: Series[]; format?: Fmt; height?: number }) {
  const fmt = FORMATS[format];
  const [hover, setHover] = useState<number | null>(null);
  const [table, setTable] = useState(false);
  const W = 760, H = height, padL = 46, padR = 96, padT = 16, padB = 34;
  const max = niceMax(Math.max(...series.flatMap((s) => s.values)));
  const x = (i: number) => padL + (i / (labels.length - 1)) * (W - padL - padR);
  const y = (v: number) => padT + (1 - v / max) * (H - padT - padB);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max);
  const svgRef = useRef<SVGSVGElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const r = svgRef.current!.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - padL) / (W - padL - padR)) * (labels.length - 1));
    setHover(Math.max(0, Math.min(labels.length - 1, i)));
  };
  // end labels, nudged apart so they never collide
  const ends = useMemo(() => {
    const e = series.map((s) => ({ s, yy: y(s.values[s.values.length - 1]) })).sort((a, b) => a.yy - b.yy);
    for (let i = 1; i < e.length; i++) if (e[i].yy - e[i - 1].yy < 16) e[i].yy = e[i - 1].yy + 16;
    return e;
  }, [series, max]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <figure className="card p-5 md:p-7">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div><figcaption className="text-lg font-semibold">{title}</figcaption>{sub && <p className="mt-1 text-sm text-muted">{sub}</p>}</div>
        <button className="btn btn-line !px-3 !py-1.5 text-xs" onClick={() => setTable(!table)} aria-pressed={table}>{table ? "Chart view" : "Table view"}</button>
      </div>
      {series.length > 1 && <div className="mb-3"><Legend series={series} /></div>}
      {table ? <Table labels={labels} series={series} fmt={fmt} /> : (
        <div className="relative">
          <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="h-auto w-full touch-none" onPointerMove={onMove} onPointerLeave={() => setHover(null)} role="img" aria-label={`${title}. ${series.map((s) => `${s.name}: ${fmt(s.values[s.values.length - 1])} by ${labels[labels.length - 1]}`).join("; ")}`}>
            {ticks.map((t) => (
              <g key={t}><line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="#e6ddd4" strokeWidth={1} /><text x={padL - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={11} fill="#9a8f89" fontFamily="var(--font-plex)">{fmt(t)}</text></g>
            ))}
            {labels.map((l, i) => (i % 2 === 0 || i === labels.length - 1) && <text key={l} x={x(i)} y={H - 10} textAnchor="middle" fontSize={11} fill="#9a8f89" fontFamily="var(--font-plex)">{l.replace(" 20", " '")}</text>)}
            {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={padT} y2={H - padB} stroke="#161113" strokeOpacity={0.25} strokeWidth={1} />}
            {series.map((s) => (
              <g key={s.name}>
                <path d={s.values.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ")} fill="none" stroke={s.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                {hover !== null && <circle cx={x(hover)} cy={y(s.values[hover])} r={4.5} fill={s.color} stroke="#fff" strokeWidth={2} />}
              </g>
            ))}
            {ends.map(({ s, yy }) => <text key={s.name} x={W - padR + 8} y={yy} dominantBaseline="middle" fontSize={12} fill="#161113" fontWeight={600}>{fmt(s.values[s.values.length - 1])} <tspan fill="#6b605b" fontWeight={400}>{s.name.split(" ")[0]}</tspan></text>)}
          </svg>
          {hover !== null && (
            <div className="pointer-events-none absolute top-2 z-10 rounded-xl border border-rule bg-white/95 px-3 py-2 text-xs shadow-lg backdrop-blur" style={{ left: `clamp(0px, calc(${(x(hover) / W) * 100}% + 12px), calc(100% - 180px))` }}>
              <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted">{labels[hover]}</div>
              {series.map((s) => <div key={s.name} className="flex items-center justify-between gap-4"><span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: s.color }} />{s.name}</span><strong className="tabular-nums">{fmt(s.values[hover])}</strong></div>)}
            </div>
          )}
        </div>
      )}
    </figure>
  );
}

export function StackedBars({ title, sub, labels, series, format = "number", height = 300 }: { title: string; sub?: string; labels: string[]; series: Series[]; format?: Fmt; height?: number }) {
  const fmt = FORMATS[format];
  const [hover, setHover] = useState<number | null>(null);
  const [table, setTable] = useState(false);
  const W = 760, H = height, padL = 46, padR = 12, padT = 16, padB = 34;
  const totals = labels.map((_, i) => series.reduce((a, s) => a + s.values[i], 0));
  const max = niceMax(Math.max(...totals));
  const bw = (W - padL - padR) / labels.length;
  const y = (v: number) => padT + (1 - v / max) * (H - padT - padB);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max);
  return (
    <figure className="card p-5 md:p-7">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div><figcaption className="text-lg font-semibold">{title}</figcaption>{sub && <p className="mt-1 text-sm text-muted">{sub}</p>}</div>
        <button className="btn btn-line !px-3 !py-1.5 text-xs" onClick={() => setTable(!table)} aria-pressed={table}>{table ? "Chart view" : "Table view"}</button>
      </div>
      <div className="mb-3"><Legend series={series} /></div>
      {table ? <Table labels={labels} series={[...series, { name: "Total", color: "#161113", values: totals }]} fmt={fmt} /> : (
        <div className="relative">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`${title}. Total by ${labels[labels.length - 1]}: ${fmt(totals[totals.length - 1])}`} onPointerLeave={() => setHover(null)}>
            {ticks.map((t) => <g key={t}><line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="#e6ddd4" /><text x={padL - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={11} fill="#9a8f89" fontFamily="var(--font-plex)">{fmt(t)}</text></g>)}
            {labels.map((l, i) => {
              let acc = 0; const x0 = padL + i * bw + bw * 0.18, w = bw * 0.64;
              return (
                <g key={l} onPointerEnter={() => setHover(i)}>
                  <rect x={padL + i * bw} y={padT} width={bw} height={H - padT - padB} fill="transparent" />
                  {series.map((s, k) => {
                    const v = s.values[i], top = acc + v; const yy = y(top), hh = y(acc) - y(top) - (k < series.length - 1 ? 0 : 0); acc = top;
                    const isTop = k === series.length - 1;
                    return <rect key={s.name} x={x0} y={yy + (k > 0 ? 0 : 0)} width={w} height={Math.max(0, hh - (k > 0 ? 2 : 0))} rx={isTop ? 4 : 0} fill={s.color} opacity={hover === null || hover === i ? 1 : 0.45} />;
                  })}
                  {(i % 2 === 0 || i === labels.length - 1) && <text x={padL + i * bw + bw / 2} y={H - 10} textAnchor="middle" fontSize={11} fill="#9a8f89" fontFamily="var(--font-plex)">{l.replace(" 20", " '")}</text>}
                </g>
              );
            })}
            <text x={padL + (labels.length - 0.5) * bw} y={y(totals[totals.length - 1]) - 8} textAnchor="middle" fontSize={12} fontWeight={600} fill="#161113">{fmt(totals[totals.length - 1])}</text>
          </svg>
          {hover !== null && (
            <div className="pointer-events-none absolute top-2 z-10 rounded-xl border border-rule bg-white/95 px-3 py-2 text-xs shadow-lg" style={{ left: `clamp(0px, calc(${((hover + 1) / labels.length) * 100}% - 40px), calc(100% - 170px))` }}>
              <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted">{labels[hover]}</div>
              {series.map((s) => <div key={s.name} className="flex justify-between gap-4"><span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: s.color }} />{s.name}</span><strong className="tabular-nums">{fmt(s.values[hover])}</strong></div>)}
              <div className="mt-1 flex justify-between gap-4 border-t border-rule pt-1"><span>Total</span><strong className="tabular-nums">{fmt(totals[hover])}</strong></div>
            </div>
          )}
        </div>
      )}
    </figure>
  );
}
