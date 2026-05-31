# V2 Features — Product Backlog & Specifications

Features in this document are **not yet built**. They are hidden from the UI. This document captures intended behaviour, UX flow, and technical requirements so they can be built in sequence.

Feature flags for the toggleable V2 features live in `.env.local` and `src/lib/features.ts`.

> **Already shipped from this backlog:**
> - ✅ Vikriti Micro-Assessment — `/vikriti` page + `POST /api/vikriti/score` + results comparison card (see `data/vikriti-questions.json`)
> - ✅ Weighted Scoring Algorithm — `PrakritiScorer` now applies per-question weights; thresholds recalibrated for 41-point total
> - ✅ Body temperature + sweating questions — Q26 and Q27 added to Section 1 (Physical Body)

---

## 1. Vedic AI Assistant (AI Chat)

**Feature flag:** `NEXT_PUBLIC_FEATURE_AI_CHAT`  
**Location:** Results page sidebar  
**Hook stub:** `src/hooks/usePrakritiChat.ts`

### What it does
A conversational AI assistant embedded in the results sidebar. The user can ask follow-up questions about their Prakriti result — e.g. *"What should I eat for dinner tonight?"*, *"Which yoga poses help with my anxiety?"*, *"Is it okay to have coffee in the morning?"*

The assistant is aware of:
- The user's Prakriti result type (e.g. Vata-Pitta)
- Their full recommendation set (diet, routine, yoga, seasonal)
- The current season (auto-detected from date)

### UX Flow
1. User types a question in the chat input on the results page
2. A streaming response appears from "Vedic AI" styled as a practitioner's voice
3. Responses are grounded only in the user's own result data — no hallucinated generic advice
4. Chat history persists for the session (not across sessions without auth)

### Technical Requirements
- New API endpoint: `POST /api/prakriti/chat`
- Uses Claude API (Anthropic SDK) with prompt caching on the system prompt
- System prompt includes: result type, full recommendation JSON, current season, user's question history
- Streaming response via `ReadableStream`
- Frontend: update `usePrakritiChat.ts` hook (stub already exists, `isAvailable` always false in V1)
- Rate limiting: 10 messages per session, soft limit with a prompt to consult a practitioner

### Risks / Considerations
- Must include a disclaimer that AI responses are not medical advice
- Responses must stay tightly grounded — no off-topic or generic health advice
- Consider adding "helpful / not helpful" thumbs rating on each response for quality monitoring

---

## 2. User Profiles & Saved Results

**Feature flag:** `NEXT_PUBLIC_FEATURE_PROFILES`  
**Location:** Results page sidebar ("Save to Profile" button)  
**Hook stub:** `src/hooks/useAuth.ts`

### What it does
Allows users to create an account and save their Prakriti result. Saved profiles allow:
- Viewing past results and tracking Prakriti over time
- Comparing Prakriti vs. Vikriti (once Vikriti assessment is added — see item 5)
- Sharing a public profile link

### UX Flow
1. After completing the quiz, a "Save to Profile" button appears in the sidebar
2. Clicking it opens an auth modal (email + password or Google OAuth)
3. On sign-up/login, result is saved to their profile
4. User can access `/profile` to see their history

### Technical Requirements
- Auth provider: Clerk, NextAuth, or Supabase Auth (TBD)
- Database: Supabase or PlanetScale (result stored as JSON)
- New pages: `/profile`, `/profile/[id]` (public share)
- Update `useAuth.ts` hook (stub exists, `user` always null in V1)
- Enable `NEXT_PUBLIC_FEATURE_PROFILES` flag once wired up

### Data model (result record)
```typescript
interface SavedResult {
  id: string
  userId: string
  resultType: PrakritiResultType
  scores: DoshaScores
  percentages: DoshaPercentages
  answeredAt: Date
  notes?: string  // user's own notes on the result
}
```

---

## 3. PDF Report Download

**Feature flag:** `NEXT_PUBLIC_FEATURE_PDF`  
**Location:** Results page sidebar ("Download Report" button)

### What it does
Generates a beautifully formatted PDF of the user's complete Prakriti report — all four recommendation categories (diet, routine, yoga, seasonal) styled in the PrakritiMe brand.

### UX Flow
1. User clicks "Download Report" on the results page
2. A loading state appears ("Preparing your report…")
3. PDF downloads automatically named `prakriti-[resultType]-report.pdf`

### Technical Requirements
- Use skill `anthropic-skills:pdf` or `@react-pdf/renderer` for PDF generation
- New API endpoint: `POST /api/prakriti/report` — accepts result data, returns PDF buffer
- PDF layout: cover page (dosha hero), diet page, routine timeline, yoga poses, seasonal guide
- Include PrakritiMe logo, brand colours, Sanskrit text
- Enable `NEXT_PUBLIC_FEATURE_PDF` flag once ready

---

## 4. Multilingual Support

**Feature flag:** `NEXT_PUBLIC_FEATURE_I18N`  
**Location:** Language switcher in Navbar

### What it does
Full translation of the quiz questions, results, and recommendation content into:
- Hindi (हिन्दी) — primary Indian language target
- Tamil (தமிழ்) — high Ayurveda literacy market
- Telugu (తెలుగు) — secondary Indian market

### Technical Requirements
- Use `next-intl` or `next-i18next` for routing and translation
- All user-facing strings extracted to `/locales/[lang]/*.json`
- `data/questions.json` and `data/recommendations.json` need translated counterparts or an i18n wrapper
- Sanskrit text (Devanagari) stays as-is across all languages
- Language switcher in Navbar — persisted to `localStorage`
- Enable `NEXT_PUBLIC_FEATURE_I18N` flag once translation files are complete

---

## ~~5. Vikriti Assessment~~ ✅ **Shipped in V1**

> Implemented. See `src/pages/vikriti.tsx`, `src/pages/api/vikriti/score.ts`, `data/vikriti-questions.json`, and the Vikriti section on the results page.

---

## ~~[archived] 5. Vikriti Assessment (Current Imbalance)~~

**No feature flag yet — new build**  
**Location:** New page `/vikriti` or as a follow-up step after `/results`

### What it does
Vikriti is a person's **current state of imbalance** — distinct from Prakriti (constitutional type). A healthy person's Vikriti matches their Prakriti. Under stress, poor diet, or seasonal influence, Vikriti diverges.

This assessment asks 10–15 questions focused on **recent and current** symptoms rather than lifelong tendencies:
- "In the last 2 weeks, have you experienced…"
- Digestive issues, sleep disturbances, emotional patterns, skin changes, energy levels

### Output
A Vikriti profile (one of the 7 result types) + a comparison view showing Prakriti vs. Vikriti:
- If they match: "You are currently in balance with your constitution ✓"
- If they diverge: "Your current imbalance is leaning [Vata/Pitta/Kapha] — here's what to focus on now"

The recommendations tab then offers a **"For now" view** (based on Vikriti) alongside the **"Always" view** (based on Prakriti).

### Clinical Importance
This is the most clinically significant V2 feature. Without Vikriti, the app can inadvertently give Pitta recommendations to someone who is constitutionally Pitta but currently in Vata imbalance — potentially worsening the imbalance.

### Technical Requirements
- New quiz: `data/vikriti-questions.json` (10–15 questions, present-focused)
- New page: `/vikriti` with its own quiz flow (reuse `useQuiz` hook)
- New API endpoint: `POST /api/vikriti/score`
- Results page updated: new "Current State" section comparing Prakriti vs. Vikriti
- Vikriti result stored in `sessionStorage.prakriti_vikriti` (alongside existing result)

---

## ~~6. Weighted Scoring Algorithm~~ ✅ **Shipped in V1**

> Implemented. `PrakritiScorer` uses `QUESTION_WEIGHTS` from `prakritiConstants.ts`. Thresholds recalibrated: `TRIDOSHIC_MAX_SPREAD = 5`, `DUAL_MAX_SPREAD = 7` (weighted total = 41). See `docs/technical/DATA_QUESTIONS.md` for the weight table.

---

## ~~[archived] 6. Weighted Scoring Algorithm~~

**No feature flag — backend change**  
**Location:** `src/backend/domain/prakriti/PrakritiScorer.ts`

### What it does
Currently all 25 questions carry equal weight (1 point each). Clinically, physical constitution markers carry more diagnostic weight than behavioural indicators.

### Proposed Weight Tiers
| Weight | Questions | Rationale |
|---|---|---|
| **2x** | Q1–Q5 (Physical Body), Q6–Q7 (Digestion/Bowel) | Sharira Prakriti — highest clinical signal |
| **1.5x** | Q11–Q12 (Sleep), Q16–Q18 (Mind/Emotion core) | Strong constitutional markers |
| **1x** | Q8–Q10, Q13–Q15, Q19–Q25 | Behavioural / lifestyle indicators |

### Technical Requirements
- Add `weight` field to each question in `questions.json`
- Update `PrakritiScorer.score()` to apply weights (`tally[dosha] += weight` instead of `+= 1`)
- Update `_meta.totalQuestions` to reflect total weighted points (not raw question count)
- Update `scoringGuide.resultThresholds` percentages accordingly
- Requires careful re-calibration of `DOSHA_THRESHOLDS` in `prakritiConstants.ts`

---

## 7. Practitioner Mode

**No feature flag yet — new build**  
**Location:** Toggle in quiz page header (UI stub removed in V1, see `quiz.tsx`)

### What it does
A mode for Ayurvedic practitioners administering the quiz on behalf of a patient. Shows:
- Raw V/P/K scores alongside percentages
- All 25 answers in a summary table after completion
- Clinical notes field (practitioner can annotate)
- Option to export the clinical summary as PDF
- No poetic language — clinical terminology throughout results

### Technical Requirements
- Query param or localStorage flag: `?mode=practitioner`
- Separate results layout component: `PractitionerResults.tsx`
- Practitioners sign in with a separate role (requires auth — depends on Feature 2)
- Clinical PDF export (different template from Feature 3)

---

## 8. Seasonal Auto-Detection

**No feature flag — small enhancement**  
**Location:** Seasonal tab in RecommendationTabs

### What it does
Automatically highlights the current season's tab based on the user's date (and optionally location for Southern Hemisphere users). Currently all four seasons show with equal prominence.

### Technical Requirements
- `src/lib/season.ts` — utility: `getCurrentSeason(date: Date, hemisphere: 'north' | 'south'): Season`
- Northern Hemisphere defaults: Mar–May = Spring, Jun–Aug = Summer, Sep–Nov = Autumn, Dec–Feb = Winter
- Pass current season into `RecommendationTabs` as `defaultSeason` prop
- Highlight the current season tab with a "Now" badge
- Optional: detect hemisphere from browser's `Intl.DateTimeFormat().resolvedOptions().timeZone`

---

## 9. OG Image & Social Sharing

**No feature flag — infrastructure task**  
**Location:** `public/og-image.png`, `pages/_document.tsx`

### What it does
Dynamic Open Graph image for social sharing of results. When a user shares their results link, social platforms (WhatsApp, Twitter, LinkedIn) show a preview card with:
- Their dosha type and gradient
- Key traits
- PrakritiMe branding

### Technical Requirements
- Use `@vercel/og` (Edge Runtime image generation) or pre-generated static OG images per dosha type
- 7 static OG images (one per `PrakritiResultType`) stored in `public/og/`
- Or: dynamic route `/api/og?type=Pitta` using `ImageResponse`
- Update `_document.tsx` and `results.tsx` `<Head>` with correct `og:image` tag
- Dimensions: 1200×630px

---

## Priority Order (Remaining)

| Priority | Feature | Rationale |
|---|---|---|
| ✅ Done | Vikriti Assessment (#5) | Shipped in V1 |
| ✅ Done | Weighted Scoring (#6) | Shipped in V1 |
| 🔴 P0 | Seasonal Auto-Detection (#8) | Small lift, high daily relevance |
| 🔴 P0 | OG Image & Social Sharing (#9) | Growth / virality lever |
| 🟠 P1 | Vedic AI Assistant (#1) | Differentiation; requires Claude API integration |
| 🟠 P1 | PDF Report (#3) | High user request likelihood |
| 🟡 P2 | User Profiles (#2) | Retention; prerequisite for Practitioner Mode |
| 🟡 P2 | Practitioner Mode (#7) | B2B / clinical audience |
| 🟢 P3 | Multilingual Support (#4) | Market expansion; depends on translation resources |
