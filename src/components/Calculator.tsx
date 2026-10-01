"use client";
import { useMemo, useState } from "react";
import { LineChart } from "./Charts";
import { SERIES } from "@/content/palette";

const MONTHS = ["Oct 2026", "Nov 2026", "Dec 2026", "Jan 2027", "Feb 2027", "Mar 2027", "Apr 2027", "May 2027", "Jun 2027", "Jul 2027", "Aug 2027", "Sep 2027"];
const RAMP = [0.7, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const ORGANIC_RAMP = [0.25, 0.34, 0.44, 0.53, 0.63, 0.72, 0.78, 0.84, 0.9, 0.94, 0.97, 1];
const money = (v: number) => "$" + Math.round(v).toLocaleString("en-US");

type In = { budget: number; cpl: number; organic: number; mql: number; booked: number; held: number; fdd: number; signed: number; dinner: number; dinnerSign: number; fee: number; monthly: number; firstDinner: number };
// Same mechanics as clients/sundae/marketing/projections/model.py (base-case defaults).
const BASE: In = { budget: 25000, cpl: 110, organic: 160, mql: 25, booked: 40, held: 70, fdd: 30, signed: 20, dinner: 40, dinnerSign: 3, fee: 50000, monthly: 3000, firstDinner: 2.7 };

function run(p: In) {
  const rows: { m: string; leads: number; perDay: number; held: number; fdds: number; signed: number; cum: number; rev: number }[] = [];
  let prevFdd = 0, cum = 0, rev = 0; const dinnerQ = new Array(14).fill(0);
  MONTHS.forEach((m, i) => {
    const leads = (p.budget / Math.max(p.cpl, 1)) * RAMP[i] + p.organic * ORGANIC_RAMP[i];
    const held = leads * (p.mql / 100) * (p.booked / 100) * (p.held / 100);
    const fdds = held * (p.fdd / 100);
    const d = i === 0 ? p.firstDinner : p.dinner * (p.dinnerSign / 100);
    dinnerQ[i + 1] += d / 2; dinnerQ[i + 2] += d / 2;
    const signed = prevFdd + dinnerQ[i];
    prevFdd = fdds * (p.signed / 100);
    rev += signed * p.fee + cum * p.monthly;
    cum += signed;
    rows.push({ m, leads, perDay: leads / 30.4, held, fdds, signed, cum, rev });
  });
  const spend = p.budget * 12;
  return { rows, spend, members: cum, rev, cpm: cum ? spend / cum : 0, leads: rows.reduce((a, r) => a + r.leads, 0) };
}

function Field({ label, value, onChange, step = 1, suffix, prefix, min = 0, max }: { label: string; value: number; onChange: (v: number) => void; step?: number; suffix?: string; prefix?: string; min?: number; max?: number }) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="text-muted">{label}</span>
      <span className="flex items-center rounded-xl border border-rule bg-white px-3 focus-within:border-ink">
        {prefix && <span className="text-faint">{prefix}</span>}
        <input type="number" inputMode="decimal" className="w-full bg-transparent px-1 py-2.5 tabular-nums outline-none" value={value} step={step} min={min} max={max} onChange={(e) => onChange(Number(e.target.value))} />
        {suffix && <span className="text-faint">{suffix}</span>}
      </span>
    </label>
  );
}

export default function Calculator() {
  const [p, setP] = useState<In>(BASE);
  const set = (k: keyof In) => (v: number) => setP((x) => ({ ...x, [k]: v }));
  const r = useMemo(() => run(p), [p]);
  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <div className="card p-6">
        <div className="flex items-center justify-between"><p className="eyebrow">Your inputs</p><button className="text-xs text-muted underline" onClick={() => setP(BASE)}>Reset to base case</button></div>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <Field label="Monthly ad budget" prefix="$" value={p.budget} onChange={set("budget")} step={1000} />
          <Field label="Blended cost per lead" prefix="$" value={p.cpl} onChange={set("cpl")} step={5} />
          <Field label="Organic leads/mo (steady)" value={p.organic} onChange={set("organic")} step={10} />
          <Field label="Lead → qualified" suffix="%" value={p.mql} onChange={set("mql")} max={100} />
          <Field label="Qualified → call booked" suffix="%" value={p.booked} onChange={set("booked")} max={100} />
          <Field label="Booked → held" suffix="%" value={p.held} onChange={set("held")} max={100} />
          <Field label="Held → FDD sent" suffix="%" value={p.fdd} onChange={set("fdd")} max={100} />
          <Field label="FDD → signed" suffix="%" value={p.signed} onChange={set("signed")} max={100} />
          <Field label="Dinner guests / month" value={p.dinner} onChange={set("dinner")} step={5} />
          <Field label="Dinner guest → signed" suffix="%" value={p.dinnerSign} onChange={set("dinnerSign")} step={0.5} max={100} />
          <Field label="Initial fee (placeholder)" prefix="$" value={p.fee} onChange={set("fee")} step={5000} />
          <Field label="Monthly fee (placeholder)" prefix="$" value={p.monthly} onChange={set("monthly")} step={250} />
        </div>
        <p className="mt-5 text-xs leading-relaxed text-faint">Fees are placeholders until Sundae confirms its FDD Item 5/6 numbers. Signings lag FDD delivery by a month (14-day FTC waiting period + decision time). Paid campaigns run at 70% / 90% efficiency in months 1–2 while they learn; organic ramps over 12 months.</p>
      </div>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] border border-rule bg-rule md:grid-cols-4">
          {[["Leads / day (12-mo avg)", (r.leads / 365).toFixed(1)], ["Members in 12 months", r.members.toFixed(1)], ["Ad spend per member", money(r.cpm)], ["12-month revenue", money(r.rev)]].map(([k, v]) => (
            <div key={k} className="bg-white p-5"><div className="num text-3xl md:text-4xl">{v}</div><div className="mt-1 text-xs text-muted">{k}</div></div>
          ))}
        </div>
        <LineChart title="Cumulative members — your inputs" sub="Signed Sundae Members, by month" labels={MONTHS} series={[{ name: "Your scenario", color: SERIES.red, values: r.rows.map((x) => +x.cum.toFixed(1)) }]} />
        <div className="card overflow-x-auto p-5">
          <table className="w-full min-w-[640px] text-sm">
            <thead><tr className="border-b border-rule text-left font-mono text-[11px] uppercase tracking-wider text-muted">{["Month", "Leads", "Per day", "Calls held", "FDDs", "Signed", "Members", "Revenue (cum.)"].map((h) => <th key={h} className="py-2 pr-3 text-right first:text-left">{h}</th>)}</tr></thead>
            <tbody>{r.rows.map((x) => (
              <tr key={x.m} className="border-b border-rule/60 tabular-nums"><td className="py-1.5 pr-3">{x.m}</td><td className="pr-3 text-right">{Math.round(x.leads)}</td><td className="pr-3 text-right">{x.perDay.toFixed(1)}</td><td className="pr-3 text-right">{Math.round(x.held)}</td><td className="pr-3 text-right">{x.fdds.toFixed(1)}</td><td className="pr-3 text-right">{x.signed.toFixed(1)}</td><td className="pr-3 text-right font-semibold">{x.cum.toFixed(1)}</td><td className="text-right">{money(x.rev)}</td></tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
