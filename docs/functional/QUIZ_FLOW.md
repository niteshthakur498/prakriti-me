# PrakritiMe — Quiz Flow & Scoring Logic

This document covers the quiz structure, answer collection, scoring algorithm, result classification, and recommendation resolution.

---

## Quiz Structure

```
25 questions
└── 5 sections × 5 questions each
    ├── Section 1 — Physical Body      (Q01–Q05)
    ├── Section 2 — Digestion          (Q06–Q10)
    ├── Section 3 — Sleep & Energy     (Q11–Q15)
    ├── Section 4 — Mind & Emotions    (Q16–Q20)
    └── Section 5 — Lifestyle          (Q21–Q25)
```

Every question has **exactly 3 options**:
- Option A → maps to **Vata (V)**
- Option B → maps to **Pitta (P)**
- Option C → maps to **Kapha (K)**

The mapping is baked into the JSON data (`options[n].dosha`). The UI shows A/B/C labels but never exposes which dosha each option represents.

---

## Answer Collection

Answers are stored in the `useQuiz` hook as an `AnswerMap`:

```typescript
type AnswerMap = Record<string, DoshaSymbol>
// e.g. { Q01: 'V', Q02: 'K', Q03: 'P', ... }
```

Key is the question ID (`Q01`–`Q25`). Value is the dosha symbol (`'V' | 'P' | 'K'`).

The hook exposes `selectAnswer(questionId, dosha)` which is called by `OptionButton.onSelect`. Answers persist in React state for the session.

When `isComplete` becomes true (all 25 answered), `usePrakriti.scoreQuiz(answers)` is called automatically — POSTing the `AnswerMap` to `/api/prakriti/score`.

---

## Scoring Algorithm

### Step 1 — Tally (`PrakritiScorer`)

```typescript
score(answers: AnswerMap): DoshaTally
// { V: number, P: number, K: number }
```

Iterates all 25 answers and increments the corresponding counter. Max total = 25.

**Example:**
```
answers = { Q01:'V', Q02:'V', Q03:'P', Q04:'K', Q05:'V', ... }
→ tally = { V: 15, P: 6, K: 4 }
```

### Step 2 — Resolve result type (`PrakritiResolver`)

```typescript
resolve(tally: DoshaTally): PrakritiResultType
```

Sorts the three doshas by score descending → `[first, second, third]`.

| Condition | Result |
|---|---|
| `first.score − third.score ≤ 3` | `'Tridoshic'` |
| `first.score − second.score ≤ 4` | `'${first}-${second}'` (dual) |
| otherwise | `first.dosha` (pure) |

**Examples:**

| Tally | Spread (1st–3rd) | Top-two gap | Result |
|---|---|---|---|
| V:9, P:8, K:8 | 1 (≤ 3) | — | Tridoshic |
| V:13, P:10, K:2 | 11 | 3 (≤ 4) | Vata-Pitta |
| V:18, P:4, K:3 | 15 | 14 | Vata |
| P:12, K:11, V:2 | 10 | 1 (≤ 4) | Pitta-Kapha |

Threshold constants live in `prakritiConstants.ts` — extend them there without touching scorer/resolver logic (Open/Closed Principle).

### Step 3 — Percentages

```typescript
getPercentages(tally): DoshaPercentages
// { vata: %, pitta: %, kapha: % }  — rounded to nearest integer, sums ≈ 100
```

### Step 4 — Dominant & Secondary

```typescript
getDominantAndSecondary(tally): { dominant: PureDoshaType, secondary: PureDoshaType }
```

Always returns the top two doshas by score regardless of result type. Used for recommendation resolution.

---

## The Seven Result Types

| Result Type | Classification rule | Gradient |
|---|---|---|
| `Vata` | Vata dominates, gap > 4 from Pitta | Blue |
| `Pitta` | Pitta dominates | Coral → amber |
| `Kapha` | Kapha dominates | Forest green |
| `Vata-Pitta` | Vata > Pitta, gap ≤ 4 | Blue → coral |
| `Pitta-Kapha` | Pitta > Kapha, gap ≤ 4 | Amber → green |
| `Vata-Kapha` | Vata > Kapha, gap ≤ 4 | Blue → green |
| `Tridoshic` | All three within 3 points | Saffron → forest |

---

## Recommendation Resolution

`PrakritiService.scoreAndRecommend()` resolves recommendations after scoring:

```
Pure type   → profile + diet/routine/yoga/seasonal all from that dosha's data
Dual type   → profile from dual-dosha record (heroDescription, keyTraits, gradients)
              diet/routine/yoga/seasonal from the DOMINANT pure dosha
Tridoshic   → profile from Tridoshic record
              diet/routine/yoga/seasonal from Vata (default dominant)
```

This design means dual/tridoshic users get a specialised introduction but grounded practical recommendations from the most relevant single dosha.

**V2 plan:** Allow users to toggle between dominant and secondary dosha recommendations on the results page.

---

## Session Storage Contract

On successful scoring, the full `ScoreResponseData` object is serialised and stored:

```typescript
sessionStorage.setItem('prakriti_result', JSON.stringify(scoreResponseData))
```

The results page reads this on mount. If the key is absent, the user is redirected to `/quiz`. No sensitive data is involved — Prakriti results are not personally identifiable.

---

## State Machine (useQuiz)

```
INITIAL
  │  selectAnswer()
  ▼
ANSWERED (canProceed = true)
  │  goNext()
  ▼
TRANSITIONING (isTransitioning = true) ← only at section boundary
  │  1600ms timeout
  ▼
NEXT_QUESTION
  │  ... repeat ...
  ▼
LAST_QUESTION (isLastQuestion = true)
  │  goNext()
  ▼
COMPLETE (isComplete = true)
  │  usePrakriti.scoreQuiz(answers) called automatically
  ▼
LOADING (prakriti.isLoading = true)
  │  API returns
  ▼
REDIRECT → /results
```

Back navigation (`goPrev`) is available from any state except INITIAL and cancels any active transition.
