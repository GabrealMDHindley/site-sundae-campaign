"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Asset } from "@/content/library";

export default function Gallery({ items, base, cols = "sm:grid-cols-2 lg:grid-cols-3", aspect = "aspect-[4/5]" }: { items: Asset[]; base: string; cols?: string; aspect?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (open === null) return; if (e.key === "Escape") setOpen(null); if (e.key === "ArrowRight") setOpen((open + 1) % items.length); if (e.key === "ArrowLeft") setOpen((open - 1 + items.length) % items.length); };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [open, items.length]);
  return (
    <>
      <div className={`grid gap-5 ${cols}`} data-stagger>
        {items.map((a, i) => (
          <article key={a.file} className="card group overflow-hidden">
            <button className={`relative block w-full overflow-hidden bg-paper-2 ${aspect}`} onClick={() => setOpen(i)} aria-label={`Open ${a.title}`}>
              <Image src={`${base}/${a.file}`} alt={a.title} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]" />
            </button>
            <div className="border-t border-rule p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold"><span className="mr-2 font-mono text-xs text-faint">{a.id}</span>{a.title}</h3>
                <span className="tag">{a.spec}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{a.use}</p>
              {a.pair && <p className="mt-1 font-mono text-[11px] text-faint">Caption: {a.pair}</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                <a className="btn btn-line !px-3 !py-1.5 text-xs" href={`${base}/${a.file}`} download>Download JPG</a>
                {a.pdf && <a className="btn btn-ink !px-3 !py-1.5 text-xs" href={`${base}/${a.pdf}`} download>Print PDF</a>}
              </div>
            </div>
          </article>
        ))}
      </div>
      {open !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-night/90 p-4 backdrop-blur" role="dialog" aria-modal aria-label={items[open].title} onClick={() => setOpen(null)}>
          <div className="relative h-[86vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={`${base}/${items[open].file}`} alt={items[open].title} fill sizes="100vw" className="object-contain" />
          </div>
          <button className="btn btn-line absolute right-5 top-5" onClick={() => setOpen(null)}>Close ✕</button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/80">{items[open].id} · {items[open].title} — ← → to browse</p>
        </div>
      )}
    </>
  );
}
