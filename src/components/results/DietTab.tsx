import type { DietRecommendation, FoodItem } from '@/types'
import { useTranslations } from 'next-intl'

interface DietTabProps {
  diet: DietRecommendation
}

export function DietTab({ diet }: DietTabProps): JSX.Element {
  const t = useTranslations('results')
  return (
    <div className="space-y-6">
      {/* Principles */}
      <div className="bg-primary-fixed/30 border border-primary-fixed rounded-xl p-5">
        <h3 className="font-display text-headline-md font-semibold text-on-surface mb-3">{t('dietPrinciples')}</h3>
        <ul className="space-y-2">
          {diet.principles.map((p: string) => (
            <li key={p} className="flex items-start gap-2 text-body-md text-on-surface-variant">
              <span className="text-primary mt-1 flex-shrink-0">•</span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Tastes */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary-container/20 border border-secondary/20 rounded-xl p-4">
          <p className="text-label-md font-semibold text-secondary mb-2">{t('dietFavorTastes')}</p>
          <div className="flex flex-wrap gap-2">
            {diet.tastes.favor.map((t: string) => (
              <span key={t} className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-label-md font-semibold">{t}</span>
            ))}
          </div>
        </div>
        <div className="bg-error-container/20 border border-error/20 rounded-xl p-4">
          <p className="text-label-md font-semibold text-error mb-2">{t('dietReduceTastes')}</p>
          <div className="flex flex-wrap gap-2">
            {diet.tastes.reduce.map((t: string) => (
              <span key={t} className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-label-md font-semibold">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Foods */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-secondary-container/10 border border-secondary/20 rounded-xl p-5 sun-shadow">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-secondary text-xl">✓</span>
            <h3 className="font-display text-headline-md font-semibold text-secondary">{t('dietFavorFoods')}</h3>
          </div>
          <ul className="space-y-3">
            {diet.favorFoods.map((food: FoodItem) => (
              <li key={food.name} className="flex items-start gap-3 bg-surface p-3 rounded-lg border border-secondary-fixed">
                <span className="text-2xl flex-shrink-0">{food.emoji}</span>
                <div>
                  <p className="text-label-md font-semibold text-on-surface">{food.name}</p>
                  <p className="text-xs text-on-surface-variant">{food.reason}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-error-container/10 border border-error/20 rounded-xl p-5 sun-shadow">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-error text-xl">⚠</span>
            <h3 className="font-display text-headline-md font-semibold text-error">{t('dietMinimize')}</h3>
          </div>
          <ul className="space-y-3">
            {diet.minimizeFoods.map((food: FoodItem) => (
              <li key={food.name} className="flex items-start gap-3 bg-surface p-3 rounded-lg border border-error-container">
                <span className="text-2xl flex-shrink-0">{food.emoji}</span>
                <div>
                  <p className="text-label-md font-semibold text-on-surface">{food.name}</p>
                  <p className="text-xs text-on-surface-variant">{food.reason}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
