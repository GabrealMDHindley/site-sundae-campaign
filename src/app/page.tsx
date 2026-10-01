import Link from "next/link";
import Image from "next/image";
import HeroFunnel from "@/components/HeroFunnel";
import { LineChart } from "@/components/Charts";
import { SERIES } from "@/content/palette";
import { IMAGES, LINKS, PLANS, REELS, VIDEOS, FLYERS } from "@/content/library";
import captions from "@/content/captions.json";
import P from "@/content/projections.json";

const months = P.engine.base.months.map((m) => m.month);
const sc = (k: "conservative" | "base" | "aggressive") => P.engine[k];

export default function Overview() {
  const ev = P.event.base;
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-rule">
        <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block"><HeroFunnel /></div>
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
          <p className="eyebrow">Prepared by SHAI for Sundae · October 1, 2026</p>
          <h1 className="h-serif mt-6 max-w-3xl text-[clamp(2.7rem,6.4vw,5.6rem)]">
            Fill the Courtyard.<br /><em className="text-red">Then sell Sundae Membership every day.</em>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
            The complete campaign for Sundae&apos;s <strong className="text-ink">Private Dinner &amp; Dialogue</strong> with Josh Stech — Thursday, October 8, 6 PM, the Courtyard at Shade Hotel, Manhattan Beach — and the always-on engine that turns one great dinner into a repeatable membership (franchise) sales system, run on SHAI.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/creative" className="btn btn-ink">Open the creative library →</Link>
            <Link href="/projections" className="btn btn-line">See the projections</Link>
            <Link href="/plans/action-plan" className="btn btn-line">What needs to be done</Link>
          </div>
          <dl className="mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] border border-rule bg-rule md:grid-cols-4" data-stagger>
            <div className="bg-white p-5"><dt className="text-xs text-muted">Days to the dinner</dt><dd className="num mt-1 text-4xl">7</dd></div>
            <div className="bg-white p-5"><dt className="text-xs text-muted">Creative assets</dt><dd className="num mt-1 text-4xl">{IMAGES.filter((a) => !a.variantOf).length + FLYERS.length + VIDEOS.length + REELS.length + captions.length}</dd></div>
            <div className="bg-white p-5"><dt className="text-xs text-muted">Operators seated (base)</dt><dd className="num mt-1 text-4xl"><span data-count={ev.attendees}>{ev.attendees}</span></dd></div>
            <div className="bg-white p-5"><dt className="text-xs text-muted">Members in 12 mo (base)</dt><dd className="num mt-1 text-4xl"><span data-count={sc("base").summary.members_12mo} data-dec="1">{sc("base").summary.members_12mo}</span></dd></div>
          </dl>
        </div>
      </section>

      {/* THREE LINKS */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8" aria-labelledby="links">
        <p className="eyebrow" data-reveal>Three separate deliverables</p>
        <h2 id="links" className="h-serif mt-3 text-4xl md:text-5xl" data-reveal>Review each one on its own link</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3" data-stagger>
          <article className="card flex flex-col overflow-hidden">
            <div className="relative aspect-[16/10] bg-paper-2"><Image src="/media/shots/overview.jpg" alt="This campaign overview site" fill sizes="33vw" className="object-cover object-top" /></div>
            <div className="flex flex-1 flex-col p-6"><p className="eyebrow">Link 1 · you are here</p><h3 className="mt-2 text-xl font-semibold">Campaign overview</h3><p className="mt-2 flex-1 text-sm text-muted">Business plan, every creative asset, captions, event and membership plans, filming gameplan, SHAI playbook, projections and the action plan.</p><span className="mt-5 font-mono text-xs text-faint">site-sundae-campaign.vercel.app</span></div>
          </article>
          <article className="card flex flex-col overflow-hidden">
            <div className="relative aspect-[16/10] bg-night"><Image src="/media/shots/event.jpg" alt="The event RSVP page" fill sizes="33vw" className="object-cover object-top" /></div>
            <div className="flex flex-1 flex-col p-6"><p className="eyebrow">Link 2</p><h3 className="mt-2 text-xl font-semibold">Event RSVP page</h3><p className="mt-2 flex-1 text-sm text-muted">One-page funnel for the Oct 8 dinner: the evening, Josh, the venue, why become a Sundae Member, and a 60-second qualifying RSVP that routes to SHAI/GoHighLevel.</p><a href={LINKS.event} target="_blank" rel="noopener" className="btn btn-red mt-5 self-start">Open event page ↗</a></div>
          </article>
          <article className="card flex flex-col overflow-hidden">
            <div className="relative aspect-[16/10] bg-paper-2"><Image src="/media/shots/rebuild.jpg" alt="The Sundae website rebuild" fill sizes="33vw" className="object-cover object-top" /></div>
            <div className="flex flex-1 flex-col p-6"><p className="eyebrow">Link 3</p><h3 className="mt-2 text-xl font-semibold">sundae.com rebuild</h3><p className="mt-2 flex-1 text-sm text-muted">The full Sundae website rebuilt: 3D hero, scroll choreography, every page from today&apos;s site plus a Membership hub, and an AI assistant trained on the site&apos;s own content.</p><a href={LINKS.rebuild} target="_blank" rel="noopener" className="btn btn-ink mt-5 self-start">Open website rebuild ↗</a></div>
          </article>
        </div>
      </section>

      {/* EXEC SUMMARY */}
      <section className="border-y border-rule bg-white py-20" aria-labelledby="summary">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow" data-reveal>Executive summary</p>
          <h2 id="summary" className="h-serif mt-3 max-w-3xl text-4xl md:text-5xl" data-reveal>One dinner is an event. A dinner a month, plus a daily lead engine, is a franchise sales system.</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3" data-stagger>
            <div><p className="font-mono text-xs text-red-deep">01 — The situation</p><p className="mt-3 leading-relaxed text-muted">Sundae Membership pairs local operators with Sundae&apos;s marketing ($100M+ invested since 2018), technology, automation, capital and 20,000+ marketplace investors. The Oct 8 dinner is 7 days out, and today&apos;s RSVP form requires a Google sign-in and asks no qualifying questions.</p></div>
            <div><p className="font-mono text-xs text-red-deep">02 — The strategy</p><p className="mt-3 leading-relaxed text-muted">Fill the Courtyard with <strong className="text-ink">qualified</strong> operators: the marketplace list and Josh&apos;s personal invites first, a $5k paid sprint for reach, a qualifying RSVP page, and a show-rate system. Then make the dinner monthly and add an always-on funnel: founder-led content, paid ads and speed-to-lead.</p></div>
            <div><p className="font-mono text-xs text-red-deep">03 — The system</p><p className="mt-3 leading-relaxed text-muted">SHAI runs the work: GoHighLevel pipelines and automations, AI chat and voice speed-to-lead, ads end to end, content and video editing, and daily reporting. Josh and Victoria approve by text. Base case: ~11 leads a day and ~29 members in 12 months at ≈$10k ad spend per member.</p></div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8" aria-labelledby="plans">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow" data-reveal>The plans</p><h2 id="plans" className="h-serif mt-3 text-4xl md:text-5xl" data-reveal>Everything Sundae needs to execute</h2></div><Link href="/plans/event-organic" className="btn btn-line">Read the plans →</Link></div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-stagger>
          {PLANS.map((p) => (
            <Link key={p.slug} href={`/plans/${p.slug}`} className="card group flex flex-col p-6 transition-colors hover:border-ink">
              <span className="tag self-start">{p.group}</span>
              <h3 className="mt-4 text-lg font-semibold group-hover:text-red-deep">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{p.blurb}</p>
              <span className="mt-4 text-sm font-semibold">Read →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CREATIVE PREVIEW */}
      <section className="border-y border-rule bg-night py-20 text-white" aria-labelledby="creative">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-[.14em] text-[#e9b872]">Creative library</p><h2 id="creative" className="h-serif mt-3 text-4xl md:text-5xl">10 images · 8 flyers · 8 videos · 8 Reels · 16 captions</h2></div><Link href="/creative" className="btn bg-white text-ink">Open the library →</Link></div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5" data-stagger>
            {IMAGES.slice(0, 5).map((a) => (
              <Link key={a.file} href="/creative#images" className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white/5"><Image src={`/media/images/${a.file}`} alt={a.title} fill sizes="20vw" className="object-cover transition-transform duration-500 hover:scale-105" /></Link>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-white/60">Built only from real assets: Sundae&apos;s brand and photography, the Sacramento dinner photo, and Shade Hotel&apos;s own Courtyard photos. The motion B-roll is AI-animated directly from those real Courtyard photos — no invented venues, people or claims.</p>
        </div>
      </section>

      {/* PROJECTIONS PREVIEW */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8" aria-labelledby="proj">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow" data-reveal>Lead flow &amp; sales projections</p><h2 id="proj" className="h-serif mt-3 text-4xl md:text-5xl" data-reveal>If Sundae executes the plan</h2></div><Link href="/projections" className="btn btn-line">Full model + calculator →</Link></div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <LineChart title="Cumulative members signed" sub="Three scenarios · Oct 2026 – Sep 2027" labels={months} series={[{ name: "Conservative", color: SERIES.blue, values: sc("conservative").months.map((m) => m.cumulative_members) }, { name: "Base", color: SERIES.red, values: sc("base").months.map((m) => m.cumulative_members) }, { name: "Aggressive", color: SERIES.aqua, values: sc("aggressive").months.map((m) => m.cumulative_members) }]} />
          <LineChart title="Qualified-lead flow per day" sub="Paid + organic leads ÷ 30.4" labels={months} series={[{ name: "Conservative", color: SERIES.blue, values: sc("conservative").months.map((m) => m.leads_per_day) }, { name: "Base", color: SERIES.red, values: sc("base").months.map((m) => m.leads_per_day) }, { name: "Aggressive", color: SERIES.aqua, values: sc("aggressive").months.map((m) => m.leads_per_day) }]} />
        </div>
        <p className="mt-5 text-sm text-faint">All inputs are labelled industry-benchmark assumptions, not Sundae data. Fees are placeholders ($50k initial, $3k/month) until Sundae confirms its FDD numbers.</p>
      </section>

      {/* THIS WEEK */}
      <section className="mx-auto max-w-7xl px-5 md:px-8" aria-labelledby="week">
        <div className="card grid gap-8 p-8 md:grid-cols-[1fr_1.4fr] md:p-12">
          <div><p className="eyebrow">This week</p><h2 id="week" className="h-serif mt-3 text-4xl">The five moves that fill the room</h2><Link href="/plans/action-plan" className="btn btn-ink mt-8">Full action plan →</Link></div>
          <ol className="grid gap-5" data-stagger>
            {[
              ["Point every invite at the new RSVP page", "No sign-in wall, six qualifying questions, routed into GoHighLevel via SHAI."],
              ["Email + text the LA marketplace buyers (opted-in)", "Sundae's unfair advantage: active operators who already bid on Sundae deals."],
              ["Josh personally invites the top 50 LA buyers", "Founder-written DMs and texts are the highest-yield seats."],
              ["Launch the $5k paid sprint Friday", "Meta + LinkedIn Conversation Ads from Josh + Google; stop prospecting Wed noon."],
              ["Confirm every guest by phone Tue–Wed", "Free dinners lose 30–40% to no-shows; the SHAI voice agent + team close that gap."],
            ].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-3"><span className="num text-3xl text-red">{i + 1}</span><div><p className="font-semibold">{t}</p><p className="text-sm text-muted">{d}</p></div></li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
