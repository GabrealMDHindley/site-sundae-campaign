"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LINKS, PLANS } from "@/content/library";
import { Icon } from "./Icon";

const items = [["/", "Overview"], ["/creative", "Creative"], ["/captions", "Captions"], ["/plans/event-organic", "Plans"], ["/projections", "Projections"]];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const isOn = (href: string) => (href === "/" ? path === "/" : path.startsWith(href.split("/").slice(0, 2).join("/")));
  return (
    <header className="sticky top-0 z-50 border-b border-gray bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8" aria-label="Main">
        {/* wordmark at a modest 28px with clear space of at least the height of the "u" on every side */}
        <Link href="/" className="flex items-center gap-6 py-1" aria-label="Sundae × SHAI campaign overview">
          <Image src="/brand/sundae-wordmark-red.svg" alt="Sundae" width={99} height={28} priority className="h-7 w-auto" />
          <span className="text-base font-bold tracking-[.1em] text-ink" aria-hidden>× SHAI</span>
        </Link>
        <div className="hidden items-center gap-1 xl:flex">
          {items.map(([href, label]) => (
            <Link key={href} href={href} aria-current={isOn(href) ? "page" : undefined} className={`rounded-full px-4 py-2 text-base font-bold transition-colors ${isOn(href) ? "bg-blue text-white" : "text-ink hover:bg-mist"}`}>{label}</Link>
          ))}
        </div>
        <div className="hidden items-center gap-2.5 md:flex">
          <a href={LINKS.event} target="_blank" rel="noopener" className="btn btn-outline btn-sm">Event page <Icon name="external" /></a>
          <a href={LINKS.rebuild} target="_blank" rel="noopener" className="btn btn-blue btn-sm">Website rebuild <Icon name="external" /></a>
          <button className="btn btn-outline btn-sm xl:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mnav">{open ? "Close" : "Menu"}</button>
        </div>
        <button className="btn btn-outline btn-sm md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mnav">{open ? "Close" : "Menu"}</button>
      </nav>
      {open && (
        <div id="mnav" className="border-t border-gray bg-white px-5 py-5 xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {items.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={`rounded-xl px-3 py-2.5 text-lg font-bold ${isOn(href) ? "bg-mist" : ""}`}>{label}</Link>)}
            <div className="mt-2 grid gap-0.5 border-t border-gray pt-3">
              <span className="eyebrow px-3 pb-1">Plans</span>
              {PLANS.map((p) => <Link key={p.slug} href={`/plans/${p.slug}`} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-base hover:bg-mist">{p.title}</Link>)}
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5 md:hidden"><a href={LINKS.event} className="btn btn-outline btn-sm">Event page <Icon name="external" /></a><a href={LINKS.rebuild} className="btn btn-blue btn-sm">Website rebuild <Icon name="external" /></a></div>
          </div>
        </div>
      )}
    </header>
  );
}
