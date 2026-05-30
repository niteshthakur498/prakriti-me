# 🪷 PrakritiMe

> **Discover your nature. Live in harmony.**

PrakritiMe is an Ayurveda-based **Prakriti (mind-body constitution) discovery app**. Users take a 25-question quiz and receive a personalised health profile — covering diet, daily routine, yoga, and seasonal living — based on their dominant dosha (Vata, Pitta, or Kapha).

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

---

## ✨ Features

| Feature | Status |
|---|---|
| 25-question Prakriti quiz across 5 sections | ✅ V1 |
| Section transition animations | ✅ V1 |
| Dosha scoring — 7 result types | ✅ V1 |
| Animated dosha breakdown chart | ✅ V1 |
| Diet recommendations (favour / minimize) | ✅ V1 |
| Daily routine (Dinacharya) | ✅ V1 |
| Yoga poses + breathwork | ✅ V1 |
| Seasonal living guide | ✅ V1 |
| About Prakriti educational page | ✅ V1 |
| Vedic AI Assistant (personalised chat) | 🔒 V2 |
| User profiles & saved results | 🔒 V2 |
| PDF export of results | 🔒 V2 |
| Multilingual support (Hindi, Tamil, Telugu) | 🔒 V2 |

---

## 🏃 Quick Start

```bash
# Clone
git clone https://github.com/niteshthakur498/prakriti-me.git
cd prakriti-me

# Install
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.local.example` → `.env.local` (or create it):

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=PrakritiMe
NEXT_PUBLIC_FEATURE_AI_CHAT=false
NEXT_PUBLIC_FEATURE_PROFILES=false
NEXT_PUBLIC_FEATURE_PDF=false
NEXT_PUBLIC_FEATURE_I18N=false
```

---

## 🗂️ Project Structure

```
prakriti-me/
├── data/                        ← JSON data (server-side only)
│   ├── questions.json           ← 25 quiz questions across 5 sections
│   └── recommendations.json    ← Diet/routine/yoga/seasonal for all 7 types
│
├── src/
│   ├── types/index.ts           ← All shared TypeScript types
│   ├── backend/                 ← 🔴 Backend boundary (no React/Next imports)
│   │   ├── domain/              ← Business logic (Scorer, Resolver, Validator)
│   │   ├── repositories/        ← Data access (JSON → typed models)
│   │   ├── services/            ← Orchestration (QuizService, PrakritiService)
│   │   ├── controllers/         ← HTTP handlers (thin wrappers)
│   │   └── middleware/          ← Error handling, validation, CORS
│   ├── pages/                   ← Next.js pages + API routes
│   ├── components/              ← React components (layout / quiz / results / landing)
│   ├── hooks/                   ← useQuiz, usePrakriti, V2 stubs
│   ├── lib/                     ← apiClient, feature flags, animations
│   └── styles/                  ← globals.css, tokens.css
│
├── docs/
│   ├── functional/              ← User guide, feature overview, quiz flow
│   └── technical/              ← Architecture, API, data models, dev setup
│
└── ui-design-artifacts/         ← Stitch design exports (visual reference)
```

---

## 🧬 The Seven Prakriti Types

| Type | Elements | Description |
|---|---|---|
| **Vata** | Air + Space | Creative, light, enthusiastic |
| **Pitta** | Fire + Water | Focused, intense, intelligent |
| **Kapha** | Earth + Water | Calm, strong, compassionate |
| **Vata-Pitta** | Air + Fire | Creative and driven |
| **Pitta-Kapha** | Fire + Earth | Determined and grounded |
| **Vata-Kapha** | Air + Earth | Creative and caring |
| **Tridoshic** | All five | Rare balanced constitution |

---

## 🛠️ Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (Pages Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS + CSS custom properties |
| Data | Local JSON files — no database in V1 |
| API | Next.js API Routes (BFF pattern) |
| Fonts | Playfair Display, Inter, Noto Serif Devanagari |
| Deployment | Vercel (region: `bom1` — Mumbai) |

---

## 📡 API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/quiz/questions` | Returns all 25 questions grouped by section |
| `POST` | `/api/prakriti/score` | Scores answers, returns result + recommendations |

See [`docs/technical/API.md`](docs/technical/API.md) for full request/response shapes.

---

## 🏗️ Architecture

The backend is structured to be **extractable** — it has zero Next.js or React imports. Swapping from JSON files to a database, or moving the whole backend to Express/Fastify, requires changing only the repository implementations and the `apiClient` base URL.

See [`docs/technical/ARCHITECTURE.md`](docs/technical/ARCHITECTURE.md) for the full design.

---

## 📚 Documentation

| Doc | Description |
|---|---|
| [Feature Overview](docs/functional/FEATURE_OVERVIEW.md) | What each feature does for the user |
| [User Guide](docs/functional/USER_GUIDE.md) | End-to-end walkthrough for users |
| [Quiz Flow](docs/functional/QUIZ_FLOW.md) | Scoring logic, result types, section structure |
| [Architecture](docs/technical/ARCHITECTURE.md) | SOLID design, data flow, folder boundaries |
| [API Reference](docs/technical/API.md) | Endpoint contracts, request/response shapes |
| [Data Models](docs/technical/DATA_MODELS.md) | TypeScript types + JSON schema |
| [Development Setup](docs/technical/DEVELOPMENT_SETUP.md) | Local setup, scripts, environment |

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit: `git commit -m "feat: add your feature"`
4. Push and open a Pull Request

---

## 📄 License

MIT © 2024 PrakritiMe
