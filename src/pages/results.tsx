import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ScoreResponseData } from '@/types'
import { FEATURES } from '@/lib/features'
import { usePrakritiChat } from '@/hooks/usePrakritiChat'
import { useAuth } from '@/hooks/useAuth'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { DoshaHero } from '@/components/results/DoshaHero'
import { DoshaChart } from '@/components/results/DoshaChart'
import { RecommendationTabs } from '@/components/results/RecommendationTabs'

const ResultsPage: NextPage = () => {
  const router = useRouter()
  const [result, setResult] = useState<ScoreResponseData | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('prakriti_result')
    if (!stored) {
      void router.push('/quiz')
      return
    }
    setResult(JSON.parse(stored) as ScoreResponseData)
  }, [router])

  // V2 hooks — always called (Rules of Hooks), result used conditionally
  const chat = usePrakritiChat(result?.resultType ?? 'Vata')
  const _auth = useAuth()

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

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content — 8 columns */}
          <div className="lg:col-span-8 space-y-8">
            <DoshaChart percentages={result.percentages} />
            <RecommendationTabs recommendations={result.recommendations} />

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
            {/* AI Chat — V2 */}
            <section className="bg-surface-container rounded-xl p-6 border border-outline-variant relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-tertiary/10 opacity-50" aria-hidden />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-headline-md font-semibold text-on-surface">Vedic AI Assistant</h3>
                  <span className="bg-primary text-on-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {FEATURES.AI_CHAT ? 'Beta' : 'Coming Soon'}
                  </span>
                </div>
                <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-white/60 mb-4 h-40 flex items-center justify-center text-center">
                  <div className="space-y-2">
                    <span className="text-4xl block" aria-hidden>{chat.isAvailable ? '💬' : '🧘'}</span>
                    <p className="text-sm text-on-surface-variant italic">
                      &ldquo;Ask me about your evening meals or yoga sequence…&rdquo;
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type a question…"
                    disabled={!chat.isAvailable}
                    className="w-full bg-white/50 border border-outline-variant rounded-full px-4 py-2 text-sm opacity-60 cursor-not-allowed"
                    aria-label="AI chat input (coming soon)"
                  />
                </div>
              </div>
            </section>

            {/* Actions */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 sun-shadow">
              <h3 className="text-label-md font-semibold text-on-surface-variant mb-5 uppercase tracking-widest flex items-center gap-2">
                <span aria-hidden>↗</span> Share &amp; Save
              </h3>
              <div className="space-y-3">
                <button
                  type="button"
                  disabled={!FEATURES.PDF_EXPORT}
                  title={FEATURES.PDF_EXPORT ? 'Download PDF report' : 'Coming in V2'}
                  className="w-full flex items-center justify-between p-4 bg-surface rounded-lg border border-outline-variant hover:bg-primary-container/10 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary group-hover:scale-110 transition-transform text-xl" aria-hidden>📄</span>
                    <span className="text-label-md font-semibold">Download Report</span>
                  </div>
                  <span className="text-xs text-on-surface-variant">
                    {FEATURES.PDF_EXPORT ? '→' : 'V2'}
                  </span>
                </button>

                <button
                  type="button"
                  disabled={!FEATURES.USER_PROFILES}
                  title={FEATURES.USER_PROFILES ? 'Save to your profile' : 'Coming in V2'}
                  className="w-full flex items-center justify-between p-4 bg-surface rounded-lg border border-outline-variant hover:bg-primary-container/10 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary group-hover:scale-110 transition-transform text-xl" aria-hidden>🔖</span>
                    <span className="text-label-md font-semibold">Save to Profile</span>
                  </div>
                  <span className="text-xs text-on-surface-variant">
                    {FEATURES.USER_PROFILES ? '→' : 'V2'}
                  </span>
                </button>

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
              </div>
            </section>

            {/* Sanskrit quote */}
            <div className="text-center p-6">
              <p className="font-sanskrit text-2xl text-primary opacity-60 mb-2">स्वस्थस्य स्वास्थ्य रक्षणं</p>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                &ldquo;To maintain the health of the healthy&rdquo;
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default ResultsPage
