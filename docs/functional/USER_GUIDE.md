# PrakritiMe — User Guide

This guide walks through the complete experience from landing to results.

---

## What is Prakriti?

**Prakriti** (Sanskrit: प्रकृति) means "innate nature." In Ayurveda — the 5,000-year-old Indian system of medicine — every person is born with a unique combination of three bio-energies called **doshas**:

| Dosha | Elements | Governs |
|---|---|---|
| 🌬️ **Vata** | Air + Space | Movement, creativity, nervous system |
| 🔥 **Pitta** | Fire + Water | Digestion, metabolism, intelligence |
| 🌱 **Kapha** | Earth + Water | Structure, immunity, emotional stability |

Your Prakriti is the ratio of these three doshas fixed at conception. Understanding it helps you make food, lifestyle, and wellness choices that work *with* your nature rather than against it.

---

## Step 1 — Visit the Landing Page

Open [http://localhost:3000](http://localhost:3000) (or the deployed URL).

You'll see:
- A hero section explaining PrakritiMe
- A "Take the Quiz" button (saffron/amber CTA) — click this to begin
- A "What is Prakriti?" button — links to the educational About page
- Trust signals: based on classical texts, trusted by practitioners, 5 min, free

Scroll down to see:
- **Your Path to Balance** — the three steps (Answer → Get Prakriti → Live in Harmony)
- **The Three Doshas** — colour-coded preview cards for Vata, Pitta, Kapha
- **Testimonials** — from real-world user archetypes

---

## Step 2 — Take the Quiz

Click **"Take the Quiz"** to go to `/quiz`.

### Progress bar
At the top you'll always see:
- **Section indicator** — "Section 1 of 5 / Physical Body"
- **Question counter** — "Question 3 of 25"
- **Saffron progress bar** — fills as you advance

### Answering questions
Each question shows three options (A, B, C). Each option corresponds to a dosha (Vata / Pitta / Kapha) but the letters aren't labelled — just pick the one that best describes *you, as you naturally are*, not how you want to be.

> **Tip:** Answer based on your lifelong tendencies, not your current condition or how you behave under stress.

Click any option to select it. The card highlights with a border and ✓ icon. The **Next →** button activates.

### Moving between questions
- **Next →** — advances to the next question (only available after selecting an answer)
- **← Previous** — goes back to change your answer at any time

### Section transitions
After completing all 5 questions in a section, a brief celebration screen appears showing the next section's name and Sanskrit title. This lasts ~1.5 seconds before the next section begins automatically.

### The five sections

**Section 1: Physical Body** *(Sharira Prakriti — शरीर प्रकृति)*
Questions about your natural body frame, skin type, hair texture, joints, and eyes. Think about how you've *always been*, not recent changes.

**Section 2: Digestion & Appetite** *(Agni & Ahara — अग्नि और आहार)*
Questions about your hunger patterns, digestion, food cravings, and how you respond to cold. Agni (digestive fire) is central to Ayurvedic health.

**Section 3: Sleep & Energy** *(Nidra & Shakti — निद्रा और शक्ति)*
Questions about your sleep depth, morning alertness, stamina levels, and your natural peak energy time of day.

**Section 4: Mind & Emotions** *(Manas Prakriti — मानस प्रकृति)*
Questions about how you learn, handle stress, process emotions, and how others perceive your personality.

**Section 5: Lifestyle & Behaviour** *(Achara Prakriti — आचार प्रकृति)*
Questions about how you speak, manage money, move, approach work, and interact socially.

---

## Step 3 — View Your Results

After the final question, the app automatically scores your answers and takes you to `/results`.

### Your Prakriti type
The top of the page shows a gradient banner with your constitution type:

- **Pure types** — Vata, Pitta, or Kapha (one dosha dominates strongly)
- **Dual types** — Vata-Pitta, Pitta-Kapha, or Vata-Kapha (two doshas are close)
- **Tridoshic** — all three doshas in near-perfect balance (rare)

### Dosha Breakdown chart
The animated bar below the hero shows the percentage split across your three doshas. This helps you understand *how much* of each dosha you carry.

### Recommendation Tabs
Click each tab to explore your personalised guidance:

#### 🥗 Diet
- **Key Principles** — the most important dietary rules for your type
- **Favour tastes** — which of the six Ayurvedic tastes to prioritise
- **Reduce tastes** — which tastes aggravate your dominant dosha
- **Favour foods** — 10 specific foods with explanations of *why* they help you
- **Minimize foods** — 6 foods to reduce and why they don't suit your constitution

#### 🌄 Routine (Dinacharya)
- **Guiding principle** — the core habit pattern for your type
- **Daily schedule** — 10 time slots from wake-up to sleep, each with an activity and detailed how-to
- **Weekly practices** — deeper Ayurvedic practices to do 1–2× per week

#### 🧘 Yoga
- **Style and intensity** — which yoga style suits your dosha
- **6 recommended poses** — each with Sanskrit name, benefit, and difficulty level
- **Breathwork** — the best pranayama practice for your constitution
- **What to avoid** — yoga styles that aggravate your type

#### 🍂 Seasonal
- **Spring, Summer, Autumn, Winter** — each season with a focus area and 3–5 practical tips for keeping your doshas balanced as the seasons shift

---

## Understanding Your Result

### Pure Dosha (e.g. Vata)
One dosha scored significantly higher than the others. Your recommendations are tailored entirely to that dosha.

### Dual Dosha (e.g. Vata-Pitta)
Two doshas are close in score. The dominant one is listed first. Recommendations are drawn from the dominant dosha but the hero description reflects both. In V2, you'll be able to toggle between both sets.

### Tridoshic
All three doshas are within 3 points of each other. You are adaptable and resilient. Your main tool for balance is seasonal adjustment — following dosha-specific guidance for whichever dosha is currently elevated by the season.

---

## Retaking the Quiz

Click **"Retake Quiz"** in the sidebar at any time. Your previous result is overwritten in sessionStorage when the new score arrives.

---

## Frequently Asked Questions

**Q: Should I answer based on how I am now, or how I've always been?**
A: Always. Prakriti is your birth constitution — it doesn't change. Answer for your *lifelong* natural tendencies. Ignore recent changes due to illness, diet, or stress.

**Q: What if two options seem equally true?**
A: Pick the one that resonates slightly more. If truly equal, pick either — the overall pattern across 25 questions self-corrects for individual uncertainty.

**Q: Can my Prakriti change over time?**
A: Your Prakriti does not change. What changes is your *Vikriti* (current imbalance). PrakritiMe measures Prakriti (V1). Vikriti assessment is planned for V2.

**Q: Is this medical advice?**
A: No. PrakritiMe provides educational Ayurvedic guidance based on classical texts. It is not a substitute for medical diagnosis or treatment.
