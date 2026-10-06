"use client";
import { useState } from "react";
import { Icon } from "./Icon";
export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button className={`btn btn-sm ${ok ? "btn-blue" : "btn-outline"}`} onClick={async () => { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1600); } catch {} }} aria-live="polite">
      {ok ? <>Copied <Icon name="check" /></> : label}
    </button>
  );
}
