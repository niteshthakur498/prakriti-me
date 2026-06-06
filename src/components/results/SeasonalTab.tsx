import type { SeasonalRecommendation, SeasonTips, Season } from '@/types'

interface SeasonalTabProps {
  seasonal: SeasonalRecommendation
  currentSeason?: Season
}

interface SeasonEntry {
  key: keyof SeasonalRecommendation
  label: string
}

const SEASON_ORDER: SeasonEntry[] = [
  { key: 'spring', label: 'Spring' },
  { key: 'summer', label: 'Summer' },
  { key: 'autumn', label: 'Autumn' },
  { key: 'winter', label: 'Winter' },
]

export function SeasonalTab({ seasonal, currentSeason }: SeasonalTabProps): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {SEASON_ORDER.map(({ key }) => {
          const season = seasonal[key] as SeasonTips
          const isCurrent = currentSeason === key
          return (
            <div
              key={key}
              className={`relative bg-surface rounded-xl p-5 sun-shadow transition-all ${
                isCurrent
                  ? 'border-2 border-tertiary ring-1 ring-tertiary/30'
                  : 'border border-outline-variant'
              }`}
            >
              {isCurrent && (
                <span className="absolute top-3 right-3 bg-tertiary text-on-tertiary text-[10px] font-bold px-2 py-0.5 rounded-full leading-none uppercase tracking-wide">
                  Now
                </span>
              )}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{season.emoji}</span>
                <div>
                  <h3 className="font-display text-headline-md font-semibold text-on-surface">{season.season}</h3>
                  <p className="text-label-md text-primary font-semibold">{season.focus}</p>
                </div>
              </div>
              <ul className="space-y-1">
                {season.tips.map((tip: string) => (
                  <li key={tip} className="flex items-start gap-2 text-body-md text-on-surface-variant">
                    <span className="text-primary mt-1 flex-shrink-0">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
