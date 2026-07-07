# Axiom Renovation — Google Ads 4-Week Execution Plan

**Account:** Axiom Renovation · **CID:** 165-962-3254 · **Generated:** 2026-07-06
**Inputs:** `GOOGLE-ADS-REPORT.md` (audit, 2026-07-06, live API data) · May 15 "3-Part Plan" · June "Stakeholder Progress Update" · `docs/gtm-conversion-setup.md` (GTM runbook, in progress)

**Purpose:** single source of truth for the next 4 weeks. Operator and client sign off on the gates below. No budget or bidding-strategy change happens outside this document without both parties re-agreeing in writing.

---

## 1. Plan vs Reality

No blame — the measurement gate the May 15 plan told us to close reopened when the domain migrated to axiom-remodel.com, and nobody re-verified it end-to-end after that cutover.

| Claim (June update) | Account shows (audit, 2026-07-06) | Reconciliation |
|---|---|---|
| All 4 lanes "ready · paused"; plan = launch ONE campaign (ADU or Home Addition) | **ADU is ENABLED**, not paused — $687.68 spent in the trailing 30 days (Jun 6–Jul 5), continuous spend through Jan–Apr, a dark May ($0), then resumed Jun/Jul | The "launch one" decision was already effectively made (or never un-made) — ADU never actually stopped, it just went quiet in May during the rebuild |
| Home Addition $37.50/day, ADU $30/day, Bathroom $16.67/day, Kitchen $1/day = $85.17/day if all live | Only ADU's $30/day cap is live. Home Addition, Bathroom, Kitchen, plus 2 legacy geo campaigns (San Jose, Los Altos) and 1 PMax are paused | Lane budgets exist as configured caps on mostly-paused campaigns — 1 of 4 lanes is actually spending |
| All campaigns on Maximize Conversions; no bidding/budget changes during first learning period | **True** — ADU runs Maximize Conversions, cap unchanged at $30/day throughout | Matches. But there is no "learning period" happening — see next row |
| Fix measurement → fix LPs → clean campaigns → use SEO data → THEN scale (May 15 rule); do not scale until tracking is clean | **0 conversions recorded since March.** New site (axiom-remodel.com, launched ~Jun 10) has GTM (`GTM-P8S2X875`) and a working `/thank-you` redirect, but no conversion has ever reached Google Ads from it. Budget was never scaled (compliant with the letter of the rule) — but $3,212.55 has been spent since April 1 against zero signal (the spirit of the rule) | Whether the break started with pre-cutover drift or the Jun 10 migration itself, the fix is the same: verify the *current* site end-to-end. That's Gate 0 below |
| (not addressed) | 43% of 30-day spend (~$296 of $687.68) went to off-target queries; Search impression share 22.1%, 64.8% lost to ad rank | Waste-blocking negatives and Enhanced Conversions are already landing this week (see Gate 0) — this gap is being worked, not ignored |

---

## 2. Gate 0 — Conversion Tracking Verified End-to-End

**Owner:** Client (GTM/Ads UI access required — this is a human-in-the-loop step, not an API/MCP task).
**Deadline:** 2026-07-13 (7 days from today).
**Pass condition:** a real test conversion is visible in Google Ads (Conversions → Diagnostics / recent conversions) within 48 hours of the GTM container publish.

Detailed tag/trigger config: `docs/gtm-conversion-setup.md`. Sign-off checklist below:

- [ ] `GTM-P8S2X875`: Google Ads Conversion Tracking tag (conversion ID for CID 165-962-3254) fires on the `/thank-you` pageview
- [ ] Conversion Linker tag present and firing site-wide
- [ ] `generate_lead` dataLayer event (with hashed `user_data`) confirmed on both form-submit paths, mapped as the Enhanced Conversions for Leads trigger
- [ ] Google Ads → Goals: consolidate to ONE primary "Lead Form Submit" action firing on `/thank-you`; retire/repoint the two pre-migration WEBPAGE actions (they still reference axiom-renovation.com)
- [ ] "Call from Website" rewired to axiom-remodel.com `tel:` links (footer + phone dialog) via the GTM call-conversion snippet
- [ ] Legacy "Smart campaign ad clicks to call" demoted from Primary to Secondary
- [ ] Enhanced Conversions for Leads toggled ON at the conversion-action level (customer-data terms already accepted)
- [ ] GTM container published
- [ ] **Live test:** submit both site forms + one test call; confirm each shows in Ads within 48h ← **this line is the pass condition**

### 2.1 ADU stance while Gate 0 is open

**Recommendation: keep ADU ENABLED**, on one condition, with a hard stop.

- Keep live **only because** the waste-blocking negatives landing this week cap the downside (own-brand leak, generic-contractor, competitor-brand, tiny-home/modular, plans/DIY — the same 5 buckets the audit priced at ~$296/mo).
- **Hard rule:** if Gate 0 has not passed by **2026-07-13**, PAUSE ADU that same day. Not discretionary — the program's own rule is no spend against broken measurement, and the grace window is now used up.

**Dollar math, 7-day Gate-0 window (Jul 6–13):**

| | Keep ADU live ($30/day cap) | Pause ADU now |
|---|---|---|
| 7-day spend exposure | $126–$210 (recent daily pace $18–$30/day: Jun avg $18, Jul 1–5 avg $29.80) | $0 |
| Wasted-spend exposure if negatives underperform | ~43% historic rate → **$54–$90** | $0 |
| Wasted-spend exposure if negatives work as scoped | <15% target rate → **$19–$32** | $0 |
| Tracked conversions this week | 0 until Gate 0 passes, then real leads start same day | 0 |
| Effect on Week 3 evidence bar (≥5 tracked leads) | No delay if Gate 0 passes on schedule — clock starts the day it passes | Pure delay — clock only starts on resume, no data gained by waiting |
| Search impression share (baseline 22.1%, 64.8% rank-lost) | Holds / slowly rebuilds | Resets toward zero; rebuild lag on resume |

Net: worst case this week is bounded at ~$210, already smaller than several individual months in the Jan–Apr spend history, and now capped further by negatives that specifically target the 5 known waste buckets. If Gate 0 slips past 7 days, continuing to buy clicks with no way to measure them breaks the program's founding rule — so the pause is automatic, not a re-litigated decision.

---

## 3. Week-by-Week Plan

| Week | Dates | Entry gate | Exit gate |
|---|---|---|---|
| 1 | Jul 6–12 | Gate 0 in progress | Gate 0 **PASSED** (test conversion in Ads ≤48h of publish) AND daily spend inside $18–30/day AND no unactioned waste-bucket query >$10 since last negative push |
| 2 | Jul 13–19 | Gate 0 passed (else ADU already paused — §2.1) | ≥1 real tracked lead recorded through the new primary conversion action |
| 3 | Jul 20–26 | ≥1 tracked lead exists | Written go/no-go on Home Addition against the 3-point evidence bar (§3.3) |
| 4 | Jul 27–Aug 2 | Week 3 decision executed | Documented bidding decision (tCPA / hold) + documented budget decision (hold / +≤20%) |

### 3.1 Week 1 — Gate 0 + waste watch

- Complete the Gate 0 checklist (§2).
- Daily (business days) search-term glance on ADU: flag any query matching the 5 known waste buckets (own-brand, generic-contractor, competitor-brand, tiny-home/modular, plans/DIY). Any flagged query with >$10 spent since the last negative push gets negatived same day.
- Confirm the P0 negatives already landing this week are attached and actually suppressing (re-check Search Terms report for the 18 specific queries the audit named — they should stop recurring).
- Confirm Enhanced Conversions toggle is live and the legacy click-to-call action is Secondary, not Primary.
- No budget or bid changes this week regardless of what Gate 0 does.

### 3.2 Week 2 — First tracked leads, CPL corridor

- Entry assumes Gate 0 passed; if not, ADU is already paused per §2.1 and Week 2 becomes "Gate 0 retry," not "leads."
- Let leads accumulate untouched — no budget/bid edits (protect the first real learning window).
- **CPL corridor:** local-services benchmark ≈ $90 (audit benchmark table). ADU reality is expected higher, **$150–$250**, consistent with the $120 in-account value already assigned to "Call from Website."
  - **Alert** (flag for review, no action): CPL > $300, sustained, after ≥6 clicks/day.
  - **Action** (operator escalates a specific proposal to client — any budget/bid change still needs client sign-off): CPL > $450, sustained, after ≥6 clicks/day.
- Continue the daily search-term glance from Week 1.

### 3.3 Week 3 — Evidence review, Home Addition go/no-go

Evidence bar — **all three** must hold, measured from the day Gate 0 passed:

1. ≥5 tracked leads via the real (post-Gate-0) primary conversion action
2. Blended CPL ≤ $250
3. ≥1 lead qualified by sales (a human on the client side confirms it was a real, in-budget prospect, not just a form-fill)

- **All three true →** launch Home Addition at its pre-configured $37.50/day cap (negatives already pre-loaded per remediation in flight, so it starts clean instead of repeating ADU's waste pattern).
- **Any one false →** hold at ADU-only; re-evaluate the following week; no new campaign.
- Bathroom and Kitchen are untouched regardless of this decision (Bathroom needs its own future evidence cycle once ADU + Home Addition are stable).

### 3.4 Week 4 — Bidding review, budget stance re-check

- Count trailing-30-day conversions on the real primary action(s).
  - **≥15 conversions in 30 days →** client may consider moving that campaign from Maximize Conversions to tCPA, target set at or above the observed blended CPA — never below it.
  - **<15 conversions →** stay on Maximize Conversions. No change. (Audit note: Max Conversions with a signal-less history is worse than manual; it needs an accumulated baseline before any switch.)
- Budget stance: only consider raising the ADU cap above $30/day if (a) Gate 0 has been stable for ≥3 weeks, (b) CPL is inside/under corridor, and (c) any increase is capped at +20% in a single move (→ $36/day max, not higher).
- Document both decisions in writing (bidding + budget) with the numbers that drove them.

### 3.5 Kitchen — parked throughout, no exceptions this cycle

Kitchen's $1/day is a placeholder, not a real allocation — it keeps the campaign/ad-group structure warm without meaningful spend exposure. Per prior-cycle account history, Kitchen's search terms skewed toward showroom visits and competitor-name research rather than renovation-intent — the same waste pattern just diagnosed and being fixed on ADU. Reactivating a third lane before the measurement + hygiene loop is proven would just reproduce the same blind-spend problem. Revisit only after Week 4's evidence bar is met on the first two lanes.

---

## 4. Monitoring — 6 Numbers, Twice a Week

Check Monday and Thursday (adjust by agreement). Once the n8n pair below is deployed, the daily search-term layer moves to automation and the manual check can drop to a weekly spend/CPL/IS review.

| # | Number | Where | Pre-agreed response if it goes wrong |
|---|---|---|---|
| 1 | Spend pace ($/day vs cap) | Campaign settings vs delivery | >20% over cap pace for 2 consecutive checks → investigate before touching budget; do not adjust budget without a root cause |
| 2 | Search impression share (baseline 22.1%) | Auction insights / IS columns | Falling for 2 consecutive checks with budget-lost IS flat/low → rank/QS problem, not a budget problem; do not raise budget to fix it |
| 3 | Top-10 new search terms by spend | Search terms report | Any match to the 5 known waste buckets → negative same day (manual until n8n pair deployed, then via Search Terms Excluder) |
| 4 | Tracked conversions by action (Lead Form / Call from Website / other) | Conversions → by conversion action | One action silent for 3+ days after Gate 0 passed → treat as a tracking regression, reopen Gate 0; don't assume "no demand" |
| 5 | CPL (blended, trailing 7-day) | Conversions / cost | Per §3.2 corridor: alert >$300, action >$450 (both after ≥6 clicks/day) → escalate to client, no self-adjusted bids |
| 6 | Rank-lost impression share (baseline 64.8%) | Auction insights | Still >60% after Week 2 → signal Max Conversions still lacks signal; surface for the Week 4 bidding review, don't switch strategy mid-week without client sign-off |

**Ongoing hygiene mechanism (Week 3+):** the n8n automation pair — "Search Terms Reviewer" (weekly Gemini-scored search-term review → Slack) and "Search Terms Excluder" (one-click exclusion via webhook) — replaces the manual daily glance once deployed. Until then, items #3 and #6 above are manual.

---

## 5. Do Not Do (Next 4 Weeks)

- No budget increases on any campaign until the Week 4 gate, and even then capped at +20% in one move.
- No new campaign types: PMax (revisit only >30 conv/mo — audit threshold), AI Max (>50 conv/mo), Demand Gen (no volume basis yet). Account is below every stated threshold.
- No bidding-strategy churn mid-learning. The one contingency swap (Maximize Conversions → Maximize Clicks with a ~$6 CPC cap) is reserved solely for a Gate-0-slip-past-7-days scenario tied to the pause decision in §2.1 — it is not a routine lever.
- No touching the negated competitor/prefab exclusions (Abodu, Samara, Apex, prefab, cost-shopper terms) — intentional, leave as-is.
- No launching Bathroom or Kitchen this cycle, regardless of the Home Addition decision.
- No deleting the two legacy WEBPAGE conversion actions' historical data — repoint/retire per Gate 0, preserve the audit trail.

---

## 6. RACI

| Workstream | Responsible & Accountable | Consulted | Informed |
|---|---|---|---|
| GTM container + conversion action rebuild (Gate 0) | **Client** (human, GTM/Ads UI access — cannot be done via API/MCP) | Operator (checklist, verification) | — |
| Account hygiene (negatives, campaign/ad-group settings, structure) | **Operator** (Google Ads API / MCP) | — | Client |
| Bidding-strategy and budget changes | **Client** (sign-off required) | Operator (recommends, executes on approval) | — |
| Site changes (dataLayer events, thank-you flow, `tel:` links, schema) | **This repo** (axiom-web, engineering) | Operator | Client |
| Monitoring / search-term hygiene | **Weekly:** n8n "Search Terms Reviewer" → Slack (once deployed). **Twice-weekly manual** (operator, §4) until then | — | Client |

---

**Agreed by:**

Operator: _______________________ Date: __________
Client: _______________________ Date: __________

*Generated 2026-07-06 from live account data + program documents.*
