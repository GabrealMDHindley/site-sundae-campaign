"use client";
import { useRef, useState } from "react";
import type { Asset } from "@/content/library";

export default function VideoCard({ a, base }: { a: Asset; base: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const ratio = a.aspect === "9:16" ? "aspect-[9/16]" : a.aspect === "1:1" ? "aspect-square" : "aspect-video";
  return (
    <article className="card overflow-hidden">
      <div className={`relative bg-night ${ratio}`}>
        <video ref={ref} className="absolute inset-0 h-full w-full object-cover" src={`${base}/${a.file}`} poster={`${base}/${a.poster}`} preload="none" playsInline controls={playing} onPlay={() => setPlaying(true)} />
        {!playing && (
          <button className="group absolute inset-0 grid place-items-center" onClick={() => { setPlaying(true); ref.current?.play(); }} aria-label={`Play ${a.title}`}>
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-ink shadow-xl transition-transform group-hover:scale-110"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><path d="M8 5v14l11-7z" fill="currentColor" /></svg></span>
            <span className="absolute bottom-3 right-3 rounded-full bg-night/70 px-2.5 py-1 font-mono text-[11px] text-white">{a.dur}</span>
          </button>
        )}
      </div>
      <div className="border-t border-rule p-4">
        <div className="flex items-start justify-between gap-3"><h3 className="font-semibold"><span className="mr-2 font-mono text-xs text-faint">{a.id}</span>{a.title}</h3><span className="tag">{a.aspect} · {a.spec}</span></div>
        <p className="mt-2 text-sm text-muted">{a.use}</p>
        {a.pair && <p className="mt-1 font-mono text-[11px] text-faint">Caption: {a.pair}</p>}
        <a className="btn btn-line mt-3 !px-3 !py-1.5 text-xs" href={`${base}/${a.file}`} download>Download MP4</a>
      </div>
    </article>
  );
}
