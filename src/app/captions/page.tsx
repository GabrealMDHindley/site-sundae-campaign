import type { Metadata } from "next";
import CopyButton from "@/components/CopyButton";
import { Arrowed } from "@/components/Icon";
import captions from "@/content/captions.json";

export const metadata: Metadata = { title: "Captions" };

export default function Captions() {
  const groups = [["event", "Event — Private Dinner & Dialogue, Oct. 8"], ["membership", "Always-on — Sundae Membership"]] as const;
  return (
    <main className="mx-auto max-w-7xl px-5 md:px-8">
      <header className="py-16 md:py-24">
        <p className="eyebrow">Captions</p>
        <h1 className="display h-bar h-bar-lg mt-5 max-w-4xl text-[clamp(2.375rem,4.6vw,4rem)]">16 captions, written for each platform.</h1>
        <p className="lede mt-7 max-w-3xl">Josh&apos;s founder voice on LinkedIn, tighter copy for Instagram and Facebook, one-liners for X. Replace <code className="rounded-md border border-gray bg-mist px-1.5 font-bold">{"{RSVP link}"}</code> with the event page link and <code className="rounded-md border border-gray bg-mist px-1.5 font-bold">{"{membership link}"}</code> with the membership page. No earnings claims anywhere.</p>
      </header>
      {groups.map(([g, title]) => (
        <section key={g} className="border-t border-gray py-16">
          <h2 className="display h-bar text-[2rem] md:text-[2.5rem]">{title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2" data-stagger>
            {captions.filter((c) => c.set === g).map((c) => {
              const full = c.text + (c.hashtags ? "\n\n" + c.hashtags : "");
              return (
                <article key={c.id} className="card flex flex-col p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-base font-bold"><span className="mr-2 inline-flex rounded-md bg-ink px-2 py-0.5 text-white">{c.id}</span><Arrowed text={c.title} /></span><span className="tag">{c.platform}</span></div>
                  <p className="mt-5 flex-1 whitespace-pre-line text-lg leading-relaxed"><Arrowed text={c.text} /></p>
                  {c.hashtags && <p className="mt-4 text-base font-bold leading-relaxed">{c.hashtags}</p>}
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-gray pt-5"><span className="text-base">Pair with: {c.pair}</span><CopyButton text={full} /></div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
