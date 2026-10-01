# Event Plan — Paid Ads: 6-day sprint to fill the remaining seats

**Budget:** $5,000 base ($3,000 conservative · $8,000 aggressive), Fri Oct 2 → Wed Oct 7
noon. **Goal:** ~80 qualified applications from paid. Organic covers the rest (plan 01).
**Destination:** the one-page RSVP funnel (link 3) with UTMs. The conversion event =
**qualified application submitted**, sent to Meta (Pixel + Conversions API), LinkedIn
(Insight Tag) and Google (gtag).

---

## 1. Budget split (base $5,000)

| Channel | Budget | Daily | Expected CPA (application) | Applications |
|---|---:|---:|---:|---:|
| Meta — Facebook + Instagram (conversions to funnel) | $2,500 | ~$415 | $40–60 | 42–62 |
| LinkedIn — Sponsored Content + Conversation Ads | $1,500 | ~$250 | $90–150 | 10–16 |
| Google Search — event + intent keywords | $500 | ~$85 | $60–120 | 4–8 |
| Retargeting — Meta + LinkedIn (funnel visitors, video viewers) | $500 | ~$85 | $25–45 | 11–20 |
| **Total** | **$5,000** | | **~$60 blended** | **~83** |

Short flights need fast learning. Run **one campaign per platform**, broad-but-qualified
audiences, and let the algorithm find applicants. Don't fragment $5k across 20 ad sets.

---

## 2. Meta (Facebook + Instagram)

- **Campaign:** Sales/Leads objective → *Website conversions* optimizing for the custom event
  `QualifiedApplication` (fires only when the funnel's scoring marks a qualified application).
  Fallback while the pixel has no history: optimize for `Lead` (any submission) and let SHAI's
  scoring sort quality.
- **Special Ad Category check:** this is a business-opportunity event for investors, not a
  housing ad. If Meta flags it as Housing anyway, accept the category. It requires 15-mile+
  radius targeting and no age/gender/ZIP targeting — a 25-mile radius around Manhattan Beach
  already covers LA County and north Orange County.
- **Audiences (one ad set, Advantage+ audience with suggestions):**
  1. Custom audience: **Sundae Marketplace LA/OC/IE investor list** (hashed emails/phones) —
     highest intent.
  2. 1–3% lookalike of marketplace buyers who closed a deal.
  3. Suggestions: real estate investing, wholesaling, house flipping, BiggerPockets, real
     estate investment trust (exclude), property management.
  4. Exclude: current members, Sundae employees, people who already applied.
- **Placements:** Advantage+; creative built 9:16 (Reels/Stories) + 4:5 (Feed).
- **Creative rotation (4 ads):** Reel 01 (POV invite) · Reel 04 (harder market) · Image 01
  (Courtyard save-your-seat) · Image 02 (Josh speaker card). Primary text = captions C03/C05.
- **Cut rule:** after $150 spent, pause any ad with CTR < 0.8% or CPA > $90.

## 3. LinkedIn

- **Audience:** Location = Greater Los Angeles + Orange County. (a) **Matched audience:**
  upload the marketplace list. (b) Job titles: Owner, Founder, CEO, Principal, Managing
  Partner, Acquisitions Manager/Director, Real Estate Investor; Industries: Real Estate,
  Investment Management, Leasing Real Estate; Seniority: Owner/Partner/CXO/Director;
  Company size 2–200.
- **Formats:**
  - **Conversation Ad from Josh** (message ad, sender = Josh Stech): personal invite with two
    buttons — "Request my seat" (funnel) / "Not this time." Usually the cheapest qualified
    signups on LinkedIn for exclusive events.
  - **Sponsored single image** (Image 07, 1200×627) with LinkedIn Lead Gen Form (prefilled
    name/email/company, plus 2 custom questions: deals in last 12 months, primary model),
    synced to GoHighLevel via SHAI / Zapier.
- **Bid:** maximum delivery for 2 days, then cost cap at $120/lead.

## 4. Google Search

- **Keywords (phrase/exact):** "real estate investor event los angeles", "real estate
  investor networking los angeles", "wholesaling meetup los angeles", "real estate investor
  dinner", "south bay real estate investors", "sundae membership", "josh stech", "sundae real
  estate investor".
- **Ad copy:** RSA with headlines "Private Dinner With Sundae's CEO" · "LA Operators — Oct 8"
  · "Shade Manhattan Beach Courtyard" · "Seats Limited — Apply in 60 Seconds".
- **Geo:** LA + Orange County · **Schedule:** Oct 2–7.

## 5. Retargeting (the cheapest seats)

- Meta: people who visited the funnel, watched 50%+ of any event Reel, or engaged with
  Sundae IG/FB in 30 days → Reel 07 (seats left) + Image 03 (countdown).
- LinkedIn: funnel visitors (Insight Tag) + video viewers 50%+ → Video 01 trailer.
- Frequency cap ~3/day. This is where "I'll do it later" people convert.

## 6. Day-by-day pacing

| Day | Meta | LinkedIn | Google | Notes |
|---|---|---|---|---|
| Fri 10/2 | Launch 4 ads | Launch Conversation Ad + image | Launch | Tracking QA before launch |
| Sat 10/3 | Read CTR/CPA at noon | — | — | Kill losers after $150 |
| Sun 10/4 | Shift budget to winner | Cost cap $120 | — | |
| Mon 10/5 | +20% on winner | Second Conversation Ad wave | Add negatives | |
| Tue 10/6 | Retargeting up | Retarget video viewers | — | Seats-left messaging |
| Wed 10/7 | **Stop prospecting at noon** | Stop at noon | Stop | Retargeting only until 6 PM |

If the dinner fills early (approved seats reach 75+), switch the funnel to **waitlist mode**
and redirect leftover budget to the always-on membership campaigns (plan 04).

## 7. Tracking + reporting (SHAI `/ads-metrics`, daily 7 AM)

UTMs: `utm_source={meta|linkedin|google}&utm_medium=paid&utm_campaign=la-dinner-1008&utm_content={asset-id}`.
Report: spend · impressions · CTR · applications · qualified % · approved · confirmed · cost
per approved seat · cost per attendee (after the event) · intro calls attributed.

**Targets:** CTR > 1.0% (Meta), cost per qualified application < $75, approved-to-attended
> 70%, paid cost per attendee ≈ $100 (base model).
