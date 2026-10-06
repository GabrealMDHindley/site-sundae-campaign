import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { PLANS } from "@/content/library";
import { Icon } from "@/components/Icon";

export function generateStaticParams() { return PLANS.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = PLANS.find((x) => x.slug === slug); return { title: p?.title ?? "Page not found" };
}

// Typographic polish on the rendered plan HTML (the markdown itself is unchanged):
// - arrow glyphs are not in the Lato/Merriweather web subsets, so they render as a line icon that reads as "to";
// - AP times ("7:30-7:35 p.m.", "10:30 p.m. +") and short dates ("Oct. 8") never split across lines;
// - short code chips (SHAI agent names such as /ghl-voice-agent-builder) stay on one line;
// - tables scroll inside their own box (with an edge shadow cue) instead of widening the page.
const GLYPHS: Record<string, [string, string]> = { "→": ["arrow", "to"], "←": ["arrow-left", "from"], "↔": ["arrow-lr", "back and forth"] };
// The text rules run only on the text between tags, never inside a tag or an attribute (a title or alt stays untouched).
const polishText = (t: string) => t
  .replace(/[→←↔]/g, (g) => `<span class="ico ico-${GLYPHS[g][0]}" role="img" aria-label="${GLYPHS[g][1]}"></span>`)
  .replace(/\b\d{1,2}(?::\d{2})?(?:-\d{1,2}(?::\d{2})?)? [ap]\.m\.(?: \+)?/g, (m) => `<span class="nw">${m}</span>`)
  .replace(/\b(Jan|Feb|Aug|Sept|Oct|Nov|Dec)\. (\d{1,2})\b/g, "$1.&nbsp;$2");
function polish(html: string) {
  return html
    .split(/(<[^>]*>)/)
    .map((part, i) => (i % 2 ? part : polishText(part)))
    .join("")
    .replace(/(?<!<pre>)<code>([^<\s]{1,32})<\/code>/g, '<code class="nw">$1</code>')
    .replace(/<table>/g, '<div class="scroll-x table-scroll"><table>')
    .replace(/<\/table>/g, "</table></div>");
}

export default async function Plan({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plan = PLANS.find((p) => p.slug === slug);
  if (!plan) notFound();
  const md = fs.readFileSync(path.join(process.cwd(), "src/content/plans", plan.file), "utf8");
  // A line that opens with a bold label ("**When:** …") starts on its own line instead of running on from the previous one
  // (lines that already end in a backslash hard break are left alone).
  // A wrapped continuation line that opens with "+ " joins the line above instead of rendering as a stray nested bullet.
  const body = md.replace(/^# .*\n/, "").replace(/([^\n\\])\n(\*\*[^*\n]+:\*\*)/g, "$1  \n$2").replace(/\n[ \t]+\+ /g, " + ");
  const html = polish(marked.parse(body, { gfm: true }) as string);
  const idx = PLANS.findIndex((p) => p.slug === slug);
  const next = PLANS[(idx + 1) % PLANS.length];
  const groups = Array.from(new Set(PLANS.map((p) => p.group)));
  return (
    <main className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
      <aside className="lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] lg:overflow-auto">
        <nav aria-label="Plans" className="grid gap-7 rounded-[1.25rem] bg-mist p-5">
          {groups.map((g) => (
            <div key={g}><p className="eyebrow px-3">{g}</p><ul className="mt-2 grid gap-1">{PLANS.filter((p) => p.group === g).map((p) => (
              <li key={p.slug}><Link href={`/plans/${p.slug}`} aria-current={p.slug === slug ? "page" : undefined} className={`block rounded-xl px-3 py-2.5 text-base leading-snug transition-colors ${p.slug === slug ? "bg-blue font-bold text-white" : "hover:bg-white"}`}>{p.title}</Link></li>
            ))}</ul></div>
          ))}
        </nav>
      </aside>
      <article className="min-w-0">
        <header className="border-b border-gray pb-10">
          <span className="tag">{plan.group}</span>
          <h1 className="display h-bar h-bar-lg mt-5 text-[clamp(2.25rem,4.2vw,3.5rem)]">{plan.title}</h1>
          <p className="lede mt-5 max-w-3xl">{plan.blurb}</p>
        </header>
        <div className="prose prose-lg prose-plan mt-10 max-w-none prose-h2:mt-14 prose-h2:text-[2rem] prose-h3:text-[1.3125rem]" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="mt-16 flex justify-end border-t border-gray pt-10"><Link href={`/plans/${next.slug}`} className="btn btn-blue whitespace-normal text-left">Next: {next.title} <Icon name="arrow-right" /></Link></div>
      </article>
    </main>
  );
}
