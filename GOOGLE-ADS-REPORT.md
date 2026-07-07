# Google Ads Audit — Axiom-Renovation (CID 165-962-3254)

**Date:** 2026-07-06 · **Analysis windows:** 30d = Jun 6–Jul 5 2026, 90d search terms = Apr 7–Jul 5 2026 · **Currency:** USD
**Data sources:** Google Ads API (GAQL) via InsightfulPipe MCP + axiom-web repository (site code inspection)

---

## Health Score

```
Google Ads Health Score: 66/100 (Grade: C — Needs Improvement)

Conversion Tracking: 47/100  ████▋░░░░░  (25% weight)  ← the account's core problem
Wasted Spend:        68/100  ██████▊░░░  (20% weight)
Account Structure:   71/100  ███████░░░  (15% weight)
Keywords & QS:       77/100  ███████▋░░  (15% weight)
Ads & Assets:        85/100  ████████▌░  (15% weight)
Settings & Bidding:  60/100  ██████░░░░  (10% weight)
```

57 of 80 checks scored; 23 N/A (PMax paused, no video/Demand Gen/CTV campaigns, US-only business, or data not exposed by API — each listed with its reason below).

---

## Executive summary — the one thing that matters

**Website conversion tracking died after March 2026, and every dollar spent since has been optimized blind.**

- Last website-origin conversion (lead form, tracked call, offline "Phone Call" import): **March 2026**.
- Since April 1: **$3,212.55 spent, 437 clicks, 0 primary conversions recorded.** The only "conversions" logged since April are Google Business Profile local actions (directions, engagements) — not leads.
- The remarketing lists are still tied to the **old domain (axiom-renovation.com)** and have 0 search-eligible members. The new site (**axiom-remodel.com**, this repo, launched ~June 10) installs GTM `GTM-P8S2X875` and correctly redirects both forms to `/thank-you` — but no Google Ads conversion has fired from it. The break is therefore in the **GTM container config and/or the conversion action definitions** (the two WEBPAGE actions predate the new site and almost certainly reference old-site URLs/triggers).
- Knock-on damage: the active campaign runs **Maximize Conversions with zero conversion signal**, so Smart Bidding flails — 65% of available impressions are lost to **ad rank**, broad match wanders into generic "contractors near me" territory, and exact-match keywords are starved (0–2 impressions).

Fix tracking first. Every other optimization is noise until the account can see leads again.

---

## Account snapshot

| | |
|---|---|
| Active campaigns | 1 Search (**ADU Construction \| Search \| Bay Area**, $30/day, Max Conversions, no tCPA) + 1 system LSA campaign (~no spend in this account) |
| Paused | 6 campaigns (San Jose, Los Altos, Kitchen, Bathroom, Home Addition, 1 PMax) |
| 30d performance | 2,687 impr · 140 clicks · **$687.68** · CTR 5.21% · CPC $4.91 · **0 conversions** |
| 90d (Apr 7–Jul 5) | ADU: $1,551.88, Search IS 22.1%, **rank-lost IS 64.8%**, budget-lost IS 13.2% |
| Spend history 2026 | Jan $3,708 → Feb $3,128 → Mar $4,976 → Apr $2,525 → **May $0 (dark)** → Jun $539 → Jul(1–5) $149 |
| Conversion actions | 19 enabled; 7 primary+counted (2 lead-form WEBPAGE, 3 call-based, 1 offline import, 1 legacy smart-campaign) |
| Geo | 7 South Bay cities (Cupertino, Los Altos, Los Gatos, Mountain View, Palo Alto, San Jose, Sunnyvale), "Presence" ✓ |
| Structure | 4 ad groups, 35 positive keywords (E/P/B ladders), 1 RSA each — all Ad Strength **EXCELLENT** |
| Negatives | 1 shared list (40 kw) on all 4 current campaigns + ~60 campaign-level + 19 ad-group-level; competitor & prefab terms deliberately negated |

---

## Category findings (80 checks)

### 1. Conversion Tracking — 47/100 (25% weight) 🔴

| ID | Check | Result | Evidence |
|----|-------|--------|----------|
| G42 | Conversion actions defined | ✅ PASS | 7 primary actions incl. 2 lead-form, "Call from Website" ($120 value), offline "Phone Call" import |
| G43 | Enhanced conversions | ❌ FAIL | `enhanced_conversions_for_leads_enabled` not set (customer data terms accepted, so it's one toggle away). Forms collect email → free ~10% signal uplift unused. **[Quick Win, 5 min]** |
| G44 | Server-side / offline import | ⚠️ WARN | "Phone Call" (UPLOAD_CLICKS, 90d window) import exists but last recorded March — pipeline stopped with the site migration |
| G45 | Consent Mode v2 | N/A | US-only (CA cities). Not required for EEA/UK enforcement; optional |
| G46 | Conversion window | ✅ PASS | 30d click (90d for offline import) — appropriate for lead gen |
| G47 | Micro vs macro primary | ⚠️ WARN | Legacy "Smart campaign ad clicks to call" (a click-intent micro event) is still primary+counted; will pollute Conversions the moment tracking revives |
| G48 | Attribution model | ✅ PASS | All advertiser-controlled actions on data-driven attribution (locked legacy smart-campaign actions excluded per audit rules) |
| G49 | Conversion values | ⚠️ WARN | Inconsistent: Call from Website $120, lead forms $1, calls $1. No value rules |
| G-CT1 | No duplicate counting | ⚠️ WARN | Both lead-form actions are primary and **both site forms redirect to the same `/thank-you`** — if GTM triggers are pageview-based, every submit will double-count. Also 3 overlapping call actions (ads forwarding + site forwarding + offline import). Must be resolved during the tracking fix |
| G-CT2 | GA4 linked & flowing | N/A | Link status not exposed via this API — verify manually (Admin → Linked accounts). Old-domain audiences suggest GA4 property may also point at axiom-renovation.com |
| G-CT3 | Google tag firing | ❌ FAIL | **Zero website conversions since March despite $3.2k spend.** New site has GTM + `/thank-you` flow wired (repo: `lib/thank-you.ts`, `app/thank-you/page.tsx`, June 10 commit "thank-you page for google ads + tag manager purposes") but nothing reaches Google Ads |
| G-CTV1 | CTV Floodlight | N/A | No CTV/video campaigns |

### 2. Wasted Spend / Negatives — 68/100 (20% weight) 🟡

| ID | Check | Result | Evidence |
|----|-------|--------|----------|
| G13 | Search-term review recency | ✅ PASS | Recent negatives mirror recent queries ("prefab adu homes with prices", "500 sq ft adu cost", "samara backyard homes") — active management visible |
| G14 | Negative lists | ⚠️ WARN | 1 shared list ("Axiom - Shared Baseline Negatives", 40) — good baseline, but themes (brand-protection, generic-contractor, product-for-sale, plans/info) belong in separate named lists; target ≥3 |
| G15 | Account/all-campaign coverage | ✅ PASS | Shared list attached to all 4 current-gen campaigns incl. the active one |
| G16 | Wasted spend | ❌ FAIL | **~$296 of $687.68 (≈43%) in 30d went to off-target queries** (breakdown below). >15% threshold |
| G17 | Broad match + Smart Bidding | ✅ PASS | All broad keywords run under Maximize Conversions (no Broad+Manual CPC). Caveat: Smart Bidding currently has no signal, which is why broad drifts (see G-CT3) |
| G18 | Close variants | ⚠️ WARN | NEAR_PHRASE pulled "san jose adu requirements" ($13.94), "kitchen redesign" (hist.) — minor vs the broad-match drift |
| G19 | Search term visibility | ⚠️ WARN | 47.7% of 90d spend visible in the report ($1,189 of $2,491) — privacy-hidden majority is normal-bad, not fixable, but worth knowing when reading the report |
| G-WS1 | Zero-conv keywords >100 clicks | ✅ PASS | Max is 46 clicks ("adu contractor" broad). Account-level 0-conv problem is a tracking issue, not a keyword issue |

**30-day waste breakdown (ADU campaign, all 0 conversions):**

| Bucket | Spend | Example queries |
|---|---|---|
| Own brand leaking into non-brand | $58.15 | "axiom renovation" ×3 entries — **$15.69/click for your own name** |
| Generic contractor/construction (no ADU intent) | $128.66 | "contractors near me san jose" $56, "construction company in san jose" $22, "design and build", "building construction" |
| Competitor brands (matched via broad despite negatives) | $30.47 | "apexhomes" $19.67, "dz design morgan hill", "formx", "dwell adu" |
| Tiny home / modular / unit-for-sale intent | ~$41 | "tiny home builders" $27, "modular home contractor near me", "2 bedroom adu for sale", "container house" |
| Plans / permitting / DIY research | ~$38 | "san jose adu requirements" $13.94, "600/1200 sq ft adu plans", "granny unit designs" |
| **Total ≈ $296/mo (43%)** | | **≈ $3,500/yr at current pace** |

### 3. Account Structure — 71/100 (15% weight) 🟡

| ID | Check | Result | Evidence |
|----|-------|--------|----------|
| G01/G02 | Naming conventions | ✅ PASS | Current gen consistent (`Service \| Channel \| Geo`); legacy names only on paused campaigns |
| G03 | Single-theme ad groups | ✅ PASS | 7–10 positive keywords per group, tight themes (San Jose / Custom-Detached / Builder / Contractor) |
| G04 | Campaigns per objective | ✅ PASS | One campaign per service line |
| G05 | Brand / non-brand separation | ❌ FAIL | No brand campaign, no brand negatives → "axiom renovation" served by broad ADU keywords at $15+ CPC. **[Quick Win: negate "axiom" in non-brand; optionally add $3–5/day exact brand campaign]** |
| G06 | PMax eligibility | ⚠️ WARN | PMax tested, paused — correct call at <30 conv/mo; revisit only after tracking + volume recover |
| G07 | Search+PMax overlap | N/A | No active PMax |
| G08 | Budget matches priority | ⚠️ WARN | Only campaign has 13.2% budget-lost IS — mild constraint, irrelevant until tracking is fixed |
| G09 | Budget pacing | ✅ PASS | June avg $18/day vs $30 cap — not capping early |
| G10 | Ad schedule | ❌ FAIL (Low) | None set. Fine for forms; consider dayparting call assets to answering hours |
| G11 | Location targeting mode | ✅ PASS | "Presence" only ✓ |
| G12 | Network settings | ✅ PASS | Search Partners ON, Display OFF ✓ |

### 4. Keywords & Quality Score — 77/100 (15% weight) 🟡

| ID | Check | Result | Evidence |
|----|-------|--------|----------|
| G20 | Avg QS | ⚠️ WARN | Only 2 unique keywords have QS (volume too low elsewhere): "garage conversion adu" **QS 1**, "adu builder near me" QS 5. Top spenders unscored — low confidence |
| G21 | Critical QS share | ✅ PASS | 2 of 35 positives (5.7%) at QS ≤3 — but both components of the QS-1 keyword are fixable (see G24 note) |
| G22 | Expected CTR | ⚠️ WARN | All 4 scored keyword variants "Below Average" expected CTR (tiny sample) |
| G23 | Ad relevance | ✅ PASS | 5.7% below average ("adu builder near me" is Above Average) |
| G24 | Landing page experience | ✅ PASS overall | Only "garage conversion adu" rates Below Average — it lands on the generic ADU page; needs a garage-conversion section/LP or pause |
| G25 | Top-spend keyword QS | ⚠️ WARN | Top spenders ("adu contractor" broad etc.) have no QS data yet — recheck at ~500 impressions |
| G-KW1 | Zero-impression keywords | ❌ FAIL | 9 of 35 positives (26%) had 0 impressions in 30d — mostly EXACT twins starved by their BROAD siblings under Max Conversions |
| G-KW2 | Keyword→ad relevance | ✅ PASS | Headlines mirror keyword themes in every ad group |

**Keyword reality check:** 95%+ of spend flows through BROAD variants; EXACT gets 0–2 impressions. With no conversion signal, Smart Bidding buys reach wherever it's cheap — that's the mechanism behind both the waste (G16) and the starved exacts (G-KW1).

*(Correction of a naive read: the 19 competitor/prefab/cost "keywords" inside the ADU Builder ad group are ad-group-level **negatives**, not bids — the account deliberately excludes Abodu/Samara/Apex/prefab/cost-shopper traffic. Sensible.)*

### 5. Ads & Assets — 85/100 (15% weight) 🟢

| ID | Check | Result | Evidence |
|----|-------|--------|----------|
| G26 | RSAs per ad group | ⚠️ WARN | Exactly 1 per group — add a 2nd RSA with a different angle (price transparency / timeline / financing) for comparison |
| G27/G28 | Headline/description counts | ✅ PASS | 15 headlines + 4 descriptions per RSA |
| G29 | Ad Strength | ✅ PASS | All 4 RSAs **EXCELLENT**, all approved |
| G30 | Pinning | ✅ PASS | No over-pinning |
| G31–G34 | PMax asset checks | N/A ×4 | PMax paused |
| G35 | Copy relevance | ✅ PASS | Keywords present in headlines; strong CTAs ("Get a Free ADU Quote") |
| G-AD1 | Ad freshness | ✅ PASS | RSAs rebuilt ~June for the new site (assets still "PENDING" performance labels) |
| G-AD2 | CTR vs benchmark | ⚠️ WARN | 5.21% vs 5.5–6.4% local-services benchmark (~85–95%) — acceptable given rank-lost IS; will improve as bids stabilize |
| G-PM1–6, G-AI1, G-DG1–3 | PMax / AI Max / Demand Gen | N/A ×10 | PMax paused; account below conversion-volume bar for AI Max (>50 conv/mo) and Demand Gen |

### 6. Settings, Targeting & Bidding — 60/100 (10% weight) 🟡

| ID | Check | Result | Evidence |
|----|-------|--------|----------|
| G50 | Sitelinks | ✅ PASS | 5 |
| G51 | Callouts | ✅ PASS | 6 |
| G52 | Structured snippets | ✅ PASS | 2 |
| G53 | Image assets | ❌ FAIL | None — project photos are proven CTR lifters for renovation ads. **[Quick Win, 10 min with existing portfolio photos]** |
| G54 | Call asset | ✅ PASS | Call asset + account call reporting enabled |
| G55 | Lead form asset | ❌ FAIL (Low) | Never tested; optional while site forms are the funnel |
| G56 | Audience observation | ❌ FAIL | Zero audiences attached at any level — add in-market (Home Improvement, Real Estate) + remarketing in Observation. **[Quick Win, 10 min]** |
| G57 | Customer Match | ❌ FAIL | No CRM lists uploaded (terms already accepted). Even a small past-client/lead list helps Smart Bidding |
| G58 | Placement exclusions | N/A | Search-only account |
| G59 | LP mobile speed | N/A | Not measured in this audit — run PageSpeed on `/services/adu` (Next.js/Vercel stack usually fine) |
| G60 | LP relevance | ✅ PASS | All ads → `axiom-remodel.com/services/adu`; title/H1 match themes. Gap: garage-conversion keywords deserve their own section/page |
| G61 | Schema markup | ❌ FAIL | No JSON-LD anywhere in the repo — add `LocalBusiness`/`Service` (+`FAQPage` on ADU page) |
| G36 | Smart Bidding / no ECPC | ✅ PASS | Max Conversions everywhere, no deprecated ECPC. **But see strategic note below** |
| G37 | tCPA reasonableness | N/A | No explicit targets set |
| G38 | Learning-phase share | N/A | Not exposed via API |
| G39 | Budget-limited | ⚠️ WARN | 13.2% budget-lost IS |
| G40 | Manual CPC justification | ✅ PASS | No manual campaigns |
| G41 | Portfolio strategies | N/A | Single active low-volume campaign |

**Strategic bidding note:** Maximize Conversions with 0 conversions in 90 days is worse than manual bidding — the algorithm has nothing to maximize and CPCs swing wildly ($15.69 on a brand query; rank-lost IS 65%). If tracking can't be fixed within ~1 week, temporarily switch the ADU campaign to **Maximize Clicks with a ~$6 CPC cap**; switch back to Max Conversions → tCPA once ~15–30 conversions have accumulated.

---

## Action plan

### P0 — This week (unblocks everything)

1. **Restore conversion tracking (G-CT3).** The site side is already correct (forms → `/thank-you`). Verify/fix the measurement side:
   - In GTM `GTM-P8S2X875`: confirm a **Google Ads Conversion Tracking tag** (conversion ID `AW-` for account 165-962-3254) fires on the `/thank-you` pageview; add the **Conversion Linker** tag; publish.
   - In Google Ads → Goals: the two WEBPAGE actions ("Website Lead Form Submit", "Interactive Lead Form Conversion") predate the new site — recreate/repoint them (simplest: ONE "Lead Form Submit" action, GTM-fired on `/thank-you`).
   - Re-wire **website call conversions**: "Call from Website" needs the phone-snippet/number-swap on axiom-remodel.com (site has `tel:` links in footer/phone-dialog — the GTM call snippet must target them).
   - Test end-to-end with Tag Assistant: submit each form, confirm the conversion registers in Ads (Diagnostics).
2. **Kill the double-count risk while you're in there (G-CT1):** keep one primary lead-form action; demote the legacy "Smart campaign ad clicks to call" to Secondary (G47); decide the call hierarchy (recommend: "Calls from ads" + "Call from Website" primary, offline "Phone Call" import secondary until dedup via call length is confirmed).
3. **Stop the bleeding — add negatives (G16/G05), ~$290/mo:** to the shared list (or new themed lists): `"axiom"` (phrase, non-brand campaigns only), `"contractors near me"`, `"construction company"`, `"contractor near me"` (phrase), `"tiny home"`, `"modular home"`, `"log home"`, `"container house"`, `"granny pod"`, `"for sale"`, `"plans"`, `"floor plans"`, `"requirements"`, `"pre approved"` (phrase), `[apexhomes]`, `[dz design morgan hill]`, `[formx]`, `[dwell adu]` (exact).
4. **Enable Enhanced Conversions for Leads (G43)** — customer-data terms already accepted; forms capture email. One toggle + user-provided-data variable in GTM.

### P1 — Next 30 days

5. Brand protection: $3–5/day exact-match brand campaign (recovers the "axiom renovation" clicks at ~$1 instead of $15).
6. Add image assets (project photos) and a 2nd RSA per ad group (G53, G26).
7. Attach audiences in Observation: in-market *Home Improvement / Residential Properties*, plus rebuilt remarketing (G56) — current lists point at the dead axiom-renovation.com domain; recreate GA4 audience → Ads link on the new property.
8. Upload a Customer Match list from past clients/leads (G57).
9. Add JSON-LD (`LocalBusiness`, `Service`, `FAQPage`) to the site (G61) — one small change in this repo.
10. Once ~10 conversions exist: review query-level performance, then raise budget toward $40–50/day (13% budget-lost says demand exists).

### P2 — After tracking has 30+ days of clean data

11. Move to tCPA (start near observed CPA, likely $150–250 for ADU leads).
12. Garage-conversion landing section/page for the QS-1 keyword, or pause it.
13. Reactivate Kitchen/Bathroom/Home-Addition campaigns one at a time, each with its own themed negatives.
14. Revisit PMax/AI Max only at >30 conv/month.

---

## Data gaps (checks not scorable from API)

- **G-CT2** GA4 link health, **G38** learning-phase status, **G59** LP mobile LCP — verify in UI / PageSpeed.
- Search terms report shows 47.7% of spend (Google privacy thresholds hide the rest) — waste figures are therefore a floor, not a ceiling.
- LSA campaign (`LocalServicesCampaign:SystemGenerated`) budgets/leads live in the Local Services platform, not this account view — audit separately.

## Benchmark context (Local/Home Services, Search 2025-26)

| Metric | Account (30d) | Benchmark | Verdict |
|---|---|---|---|
| CTR | 5.21% | 5.5–6.4% | Slightly under |
| CPC | $4.91 | $7.85–15.00 | ✅ Cheap clicks |
| CVR | 0% (untracked) | 7.3–15% | ❌ Unmeasurable |
| CPL | n/a | ~$90 | Target after fix: 1–2 leads/day at $30–50/day is realistic |
