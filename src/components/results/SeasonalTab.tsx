import type { SeasonalRecommendation, SeasonTips } from '@/types'

interface SeasonalTabProps {
  seasonal: SeasonalRecommendation
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

export function SeasonalTab({ seasonal }: SeasonalTabProps): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {SEASON_ORDER.map(({ key }) => {
          const season = seasonal[key] as SeasonTips
          return (
            <div key={key} className="bg-surface border border-outline-variant rounded-xl p-5 sun-shadow">
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
