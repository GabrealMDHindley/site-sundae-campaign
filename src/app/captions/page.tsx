import type { Metadata } from "next";
import CopyButton from "@/components/CopyButton";
import captions from "@/content/captions.json";

export const metadata: Metadata = { title: "Captions" };

export default function Captions() {
  const groups = [["event", "Event — Private Dinner & Dialogue, Oct 8"], ["membership", "Always-on — Sundae Membership"]] as const;
  return (
    <main className="mx-auto max-w-7xl px-5 md:px-8">
      <header className="py-14 md:py-20">
        <p className="eyebrow">Captions</p>
        <h1 className="h-serif mt-4 max-w-4xl text-[clamp(2.6rem,6vw,5rem)]">16 captions, written for each platform.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">Josh&apos;s founder voice on LinkedIn, tighter copy for Instagram and Facebook, one-liners for X. Replace <code className="rounded bg-paper-2 px-1.5">{"{RSVP link}"}</code> with the event page link and <code className="rounded bg-paper-2 px-1.5">{"{membership link}"}</code> with the membership page. No earnings claims anywhere.</p>
      </header>
      {groups.map(([g, title]) => (
        <section key={g} className="border-t border-rule py-14">
          <h2 className="h-serif text-3xl md:text-4xl">{title}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2" data-stagger>
            {captions.filter((c) => c.set === g).map((c) => {
              const full = c.text + (c.hashtags ? "\n\n" + c.hashtags : "");
              return (
                <article key={c.id} className="card flex flex-col p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2"><span className="font-mono text-xs text-red-deep">{c.id} · {c.title}</span><span className="tag">{c.platform}</span></div>
                  <p className="mt-4 flex-1 whitespace-pre-line leading-relaxed">{c.text}</p>
                  {c.hashtags && <p className="mt-3 text-sm text-gold">{c.hashtags}</p>}
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-rule pt-4"><span className="text-xs text-muted">Pair with: {c.pair}</span><CopyButton text={full} /></div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
