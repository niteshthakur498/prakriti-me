import { useState } from 'react'
import type { ScoreResponseData, Season } from '@/types'
import { useTranslations } from 'next-intl'
import { DietTab } from './DietTab'
import { RoutineTab } from './RoutineTab'
import { YogaTab } from './YogaTab'
import { SeasonalTab } from './SeasonalTab'

interface RecommendationTabsProps {
  recommendations: ScoreResponseData['recommendations']
  currentSeason?: Season
}

type TabKey = 'diet' | 'routine' | 'yoga' | 'seasonal'

const TABS: Array<{ key: TabKey; label: string; emoji: string }> = [
  { key: 'diet',     label: 'Diet',     emoji: '🥗' },
  { key: 'routine',  label: 'Routine',  emoji: '🌄' },
  { key: 'yoga',     label: 'Yoga',     emoji: '🧘' },
  { key: 'seasonal', label: 'Seasonal', emoji: '🍂' },
]

export function RecommendationTabs({ recommendations, currentSeason }: RecommendationTabsProps): JSX.Element {
  const [active, setActive] = useState<TabKey>('diet')
  const t = useTranslations('results')

  const TAB_LABELS: Record<TabKey, string> = {
    diet:     t('tabDiet'),
    routine:  t('tabRoutine'),
    yoga:     t('tabYoga'),
    seasonal: t('tabSeasonal'),
  }

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={active === tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`relative px-7 py-3 rounded-full text-label-md font-semibold whitespace-nowrap transition-all active:scale-95 ${
              active === tab.key
                ? 'bg-primary text-on-primary sun-shadow'
                : 'bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {tab.emoji} {TAB_LABELS[tab.key]}
            {tab.key === 'seasonal' && currentSeason && (
              <span className="absolute -top-1.5 -right-1.5 bg-tertiary text-on-tertiary text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {t('tabNow')}
              </span>
            )}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {active === 'diet'     && <DietTab     diet={recommendations.diet} />}
        {active === 'routine'  && <RoutineTab  routine={recommendations.routine} />}
        {active === 'yoga'     && <YogaTab     yoga={recommendations.yoga} />}
        {active === 'seasonal' && <SeasonalTab seasonal={recommendations.seasonal} currentSeason={currentSeason} />}
      </div>
    </div>
  )
}
