import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import VideoCard from "@/components/VideoCard";
import { FLYERS, IMAGES, REELS, VIDEOS } from "@/content/library";

export const metadata: Metadata = { title: "Creative library" };

const Section = ({ id, eyebrow, title, sub, children }: { id: string; eyebrow: string; title: string; sub: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 border-t border-rule py-16 first:border-t-0">
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div><p className="eyebrow">{eyebrow}</p><h2 className="h-serif mt-3 text-4xl md:text-5xl">{title}</h2></div>
      <p className="max-w-md text-sm text-muted">{sub}</p>
    </div>
    {children}
  </section>
);

export default function Creative() {
  return (
    <main className="mx-auto max-w-7xl px-5 md:px-8">
      <header className="py-14 md:py-20">
        <p className="eyebrow">Creative library</p>
        <h1 className="h-serif mt-4 max-w-4xl text-[clamp(2.6rem,6vw,5rem)]">Every asset, ready to post, print and run.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">Designed in Sundae&apos;s brand from real assets only — Sundae&apos;s photography and logo, the Sacramento dinner photo, and Shade Hotel&apos;s own Courtyard photos. Motion B-roll is AI-animated from those Courtyard photos (Kling 3.0 via Higgsfield). Videos and Reels are silent by design — add trending audio in-app for organic posts and a licensed track for ads.</p>
        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Library sections">
          {[["#images", `Images · ${IMAGES.filter((a) => !a.variantOf).length}`], ["#flyers", `Flyers · ${FLYERS.length}`], ["#videos", `Videos · ${VIDEOS.length}`], ["#reels", `Reels · ${REELS.length}`], ["/captions", "Captions · 16"]].map(([h, l]) => <a key={h} href={h} className="btn btn-line !py-2 text-sm">{l}</a>)}
        </nav>
      </header>
      <Section id="images" eyebrow="Social images" title="10 images" sub="Feed (4:5), square, LinkedIn (1.91:1) and Stories (9:16). Each lists where it runs and which caption it pairs with.">
        <Gallery items={IMAGES} base="/media/images" />
      </Section>
      <Section id="flyers" eyebrow="Flyers" title="8 flyers" sub="Print-ready PDFs (letter, 5×7 invitation, 4×6 table tent) plus digital. QR codes go to the RSVP page or the membership intro call.">
        <Gallery items={FLYERS} base="/media/flyers" aspect="aspect-[4/5]" />
      </Section>
      <Section id="videos" eyebrow="Videos" title="8 feed videos" sub="1920×1080 and 1080×1080 for LinkedIn, Facebook, YouTube and email. H.264 MP4.">
        <div className="grid gap-5 md:grid-cols-2" data-stagger>{VIDEOS.map((a) => <VideoCard key={a.file} a={a} base="/media/videos" />)}</div>
      </Section>
      <Section id="reels" eyebrow="Instagram Reels" title="8 Reels" sub="1080×1920 with captions kept inside the Reels safe zone (clear of the top bar, the right-side buttons and the bottom caption area).">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4" data-stagger>{REELS.map((a) => <VideoCard key={a.file} a={a} base="/media/reels" />)}</div>
      </Section>
    </main>
  );
}
