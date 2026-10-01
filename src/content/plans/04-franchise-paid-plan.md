# Always-On Membership (Franchise) Engine — Paid

**Goal:** predictable daily lead flow of qualified operators into Victoria White's team's
calendar. **Base:** $25,000/month ads → ~227 paid leads/month at a $110 blended CPL, plus
organic → **~11 leads/day** on average over 12 months → ~29 members in 12 months (≈$10k
ad spend per member). Conservative ($15k/mo) and aggressive ($40k/mo) scenarios are on the
projections tab.

---

## 1. The funnel the ads drive into

```
Ad  →  Membership landing page / VSL  →  60-second application (6 questions)
    →  SHAI scores it instantly  →  qualified? book intro call (calendar) : nurture
    →  AI speed-to-lead (text in under 60 s, AI-disclosed) confirms + reminds
    →  Intro call (Victoria's team)  →  FDD delivered (14-day clock)  →  discovery/territory review
    →  Signed member
```

**Application questions** (same scoring as the dinner): role · markets · deals closed in
12 months · primary model · monthly acquisition marketing spend · timeline to scale.
**Disqualify kindly:** new or aspiring investors go to the Sundae Marketplace and the
newsletter, not the sales calendar.

**Landing page essentials:** Josh's 2–3 minute VSL ("Stop building. Start scaling."), the
Sundae Engine (leads · conversion · profit), you bring / Sundae brings, proof points
($100M+ marketing investment, 20,000+ investors, national brand), territory map ("check your
market"), FAQ, application. SHAI `/vsl-script` writes the VSL and `/ghl-funnel` builds the
page in GoHighLevel. Or reuse the rebuilt site's /membership page (link 2).

---

## 2. Channel plan (base $25,000/month)

| Channel | Share | Monthly | Role | Expected CPL | Leads/mo |
|---|---:|---:|---|---:|---:|
| Meta (Facebook + Instagram) | 45% | $11,250 | Volume + retargeting; VSL and Reels | $70–110 | 100–160 |
| Google Search | 20% | $5,000 | High intent: people searching for a franchise | $120–220 | 23–42 |
| LinkedIn | 15% | $3,750 | Owners/acquisitions leaders; Conversation Ads from Josh | $120–200 | 19–31 |
| YouTube | 10% | $2,500 | Founder videos to warm audiences + custom-intent | $90–160 | 16–28 |
| Franchise portals / brokers | 10% | $2,500 | Candidates already shopping franchises | $40–90 (portal) | 28–60 |
| **Blended** | | **$25,000** | | **~$110** | **~227** |

### Meta
- **Campaign 1 — Prospecting (60%)**: conversions on `QualifiedApplication`. Audiences:
  marketplace lookalikes (buyers who closed), Advantage+ with suggestions (real estate
  investing, wholesaling, house flipping, BiggerPockets), geo = markets with open
  territories.
- **Campaign 2 — Retargeting (25%)**: VSL viewers 25%+, landing visitors, IG/FB engagers →
  proof creative (member story, Josh Q&A clip, "check your market").
- **Campaign 3 — Dinner promo (15%, rotates by city)**: same structure as the Oct 8 sprint.
- **Creative system:** 6–8 live ads, 2 new ads a week. Formats: founder talking-head Reels
  (from the filming plan), kinetic-type Reels (this kit), static proof cards, carousel
  "You bring / Sundae brings". SHAI `/ad-creatives` + `/new-edit`.

### Google Search
- **Keyword themes:** real estate franchise · real estate investing franchise · house
  flipping franchise · wholesale real estate franchise · "we buy houses" franchise · real
  estate investor business opportunity · {city} + real estate investing franchise.
  Competitor names may be bid on, but **never put a competitor's trademark in ad text**.
- RSA headlines from the membership page: "Stop Building. Start Scaling." · "Add a Zero to
  Your Business" · "$100M+ in Marketing Behind You" · "Check If Your Market Is Open".
- **Negatives:** jobs, salary, course, free, cheap, license class, "how to become a realtor."

### LinkedIn
- **Audience:** owners/founders/acquisitions leaders in Real Estate & Investment Management,
  company size 2–200, in open-territory metros + matched audience (marketplace list).
- **Formats:** Conversation Ads from Josh (personal invite to a 20-minute "market fit" call),
  Document Ads (the "Operator's Outlook" PDF as a lead magnet), Lead Gen Forms synced to GHL.

### YouTube
- In-stream + in-feed: Josh's "Today's Outlook" clips and the VSL. Audiences: custom
  segments (people searching real estate franchise keywords), remarketing lists, customer
  match.

### Franchise portals and broker networks
- **Portals** (pay-per-lead, high volume, lower intent): test one for 60 days and score
  every lead through the same 6 questions.
- **Brokers** (pay on close): bring pre-vetted candidates, usually for a commission on the
  initial fee. Requires Sundae's FDD and franchise sales compliance to be in order.

---

## 3. Speed-to-lead (where most franchise funnels leak)
- **< 60 seconds:** SHAI chat/SMS agent (GoHighLevel Conversation AI, AI-disclosed,
  consent-aware) texts the applicant, confirms 2 details, offers 3 call times.
- **< 5 minutes:** qualified applicants get a call from the SHAI voice agent (AI-disclosed)
  or a human setter during business hours, with booking straight into Victoria's team's
  calendar.
- **No-show recovery:** reminders at 24h/1h/10m; missed calls rebooked by text.
- **Long nurture:** "Operator's Outlook" weekly + next city dinner invite.

## 4. Testing roadmap (first 90 days)

| Weeks | Test | Success metric |
|---|---|---|
| 1–2 | VSL page vs. short-form application page | Cost per qualified application |
| 3–4 | Founder talking-head vs. kinetic-type creative | CTR, hook rate, CPQL |
| 5–6 | LinkedIn Conversation Ad vs. Lead Gen Form | Cost per booked call |
| 7–8 | Dinner-invite offer vs. "check your market" offer | Booked-call rate |
| 9–12 | Scale the winners +20%/week while CPQL holds | Members/month, ad cost per member |

## 5. Budget guardrails
- **Scale rule:** +20% a week on any campaign whose cost per *held intro call* stays under
  $350.
- **Cut rule:** pause any ad over 2× target CPL after 1.5× target spend.
- **North-star efficiency:** ad cost per signed member ≤ $12,000 (base model: ~$10.3k).
- **Daily ceiling:** SHAI enforces a daily spend ceiling across providers. Any increase asks
  Josh or Victoria first, by text.

## 6. Reporting
Daily (SHAI `/ads-metrics` → text at 7 AM): spend · leads · CPL · qualified % · calls booked.
Weekly (`/ads-optimize` recommendations, approval required): pause/scale proposals.
Monthly (`/forecasting`): leads → calls → FDDs → members vs. the projections, re-forecast.
