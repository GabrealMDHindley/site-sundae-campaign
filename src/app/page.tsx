import Link from "next/link";
import Image from "next/image";
import HeroFunnel from "@/components/HeroFunnel";
import { Icon } from "@/components/Icon";
import { LineChart } from "@/components/Charts";
import { SCENARIO } from "@/content/palette";
import { IMAGES, LINKS, PLANS, REELS, VIDEOS, FLYERS } from "@/content/library";
import captions from "@/content/captions.json";
import P from "@/content/projections.json";

const months = P.engine.base.months.map((m) => m.month);
const sc = (k: "conservative" | "base" | "aggressive") => P.engine[k];
const scen = (pick: (m: (typeof P.engine.base.months)[number]) => number) =>
  (["conservative", "base", "aggressive"] as const).map((k) => ({ ...SCENARIO[k], values: sc(k).months.map(pick) }));

export default function Overview() {
  const ev = P.event.base;
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-gray bg-white">
        {/* the funnel starts where the copy column ends (the copy column runs about 6.7rem past center at xl), so no particle sits behind text */}
        <div className="absolute inset-y-0 left-[calc(50%+8rem)] right-0 hidden [mask-image:linear-gradient(to_right,transparent,#000_16%)] xl:block"><HeroFunnel /></div>
        {/* deck shape accent (p.11): the slate circle, kept quiet; the 4x4 blue dot grid sits behind the stat panel's corner below */}
        <div aria-hidden className="shape-circle pointer-events-none absolute -right-24 -top-24 hidden h-72 w-72 opacity-50 lg:block" />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
          <p className="eyebrow">Prepared by SHAI for Sundae · Oct.&nbsp;1, 2026</p>
          <h1 className="display h-bar h-bar-lg mt-7 max-w-3xl text-[clamp(2.375rem,4.2vw,3.75rem)] leading-[1.2]">
            Fill the Courtyard.<br />Then sell Sundae Membership <span className="hl whitespace-nowrap">every day.</span>
          </h1>
          <p className="lede mt-8 max-w-2xl text-pretty">
            The complete campaign for Sundae&apos;s <strong className="font-bold">Private Dinner &amp; Dialogue</strong> with Josh Stech on Thursday, Oct. 8, at 7 p.m., in the Courtyard at Shade Hotel in Manhattan Beach, and the always-on engine that turns one great dinner into a repeatable membership (franchise) sales system, run on&nbsp;SHAI.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/creative" className="btn btn-blue">Open the creative library <Icon name="arrow-right" /></Link>
            <Link href="/projections" className="btn btn-outline">See the projections</Link>
            <Link href="/plans/action-plan" className="btn btn-outline">What needs to be done</Link>
          </div>
          <div className="relative mt-16 max-w-4xl">
            <div aria-hidden className="dots pointer-events-none absolute -bottom-8 -right-8 hidden h-16 w-16 lg:block" />
            <dl className="relative grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] border border-gray bg-gray shadow-[0_24px_48px_-36px_rgba(74,74,74,.5)] md:grid-cols-4">
              <div className="flex flex-col justify-between bg-white p-6"><dt className="text-base leading-snug">Days to the dinner</dt><dd className="stat mt-2 text-[2.75rem]">7</dd></div>
              <div className="flex flex-col justify-between bg-white p-6"><dt className="text-base leading-snug">Creative assets</dt><dd className="stat mt-2 text-[2.75rem]">{IMAGES.filter((a) => !a.variantOf).length + FLYERS.length + VIDEOS.length + REELS.length + captions.length}</dd></div>
              <div className="flex flex-col justify-between bg-white p-6"><dt className="text-base leading-snug">Operators seated (base)</dt><dd className="stat mt-2 text-[2.75rem]"><span data-count={ev.attendees}>{ev.attendees}</span></dd></div>
              <div className="flex flex-col justify-between bg-white p-6"><dt className="text-base leading-snug">Members in 12 months (base)</dt><dd className="stat mt-2 text-[2.75rem]"><span data-count={sc("base").summary.members_12mo} data-dec="1">{sc("base").summary.members_12mo}</span></dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* THREE LINKS */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8" aria-labelledby="links">
        <p className="eyebrow" data-reveal>Three separate deliverables</p>
        <h2 id="links" className="display h-bar mt-4 text-[2.25rem] md:text-[2.875rem]" data-reveal>Review each one on its own link</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3" data-stagger>
          <article className="card hover-lift flex flex-col overflow-hidden">
            <div className="relative aspect-[16/10] border-b border-gray bg-mist"><Image src="/media/shots/overview.jpg" alt="This campaign overview site" fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover object-top" /></div>
            <div className="flex flex-1 flex-col p-7"><p className="eyebrow">Link 1 · you are here</p><h3 className="section-title mt-2.5 text-[1.375rem]">Campaign overview</h3><p className="mt-3 flex-1 text-lg leading-relaxed">Business plan, every creative asset, captions, event and membership plans, filming gameplan, SHAI playbook, projections and the action plan.</p><span className="mt-6 text-base">site-sundae-campaign.vercel.app</span></div>
          </article>
          <article className="card hover-lift flex flex-col overflow-hidden">
            <div className="relative aspect-[16/10] border-b border-gray bg-mist"><Image src="/media/shots/event.jpg" alt="The event RSVP page" fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover object-top" /></div>
            <div className="flex flex-1 flex-col p-7"><p className="eyebrow">Link 2</p><h3 className="section-title mt-2.5 text-[1.375rem]">Event RSVP page</h3><p className="mt-3 flex-1 text-lg leading-relaxed">One-page funnel for the Oct. 8 dinner: the evening, Josh, the venue, why become a Sundae Member and a 60-second qualifying RSVP that routes to SHAI and GoHighLevel.</p><a href={LINKS.event} target="_blank" rel="noopener" className="btn btn-blue mt-6 self-start">Open event page <Icon name="external" /></a></div>
          </article>
          <article className="card hover-lift flex flex-col overflow-hidden">
            <div className="relative aspect-[16/10] border-b border-gray bg-mist"><Image src="/media/shots/rebuild.jpg" alt="The Sundae website rebuild" fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover object-top" /></div>
            <div className="flex flex-1 flex-col p-7"><p className="eyebrow">Link 3</p><h3 className="section-title mt-2.5 text-[1.375rem]">sundae.com rebuild</h3><p className="mt-3 flex-1 text-lg leading-relaxed">The full Sundae website rebuilt: 3D hero, scroll choreography, every page from today&apos;s site plus a Membership hub and an AI assistant trained on the site&apos;s own content.</p><a href={LINKS.rebuild} target="_blank" rel="noopener" className="btn btn-blue mt-6 self-start">Open website rebuild <Icon name="external" /></a></div>
          </article>
        </div>
      </section>

      {/* EXEC SUMMARY */}
      <section className="bg-mist py-24" aria-labelledby="summary">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow" data-reveal>Executive summary</p>
          <h2 id="summary" className="display h-bar mt-4 max-w-4xl text-[2.25rem] md:text-[2.875rem]" data-reveal>One dinner is an event. A dinner a month, plus a daily lead engine, is a franchise sales system.</h2>
          <div className="mt-14 grid gap-6 lg:grid-cols-3" data-stagger>
            <div className="rounded-[1.25rem] bg-white p-7"><p className="flex items-center gap-3.5"><span className="dot-num">01</span><span className="section-title">The situation</span></p><p className="mt-5 text-lg leading-relaxed">Sundae Membership pairs local operators with Sundae&apos;s marketing (more than $100 million invested since 2018), technology, automation, capital and 20,000+ marketplace investors. The Oct. 8 dinner is seven days out, and today&apos;s RSVP form requires a Google sign-in and asks no qualifying questions.</p></div>
            <div className="rounded-[1.25rem] bg-white p-7"><p className="flex items-center gap-3.5"><span className="dot-num">02</span><span className="section-title">The strategy</span></p><p className="mt-5 text-lg leading-relaxed">Fill the Courtyard with <strong className="font-bold">qualified</strong> operators: the marketplace list and Josh&apos;s personal invitations first, a $5,000 paid sprint for reach, a qualifying RSVP page and a show-rate system. Then make the dinner monthly and add an always-on funnel: founder-led content, paid ads and speed-to-lead.</p></div>
            <div className="rounded-[1.25rem] bg-white p-7"><p className="flex items-center gap-3.5"><span className="dot-num">03</span><span className="section-title">The system</span></p><p className="mt-5 text-lg leading-relaxed">SHAI runs the work: GoHighLevel pipelines and automations, AI chat and voice speed-to-lead, ads end to end, content and video editing, and daily reporting. Josh and Victoria approve by text. Base case: about 11 leads a day and about 29 members in 12 months at about $10,000 in ad spend per member.</p></div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8" aria-labelledby="plans">
        <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow" data-reveal>The plans</p><h2 id="plans" className="display h-bar mt-4 text-[2.25rem] md:text-[2.875rem]" data-reveal>Everything Sundae needs to execute</h2></div><Link href="/plans/event-organic" className="btn btn-outline">Read the plans <Icon name="arrow-right" /></Link></div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-stagger>
          {PLANS.map((p) => (
            <Link key={p.slug} href={`/plans/${p.slug}`} className="card hover-lift group flex flex-col p-7">
              <span className="tag self-start">{p.group}</span>
              <h3 className="section-title mt-5 text-[1.25rem]">{p.title}</h3>
              <p className="mt-2.5 flex-1 text-lg leading-relaxed">{p.blurb}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-lg font-bold text-blue"><span className="underline decoration-1 underline-offset-4 group-hover:decoration-2">Read</span><Icon name="arrow-right" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* CREATIVE PREVIEW: the one deliberate blue feature band */}
      <section className="relative overflow-hidden bg-blue py-24 text-white" aria-labelledby="creative">
        <div aria-hidden className="dots-white pointer-events-none absolute right-8 top-10 hidden h-16 w-16 opacity-60 md:block" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow !text-white">Creative library</p><h2 id="creative" className="display mt-4 max-w-4xl text-balance text-[2.25rem] !text-white md:text-[2.875rem]">{/* each count stays with its noun; lines break only after a separator */}{"10\u00a0images\u00a0· 8\u00a0flyers\u00a0· 8\u00a0videos\u00a0· 8\u00a0Reels\u00a0· 16\u00a0captions"}</h2></div><Link href="/creative" className="btn btn-white">Open the library <Icon name="arrow-right" /></Link></div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5 [&>*:nth-child(5)]:hidden md:[&>*:nth-child(5)]:block" data-stagger>
            {IMAGES.slice(0, 5).map((a) => (
              <Link key={a.file} href="/creative#images" className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white"><Image src={`/media/images/${a.file}`} alt={a.title} fill sizes="(max-width:768px) 50vw, 20vw" className="object-cover transition-transform duration-500 hover:scale-105" /></Link>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed">Built only from real assets: Sundae&apos;s brand and photography, the Sacramento dinner photo and Shade Hotel&apos;s own Courtyard photos. The motion <span className="nw">B-roll</span> is AI-animated directly from those real Courtyard photos — no invented venues, people or claims.</p>
        </div>
      </section>

      {/* PROJECTIONS PREVIEW */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8" aria-labelledby="proj">
        <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow" data-reveal>Lead flow and sales projections</p><h2 id="proj" className="display h-bar mt-4 text-[2.25rem] md:text-[2.875rem]" data-reveal>If Sundae executes the plan</h2></div><Link href="/projections" className="btn btn-outline">Full model and calculator <Icon name="arrow-right" /></Link></div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <LineChart title="Cumulative members signed" sub="Three scenarios, October 2026 to September 2027" labels={months} series={scen((m) => m.cumulative_members)} />
          <LineChart title="Qualified-lead flow per day" sub="Paid and organic leads ÷ 30.4" labels={months} series={scen((m) => m.leads_per_day)} />
        </div>
        <p className="mt-6 max-w-4xl text-base leading-relaxed">All inputs are labeled industry-benchmark assumptions, not Sundae data. Fees are placeholders ($50,000 initial, $3,000 a month) until Sundae confirms its FDD numbers.</p>
      </section>

      {/* THIS WEEK */}
      <section className="mx-auto max-w-7xl px-5 md:px-8" aria-labelledby="week">
        <div className="card-mist grid gap-10 p-8 md:grid-cols-[1fr_1.4fr] md:p-14">
          <div><p className="eyebrow">This week</p><h2 id="week" className="display h-bar mt-4 text-[2.25rem]">The five moves that fill the room</h2><Link href="/plans/action-plan" className="btn btn-blue mt-9">Full action plan <Icon name="arrow-right" /></Link></div>
          <ol className="grid gap-6" data-stagger>
            {[
              ["Point every invitation at the new RSVP page", "No sign-in wall, six qualifying questions, routed into GoHighLevel via SHAI."],
              ["Email and text the LA marketplace buyers (opted in)", "Sundae's built-in advantage: active operators who already bid on Sundae deals."],
              ["Josh personally invites the 50 most active LA buyers", "Founder-written DMs and texts turn into seats at a high rate."],
              ["Launch the $5,000 paid sprint Friday", "Meta and Google ads, plus LinkedIn Conversation Ads from Josh; stop prospecting Wednesday at noon."],
              ["Confirm every guest by phone Tuesday and Wednesday", "Free dinners lose 30% to 40% to no-shows; the SHAI voice agent and team close that gap."],
            ].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[2.75rem_1fr] gap-4"><span className="dot-num">{i + 1}</span><div><p className="text-lg font-bold leading-snug">{t}</p><p className="mt-1 text-lg leading-relaxed">{d}</p></div></li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
