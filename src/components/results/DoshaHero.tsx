import type { ScoreResponseData } from '@/types'
import { useTranslations } from 'next-intl'

interface DoshaHeroProps {
  result: ScoreResponseData
}

export function DoshaHero({ result }: DoshaHeroProps): JSX.Element {
  const t = useTranslations('results')
  const { resultType, recommendations } = result
  const { profile } = recommendations

  const gradient = `linear-gradient(135deg, ${profile.gradientFrom} 0%, ${profile.gradientTo} 100%)`
  const descKey = `doshaDesc_${resultType}` as Parameters<typeof t>[0]
  const subtitle = t.has(descKey) ? t(descKey) : profile.tagline

  return (
    <section
      className="results-entry mt-8 rounded-xl overflow-hidden relative p-10 md:p-16 flex flex-col md:flex-row items-center justify-between text-on-primary shadow-2xl"
      style={{ background: gradient }}
    >
      <div className="z-10 max-w-2xl">
        <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase mb-4 inline-block">
          {t('prakritiBadge')}
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">{resultType}</h1>
        <p className="text-lg opacity-80 mb-3">{subtitle}</p>
        <p className="text-body-lg opacity-90 max-w-xl">{profile.heroDescription}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {profile.keyTraits.map((trait: string) => (
            <span
              key={trait}
              className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-label-md font-semibold"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>

      <div className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 text-[160px] opacity-20 select-none pointer-events-none" aria-hidden>
        {profile.icon}
      </div>
    </section>
  )
}
