# questions.json — Structure Reference

**Location:** `data/questions.json`  
**Consumed by:** `src/backend/repositories/QuestionRepository.ts` → `GET /api/quiz/questions`

---

## Top-level shape

```json
{
  "_meta":        { ... },   // editorial metadata, not read by code
  "sections":     [ ... ],   // 5 section objects (the actual quiz data)
  "scoringGuide": { ... }    // human-readable scoring summary, not read by code
}
```

Only `sections` is used at runtime. `_meta` and `scoringGuide` exist for documentation purposes inside the file.

---

## `_meta`

| Field | Type | Purpose |
|---|---|---|
| `version` | string | Schema version (`"1.0.0"`) |
| `totalQuestions` | number | Must equal sum of all questions across all sections (25) |
| `sections` | number | Number of section objects (5) |
| `questionsPerSection` | number | Expected questions per section (5) |
| `scoring.vata/pitta/kapha` | string | The letter codes used in each option's `dosha` field (`"V"`, `"P"`, `"K"`) |
| `notes` | string | Free-text description of how scoring works |

---

## `sections` — array of Section objects

There are exactly **5 sections**. Order matters — questions are displayed in the order they appear here.

### Section object

```json
{
  "id":             "physical_body",
  "sectionNumber":  1,
  "title":          "Physical Body",
  "sanskritTitle":  "Sharira Prakriti",
  "sanskrit":       "शरीर प्रकृति",
  "description":    "Your natural physical traits...",
  "emoji":          "🌿",
  "color":          "#F4A023",
  "questions":      [ ... ]
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | string | Unique snake_case identifier. Referenced in each child question's `sectionId`. |
| `sectionNumber` | number | 1-based display order. Should match position in the array. |
| `title` | string | Displayed in UI — section header |
| `sanskritTitle` | string | English transliteration of the Sanskrit name |
| `sanskrit` | string | Devanagari script label (displayed in UI) |
| `description` | string | Shown beneath the section title to orient the user |
| `emoji` | string | Icon shown with the section header |
| `color` | string | Hex color used for section theming in UI |
| `questions` | array | Exactly 5 Question objects (see below) |

### The 5 sections

| `sectionNumber` | `id` | `title` |
|---|---|---|
| 1 | `physical_body` | Physical Body |
| 2 | `digestion` | Digestion & Appetite |
| 3 | `sleep_energy` | Sleep & Energy |
| 4 | `mind_emotions` | Mind & Emotions |
| 5 | `lifestyle` | Lifestyle & Behaviour |

---

## `questions` — array of Question objects

Each section has exactly **5 questions**, giving 25 questions total.

### Question object

```json
{
  "id":             "Q01",
  "sectionId":      "physical_body",
  "questionNumber": 1,
  "text":           "How would you describe your natural body frame?",
  "hint":           "Think about how you've been built since childhood...",
  "options":        [ ... ]
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | string | Globally unique. Format: `Q` + zero-padded 2-digit number (`Q01`–`Q25`). |
| `sectionId` | string | Must match the parent section's `id`. |
| `questionNumber` | number | Global 1-based number (1–25). |
| `text` | string | The actual question displayed to the user. |
| `hint` | string | Optional clarifying prompt shown in smaller text. Not all questions have this. |
| `options` | array | Exactly 3 Option objects — one per dosha. |

---

## `options` — array of Option objects (always 3)

Each question has exactly **3 options**, one for each dosha. The three options must appear in the order **V → P → K** (Vata first, Pitta second, Kapha third).

### Option object

```json
{
  "id":         "Q01A",
  "dosha":      "V",
  "text":       "Thin and light — I find it hard to gain weight...",
  "shortLabel": "Thin & light"
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | string | Globally unique. Format: parent question ID + suffix `A`/`B`/`C` (e.g., `Q01A`, `Q01B`, `Q01C`). |
| `dosha` | string | **`"V"`**, **`"P"`**, or **`"K"`**. This is what the scorer tallies. Must match the codes in `_meta.scoring`. |
| `text` | string | Full option text — conversational, first-person. Aim for 1–2 sentences. |
| `shortLabel` | string | Condensed label (3–5 words). Used in compact result views. |

### Dosha-to-option mapping

| Option suffix | Dosha code | Dosha name |
|---|---|---|
| `A` | `V` | Vata |
| `B` | `P` | Pitta |
| `C` | `K` | Kapha |

This is a convention, not enforced by code — but must be kept consistent across all questions so reviewers can scan the file predictably.

---

## `scoringGuide`

Human-readable description of result thresholds. **Not read by the application at runtime** — the actual thresholds are in `src/backend/domain/prakriti/prakritiConstants.ts`.

```json
{
  "method": "tally",
  "totalPoints": 25,
  "resultThresholds": {
    "pureDosha":  "One dosha scores >= 60% (15+ points)",
    "dualDosha":  "Two doshas each score >= 30% and within 15 points of each other",
    "tridoshic":  "All three doshas score between 7-10 points (within 3 points of each other)"
  },
  "resultTypes": ["Vata", "Pitta", "Kapha", "Vata-Pitta", "Pitta-Kapha", "Vata-Kapha", "Tridoshic"]
}
```

---

## How the scorer uses this file

1. The user selects one option per question — each selection captures that option's `dosha` value (`V`, `P`, or `K`).
2. `PrakritiScorer.score()` tallies the V, P, K counts across all 25 answers.
3. `PrakritiResolver.resolve()` compares the tallies against thresholds in `prakritiConstants.ts` to produce the final `PrakritiResultType`.

The file itself plays no role in scoring logic beyond providing the `dosha` letter on each option.

---

## Rules for editing this file

- **Question count:** Always 25 total (5 sections × 5 questions). Changing this requires updating `_meta.totalQuestions` and any hardcoded totals in the frontend.
- **Option count:** Always exactly 3 per question — one `V`, one `P`, one `K`.
- **IDs must be unique:** `Q01`–`Q25` for questions; `Q01A/B/C` through `Q25A/B/C` for options.
- **`sectionId` must match:** Each question's `sectionId` must equal its parent section's `id`.
- **`dosha` values:** Only `"V"`, `"P"`, or `"K"`. Any other value causes a scoring bug.
- **Option order convention:** Always V first (`A`), P second (`B`), K third (`C`) for reviewer consistency.
- **JSON validity:** Run `npx tsc --noEmit` after editing — TypeScript will catch shape mismatches against the imported type.
