"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const LeadFunnel = dynamic(() => import("./three/LeadFunnel"), { ssr: false });
// The funnel only shows at xl and up (it sits to the right of the copy column), so it only mounts there.
export default function HeroFunnel() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    let gl = false;
    try { const c = document.createElement("canvas"); gl = !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { gl = false; }
    const mq = window.matchMedia("(min-width: 1280px)");
    const sync = () => setOk(gl && mq.matches);
    sync(); mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return <div className="pointer-events-none absolute inset-0" aria-hidden>{ok && <LeadFunnel />}</div>;
}
