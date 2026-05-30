# PrakritiMe — Project Structure Guide

## Where Do the JSON Files Go?

### ✅ Recommended: `/data/` folder at project root

```
prakriti-app/
│
├── data/                          ← ✅ JSON files live here
│   ├── questions.json             ← 25 quiz questions, 5 sections
│   └── recommendations.json      ← Diet, routine, yoga, seasonal per dosha
│
├── pages/                         ← Next.js pages
│   ├── index.js                   ← Landing page
│   ├── quiz.js                    ← Quiz flow
│   ├── results.js                 ← Results + recommendations
│   └── about.js                   ← What is Prakriti?
│
├── pages/api/                     ← Vercel serverless API routes
│   └── score.js                   ← POST /api/score → returns dosha result
│
├── components/                    ← Reusable UI components
│   ├── QuizCard.jsx               ← Single question card
│   ├── ProgressBar.jsx            ← Quiz progress bar
│   ├── DoshaChart.jsx             ← Dosha % breakdown chart
│   ├── RecommendationTabs.jsx     ← Diet/Routine/Yoga/Seasonal tabs
│   ├── Navbar.jsx
│   └── Footer.jsx
│
├── lib/                           ← Utility functions
│   └── scoring.js                 ← Prakriti scoring logic
│
├── styles/
│   └── globals.css
│
├── public/                        ← Static assets only (images, icons, fonts)
│   ├── favicon.ico
│   └── og-image.png               ← Social sharing preview image
│
├── package.json
├── next.config.js
├── tailwind.config.js
└── vercel.json
```

---

## Why `/data/` and NOT `/public/`?

| Location | Use case | Accessible from |
|---|---|---|
| `/data/` | ✅ JSON used in server-side code | `getStaticProps`, API routes, server components |
| `/public/` | ❌ Only for files that need a URL (images, fonts, downloadable files) | Direct browser URL `yourdomain.com/file.json` |

**The key reason:** If you put JSON in `/public/`, anyone can hit `yourdomain.com/data/recommendations.json` directly in their browser and see all your data. Not harmful here, but not best practice. `/data/` is server-side only.

---

## How to Import the JSON in Next.js

### In a page (getStaticProps — recommended)
```javascript
// pages/quiz.js
import questions from '../data/questions.json'

export async function getStaticProps() {
  return {
    props: {
      sections: questions.sections,
      totalQuestions: questions._meta.totalQuestions
    }
  }
}

export default function QuizPage({ sections, totalQuestions }) {
  // use sections and totalQuestions here
}
```

### In an API route
```javascript
// pages/api/score.js
import recommendations from '../../data/recommendations.json'
import questions from '../../data/questions.json'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { answers } = req.body
  // scoring logic here
  // return dosha result + recommendations
}
```

### In a component (direct import — fine for small data)
```javascript
// components/DoshaCard.jsx
import recommendations from '../data/recommendations.json'

const doshaData = recommendations.doshas['Vata']
```

---

## JSON File Summary

### questions.json
- 25 questions across 5 sections (5 each)
- Each question has 3 options mapping to Vata (V), Pitta (P), or Kapha (K)
- Sections: Physical Body | Digestion | Sleep & Energy | Mind & Emotions | Lifestyle
- Includes scoring guide for calculating results

### recommendations.json  
- Full recommendations for all 7 Prakriti types:
  - 3 pure doshas: Vata, Pitta, Kapha
  - 3 dual doshas: Vata-Pitta, Pitta-Kapha, Vata-Kapha
  - 1 tridoshic
- For each pure dosha:
  - Diet: principles, favor foods (10), minimize foods (6)
  - Routine: daily schedule (10 time slots) + weekly practices
  - Yoga: 6 poses + breathwork + style guidance
  - Seasonal: all 4 seasons with tips
- General principles: Six Tastes (Shad Rasa) + Universal Dinacharya

---

## Scoring Logic (for lib/scoring.js)

```javascript
// lib/scoring.js

export function calculatePrakriti(answers) {
  // answers = { Q01: 'V', Q02: 'K', Q03: 'P', ... }
  
  let scores = { V: 0, P: 0, K: 0 }
  
  Object.values(answers).forEach(dosha => {
    scores[dosha]++
  })
  
  const total = 25
  const vPct = (scores.V / total) * 100
  const pPct = (scores.P / total) * 100
  const kPct = (scores.K / total) * 100
  
  // Determine result type
  const sorted = [
    { dosha: 'Vata', score: scores.V, pct: vPct },
    { dosha: 'Pitta', score: scores.P, pct: pPct },
    { dosha: 'Kapha', score: scores.K, pct: kPct }
  ].sort((a, b) => b.score - a.score)
  
  let resultType = ''
  
  // Tridoshic: all within 3 points of each other
  if (Math.max(scores.V, scores.P, scores.K) - Math.min(scores.V, scores.P, scores.K) <= 3) {
    resultType = 'Tridoshic'
  }
  // Dual: top two within 4 points of each other
  else if (sorted[0].score - sorted[1].score <= 4) {
    resultType = `${sorted[0].dosha}-${sorted[1].dosha}`
  }
  // Pure: top dosha dominates
  else {
    resultType = sorted[0].dosha
  }
  
  return {
    resultType,
    scores: { vata: scores.V, pitta: scores.P, kapha: scores.K },
    percentages: { vata: Math.round(vPct), pitta: Math.round(pPct), kapha: Math.round(kPct) },
    dominant: sorted[0].dosha,
    secondary: sorted[1].dosha
  }
}
```

---

## V2 Extensibility Hooks Already in the Data

The JSON files are structured to support V2 features:

| V2 Feature | Already in data? | Where |
|---|---|---|
| AI Chat about your dosha | ✅ | All descriptions, principles, and tips are AI-prompt-ready |
| Practitioner mode | ✅ | `_meta`, `scoringGuide`, clinical details in descriptions |
| Seasonal rebalancing (auto by month) | ✅ | `seasonal` object in each dosha |
| PDF export of results | ✅ | All structured data maps to a printable report |
| Multilingual support | 🔧 | Add `translations` key to each object in V2 |
| Drug interaction checker | 🔧 | New `herbs.json` file in V2 |
| Patient profiles | 🔧 | Save `calculatePrakriti()` result to DB in V2 |
