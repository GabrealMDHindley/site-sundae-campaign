import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ScrollFx from "@/components/ScrollFx";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], weight: ["300", "400", "500", "600"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex" });

export const metadata: Metadata = {
  metadataBase: new URL("https://site-sundae-campaign.vercel.app"),
  title: { default: "Sundae × SHAI — Dinner & Membership Growth Plan", template: "%s · Sundae × SHAI" },
  description: "The complete campaign for Sundae's Oct 8 Manhattan Beach dinner and an always-on membership (franchise) growth engine: creative, plans, SHAI playbook and projections.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plex.variable}`}>
      <body className="min-h-screen">
        <ScrollFx />
        <Nav />
        {children}
        <footer className="mt-24 border-t border-rule">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-10 text-sm text-muted md:px-8">
            <p>Prepared for <strong className="text-ink">Sundae</strong> by <strong className="text-ink">SHAI</strong> · October 1, 2026 · Confidential working draft</p>
            <p className="font-mono text-xs">Facts sourced from sundae.com, Sundae&apos;s dinner flyer &amp; RSVP form, mb.shadehotel.com and meetshai.com. Projections are labelled assumptions.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
