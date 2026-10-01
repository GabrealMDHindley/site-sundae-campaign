export type Asset = { id: string; title: string; file: string; spec: string; use: string; pair?: string; pdf?: string; poster?: string; dur?: string; aspect?: string; variantOf?: string };

export const IMAGES: Asset[] = [
  { id: "01", title: "Save your seat", file: "01-save-your-seat.jpg", spec: "1080×1350 · 4:5", use: "IG/FB feed, Meta ads, pinned post", pair: "C02 · C03" },
  { id: "02", title: "Meet your host", file: "02-meet-your-host.jpg", spec: "1080×1350 · 4:5", use: "IG/FB/LinkedIn feed, Meta ads", pair: "C05" },
  { id: "03", title: "Seats are limited", file: "03-seats-limited.jpg", spec: "1080×1080 · 1:1", use: "Countdown / retargeting / X", pair: "C08 · C10" },
  { id: "04", title: "The market has changed", file: "04-the-market-has-changed.jpg", spec: "1080×1350 · 4:5", use: "LinkedIn (Josh), Meta ads", pair: "C03 · M04" },
  { id: "05", title: "What we'll cover", file: "05-what-well-cover.jpg", spec: "1080×1350 · 4:5", use: "LinkedIn + IG carousel", pair: "Plan 01 · Sat 10/3" },
  { id: "05B", title: "What we'll cover — Josh, your host", file: "05b-what-well-cover-josh-host.jpg", spec: "1080×1350 · 4:5", use: "Variation of 05 · LinkedIn + IG carousel", pair: "Plan 01 · Sat 10/3", variantOf: "05" },
  { id: "05C", title: "What we'll cover — Josh speaking", file: "05c-what-well-cover-josh-speaking.jpg", spec: "1080×1350 · 4:5", use: "Variation of 05 · LinkedIn + IG carousel", pair: "Plan 01 · Sat 10/3", variantOf: "05" },
  { id: "06", title: "Sacramento → Manhattan Beach", file: "06-sacramento-to-manhattan-beach.jpg", spec: "1080×1350 · 4:5", use: "LinkedIn recap (Josh)", pair: "C01 · C06" },
  { id: "07", title: "LinkedIn event banner", file: "07-linkedin-event-banner.jpg", spec: "1200×627 · 1.91:1", use: "LinkedIn Event cover, LinkedIn ads, email header", pair: "C04" },
  { id: "08", title: "Who it's for", file: "08-who-its-for.jpg", spec: "1080×1350 · 4:5", use: "IG/FB/LinkedIn feed", pair: "C07" },
  { id: "09", title: "Story — You're invited", file: "09-story-you-are-invited.jpg", spec: "1080×1920 · 9:16", use: "IG/FB Stories with link sticker", pair: "C02" },
  { id: "10", title: "The Sundae Engine", file: "10-the-sundae-engine.jpg", spec: "1080×1350 · 4:5", use: "Always-on membership ads + organic", pair: "M01 · M02" },
];

export const FLYERS: Asset[] = [
  { id: "01", title: "Classic invitation", file: "01-classic-invite.jpg", pdf: "01-classic-invite.pdf", spec: "8.5×11 in · print + PDF", use: "Hand-outs, email attachment, partner groups (QR → RSVP)" },
  { id: "02", title: "Black-tie invitation card", file: "02-black-tie-card.jpg", pdf: "02-black-tie-card.pdf", spec: "5×7 in · print", use: "Personal invites to the top 50 LA buyers" },
  { id: "03", title: "Speaker feature", file: "03-speaker-flyer.jpg", pdf: "03-speaker-flyer.pdf", spec: "8.5×11 in", use: "LinkedIn document post, REIA partners (QR → RSVP)" },
  { id: "04", title: "Why attend", file: "04-why-attend.jpg", pdf: "04-why-attend.pdf", spec: "8.5×11 in · light", use: "Email follow-up, partner newsletters" },
  { id: "05", title: "Membership one-pager", file: "05-membership-one-pager.jpg", pdf: "05-membership-one-pager.pdf", spec: "8.5×11 in · light", use: "On every table + post-dinner email (QR → intro call)" },
  { id: "06", title: "Table QR card", file: "06-table-qr-card.jpg", pdf: "06-table-qr-card.pdf", spec: "4×6 in · table tent", use: "Night-of: book your territory conversation" },
  { id: "07", title: "Square digital flyer", file: "07-square-digital.jpg", pdf: "07-square-digital.pdf", spec: "1080×1080", use: "SMS/MMS, WhatsApp, partner group posts" },
  { id: "08", title: "Know before you go", file: "08-know-before-you-go.jpg", pdf: "08-know-before-you-go.pdf", spec: "8.5×11 in · light", use: "Confirmed guests (Wed 10/7)" },
];

export const VIDEOS: Asset[] = [
  { id: "V1", title: "Event trailer", file: "video-01-event-trailer.mp4", poster: "video-01-event-trailer-poster.jpg", dur: "31s", aspect: "16:9", spec: "1920×1080", use: "LinkedIn, YouTube, Facebook feed, email" },
  { id: "V2", title: "Sacramento → Manhattan Beach", file: "video-02-sacramento-to-manhattan-beach.mp4", poster: "video-02-sacramento-to-manhattan-beach-poster.jpg", dur: "17s", aspect: "16:9", spec: "1920×1080", use: "Josh's LinkedIn, retargeting" },
  { id: "V3", title: "The market has changed", file: "video-03-the-market-has-changed.mp4", poster: "video-03-the-market-has-changed-poster.jpg", dur: "25s", aspect: "16:9", spec: "1920×1080", use: "LinkedIn + Meta prospecting" },
  { id: "V4", title: "Meet your host", file: "video-04-meet-your-host.mp4", poster: "video-04-meet-your-host-poster.jpg", dur: "24s", aspect: "16:9", spec: "1920×1080", use: "LinkedIn, Facebook, YouTube" },
  { id: "V5", title: "The Sundae Engine (membership)", file: "video-05-the-sundae-engine.mp4", poster: "video-05-the-sundae-engine-poster.jpg", dur: "34s", aspect: "16:9", spec: "1920×1080", use: "Always-on membership ads, landing page" },
  { id: "V8", title: "Sundae by the numbers", file: "video-08-membership-by-the-numbers.mp4", poster: "video-08-membership-by-the-numbers-poster.jpg", dur: "25s", aspect: "16:9", spec: "1920×1080", use: "Always-on membership ads, YouTube" },
  { id: "V6", title: "Venue reveal", file: "video-06-venue-reveal-square.mp4", poster: "video-06-venue-reveal-square-poster.jpg", dur: "17s", aspect: "1:1", spec: "1080×1080", use: "Feed (IG/FB/LinkedIn), Meta ads" },
  { id: "V7", title: "Date reveal", file: "video-07-date-reveal-square.mp4", poster: "video-07-date-reveal-square-poster.jpg", dur: "14s", aspect: "1:1", spec: "1080×1080", use: "Countdown / retargeting" },
];

export const REELS: Asset[] = [
  { id: "R1", title: "POV: you're invited", file: "reel-01-pov-invite.mp4", poster: "reel-01-pov-invite-poster.jpg", dur: "17s", aspect: "9:16", spec: "1080×1920", use: "IG/FB Reels, Shorts, TikTok, Meta ads", pair: "C02" },
  { id: "R2", title: "3 reasons to be there", file: "reel-02-three-reasons.mp4", poster: "reel-02-three-reasons-poster.jpg", dur: "18s", aspect: "9:16", spec: "1080×1920", use: "Reels, Stories", pair: "C07" },
  { id: "R3", title: "Sacramento talk", file: "reel-03-sacramento-talk.mp4", poster: "reel-03-sacramento-talk-poster.jpg", dur: "15s", aspect: "9:16", spec: "1080×1920", use: "Reels, LinkedIn vertical", pair: "C06" },
  { id: "R4", title: "Harder market?", file: "reel-04-harder-market.mp4", poster: "reel-04-harder-market-poster.jpg", dur: "20s", aspect: "9:16", spec: "1080×1920", use: "Meta prospecting ad", pair: "C03" },
  { id: "R5", title: "Venue tour", file: "reel-05-venue-tour.mp4", poster: "reel-05-venue-tour-poster.jpg", dur: "16s", aspect: "9:16", spec: "1080×1920", use: "Reels, Stories", pair: "C09" },
  { id: "R6", title: "Who it's for", file: "reel-06-who-its-for.mp4", poster: "reel-06-who-its-for-poster.jpg", dur: "13s", aspect: "9:16", spec: "1080×1920", use: "Reels, Stories", pair: "C07" },
  { id: "R7", title: "A few seats left", file: "reel-07-seats-limited.mp4", poster: "reel-07-seats-limited-poster.jpg", dur: "12s", aspect: "9:16", spec: "1080×1920", use: "Last-call Reels + retargeting", pair: "C10" },
  { id: "R8", title: "Stop building. Start scaling.", file: "reel-08-stop-building-start-scaling.mp4", poster: "reel-08-stop-building-start-scaling-poster.jpg", dur: "20s", aspect: "9:16", spec: "1080×1920", use: "Always-on membership Reels/ads", pair: "M04" },
];

export const PLANS = [
  { slug: "event-organic", file: "01-event-organic-plan.md", group: "Event", title: "Organic plan — fill the Courtyard", blurb: "Seat qualification bar, the six organic channels, the 7-day calendar, confirmations, run of show, follow-up." },
  { slug: "event-paid", file: "02-event-paid-plan.md", group: "Event", title: "Paid plan — 6-day ad sprint", blurb: "$5k split across Meta, LinkedIn, Google and retargeting; audiences, creative rotation, pacing, cut rules." },
  { slug: "filming", file: "06-filming-gameplan.md", group: "Event", title: "Filming gameplan", blurb: "Crew, dual-lav audio, camera settings, positions, minute-by-minute capture, interviews, photos, releases, edit turnaround." },
  { slug: "membership-organic", file: "03-franchise-organic-plan.md", group: "Membership engine", title: "Organic engine — always on", blurb: "Marketplace advantage, founder-led LinkedIn, video, the monthly city-dinner roadshow, search + AI answers." },
  { slug: "membership-paid", file: "04-franchise-paid-plan.md", group: "Membership engine", title: "Paid engine — daily lead flow", blurb: "Funnel, $25k/mo channel plan, speed-to-lead, 90-day testing roadmap, guardrails, reporting." },
  { slug: "shai", file: "05-shai-playbook.md", group: "Run it on SHAI", title: "SHAI playbook", blurb: "Which of SHAI's 97 agents runs each job, day-0 setup, approvals, and the time Sundae spends each week." },
  { slug: "action-plan", file: "07-action-plan.md", group: "Run it on SHAI", title: "What needs to be done", blurb: "Owners and deadlines from tonight through month 2 — and what Sundae must supply." },
  { slug: "compliance", file: "08-compliance.md", group: "Run it on SHAI", title: "Compliance guardrails", blurb: "FTC Franchise Rule, California registration, earnings claims, TCPA/CAN-SPAM, ad-platform rules, media rights." },
];

export const LINKS = {
  event: "https://site-sundae-event.vercel.app",
  rebuild: "https://site-sundae-xi.vercel.app",
};
