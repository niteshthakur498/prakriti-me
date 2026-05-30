# PrakritiMe — Feature Overview

This document describes every user-facing feature in V1, how it works, and what it gives the user.

---

## 1. Landing Page

**Route:** `/`

### What it does
The landing page is the first impression. It introduces Ayurveda and the concept of Prakriti, previews the three doshas, and guides the user to take the quiz.

### Sections

| Section | Purpose |
|---|---|
| **Navbar** | Fixed glassmorphic bar — PrakritiMe logo + nav links + CTA quiz button |
| **Hero** | Bold headline, subtext, dual CTAs ("Take the Quiz" and "What is Prakriti?"), trust signals (free, 5 min, classical texts) |
| **Your Path to Balance** | Three-step explainer: Answer → Get Prakriti → Live in Harmony |
| **The Three Doshas** | Colour-coded cards (sky blue / orange / green) for Vata, Pitta, Kapha with Sanskrit names and key traits |
| **Testimonials** | Social proof from three user archetypes |
| **Footer** | Navigation links and copyright |

### V2 additions planned
- Hero background illustration (Ayurvedic garden)
- Language switcher in Navbar (EN active, others "Coming Soon")

---

## 2. Prakriti Quiz

**Route:** `/quiz`

### What it does
A 25-question guided assessment that maps the user's physical, digestive, mental, and behavioural traits to one of seven Prakriti types.

### Structure

| Section | Sanskrit | Questions | Focus |
|---|---|---|---|
| 1 — Physical Body | Sharira Prakriti | Q1–Q5 | Body frame, skin, hair, joints, eyes |
| 2 — Digestion & Appetite | Agni & Ahara | Q6–Q10 | Hunger, digestion, food preferences, cold tolerance |
| 3 — Sleep & Energy | Nidra & Shakti | Q11–Q15 | Sleep quality, morning energy, stamina, peak time |
| 4 — Mind & Emotions | Manas Prakriti | Q16–Q20 | Learning style, stress response, dominant emotion |
| 5 — Lifestyle & Behaviour | Achara Prakriti | Q21–Q25 | Speech, finances, movement, work style, social patterns |

### Key interactions
- **Progress bar** — saffron gradient fills as you answer each question
- **Option selection** — clicking highlights the card with a border and ✓ icon; Next button enables
- **Section transitions** — animated celebration screen between sections showing the next section's Sanskrit name and description (1.6 s)
- **Back navigation** — Previous button lets users change answers
- **Completion** — Final question triggers automatic scoring API call, then redirects to `/results`

### Error states
- API failure shows an inline error with a "Try again" button
- Loading state shows a spinning lotus and "Calculating your Prakriti…" message

### V2 planned
- Practitioner Mode toggle (raw score view, clinical detail)
- Progress save (resume later)

---

## 3. Results Page

**Route:** `/results`

### What it does
Displays the user's Prakriti type with a personalised set of recommendations across four domains. The result is read from `sessionStorage` — if absent, redirects to `/quiz`.

### Sections

#### 3.1 Dosha Hero Banner
Full-width gradient banner with:
- Result type label ("Vata-Pitta", "Kapha", etc.)
- Element subtitle ("Air & Fire · Creative and driven")
- Hero description paragraph
- Key trait pills (Creative, Enthusiastic, etc.)

The gradient colour matches the dominant dosha:
- Vata → sky blue to deep blue
- Pitta → coral to amber
- Kapha → forest green

#### 3.2 Dosha Breakdown Chart
Animated stacked horizontal bar showing percentage split across Vata / Pitta / Kapha. Bars animate in on mount via CSS transition (800 ms ease-out). Colour-coded legend below.

#### 3.3 Recommendation Tabs
Four tabs — each a full recommendation panel:

| Tab | Content |
|---|---|
| **Diet** | Key principles, favour/reduce taste guide, 10 favour foods with emoji + reason, 6 minimize foods |
| **Routine** | Guiding principle, 10-slot daily schedule (time / activity / detail), weekly practices |
| **Yoga** | Style + intensity guidance, 6 recommended poses with Sanskrit names + difficulty, breathwork recommendation, what to avoid |
| **Seasonal** | Spring / Summer / Autumn / Winter panels each with focus area and 3–5 actionable tips |

#### 3.4 Morning Ritual Bento
Quick-read call-out with the first routine slot detail and a "Mid-Day Peak" tip card.

#### 3.5 Sidebar
- **Vedic AI Assistant** — coming-soon state with disabled chat input (V2)
- **Share & Save** — Download Report (V2), Save to Profile (V2), Retake Quiz (active)
- **Sanskrit quote** — स्वस्थस्य स्वास्थ्य रक्षणं ("To maintain the health of the healthy")

---

## 4. About Prakriti

**Route:** `/about`

### What it does
An educational page explaining Ayurveda and the three doshas for users who want to understand the science before (or after) taking the quiz.

### Sections

| Section | Content |
|---|---|
| **Hero** | Sanskrit term, headline, one-paragraph summary, CTA to quiz |
| **The Science of Life** | What Ayurveda is, its age and origins, relationship to Prakriti |
| **The Three Doshas** | Deep-dive cards for Vata, Pitta, Kapha — elements, tagline, description, six key qualities |
| **CTA** | Repeat quiz CTA at bottom |

---

## 5. Feature Flags (V2 Touchpoints)

V2 features are gated by environment variables and show locked UI rather than being hidden:

| Flag | `NEXT_PUBLIC_*` var | UI state when off |
|---|---|---|
| AI Chat | `FEATURE_AI_CHAT` | "Coming Soon" badge, disabled input |
| User Profiles | `FEATURE_PROFILES` | "Save to Profile" button disabled (V2 label) |
| PDF Export | `FEATURE_PDF` | "Download Report" button disabled (V2 label) |
| Multilingual | `FEATURE_I18N` | Language toggle coming soon state |

Setting any variable to `"true"` in `.env.local` activates that feature for development.

---

## 6. Accessibility

- All interactive elements have `aria` labels
- Progress bar uses `role="progressbar"` with `aria-valuenow`
- Option buttons use `aria-pressed`
- Dosha chart uses `role="img"` with a descriptive `aria-label`
- `prefers-reduced-motion` media query disables all CSS animations
- Semantic HTML throughout (`<header>`, `<main>`, `<aside>`, `<article>`, `<nav>`, `<footer>`)
