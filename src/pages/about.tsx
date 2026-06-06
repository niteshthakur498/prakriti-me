import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const DOSHAS_META = [
  {
    key: 'vata' as const,
    name: 'Vata',
    icon: '🌬️',
    qualityKeys: ['vataQ1', 'vataQ2', 'vataQ3', 'vataQ4', 'vataQ5', 'vataQ6'] as const,
    bg: 'bg-[#e0f2fe]', text: 'text-[#0c4a6e]', sub: 'text-[#0369a1]', border: 'border-[#7dd3fc]',
  },
  {
    key: 'pitta' as const,
    name: 'Pitta',
    icon: '🔥',
    qualityKeys: ['pittaQ1', 'pittaQ2', 'pittaQ3', 'pittaQ4', 'pittaQ5', 'pittaQ6'] as const,
    bg: 'bg-[#ffedd5]', text: 'text-[#7c2d12]', sub: 'text-[#9a3412]', border: 'border-[#fdba74]',
  },
  {
    key: 'kapha' as const,
    name: 'Kapha',
    icon: '🌱',
    qualityKeys: ['kaphaQ1', 'kaphaQ2', 'kaphaQ3', 'kaphaQ4', 'kaphaQ5', 'kaphaQ6'] as const,
    bg: 'bg-[#dcfce7]', text: 'text-[#064e3b]', sub: 'text-[#166534]', border: 'border-[#86efac]',
  },
]

const AboutPage: NextPage = () => {
  const t = useTranslations('about')

  return (
    <>
      <Head>
        <title>{t('heroHeading')} — PrakritiMe</title>
        <meta name="description" content={t('heroDesc').slice(0, 160)} />
      </Head>

      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-primary-container/30 to-secondary-container/20">
          <div className="max-w-[1200px] mx-auto px-5 md:px-10 text-center">
            <p className="font-sanskrit text-3xl text-primary opacity-70 mb-4">प्रकृति</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-on-surface mb-6">{t('heroHeading')}</h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
              {t('heroDesc')}
            </p>
            <Link
              href="/quiz"
              className="cta-pulse inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-8 py-4 rounded-full text-label-md font-semibold sun-shadow hover:brightness-105 transition-all"
            >
              {t('heroCta')}
            </Link>
          </div>
        </section>

        {/* What is Ayurveda */}
        <section className="py-16 bg-surface">
          <div className="max-w-[800px] mx-auto px-5 md:px-10">
            <h2 className="font-display text-headline-lg font-bold text-on-surface mb-6">{t('scienceHeading')}</h2>
            <p className="text-body-lg text-on-surface-variant mb-5">{t('sciencePara1')}</p>
            <p className="text-body-lg text-on-surface-variant mb-5">{t('sciencePara2')}</p>
            <p className="text-body-lg text-on-surface-variant">{t('sciencePara3')}</p>
          </div>
        </section>

        {/* Three Doshas */}
        <section id="doshas" className="py-16 bg-surface-container-low">
          <div className="max-w-[1200px] mx-auto px-5 md:px-10">
            <div className="text-center mb-14">
              <h2 className="font-display text-headline-lg font-bold text-on-surface mb-4">{t('doshasHeading')}</h2>
              <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">{t('doshasSubtitle')}</p>
            </div>
            <div className="space-y-8">
              {DOSHAS_META.map((dosha) => (
                <div key={dosha.name} className={`${dosha.bg} border ${dosha.border} rounded-3xl p-8 md:p-10`}>
                  <div className="flex items-start gap-6 flex-wrap">
                    <div className="flex-shrink-0">
                      <span className="text-6xl">{dosha.icon}</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-baseline gap-4 mb-2 flex-wrap">
                        <h3 className={`font-display text-3xl font-bold ${dosha.text}`}>{dosha.name}</h3>
                        <span className={`text-label-md font-semibold ${dosha.sub} uppercase tracking-widest`}>
                          {t(`${dosha.key}Elements` as Parameters<typeof t>[0])}
                        </span>
                      </div>
                      <p className={`${dosha.sub} text-label-md font-semibold mb-4`}>
                        {t(`${dosha.key}Tagline` as Parameters<typeof t>[0])}
                      </p>
                      <p className={`${dosha.text} text-body-md mb-5`}>
                        {t(`${dosha.key}Desc` as Parameters<typeof t>[0])}
                      </p>
                      <div>
                        <p className={`text-label-md font-semibold ${dosha.sub} mb-2 uppercase tracking-wider`}>
                          {t('keyQualities')}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {dosha.qualityKeys.map((qKey) => (
                            <span key={qKey} className={`bg-white/60 px-3 py-1 rounded-full text-label-md font-semibold ${dosha.text}`}>
                              {t(qKey)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center bg-gradient-to-b from-background to-primary-fixed/20">
          <div className="max-w-[600px] mx-auto px-5">
            <h2 className="font-display text-headline-lg font-bold text-on-surface mb-4">{t('ctaHeading')}</h2>
            <p className="text-body-lg text-on-surface-variant mb-8">{t('ctaDesc')}</p>
            <Link
              href="/quiz"
              className="cta-pulse inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-10 py-4 rounded-full text-label-md font-semibold sun-shadow hover:brightness-105 transition-all"
            >
              {t('ctaButton')}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default AboutPage
