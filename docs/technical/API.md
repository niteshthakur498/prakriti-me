# PrakritiMe — API Reference

Base URL: `http://localhost:3000` (dev) / `https://your-domain.vercel.app` (prod)

All responses follow a standard envelope:

```typescript
// Success
{ "success": true, "data": T }

// Error
{ "success": false, "error": string, "code": string }
```

---

## GET `/api/quiz/questions`

Returns all 25 quiz questions grouped by section.

### Request

```http
GET /api/quiz/questions
```

No query parameters. No request body.

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "sections": [
      {
        "id": "physical_body",
        "sectionNumber": 1,
        "title": "Physical Body",
        "sanskritTitle": "Sharira Prakriti",
        "sanskrit": "शरीर प्रकृति",
        "description": "Your natural physical traits...",
        "emoji": "🌿",
        "color": "#F4A023",
        "questions": [
          {
            "id": "Q01",
            "sectionId": "physical_body",
            "questionNumber": 1,
            "text": "How would you describe your natural body frame?",
            "hint": "Think about how you've been built since childhood...",
            "options": [
              { "id": "Q01A", "dosha": "V", "text": "Thin and light...", "shortLabel": "Thin & light" },
              { "id": "Q01B", "dosha": "P", "text": "Medium and athletic...", "shortLabel": "Medium & athletic" },
              { "id": "Q01C", "dosha": "K", "text": "Broad and sturdy...", "shortLabel": "Broad & sturdy" }
            ]
          }
          // ... 4 more questions in this section
        ]
      }
      // ... 4 more sections
    ],
    "totalQuestions": 25,
    "meta": {
      "version": "1.0.0",
      "totalQuestions": 25,
      "sections": 5,
      "questionsPerSection": 5,
      "scoring": { "vata": "V", "pitta": "P", "kapha": "K" },
      "notes": "..."
    }
  }
}
```

### Error responses

| Status | Code | When |
|---|---|---|
| `405` | `METHOD_NOT_ALLOWED` | Non-GET request |
| `500` | `INTERNAL_ERROR` | Unexpected server error |

---

## POST `/api/prakriti/score`

Scores a completed quiz and returns the Prakriti result with full recommendations.

### Request

```http
POST /api/prakriti/score
Content-Type: application/json
```

```json
{
  "answers": {
    "Q01": "V",
    "Q02": "P",
    "Q03": "K",
    "Q04": "V",
    "Q05": "V",
    "Q06": "K",
    "Q07": "P",
    "Q08": "V",
    "Q09": "K",
    "Q10": "V",
    "Q11": "P",
    "Q12": "V",
    "Q13": "K",
    "Q14": "V",
    "Q15": "P",
    "Q16": "V",
    "Q17": "K",
    "Q18": "V",
    "Q19": "P",
    "Q20": "V",
    "Q21": "K",
    "Q22": "V",
    "Q23": "P",
    "Q24": "V",
    "Q25": "K"
  }
}
```

**`answers`** — required. A map of question ID → dosha symbol. Values must be `"V"`, `"P"`, or `"K"`.

### Response — 200 OK

```json
{
  "success": true,
  "data": {
    "resultType": "Vata",
    "scores": {
      "vata": 14,
      "pitta": 7,
      "kapha": 4
    },
    "percentages": {
      "vata": 56,
      "pitta": 28,
      "kapha": 16
    },
    "dominant": "Vata",
    "secondary": "Pitta",
    "recommendations": {
      "profile": {
        "name": "Vata",
        "sanskrit": "वात",
        "icon": "🌬️",
        "tagline": "The force of movement and creativity",
        "heroDescription": "You are the wind — ever-moving...",
        "keyTraits": ["Creative", "Enthusiastic", "Quick-minded", "Sensitive", "Adaptable"],
        "gradientFrom": "#7EC8E3",
        "gradientTo": "#4A90D9",
        "primaryColor": "#7EC8E3",
        "secondaryColor": "#B0C4DE"
      },
      "diet": {
        "principles": ["Eat warm, cooked, oily, and nourishing foods", "..."],
        "tastes": {
          "favor": ["Sweet", "Sour", "Salty"],
          "reduce": ["Bitter", "Astringent", "Pungent"]
        },
        "favorFoods": [
          { "name": "Warm milk with ghee", "emoji": "🥛", "reason": "Deeply nourishing..." }
          // ... 9 more
        ],
        "minimizeFoods": [
          { "name": "Cold drinks and ice", "emoji": "🧊", "reason": "Aggravates Vata's cold quality" }
          // ... 5 more
        ]
      },
      "routine": {
        "principle": "Regularity is medicine for Vata...",
        "daily": [
          { "time": "6:00 AM", "activity": "Wake up", "detail": "...", "emoji": "🌄" }
          // ... 9 more
        ],
        "weeklyPractices": ["Shirodhara or head oil massage once a week", "..."]
      },
      "yoga": {
        "principle": "Slow, grounding, and warming poses...",
        "style": "Slow Flow, Yin Yoga, or Hatha",
        "intensity": "Low to moderate",
        "poses": [
          { "name": "Mountain Pose", "sanskrit": "Tadasana", "benefit": "...", "difficulty": "Beginner", "emoji": "⛰️" }
          // ... 5 more
        ],
        "breathwork": "Nadi Shodhana...",
        "avoid": "Avoid Bikram/hot yoga..."
      },
      "seasonal": {
        "spring": { "season": "Spring", "emoji": "🌸", "focus": "...", "tips": ["..."] },
        "summer": { "season": "Summer", "emoji": "☀️", "focus": "...", "tips": ["..."] },
        "autumn": { "season": "Autumn", "emoji": "🍂", "focus": "...", "tips": ["..."] },
        "winter": { "season": "Winter", "emoji": "❄️", "focus": "...", "tips": ["..."] }
      }
    }
  }
}
```

### Error responses

| Status | Code | When |
|---|---|---|
| `400` | `INVALID_ANSWERS` | `answers` is missing, not an object, or contains values other than `V`/`P`/`K` |
| `405` | `METHOD_NOT_ALLOWED` | Non-POST request |
| `500` | `INTERNAL_ERROR` | Unexpected server error |

### Error body example

```json
{
  "success": false,
  "error": "Invalid answers — must be a map of question IDs to dosha symbols (V/P/K)",
  "code": "INVALID_ANSWERS"
}
```

---

## Scoring Logic (summary)

The POST endpoint applies this algorithm internally:

```
1. Tally: count V, P, K answers  →  { V: n, P: n, K: n }
2. Sort by score descending       →  [first, second, third]
3. Classify:
   - spread (first − third) ≤ 3  → Tridoshic
   - gap (first − second)   ≤ 4  → Dual: "${first}-${second}"
   - otherwise                   → Pure: first.dosha
4. Compute percentages (rounded to nearest integer)
5. Resolve recommendations for result type
```

See [`docs/functional/QUIZ_FLOW.md`](../functional/QUIZ_FLOW.md) for the full algorithm detail.

---

## API Client (frontend)

The `apiClient` in `src/lib/apiClient.ts` wraps `fetch`:

```typescript
import { apiClient } from '@/lib/apiClient'

// GET
const res = await apiClient.get<QuestionsResponseData>('/api/quiz/questions')
if (res.success) console.log(res.data.sections)

// POST
const res = await apiClient.post<ScoreResponseData>('/api/prakriti/score', { answers })
if (res.success) console.log(res.data.resultType)
```

Both methods return `ApiResponse<T>` — a discriminated union that forces checking `success` before accessing `data`.
