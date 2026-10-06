import type { Metadata } from "next";
import { LineChart, StackedBars } from "@/components/Charts";
import { SCENARIO, SERIES } from "@/content/palette";
import Calculator from "@/components/Calculator";
import { Icon } from "@/components/Icon";
import P from "@/content/projections.json";

export const metadata: Metadata = { title: "Projections" };
type K = "conservative" | "base" | "aggressive";
const KS: K[] = ["conservative", "base", "aggressive"];
// phones get one card per scenario instead of a four-column table; the base case leads
const KS_PHONE: K[] = ["base", "conservative", "aggressive"];
const money = (v: number) => "$" + Math.round(v).toLocaleString("en-US");
const months = P.engine.base.months.map((m) => m.month);
const scen = (k: K, values: number[]) => ({ ...SCENARIO[k], values });

const To = () => <Icon name="arrow-right" label="to" />;

const Key = ({ k }: { k: K }) => {
  const s = SCENARIO[k];
  return <svg width="24" height="10" aria-hidden className="shrink-0"><line x1="1" x2="23" y1="5" y2="5" stroke={s.color} strokeWidth={4} strokeLinecap="round" strokeDasharray={"dash" in s ? "6 4" : undefined} /></svg>;
};

const REV_NOTE = "*Revenue uses placeholder fees. Benchmark check: U.S. franchise systems commonly spend about $10,000 to $30,000 in marketing per unit sold; the base case lands at about $10,300 per member because Sundae's marketplace list and dinners add low-cost organic demand.";

const ScenarioCard = ({ k, sub, rows }: { k: K; sub?: string; rows: [string, string][] }) => (
  <div className={`card p-5 ${k === "base" ? "!border-blue" : ""}`}>
    <p className="flex items-center gap-2.5 font-bold"><Key k={k} />{SCENARIO[k].name}</p>
    {sub && <p className="mt-0.5 text-base">{sub}</p>}
    <dl className="tnum mt-3 text-base leading-snug">
      {rows.map(([l, v]) => <div key={l} className="flex items-baseline justify-between gap-4 border-b border-gray py-2.5 last:border-b-0"><dt>{l}</dt><dd className="shrink-0 text-right font-bold">{v}</dd></div>)}
    </dl>
  </div>
);

export default function Projections() {
  const evRows: [string, keyof typeof P.event.base, (v: number) => string][] = [
    ["Paid budget (six days)", "paid_budget", money], ["Cost per application", "paid_cpl", money], ["Paid applications", "paid_applications", String],
    ["Organic applications", "organic_applications", String], ["Total applications", "applications", String], ["Approved seats", "approved_seats", String],
    ["Attendees", "attendees", String], ["Intro calls booked", "intro_calls", String], ["Members signed within about 45 days", "members_signed_45d", (v) => v.toFixed(1)], ["Paid cost per attendee", "cost_per_attendee", money],
  ];
  const sumRows: [string, keyof typeof P.engine.base.summary, (v: number) => string][] = [
    ["Ad spend (12 months)", "ad_spend_12mo", money], ["Leads (12 months)", "leads_12mo", (v) => v.toLocaleString("en-US")], ["Average leads per day", "avg_leads_per_day", (v) => v.toFixed(1)],
    ["Intro calls held", "intro_calls_held_12mo", (v) => v.toLocaleString("en-US")], ["Members signed", "members_12mo", (v) => v.toFixed(1)], ["Ad spend per member", "ad_cost_per_member", money],
    ["Exit run rate (members a month)", "exit_run_rate_members_per_month", (v) => v.toFixed(1)], ["Initial-fee revenue*", "initial_fee_revenue_12mo", money], ["Recurring revenue*", "recurring_revenue_12mo", money], ["Total revenue (12 months)*", "total_revenue_12mo", money],
  ];
  return (
    <main className="mx-auto max-w-7xl px-5 md:px-8">
      <header className="py-16 md:py-24">
        <p className="eyebrow">Lead flow and sales projections</p>
        <h1 className="display h-bar h-bar-lg mt-5 max-w-4xl text-[clamp(2.375rem,4.6vw,4rem)]">What the plan produces, if Sundae executes it.</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {P.notes.map((n) => <p key={n} className="rounded-2xl bg-mist px-5 py-4 text-lg leading-relaxed">{n}</p>)}
        </div>
      </header>

      <section className="border-t border-gray py-16" aria-labelledby="ev">
        <p className="eyebrow">The Oct. 8 dinner</p>
        <h2 id="ev" className="display h-bar mt-4 text-[2.25rem] md:text-[2.625rem]">From applications to signed members</h2>
        <div className="mt-10 grid gap-6 xl:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-4 md:hidden">
            {KS_PHONE.map((k) => <ScenarioCard key={k} k={k} rows={evRows.map(([l, key, f]) => [l, f(P.event[k][key] as number)])} />)}
          </div>
          <div className="card scroll-x hidden p-6 md:block md:p-7">
            <table className="dtable min-w-[560px]">
              <thead><tr><th />{KS.map((k) => <th key={k} className="!text-right"><span className="inline-flex items-center gap-2"><Key k={k} />{SCENARIO[k].name}</span></th>)}</tr></thead>
              <tbody>{evRows.map(([l, key, f]) => <tr key={l}><td>{l}</td>{KS.map((k) => <td key={k} className={`text-right ${k === "base" ? "font-bold" : ""}`}>{f(P.event[k][key] as number)}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <div className="card p-6 md:p-7">
            <p className="section-title">Base-case funnel</p>
            <p className="mt-1 text-base">Each step as a share of applications</p>
            <div className="mt-6 grid gap-4">
              {([["Applications", P.event.base.applications], ["Approved seats", P.event.base.approved_seats], ["Attendees", P.event.base.attendees], ["Intro calls", P.event.base.intro_calls], ["Members (about 45 days)", P.event.base.members_signed_45d]] as [string, number][]).map(([l, v]) => (
                <div key={l}>
                  <div className="flex justify-between text-base"><span>{l}</span><strong className="tnum">{Number.isInteger(v) ? v : v.toFixed(1)}</strong></div>
                  <div className="mt-1.5 h-3 rounded-full bg-mist"><div className="h-3 rounded-full bg-blue" style={{ width: `${Math.max(2, (v / P.event.base.applications) * 100)}%` }} /></div>
                </div>
              ))}
            </div>
            <p className="mt-7 text-lg leading-relaxed">Assumes 55% of applications approved, a 70% show rate with SHAI confirmations, 30% of attendees booking an intro call and 18% of those signing after the FDD period.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-gray py-16" aria-labelledby="eng">
        <p className="eyebrow">The always-on membership engine · 12 months</p>
        <h2 id="eng" className="display h-bar mt-4 text-[2.25rem] md:text-[2.625rem]">Lead flow and members, three scenarios</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <LineChart title="Qualified-lead flow per day" sub="Paid and organic leads ÷ 30.4" labels={months} series={KS.map((k) => scen(k, P.engine[k].months.map((m) => m.leads_per_day)))} />
          <LineChart title="Cumulative members signed" sub="Funnel signings lag FDD delivery by about one month; dinners convert over the following two months" labels={months} series={KS.map((k) => scen(k, P.engine[k].months.map((m) => m.cumulative_members)))} />
          <StackedBars title="Base case — where the leads come from" sub="Monthly leads: paid ($25,000 a month at a $110 blended CPL) vs. organic" labels={months} series={[{ name: "Paid", color: SERIES.blue, values: P.engine.base.months.map((m) => m.paid_leads) }, { name: "Organic", color: SERIES.slate, values: P.engine.base.months.map((m) => m.organic_leads) }]} />
          <LineChart title="Cumulative revenue (placeholder fees)" sub="$50,000 initial plus $3,000 a month per member — replace with FDD numbers" format="moneyShort" labels={months} series={KS.map((k) => { let c = 0; return scen(k, P.engine[k].months.map((m) => (c += m.initial_fee_revenue + m.recurring_revenue))); })} />
        </div>
        <div className="mt-6 grid gap-4 md:hidden">
          {KS_PHONE.map((k) => <ScenarioCard key={k} k={k} sub={`${money(P.engine[k].assumptions.budget)} a month in ads`} rows={sumRows.map(([l, key, f]) => [l, f(P.engine[k].summary[key] as number)])} />)}
          <p className="text-base leading-relaxed">{REV_NOTE}</p>
        </div>
        <div className="card scroll-x mt-6 hidden p-6 md:block md:p-7">
          <table className="dtable min-w-[640px]">
            <thead><tr><th>12-month summary</th>{KS.map((k) => <th key={k} className="!text-right"><span className="inline-flex items-center gap-2"><Key k={k} />{SCENARIO[k].name}</span><span className="block font-normal">{money(P.engine[k].assumptions.budget)} a month</span></th>)}</tr></thead>
            <tbody>{sumRows.map(([l, key, f]) => <tr key={l}><td>{l}</td>{KS.map((k) => <td key={k} className={`text-right ${k === "base" ? "font-bold" : ""}`}>{f(P.engine[k].summary[key] as number)}</td>)}</tr>)}</tbody>
          </table>
          <p className="mt-4 text-base leading-relaxed">{REV_NOTE}</p>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {KS.map((k) => { const a = P.engine[k].assumptions; return (
            <div key={k} className={`p-6 text-base ${k === "base" ? "card border-blue" : "card"}`}><p className="flex items-center gap-2.5 font-bold"><Key k={k} />{SCENARIO[k].name} assumptions</p>
              <ul className="tnum mt-3 grid gap-1.5 leading-relaxed"><li>Ads {money(a.budget)} a month · blended CPL {money(a.cpl)}</li><li>Organic {a.organic[0]} <To /> {a.organic[11]} leads a month</li><li>Lead <To /> qualified {Math.round(a.lead_mql * 100)}% · qualified <To /> call booked {Math.round(a.mql_booked * 100)}%</li><li>Booked <To /> held {Math.round(a.booked_held * 100)}% · held <To /> FDD {Math.round(a.held_fdd * 100)}% · FDD <To /> signed {Math.round(a.fdd_signed * 100)}%</li><li>Monthly dinner: {a.dinner_attendees} guests × {(a.dinner_sign * 100).toFixed(1)}%</li></ul></div>
          ); })}
        </div>
      </section>

      <section className="border-t border-gray py-16" aria-labelledby="calc">
        <p className="eyebrow">Try your own numbers</p>
        <h2 id="calc" className="display h-bar mt-4 text-[2.25rem] md:text-[2.625rem]">Projection calculator</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed">Same mechanics as the model above. Plug in Sundae&apos;s real fee, budget and conversion rates once two or three weeks of live data are in. SHAI&apos;s <code className="rounded-md border border-gray bg-mist px-1.5 font-bold">/forecasting</code> agent re-runs this monthly from actuals.</p>
        <div className="mt-10"><Calculator /></div>
      </section>
    </main>
  );
}
