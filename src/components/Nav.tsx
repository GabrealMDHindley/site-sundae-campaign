"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LINKS, PLANS } from "@/content/library";

const items = [["/", "Overview"], ["/creative", "Creative"], ["/captions", "Captions"], ["/plans/event-organic", "Plans"], ["/projections", "Projections"]];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5 md:px-8" aria-label="Main">
        <Link href="/" className="flex items-center gap-3" aria-label="Overview">
          <Image src="/brand/sundae-wordmark-red.svg" alt="Sundae" width={92} height={26} priority />
          <span className="font-mono text-xs text-faint">×</span>
          <span className="font-mono text-sm font-medium tracking-[.2em] text-ink">SHAI</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {items.map(([href, label]) => {
            const on = href === "/" ? path === "/" : path.startsWith(href.split("/").slice(0, 2).join("/"));
            return <Link key={href} href={href} className={`rounded-full px-4 py-2 text-sm transition-colors ${on ? "bg-ink text-white" : "text-muted hover:text-ink"}`}>{label}</Link>;
          })}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <a href={LINKS.event} target="_blank" rel="noopener" className="btn btn-line !py-2 text-xs">Event page ↗</a>
          <a href={LINKS.rebuild} target="_blank" rel="noopener" className="btn btn-ink !py-2 text-xs">Website rebuild ↗</a>
        </div>
        <button className="btn btn-line !px-3 !py-2 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mnav">Menu</button>
      </nav>
      {open && (
        <div id="mnav" className="border-t border-rule bg-paper px-5 py-4 lg:hidden">
          <div className="grid gap-1">
            {items.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-ink">{label}</Link>)}
            <div className="mt-2 grid gap-1 border-t border-rule pt-2">
              {PLANS.map((p) => <Link key={p.slug} href={`/plans/${p.slug}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-1.5 text-sm text-muted">{p.title}</Link>)}
            </div>
            <div className="mt-3 flex flex-wrap gap-2"><a href={LINKS.event} className="btn btn-line text-xs">Event page ↗</a><a href={LINKS.rebuild} className="btn btn-ink text-xs">Website rebuild ↗</a></div>
          </div>
        </div>
      )}
    </header>
  );
}
