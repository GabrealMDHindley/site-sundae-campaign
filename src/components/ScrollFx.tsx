"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function ScrollFx() {
  const path = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);
    let lenis: Lenis | null = null;
    const raf = (t: number) => lenis?.raf(t * 1000);
    if (!reduce) { lenis = new Lenis({ lerp: 0.1 }); lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add(raf); gsap.ticker.lagSmoothing(0); }
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((w) => {
        gsap.fromTo(w.children, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.07, scrollTrigger: { trigger: w, start: "top 86%" } });
      });
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const n = Number(el.dataset.count), pre = el.dataset.prefix || "", suf = el.dataset.suffix || "", dec = Number(el.dataset.dec || 0);
        const o = { v: 0 };
        gsap.to(o, { v: n, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%" }, onUpdate: () => { el.textContent = pre + o.v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf; } });
      });
    });
    return () => { ctx.revert(); lenis?.destroy(); gsap.ticker.remove(raf); };
  }, [path]);
  return null;
}
