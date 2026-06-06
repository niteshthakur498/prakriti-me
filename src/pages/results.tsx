import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ScoreResponseData, VikritiResponseData, Season } from '@/types'
import { getCurrentSeason } from '@/lib/season'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { DoshaHero } from '@/components/results/DoshaHero'
import { DoshaChart } from '@/components/results/DoshaChart'
import { RecommendationTabs } from '@/components/results/RecommendationTabs'

const VIKRITI_EMOJI: Record<string, string> = { Vata: '🌬️', Pitta: '🔥', Kapha: '🌍' }

const ResultsPage: NextPage = () => {
  const router = useRouter()
  const [result, setResult] = useState<ScoreResponseData | null>(null)
  const [vikritiResult, setVikritiResult] = useState<VikritiResponseData | null>(null)
  const [currentSeason] = useState<Season>(() => getCurrentSeason())

  useEffect(() => {
    const stored = sessionStorage.getItem('prakriti_result')
    if (!stored) {
      void router.push('/quiz')
      return
    }
    setResult(JSON.parse(stored) as ScoreResponseData)

    const vikrtiStored = sessionStorage.getItem('prakriti_vikriti')
    if (vikrtiStored) {
      setVikritiResult(JSON.parse(vikrtiStored) as VikritiResponseData)
    }
  }, [router])

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🪷</div>
          <p className="text-body-lg text-on-surface-variant">Loading your results…</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Your Prakriti: {result.resultType} — PrakritiMe</title>
        <meta name="description" content={`Your Ayurvedic constitution is ${result.resultType}. View personalized diet, routine, and yoga recommendations.`} />
      </Head>

      <Navbar />

      <main className="pt-16 pb-16 max-w-[1200px] mx-auto px-5 md:px-10">
        <DoshaHero result={result} />

        {/* Constitutional vs current state note */}
        <div className="mt-4 flex items-start gap-3 bg-primary-container/40 border border-primary/20 rounded-xl px-5 py-4 text-sm text-on-surface-variant">
          <span className="text-lg shrink-0" aria-hidden>🪷</span>
          <p>
            <strong className="text-on-surface">This is your Prakriti — your constitutional nature since birth.</strong>{' '}
            It reflects your innate tendencies, not your current state of imbalance (Vikriti).
            If you feel your current experience differs significantly from this profile, consider consulting a qualified Ayurvedic practitioner.
          </p>
        </div>

        {/* Medical disclaimer */}
        <div className="mt-3 flex items-start gap-3 bg-surface-container border border-outline-variant rounded-xl px-5 py-4 text-xs text-on-surface-variant">
          <span className="text-base shrink-0" aria-hidden>⚕️</span>
          <p>
            <strong>Not medical advice.</strong> This assessment is for educational and wellness purposes only.
            It is not a clinical diagnosis and does not replace consultation with a licensed Ayurvedic physician or healthcare provider.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content — 8 columns */}
          <div className="lg:col-span-8 space-y-8">
            <DoshaChart percentages={result.percentages} />
            <RecommendationTabs recommendations={result.recommendations} currentSeason={currentSeason} />

            {/* Morning ritual bento */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-primary-container text-on-primary-container p-6 rounded-xl flex items-center gap-5 shadow-lg">
                <span className="text-5xl opacity-40 flex-shrink-0" aria-hidden>🧘</span>
                <div>
                  <h4 className="font-display text-headline-md font-semibold mb-2">Morning Ritual</h4>
                  <p className="text-sm opacity-90">{result.recommendations.routine.daily[0]?.detail ?? 'Start your day with intention and grounding practices.'}</p>
                </div>
              </div>
              <div className="bg-tertiary-fixed text-on-tertiary-fixed p-6 rounded-xl flex flex-col justify-between shadow-lg">
                <span className="text-3xl" aria-hidden>☀️</span>
                <div>
                  <h4 className="text-label-md font-bold">Mid-Day Peak</h4>
                  <p className="text-xs opacity-80 leading-relaxed mt-1">Eat your largest meal now — digestion is strongest.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar — 4 columns */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Actions */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 sun-shadow">
              <h3 className="text-label-md font-semibold text-on-surface-variant mb-5 uppercase tracking-widest flex items-center gap-2">
                <span aria-hidden>↗</span> Next Steps
              </h3>
              <div className="space-y-3">
                <Link
                  href="/quiz"
                  className="w-full flex items-center justify-between p-4 bg-surface rounded-lg border border-outline-variant hover:bg-primary-container/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary group-hover:scale-110 transition-transform text-xl" aria-hidden>🔄</span>
                    <span className="text-label-md font-semibold">Retake Quiz</span>
                  </div>
                  <span className="text-xs text-on-surface-variant">→</span>
                </Link>

                <Link
                  href="/about"
                  className="w-full flex items-center justify-between p-4 bg-surface rounded-lg border border-outline-variant hover:bg-primary-container/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary group-hover:scale-110 transition-transform text-xl" aria-hidden>📖</span>
                    <span className="text-label-md font-semibold">Learn About Prakriti</span>
                  </div>
                  <span className="text-xs text-on-surface-variant">→</span>
                </Link>
              </div>
            </section>

            {/* Sanskrit quote */}
            <div className="text-center p-6">
              <p className="font-sanskrit text-2xl text-primary opacity-60 mb-2">स्वस्थस्य स्वास्थ्य रक्षणं</p>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                &ldquo;To maintain the health of the healthy&rdquo;
              </p>
            </div>

            {/* Practitioner note */}
            <div className="bg-surface-container rounded-xl p-5 border border-outline-variant text-sm text-on-surface-variant space-y-2">
              <p className="font-semibold text-on-surface">Want deeper guidance?</p>
              <p className="text-xs leading-relaxed">
                A qualified Ayurvedic practitioner (Vaidya) can assess your Vikriti — your current state of imbalance —
                and give you a truly personalised protocol based on pulse diagnosis (Nadi Pariksha) and physical examination.
              </p>
            </div>
          </aside>
        </div>
        {/* Vikriti section — CTA if not assessed, comparison if assessed */}
        <section className="mt-16 border-t border-outline-variant pt-12">
          {vikritiResult ? (
            /* Comparison card — Vikriti already assessed */
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-headline-lg font-bold text-on-surface mb-2 text-center">
                Prakriti vs. Vikriti
              </h2>
              <p className="text-sm text-on-surface-variant text-center mb-8">
                Your constitution vs. your current state of imbalance
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-surface-container border border-outline-variant rounded-xl p-5 text-center">
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-2">Prakriti (Constitutional)</p>
                  <p className="font-display text-3xl font-bold text-on-surface">{result.resultType}</p>
                  <p className="text-xs text-on-surface-variant mt-2">Your innate nature — lifelong</p>
                </div>
                <div className="bg-surface-container border border-outline-variant rounded-xl p-5 text-center">
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-2">Vikriti (Current State)</p>
                  <p className="font-display text-3xl font-bold text-on-surface">
                    {VIKRITI_EMOJI[vikritiResult.vikritiType] ?? ''} {vikritiResult.vikritiType}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-2">What is elevated right now</p>
                </div>
              </div>
              {result.resultType.includes(vikritiResult.vikritiType) ? (
                <div className="flex items-start gap-3 bg-primary-container/40 border border-primary/20 rounded-xl px-5 py-4 text-sm">
                  <span aria-hidden>✅</span>
                  <p className="text-on-surface">
                    <strong>In balance.</strong> Your current state aligns with your constitution. Continue following your {result.resultType} recommendations.
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-3 bg-surface-container-high border border-outline-variant rounded-xl px-5 py-4 text-sm">
                  <span aria-hidden>⚠️</span>
                  <p className="text-on-surface-variant">
                    <strong className="text-on-surface">{vikritiResult.vikritiType} is currently aggravated</strong> alongside your {result.resultType} constitution.
                    Temporarily add {vikritiResult.vikritiType}-balancing practices to your routine.
                    Consider consulting a Vaidya for a personalised dual-dosha protocol.
                  </p>
                </div>
              )}
              <div className="text-center mt-6">
                <Link
                  href="/vikriti"
                  className="text-sm text-primary hover:underline"
                >
                  Reassess current state →
                </Link>
              </div>
            </div>
          ) : (
            /* CTA — Vikriti not yet assessed */
            <div className="max-w-2xl mx-auto text-center">
              <span className="text-5xl mb-4 block" aria-hidden>🌊</span>
              <h2 className="font-display text-headline-lg font-bold text-on-surface mb-3">
                How are you feeling <em>right now</em>?
              </h2>
              <p className="text-body-lg text-on-surface-variant mb-3 max-w-lg mx-auto">
                Your Prakriti is your lifelong constitution. But your <strong>Vikriti</strong> — your current state of imbalance — can shift with seasons, stress, and lifestyle.
              </p>
              <p className="text-sm text-on-surface-variant mb-8 max-w-lg mx-auto">
                Take the 5-question Vikriti assessment to discover which dosha is elevated right now and what to focus on immediately.
              </p>
              <Link
                href="/vikriti"
                className="inline-block saffron-gradient text-on-primary px-10 py-4 rounded-full text-label-md font-semibold sun-shadow hover:scale-105 active:scale-95 transition-all"
              >
                Assess My Current State → (5 questions)
              </Link>
              <p className="text-xs text-on-surface-variant mt-4">Takes under 2 minutes</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}

export default ResultsPage
