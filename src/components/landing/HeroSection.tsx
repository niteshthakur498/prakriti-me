import Link from 'next/link'
import { useTranslations } from 'next-intl'

export function HeroSection(): JSX.Element {
  const t = useTranslations('home')

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-36 md:pb-32 bg-background">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-surface-container-highest text-primary text-label-md font-semibold mb-6">
            {t('badge')}
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-on-surface mb-6 leading-tight tracking-tight whitespace-pre-line">
            {t('heading')}
          </h1>
          <p className="text-body-lg text-on-surface-variant mb-10 max-w-lg">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/quiz"
              className="cta-pulse bg-primary-container text-on-primary-container px-8 py-4 rounded-full text-label-md font-semibold flex items-center justify-center gap-2 sun-shadow hover:brightness-105 transition-all"
            >
              {t('cta')}
            </Link>
            <Link
              href="/about"
              className="border-2 border-outline-variant text-on-surface px-8 py-4 rounded-full text-label-md font-semibold hover:bg-surface-container-low transition-colors text-center"
            >
              {t('learnMore')}
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-2 text-on-surface-variant text-label-md font-semibold">
              <span className="text-secondary">✓</span> {t('badge1')}
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant text-label-md font-semibold">
              <span className="text-secondary">✓</span> {t('badge2')}
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant text-label-md font-semibold">
              <span className="text-secondary">✓</span> {t('badge3')}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-[3rem] overflow-hidden sun-shadow relative bg-surface-container flex items-center justify-center">
            <div className="text-center p-8">
              <div className="flex justify-center gap-8 mb-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-full bg-[#e0f2fe] flex items-center justify-center text-4xl">🌬️</div>
                  <span className="text-label-md font-semibold text-[#0c4a6e]">Vata</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-full bg-[#ffedd5] flex items-center justify-center text-4xl">🔥</div>
                  <span className="text-label-md font-semibold text-[#7c2d12]">Pitta</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-full bg-[#dcfce7] flex items-center justify-center text-4xl">🌱</div>
                  <span className="text-label-md font-semibold text-[#064e3b]">Kapha</span>
                </div>
              </div>
              <p className="font-sanskrit text-2xl text-primary opacity-70">प्रकृति</p>
              <p className="text-on-surface-variant text-body-md mt-2">{t('innateNature')}</p>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-fixed-dim blur-[60px] opacity-40"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-fixed-dim blur-[60px] opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
