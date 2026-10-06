import type { Metadata, Viewport } from "next";
import { Lato, Merriweather } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ScrollFx from "@/components/ScrollFx";

// Sundae brand fonts (Creative Guidelines p.7): Merriweather for headlines and callouts, Lato for everything else.
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-merriweather", display: "swap" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-lato", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://site-sundae-campaign.vercel.app"),
  title: { default: "Sundae × SHAI — Dinner and Membership Growth Plan", template: "%s · Sundae × SHAI" },
  description: "The complete campaign for Sundae's Oct. 8 Manhattan Beach dinner and an always-on membership (franchise) growth engine: creative, plans, SHAI playbook and projections.",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${merriweather.variable} ${lato.variable}`}>
      <body className="min-h-screen">
        <ScrollFx />
        <Nav />
        {children}
        <footer className="mt-28 border-t border-gray bg-mist">
          <div className="mx-auto flex max-w-7xl flex-wrap items-start justify-between gap-x-10 gap-y-3 px-5 py-12 text-base leading-relaxed md:px-8">
            <p>Prepared for <strong className="font-bold">Sundae</strong> by <strong className="font-bold">SHAI</strong> · Oct.&nbsp;1, 2026 · Confidential working draft</p>
            <p className="max-w-2xl">Facts sourced from sundae.com, Sundae&apos;s dinner flyer and RSVP form, mb.shadehotel.com and meetshai.com. Projections are labeled assumptions.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
