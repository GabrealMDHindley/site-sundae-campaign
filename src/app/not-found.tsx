import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PLANS } from "@/content/library";

// House-style 404 for unknown URLs and unknown /plans/<slug> links (shared plan links can go stale).
// Renders inside the root layout, so the nav (red wordmark) and footer stay in place.
export default function NotFound() {
  return (
    <main className="mx-auto max-w-7xl px-5 md:px-8">
      <section className="grid gap-14 py-16 md:py-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20" aria-labelledby="nf">
        <div>
          <p className="eyebrow">404 · Page not found</p>
          <h1 id="nf" className="display h-bar h-bar-lg mt-5 max-w-3xl text-balance text-[clamp(2.375rem,4.6vw,4rem)]">This page isn&apos;t here.</h1>
          <p className="lede mt-7 max-w-2xl text-pretty">The link may be mistyped or out of date. The overview, the creative library, the projections and every plan are still one click away.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-blue">Back to the overview <Icon name="arrow-right" /></Link>
            <Link href="/plans/event-organic" className="btn btn-outline">Read the plans</Link>
          </div>
        </div>
        <nav aria-label="Plans" className="card-mist self-start p-5 md:p-6">
          <p className="eyebrow px-3">The plans</p>
          <ul className="mt-3 grid gap-1">
            {PLANS.map((p) => (
              <li key={p.slug}><Link href={`/plans/${p.slug}`} className="block rounded-xl px-3 py-2.5 text-lg leading-snug transition-colors hover:bg-white">{p.title}</Link></li>
            ))}
          </ul>
        </nav>
      </section>
    </main>
  );
}
