import type { RoutineRecommendation, RoutineSlot } from '@/types'
import { useTranslations } from 'next-intl'

interface RoutineTabProps {
  routine: RoutineRecommendation
}

export function RoutineTab({ routine }: RoutineTabProps): JSX.Element {
  const t = useTranslations('results')
  return (
    <div className="space-y-6">
      <div className="bg-primary-container/20 border border-primary-container rounded-xl p-5">
        <p className="text-body-md text-on-surface italic">{routine.principle}</p>
      </div>

      <div className="space-y-3">
        <h3 className="font-display text-headline-md font-semibold text-on-surface">{t('routineDaily')}</h3>
        {routine.daily.map((slot: RoutineSlot, i: number) => (
          <div key={slot.time} className="flex gap-4 items-start bg-surface border border-outline-variant rounded-xl p-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-label-md font-bold text-on-primary-container">
              {i + 1}
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-lg">{slot.emoji}</span>
                <span className="text-label-md font-semibold text-primary">{slot.time}</span>
                <span className="text-label-md font-semibold text-on-surface">{slot.activity}</span>
              </div>
              <p className="text-xs text-on-surface-variant">{slot.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-container rounded-xl p-5">
        <h3 className="font-display text-headline-md font-semibold text-on-surface mb-3">{t('routineWeekly')}</h3>
        <ul className="space-y-2">
          {routine.weeklyPractices.map((p: string) => (
            <li key={p} className="flex items-start gap-2 text-body-md text-on-surface-variant">
              <span className="text-primary mt-1 flex-shrink-0">🌿</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
