import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { PLANS } from "@/content/library";

export function generateStaticParams() { return PLANS.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = PLANS.find((x) => x.slug === slug); return { title: p?.title ?? "Plan" };
}

export default async function Plan({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plan = PLANS.find((p) => p.slug === slug);
  if (!plan) notFound();
  const md = fs.readFileSync(path.join(process.cwd(), "src/content/plans", plan.file), "utf8");
  const html = marked.parse(md.replace(/^# .*\n/, ""), { gfm: true }) as string;
  const idx = PLANS.findIndex((p) => p.slug === slug);
  const next = PLANS[(idx + 1) % PLANS.length];
  const groups = Array.from(new Set(PLANS.map((p) => p.group)));
  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[260px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-auto">
        <nav aria-label="Plans" className="grid gap-6">
          {groups.map((g) => (
            <div key={g}><p className="eyebrow">{g}</p><ul className="mt-2 grid gap-0.5">{PLANS.filter((p) => p.group === g).map((p) => (
              <li key={p.slug}><Link href={`/plans/${p.slug}`} className={`block rounded-lg px-3 py-2 text-sm ${p.slug === slug ? "bg-ink text-white" : "text-muted hover:bg-white hover:text-ink"}`}>{p.title}</Link></li>
            ))}</ul></div>
          ))}
        </nav>
      </aside>
      <article>
        <header className="border-b border-rule pb-8">
          <span className="tag">{plan.group}</span>
          <h1 className="h-serif mt-4 text-[clamp(2.4rem,5vw,4.2rem)]">{plan.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{plan.blurb}</p>
        </header>
        <div className="prose prose-plan prose-neutral mt-8 max-w-none prose-headings:font-serif prose-headings:font-normal prose-h2:text-3xl prose-h3:text-xl prose-a:text-red-deep prose-strong:text-ink prose-table:block prose-table:overflow-x-auto md:prose-table:table" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="mt-14 flex justify-end border-t border-rule pt-8"><Link href={`/plans/${next.slug}`} className="btn btn-ink">Next: {next.title} →</Link></div>
      </article>
    </main>
  );
}
