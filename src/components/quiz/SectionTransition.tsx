import type { QuizSection } from '@/types'
import { useTranslations } from 'next-intl'

interface SectionTransitionProps {
  nextSection: QuizSection
  completedSectionNumber: number
}

export function SectionTransition({ nextSection, completedSectionNumber }: SectionTransitionProps): JSX.Element {
  const t = useTranslations('quiz')

  return (
    <div className="section-transition flex flex-col items-center justify-center text-center py-16 px-8">
      <div className="w-24 h-24 rounded-full bg-primary-container flex items-center justify-center text-5xl mb-8 sun-shadow">
        {nextSection.emoji}
      </div>
      <p className="text-label-md text-primary uppercase tracking-widest font-semibold mb-3">
        {t('sectionComplete', { number: completedSectionNumber })}
      </p>
      <h2 className="font-display text-4xl font-bold text-on-surface mb-4">
        {t('upNext', { title: nextSection.title })}
      </h2>
      <p className="font-sanskrit text-2xl text-primary opacity-60 mb-4">{nextSection.sanskrit}</p>
      <p className="text-body-lg text-on-surface-variant max-w-md">{nextSection.description}</p>
      <p className="text-label-md text-on-surface-variant mt-8 animate-pulse">{t('loadingNext')}</p>
    </div>
  )
}
