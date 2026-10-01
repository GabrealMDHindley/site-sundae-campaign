"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const LeadFunnel = dynamic(() => import("./three/LeadFunnel"), { ssr: false });
export default function HeroFunnel() {
  const [ok, setOk] = useState(false);
  useEffect(() => { try { const c = document.createElement("canvas"); setOk(!!(c.getContext("webgl2") || c.getContext("webgl"))); } catch { setOk(false); } }, []);
  return <div className="pointer-events-none absolute inset-0" aria-hidden>{ok && <LeadFunnel />}</div>;
}
