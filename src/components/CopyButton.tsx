"use client";
import { useState } from "react";
export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button className="btn btn-line !px-3 !py-1.5 text-xs" onClick={async () => { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1600); } catch {} }} aria-live="polite">
      {ok ? "Copied ✓" : label}
    </button>
  );
}
