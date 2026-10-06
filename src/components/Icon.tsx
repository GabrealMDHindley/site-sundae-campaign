import { Fragment } from "react";

// Simple line icons (BRAND-SPEC 5: ink or blue line icons are allowed). They replace arrow, check and close
// glyphs, which are not in the Lato or Merriweather web subsets and would otherwise render in a system face.
const PATHS = {
  "arrow-right": "M4.5 12h14.5M13.5 6.5 19 12l-5.5 5.5",
  "arrow-left": "M19.5 12H5M10.5 6.5 5 12l5.5 5.5",
  "arrow-left-right": "M3.5 12h17M8 7.5 3.5 12 8 16.5M16 7.5l4.5 4.5-4.5 4.5",
  external: "M7 17 17 7M9.5 7H17v7.5",
  check: "M5 12.5l4.5 4.5L19 7.5",
  close: "M6.5 6.5l11 11M17.5 6.5l-11 11",
} as const;
export type IconName = keyof typeof PATHS;

export function Icon({ name, label, className = "" }: { name: IconName; label?: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round"
      className={`inline-block shrink-0 align-[-0.125em] ${className}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
      <path d={PATHS[name]} />
    </svg>
  );
}

// Renders a string with each "→" drawn as the arrow icon (read as "to"). The source string itself is unchanged.
export function Arrowed({ text }: { text: string }) {
  const parts = text.split("→");
  return <>{parts.map((p, i) => <Fragment key={i}>{i > 0 && <Icon name="arrow-right" label="to" />}{p}</Fragment>)}</>;
}
