# Restoring Google Ads conversion tracking on axiom-remodel.com

**Audience:** whoever has UI access to GTM container `GTM-P8S2X875` and Google Ads account `165-962-3254`.
**Situation:** the site moved from `axiom-renovation.com` to `axiom-remodel.com` (March 2026) and website conversion tracking has recorded **zero conversions since**. The code side is already fixed and deployed with this repo; everything below is GTM / Google Ads UI work. Do the steps **in order**.

---

## What the website now sends (already live in code)

The GTM container is loaded site-wide (`<GoogleTagManager gtmId="GTM-P8S2X875" />` in `app/layout.tsx`). The site pushes two dataLayer events via `lib/analytics.ts`:

| Event | When it fires | Payload |
|---|---|---|
| `generate_lead` | On successful submit of either lead form, immediately before the redirect to `/thank-you` | `form_id`: `"contact_form"` or `"consultation_stepper"`; `user_data.email` (trimmed, lowercased); `user_data.phone_number` (E.164, e.g. `+14085550123`). Empty fields are omitted; the consultation flow never has a phone. |
| `phone_click` | On click of a `tel:` link | `link_location`: `"footer"` or `"phone_dialog"` |

Both forms still redirect to `/thank-you` (noindex) on success, so a Page View trigger on that path remains available as a fallback — see step 3.

The phone number displayed on the site is **408-702-2022** (`tel:+14087022022`), rendered exactly as `408-702-2022` in the footer (every page), the "Call Us" dialog, and the thank-you page.

---

## 1. GTM: add a Conversion Linker tag (all pages)

Without this, click IDs (`gclid`) are not captured/stored as first-party cookies on the new domain and conversions can't be attributed.

1. In GTM container `GTM-P8S2X875` → **Tags → New**.
2. Tag Configuration → **Conversion Linker**. Leave default settings ("Enable linking on all page URLs").
3. Trigger: **All Pages**.
4. Name it `Conversion Linker — All Pages` and save.

---

## 2. Google Ads: repoint the lead conversion action

In Google Ads (`165-962-3254`) → **Goals → Conversions → Summary**:

1. Open **"Website Lead Form Submit"**.
   - If it is a **tag-based** action (has a Conversion ID + Label under "Tag setup"), keep the action and copy its **Conversion ID** and **Conversion Label** for step 3. If its settings reference `axiom-renovation.com` anywhere (URL rules, "webpage" match conditions), remove/repoint those to `axiom-remodel.com`.
   - If it was created with **URL-based rules** on the old domain (or is broken beyond repair), recreate it: **+ New conversion action → Website** → enter `axiom-remodel.com` → **create manually**: Category **Submit lead form**, name **Website Lead Form Submit** (reuse the name), count **One**, set value per lead if desired. Copy the new Conversion ID + Label.
2. Make sure **"Website Lead Form Submit" is the single PRIMARY lead-form action** (Goals → Conversions → the action → edit → "Primary action used for bidding").
3. **"Interactive Lead Form Conversion"**: leave it alone for now. **After** the new setup verifies (step 6 shows "Recording conversions"), switch it to **Secondary**. Both site forms redirect to the same `/thank-you`, so keeping two primary lead actions would double count every lead against bidding.

---

## 3. GTM: Google Ads conversion tag for lead submits

1. GTM → **Tags → New** → Tag Configuration → **Google Ads Conversion Tracking**.
2. Enter the **Conversion ID** and **Conversion Label** from step 2.
3. Trigger (primary): **New trigger → Custom Event**, Event name = `generate_lead` (exact match, fires on All Custom Events). Name it `CE — generate_lead`.
4. Name the tag `Google Ads — Lead Form Conversion` and save.

**Fallback trigger option:** a **Page View** trigger on `Page Path equals /thank-you` also works (both forms land there — that was the original design). Prefer the `generate_lead` custom event because:

- it carries `user_data` in the same dataLayer push, which the Enhanced Conversions variable in step 4 needs at fire time;
- it fires **exactly once per successful submit**, whereas `/thank-you` can be refreshed, bookmarked, or revisited and would fire spurious/duplicate conversions;
- it distinguishes the two forms via `form_id` (the shared URL cannot).

Optional: create a Data Layer Variable `form_id` (name it `DLV — form_id`) if you want per-form reporting dimensions.

---

## 4. Enhanced Conversions for Leads (user-provided data)

The site already pushes raw email/phone in `user_data`; Google's tag hashes them in the browser. The account has **already accepted the customer data terms**, so this is pure configuration:

1. GTM → **Variables → New** → **Data Layer Variable**, name `DLV — user_data.email`, Data Layer Variable Name = `user_data.email`. Repeat for `DLV — user_data.phone_number` reading `user_data.phone_number`.
2. GTM → **Variables → New** → **User-Provided Data** variable → **Manual configuration**:
   - Email → `{{DLV — user_data.email}}`
   - Phone → `{{DLV — user_data.phone_number}}`
   - Name it `User-Provided Data — Lead Forms`.
3. Open the `Google Ads — Lead Form Conversion` tag from step 3 → check **"Include user-provided data from your website"** → select `User-Provided Data — Lead Forms` → save.
4. In Google Ads → Goals → Conversions → open **Website Lead Form Submit** → Enhanced conversions → **turn on** → choose **"Enhanced conversions for leads"** with implementation method **Google Tag Manager**.

---

## 5. Website call conversions ("Call from Website")

The conversion action **"Call from Website"** (id `6687800330`, $120 value) counts calls to a Google **forwarding number** that dynamically replaces the number shown on the site — that replacement snippet has never been installed on the new domain, so it records nothing.

1. In Google Ads, open the "Call from Website" action → Tag setup → copy its **Conversion ID** and **Conversion Label**. If its settings still reference `axiom-renovation.com`, repoint to `axiom-remodel.com`.
2. GTM → **Tags → New** → Tag Configuration → **Google Ads Calls from Website Conversion**.
   - Conversion ID / Label: from step 5.1.
   - **Display Phone Number** (the number to replace): `408-702-2022` — exactly as displayed on the site (footer of every page, the "Call Us" dialog, and the thank-you page all render it in this `408-702-2022` format; the snippet matches on the displayed text).
3. Trigger: **All Pages** (the footer number is on every page). Name it `Google Ads — Calls from Website` and save.
4. The site's own `phone_click` event (fires on tel: link clicks with `link_location`) may be kept as a conversion, but **Secondary at most** — it measures taps, not answered calls; the forwarding number is the primary call measurement. If you want it: create a Google Ads Conversion Tracking tag on a Custom Event trigger `phone_click` pointed at a call-click action set to Secondary, or simply leave `phone_click` unmapped for now.

---

## 6. Verification checklist

1. GTM → **Preview** (Tag Assistant) → connect to `https://axiom-remodel.com`.
2. Submit the **contact form** (real email + phone) → in the Tag Assistant event stream confirm `generate_lead` fires with `form_id: "contact_form"` and `user_data.email` / `user_data.phone_number` populated, and that `Google Ads — Lead Form Conversion` fired exactly once with user-provided data attached.
3. Complete the **consultation stepper** (books a real Calendly slot — use a throwaway slot and cancel it after) → confirm `generate_lead` with `form_id: "consultation_stepper"` and `user_data.email`.
4. Click the footer phone link and the "Call Us" dialog link → confirm `phone_click` with `link_location: "footer"` / `"phone_dialog"`.
5. With Tag Assistant, load **`/services/adu`** (the active ads landing page) and confirm the Google tag (GTM-P8S2X875), the Conversion Linker, and the Calls from Website tag all fire, and that `408-702-2022` gets swapped for a forwarding number when the visit carries a `gclid` (append `?gclid=test` to simulate).
6. **Publish** the GTM workspace (Preview mode alone changes nothing for real traffic).
7. Within 24–48h: Google Ads → Goals → Conversions → check the status column / **Diagnostics** tab for "Website Lead Form Submit" shows **"Recording conversions"**, and the Enhanced Conversions diagnostics show user-provided data being received (this can take up to 72h).
8. Then flip "Interactive Lead Form Conversion" to Secondary (step 2.3).

---

## 7. Why this broke (and what else to rebuild)

The site migrated from **axiom-renovation.com** to **axiom-remodel.com** in March 2026, but the measurement layer was never repointed:

- The old conversion actions and any URL-based rules were validated against the old domain; the call-forwarding snippet was never installed on the new one. Result: zero recorded website conversions since the move.
- **Remarketing audiences and GA4** still reference the old domain. Rebuild the audiences against the new domain, update the GA4 data stream URL (or create a new stream for `axiom-remodel.com`), and **relink GA4 ↔ Google Ads** so audience and conversion imports resume.
- Sweep campaign settings for leftovers: final URLs, tracking templates, and sitelinks still pointing at `axiom-renovation.com` should be updated even where redirects mask the problem.
