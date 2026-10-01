import type { Metadata } from "next";
import { LineChart, StackedBars } from "@/components/Charts";
import { SERIES } from "@/content/palette";
import Calculator from "@/components/Calculator";
import P from "@/content/projections.json";

export const metadata: Metadata = { title: "Projections" };
type K = "conservative" | "base" | "aggressive";
const KS: K[] = ["conservative", "base", "aggressive"];
const LABEL: Record<K, string> = { conservative: "Conservative", base: "Base", aggressive: "Aggressive" };
const COLOR: Record<K, string> = { conservative: SERIES.blue, base: SERIES.red, aggressive: SERIES.aqua };
const money = (v: number) => "$" + Math.round(v).toLocaleString("en-US");
const months = P.engine.base.months.map((m) => m.month);

export default function Projections() {
  const evRows: [string, keyof typeof P.event.base, (v: number) => string][] = [
    ["Paid budget (6 days)", "paid_budget", money], ["Cost per application", "paid_cpl", money], ["Paid applications", "paid_applications", String],
    ["Organic applications", "organic_applications", String], ["Total applications", "applications", String], ["Approved seats", "approved_seats", String],
    ["Attendees", "attendees", String], ["Intro calls booked", "intro_calls", String], ["Members signed within ~45 days", "members_signed_45d", (v) => v.toFixed(1)], ["Paid cost per attendee", "cost_per_attendee", money],
  ];
  const sumRows: [string, keyof typeof P.engine.base.summary, (v: number) => string][] = [
    ["Ad spend (12 months)", "ad_spend_12mo", money], ["Leads (12 months)", "leads_12mo", (v) => v.toLocaleString("en-US")], ["Average leads per day", "avg_leads_per_day", (v) => v.toFixed(1)],
    ["Intro calls held", "intro_calls_held_12mo", (v) => v.toLocaleString("en-US")], ["Members signed", "members_12mo", (v) => v.toFixed(1)], ["Ad spend per member", "ad_cost_per_member", money],
    ["Exit run-rate (members / month)", "exit_run_rate_members_per_month", (v) => v.toFixed(1)], ["Initial-fee revenue*", "initial_fee_revenue_12mo", money], ["Recurring revenue*", "recurring_revenue_12mo", money], ["Total revenue (12 mo)*", "total_revenue_12mo", money],
  ];
  return (
    <main className="mx-auto max-w-7xl px-5 md:px-8">
      <header className="py-14 md:py-20">
        <p className="eyebrow">Lead flow &amp; sales projections</p>
        <h1 className="h-serif mt-4 max-w-4xl text-[clamp(2.6rem,6vw,5rem)]">What the plan produces, if Sundae executes it.</h1>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {P.notes.map((n) => <p key={n} className="rounded-xl border border-rule bg-white px-4 py-3 text-sm text-muted">{n}</p>)}
        </div>
      </header>

      <section className="border-t border-rule py-14" aria-labelledby="ev">
        <p className="eyebrow">The Oct 8 dinner</p>
        <h2 id="ev" className="h-serif mt-3 text-4xl">From applications to signed members</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="card overflow-x-auto p-5">
            <table className="w-full min-w-[520px] text-sm">
              <thead><tr className="border-b border-rule text-left font-mono text-[11px] uppercase tracking-wider text-muted"><th className="py-2 pr-4" />{KS.map((k) => <th key={k} className="py-2 pr-4 text-right"><span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: COLOR[k] }} />{LABEL[k]}</span></th>)}</tr></thead>
              <tbody>{evRows.map(([l, key, f]) => <tr key={l} className="border-b border-rule/60"><td className="py-2 pr-4">{l}</td>{KS.map((k) => <td key={k} className={`py-2 pr-4 text-right tabular-nums ${k === "base" ? "font-semibold" : ""}`}>{f(P.event[k][key] as number)}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <div className="card p-6">
            <p className="text-lg font-semibold">Base-case funnel</p>
            <p className="mt-1 text-sm text-muted">Each step as a share of applications</p>
            <div className="mt-6 grid gap-3">
              {([["Applications", P.event.base.applications], ["Approved seats", P.event.base.approved_seats], ["Attendees", P.event.base.attendees], ["Intro calls", P.event.base.intro_calls], ["Members (~45 days)", P.event.base.members_signed_45d]] as [string, number][]).map(([l, v]) => (
                <div key={l}>
                  <div className="flex justify-between text-sm"><span>{l}</span><strong className="tabular-nums">{Number.isInteger(v) ? v : v.toFixed(1)}</strong></div>
                  <div className="mt-1 h-2.5 rounded-full bg-paper-2"><div className="h-2.5 rounded-full bg-red" style={{ width: `${Math.max(2, (v / P.event.base.applications) * 100)}%` }} /></div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-faint">Assumes 55% of applications approved, 70% show rate with SHAI confirmations, 30% of attendees book an intro call, 18% of those sign after the FDD period.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-rule py-14" aria-labelledby="eng">
        <p className="eyebrow">The always-on membership engine · 12 months</p>
        <h2 id="eng" className="h-serif mt-3 text-4xl">Lead flow and members, three scenarios</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <LineChart title="Qualified-lead flow per day" sub="Paid + organic leads ÷ 30.4" labels={months} series={KS.map((k) => ({ name: LABEL[k], color: COLOR[k], values: P.engine[k].months.map((m) => m.leads_per_day) }))} />
          <LineChart title="Cumulative members signed" sub="Funnel signings lag FDD delivery by ~1 month; dinners convert over the following 2 months" labels={months} series={KS.map((k) => ({ name: LABEL[k], color: COLOR[k], values: P.engine[k].months.map((m) => m.cumulative_members) }))} />
          <StackedBars title="Base case — where the leads come from" sub="Monthly leads: paid ($25k/mo at $110 blended CPL) vs. organic" labels={months} series={[{ name: "Paid", color: SERIES.red, values: P.engine.base.months.map((m) => m.paid_leads) }, { name: "Organic", color: SERIES.blue, values: P.engine.base.months.map((m) => m.organic_leads) }]} />
          <LineChart title="Cumulative revenue (placeholder fees)" sub="$50k initial + $3k/month per member — replace with FDD numbers" format="moneyShort" labels={months} series={KS.map((k) => { let c = 0; return { name: LABEL[k], color: COLOR[k], values: P.engine[k].months.map((m) => (c += m.initial_fee_revenue + m.recurring_revenue)) }; })} />
        </div>
        <div className="card mt-6 overflow-x-auto p-5">
          <table className="w-full min-w-[560px] text-sm">
            <thead><tr className="border-b border-rule text-left font-mono text-[11px] uppercase tracking-wider text-muted"><th className="py-2 pr-4">12-month summary</th>{KS.map((k) => <th key={k} className="py-2 pr-4 text-right">{LABEL[k]} · {money(P.engine[k].assumptions.budget)}/mo</th>)}</tr></thead>
            <tbody>{sumRows.map(([l, key, f]) => <tr key={l} className="border-b border-rule/60"><td className="py-2 pr-4">{l}</td>{KS.map((k) => <td key={k} className={`py-2 pr-4 text-right tabular-nums ${k === "base" ? "font-semibold" : ""}`}>{f(P.engine[k].summary[key] as number)}</td>)}</tr>)}</tbody>
          </table>
          <p className="mt-3 text-xs text-faint">* Revenue uses placeholder fees. Benchmark check: US franchise systems commonly spend ~$10k–$30k in marketing per unit sold; the base case lands at ≈$10.3k per member because Sundae&apos;s marketplace list and dinners add low-cost organic demand.</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {KS.map((k) => { const a = P.engine[k].assumptions; return (
            <div key={k} className="card p-5 text-sm"><p className="font-semibold" style={{ color: k === "base" ? SERIES.red : undefined }}>{LABEL[k]} assumptions</p>
              <ul className="mt-3 grid gap-1 text-muted"><li>Ads {money(a.budget)}/mo · blended CPL {money(a.cpl)}</li><li>Organic {a.organic[0]} → {a.organic[11]} leads/mo</li><li>Lead→qualified {Math.round(a.lead_mql * 100)}% · →call booked {Math.round(a.mql_booked * 100)}%</li><li>Booked→held {Math.round(a.booked_held * 100)}% · held→FDD {Math.round(a.held_fdd * 100)}% · FDD→signed {Math.round(a.fdd_signed * 100)}%</li><li>Monthly dinner: {a.dinner_attendees} guests × {(a.dinner_sign * 100).toFixed(1)}%</li></ul></div>
          ); })}
        </div>
      </section>

      <section className="border-t border-rule py-14" aria-labelledby="calc">
        <p className="eyebrow">Try your own numbers</p>
        <h2 id="calc" className="h-serif mt-3 text-4xl">Projection calculator</h2>
        <p className="mt-3 max-w-2xl text-muted">Same mechanics as the model above. Plug in Sundae&apos;s real fee, budget and conversion rates once two or three weeks of live data are in — SHAI&apos;s <code className="rounded bg-paper-2 px-1.5">/forecasting</code> agent re-runs this monthly from actuals.</p>
        <div className="mt-8"><Calculator /></div>
      </section>
    </main>
  );
}
