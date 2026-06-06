import { useTranslations } from 'next-intl'

const STEP_ICONS = ['🧾', '🧬', '🌿'] as const
const STEP_BGS = ['bg-primary-fixed', 'bg-secondary-fixed', 'bg-tertiary-fixed'] as const
const STEP_KEYS = ['step1', 'step2', 'step3'] as const

export function HowItWorks(): JSX.Element {
  const t = useTranslations('home')

  return (
    <section className="py-16 bg-surface-container-low">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="text-center mb-14">
          <h2 className="font-display text-headline-lg font-bold text-on-surface">{t('pathHeading')}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {STEP_KEYS.map((key, i) => (
            <div
              key={key}
              className="card-hover bg-surface p-8 rounded-3xl border border-outline-variant sun-shadow"
            >
              <div className={`w-16 h-16 rounded-2xl ${STEP_BGS[i]} mb-6 flex items-center justify-center text-3xl`}>
                {STEP_ICONS[i]}
              </div>
              <h3 className="font-display text-headline-md font-semibold text-on-surface mb-3">
                {t(`${key}Title` as 'step1Title' | 'step2Title' | 'step3Title')}
              </h3>
              <p className="text-on-surface-variant text-body-md">
                {t(`${key}Desc` as 'step1Desc' | 'step2Desc' | 'step3Desc')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
