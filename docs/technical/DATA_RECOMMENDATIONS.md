# recommendations.json — Structure Reference

**Location:** `data/recommendations.json`  
**Consumed by:** `src/backend/repositories/RecommendationRepository.ts` → `POST /api/prakriti/score`

---

## Top-level shape

```json
{
  "_meta":             { ... },  // editorial metadata, not read by code
  "doshas":            { ... },  // 3 pure dosha profiles (Vata, Pitta, Kapha)
  "dualDoshas":        { ... },  // 4 combination profiles (Vata-Pitta, Pitta-Kapha, Vata-Kapha, Tridoshic)
  "generalPrinciples": { ... }   // universal Ayurvedic reference data, not used in scoring response
}
```

---

## `_meta`

| Field | Type | Purpose |
|---|---|---|
| `version` | string | Schema version (`"1.0.0"`) |
| `description` | string | Free-text source note (classical texts referenced) |
| `categories` | string[] | The four recommendation tabs: `diet`, `routine`, `yoga`, `seasonal` |
| `doshaTypes` | string[] | All 7 valid result type keys |

---

## `doshas` — the 3 pure dosha profiles

Keys are `"Vata"`, `"Pitta"`, `"Kapha"` (capitalized, matching `PrakritiResultType`).

### Pure dosha profile shape

```json
"Vata": {
  "id":                  "vata",
  "name":                "Vata",
  "sanskrit":            "वात",
  "elements":            ["Air", "Space"],
  "elementsEmoji":       ["🌬️", "🌌"],
  "primaryColor":        "#7EC8E3",
  "secondaryColor":      "#B0C4DE",
  "gradientFrom":        "#7EC8E3",
  "gradientTo":          "#4A90D9",
  "icon":                "🌬️",
  "tagline":             "The force of movement and creativity",
  "heroDescription":     "...",
  "keyTraits":           ["Creative", "Enthusiastic", ...],
  "balancedQualities":   ["...", ...],
  "imbalancedQualities": ["...", ...],
  "famousVataTypes":     "Artists, writers, dancers...",

  "diet":     { ... },
  "routine":  { ... },
  "yoga":     { ... },
  "seasonal": { ... }
}
```

#### Identity fields

| Field | Type | Used in UI |
|---|---|---|
| `id` | string | Lowercase slug (`"vata"`) |
| `name` | string | Display name |
| `sanskrit` | string | Devanagari script — shown in DoshaHero |
| `elements` | string[] | Two elemental forces (e.g., `["Air", "Space"]`) |
| `elementsEmoji` | string[] | Emoji per element, parallel to `elements` |
| `primaryColor` | hex string | Main brand color for this dosha |
| `secondaryColor` | hex string | Accent color |
| `gradientFrom` / `gradientTo` | hex strings | CSS gradient endpoints for hero section |
| `icon` | string | Single emoji representing the dosha |
| `tagline` | string | One-line essence statement |
| `heroDescription` | string | 3–5 sentence paragraph shown prominently in results |
| `keyTraits` | string[] | 5 adjectives shown as chips |
| `balancedQualities` | string[] | What this dosha looks like in balance (5 items) |
| `imbalancedQualities` | string[] | What imbalance looks like (5 items) |
| `famousVataTypes` | string | Comma-separated archetypes (note: field is `famousVataTypes` on all three doshas — this is a copy-paste inconsistency in the data, not a bug the app relies on) |

---

### `diet` sub-object

```json
"diet": {
  "principles":     ["...", ...],
  "tastes": {
    "favor":  ["Sweet", "Sour", "Salty"],
    "reduce": ["Bitter", "Astringent", "Pungent"]
  },
  "favorFoods":    [ { "name": "...", "emoji": "...", "reason": "..." }, ... ],
  "minimizeFoods": [ { "name": "...", "emoji": "...", "reason": "..." }, ... ]
}
```

| Field | Type | Notes |
|---|---|---|
| `principles` | string[] | 5 dietary guiding principles for this dosha |
| `tastes.favor` | string[] | Tastes that pacify this dosha (from the 6 Ayurvedic tastes) |
| `tastes.reduce` | string[] | Tastes that aggravate this dosha |
| `favorFoods` | FoodItem[] | ~10 foods to eat more of |
| `minimizeFoods` | FoodItem[] | ~6 foods to eat less of |

**FoodItem shape:**

| Field | Type | Notes |
|---|---|---|
| `name` | string | Food name displayed in UI |
| `emoji` | string | Visual icon |
| `reason` | string | One-sentence explanation why this food helps/harms |

---

### `routine` sub-object

```json
"routine": {
  "principle": "...",
  "daily": [
    {
      "time":     "6:00 AM",
      "activity": "Abhyanga — warm sesame oil self-massage",
      "detail":   "10–15 min full body massage...",
      "emoji":    "🫙"
    },
    ...
  ],
  "weeklyPractices": ["...", ...]
}
```

| Field | Type | Notes |
|---|---|---|
| `principle` | string | The overarching routine philosophy for this dosha |
| `daily` | RoutineItem[] | 10 time-stamped daily activities |
| `weeklyPractices` | string[] | 4 supplementary weekly habits |

**RoutineItem shape:**

| Field | Type | Notes |
|---|---|---|
| `time` | string | Clock time as display string (e.g., `"6:00 AM"`) |
| `activity` | string | Short activity name / title |
| `detail` | string | 1–2 sentence explanation |
| `emoji` | string | Visual icon |

---

### `yoga` sub-object

```json
"yoga": {
  "principle":  "...",
  "style":      "Slow Flow, Yin Yoga, or Hatha",
  "intensity":  "Low to moderate — avoid vigorous or fast-paced styles",
  "poses": [
    {
      "name":       "Mountain Pose",
      "sanskrit":   "Tadasana",
      "benefit":    "Grounds Vata's airy nature, builds stability",
      "difficulty": "Beginner",
      "emoji":      "⛰️"
    },
    ...
  ],
  "breathwork": "...",
  "avoid":      "..."
}
```

| Field | Type | Notes |
|---|---|---|
| `principle` | string | Core yoga philosophy for this dosha |
| `style` | string | Recommended yoga style name(s) |
| `intensity` | string | Qualitative intensity guidance |
| `poses` | Pose[] | 6 recommended poses |
| `breathwork` | string | Recommended pranayama practice with brief description |
| `avoid` | string | Yoga styles or practices to avoid |

**Pose shape:**

| Field | Type | Notes |
|---|---|---|
| `name` | string | English pose name |
| `sanskrit` | string | Sanskrit name |
| `benefit` | string | Why this pose helps this dosha specifically |
| `difficulty` | string | `"Beginner"` or `"Intermediate"` |
| `emoji` | string | Visual icon |

---

### `seasonal` sub-object

Contains an entry for each of the 4 seasons. The key names are lowercase season names.

```json
"seasonal": {
  "autumn": {
    "season":    "Autumn",
    "emoji":     "🍂",
    "vataLevel": "High",
    "focus":     "This is peak Vata season...",
    "tips":      ["...", ...]
  },
  "winter":  { ... },
  "spring":  { ... },
  "summer":  { ... }
}
```

| Field | Type | Notes |
|---|---|---|
| `season` | string | Display name (`"Autumn"`, `"Winter"`, `"Spring"`, `"Summer"`) |
| `emoji` | string | Season icon |
| `vataLevel` / `pittaLevel` / `kaphaLevel` | string | Risk level for this dosha in this season (e.g., `"High"`, `"Low-Moderate"`). Field name varies by dosha — only the relevant dosha's level field is present. |
| `focus` | string | One-sentence seasonal orientation |
| `tips` | string[] | 4–5 actionable seasonal tips |

> **Note on field naming:** The risk-level field is named after the dosha (`vataLevel`, `pittaLevel`, `kaphaLevel`). Each pure dosha profile only carries its own risk-level field across all four seasons.

---

## `dualDoshas` — 4 combination profiles

Keys are `"Vata-Pitta"`, `"Pitta-Kapha"`, `"Vata-Kapha"`, `"Tridoshic"`.

These profiles are **leaner than pure dosha profiles**. They contain identity and guidance fields, but **no full `diet`, `routine`, `yoga`, or `seasonal` sub-objects**. The application resolves those categories from the dominant pure dosha's profile instead (see `PrakritiService`).

### Dual dosha profile shape

```json
"Vata-Pitta": {
  "id":                     "vata-pitta",
  "name":                   "Vata-Pitta",
  "sanskrit":               "वात-पित्त",
  "icon":                   "🌬️🔥",
  "gradientFrom":           "#7EC8E3",
  "gradientTo":             "#FF6B6B",
  "tagline":                "The spark of creative fire",
  "heroDescription":        "...",
  "keyTraits":              ["Creative", "Sharp", ...],
  "primaryBalance":         "Ground the Vata, cool the Pitta...",
  "keyPractices":           ["...", ...],
  "seasonalPriority":       "Watch autumn (Vata rises) and summer (Pitta rises) most carefully",
  "seeFullRecommendationsFor": ["Vata", "Pitta"]
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | string | Lowercase hyphenated slug (`"vata-pitta"`) |
| `name` | string | Display name |
| `sanskrit` | string | Devanagari script |
| `icon` | string | Combined emoji string |
| `gradientFrom` / `gradientTo` | hex strings | CSS gradient endpoints |
| `tagline` | string | One-line essence statement |
| `heroDescription` | string | 4–6 sentence paragraph for results hero |
| `keyTraits` | string[] | 5 adjectives shown as chips |
| `primaryBalance` | string | The single most important balance principle for this combination |
| `keyPractices` | string[] | 5 specific practices combining both doshas' needs |
| `seasonalPriority` | string | Which seasons to watch most carefully |
| `seeFullRecommendationsFor` | string[] | Array of pure dosha keys whose full profiles supply the diet/routine/yoga/seasonal tabs |

### The 4 dual/combination profiles

| Key | `seeFullRecommendationsFor` | Seasonal watch seasons |
|---|---|---|
| `Vata-Pitta` | `["Vata", "Pitta"]` | Autumn (Vata), Summer (Pitta) |
| `Pitta-Kapha` | `["Pitta", "Kapha"]` | Summer (Pitta), Spring (Kapha) |
| `Vata-Kapha` | `["Vata", "Kapha"]` | Autumn/Winter (both) |
| `Tridoshic` | `["Vata", "Pitta", "Kapha"]` | All seasons — follow whichever dosha is rising |

---

## `generalPrinciples`

Universal reference data about Ayurveda. **Not used by the scoring API response** — present for completeness and potential future use (e.g., an educational section).

### `sixTastes`

Describes the 6 Ayurvedic tastes (Shad Rasa) and which doshas they increase or decrease.

```json
{
  "name":      "Sweet",
  "sanskrit":  "Madhura",
  "elements":  "Earth + Water",
  "increases": ["Kapha"],
  "decreases": ["Vata", "Pitta"],
  "examples":  "Rice, milk, ghee, sweet fruits"
}
```

### `dinacharya`

9 universal daily practices (Dinacharya) recommended for all dosha types, each with a one-line benefit.

---

## How the application resolves recommendations

```
POST /api/prakriti/score
  → PrakritiScorer tallies V/P/K scores from answers
  → PrakritiResolver determines PrakritiResultType ("Vata", "Pitta-Kapha", etc.)
  → PrakritiService.getRecommendations(resultType)
      If pure dosha (Vata / Pitta / Kapha):
        → Returns doshas[resultType] directly (all 4 categories present)
      If dual/Tridoshic (e.g., "Vata-Pitta"):
        → heroDescription and keyTraits from dualDoshas["Vata-Pitta"]
        → diet / routine / yoga / seasonal from doshas["Vata"] (dominant dosha)
```

---

## Rules for editing this file

- **Keys must match `PrakritiResultType`** exactly: `Vata`, `Pitta`, `Kapha`, `Vata-Pitta`, `Pitta-Kapha`, `Vata-Kapha`, `Tridoshic`. Changing a key name is a breaking change.
- **Pure dosha profiles must have all 4 categories:** `diet`, `routine`, `yoga`, `seasonal` are required — they are the fallback source for dual dosha types.
- **Dual dosha profiles must NOT have `diet`/`routine`/`yoga`/`seasonal`:** The service reads those from pure dosha profiles. Adding them to dual profiles would be dead data.
- **`seeFullRecommendationsFor` order matters:** The first entry is the dominant dosha whose full recommendations are shown.
- **Hex colors must be valid** — they are used directly in inline CSS.
- **`seasonal` must have all 4 season keys:** `autumn`, `winter`, `spring`, `summer`. Missing a key causes a runtime error when that season's tab is opened.
- **FoodItem / Pose / RoutineItem arrays** have no enforced length, but the UI is designed around ~10 favor foods, ~6 minimize foods, 6 poses, 10 daily routine items, and 4 weekly practices.
- **JSON validity:** Run `npx tsc --noEmit` after editing to catch shape mismatches.
