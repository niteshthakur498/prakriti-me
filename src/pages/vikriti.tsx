import { useState, useEffect } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { QuizSection, DoshaSymbol, AnswerMap, VikritiResponseData } from '@/types'
import { useQuiz } from '@/hooks/useQuiz'
import { ProgressBar } from '@/components/quiz/ProgressBar'
import { QuizCard } from '@/components/quiz/QuizCard'
import { Footer } from '@/components/layout/Footer'
import vikritData from '../../data/vikriti-questions.json'

interface VikritiPageProps {
  sections: QuizSection[]
  totalQuestions: number
}

const DOSHA_EMOJI: Record<string, string> = { Vata: '🌬️', Pitta: '🔥', Kapha: '🌍' }
const DOSHA_COLOR: Record<string, string> = { Vata: '#7EC8E3', Pitta: '#FF6B6B', Kapha: '#52796F' }

const BALANCE_MESSAGES: Record<string, string> = {
  Vata: 'Vata is elevated right now — your nervous system needs grounding. Focus on warmth, regularity, and rest.',
  Pitta: 'Pitta is elevated right now — your fire is running hot. Focus on cooling, slowing down, and releasing pressure.',
  Kapha: 'Kapha is elevated right now — your system needs stimulation. Focus on movement, lightness, and change.',
}

const VikritiPage: NextPage<VikritiPageProps> = ({ sections, totalQuestions }) => {
  const router = useRouter()
  const quiz = useQuiz(sections)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [vikritiResult, setVikritiResult] = useState<VikritiResponseData | null>(null)

  // Submit when quiz is complete
  useEffect(() => {
    if (!quiz.isComplete || isSubmitting || vikritiResult) return

    const submitVikriti = async (): Promise<void> => {
      setIsSubmitting(true)
      setError(null)
      try {
        const res = await fetch('/api/vikriti/score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: quiz.answers }),
        })
        const json = (await res.json()) as { success: boolean; data?: VikritiResponseData; error?: string }
        if (!json.success || !json.data) throw new Error(json.error ?? 'Scoring failed')
        sessionStorage.setItem('prakriti_vikriti', JSON.stringify(json.data))
        setVikritiResult(json.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }

    void submitVikriti()
  }, [quiz.isComplete, isSubmitting, vikritiResult, quiz.answers])

  const prakritiType = (() => {
    try {
      const stored = sessionStorage.getItem('prakriti_result')
      if (!stored) return null
      const parsed = JSON.parse(stored) as { resultType?: string }
      return parsed.resultType ?? null
    } catch {
      return null
    }
  })()

  const inBalance = vikritiResult && prakritiType
    ? prakritiType.includes(vikritiResult.vikritiType)
    : false

  return (
    <>
      <Head>
        <title>Vikriti Assessment — PrakritiMe</title>
        <meta name="description" content="Discover your current state of imbalance with this 5-question Vikriti (Vikriti Pariksha) assessment." />
      </Head>

      {/* Fixed mandala watermark */}
      <div className="fixed inset-0 z-[-1] flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="text-[800px] opacity-[0.03] text-primary">🌊</span>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-5 md:px-10 h-20 bg-surface/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="PrakritiMe logo" width={36} height={36} className="rounded-full" />
          <span className="font-display text-headline-md text-primary font-bold">PrakritiMe</span>
        </Link>
        <Link href="/results" className="text-label-md text-on-surface-variant hover:text-primary transition-colors">
          ← Back to Results
        </Link>
      </header>

      <main className="flex-grow pt-28 pb-16 px-5 flex justify-center items-start min-h-screen">
        <div className="w-full max-w-[680px] space-y-10">

          {/* Vikriti intro banner */}
          {!quiz.isComplete && (
            <div className="bg-primary-container/40 border border-primary/20 rounded-xl px-5 py-4 text-sm text-on-surface-variant">
              <p className="font-semibold text-on-surface mb-1">विकृति परीक्षा — Vikriti Assessment</p>
              <p>Answer based on how you have felt in the <strong>last 2–4 weeks only</strong> — not your lifelong tendencies. This reveals which dosha is currently out of balance.</p>
            </div>
          )}

          {/* Loading state */}
          {isSubmitting && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-6 animate-spin">🌊</div>
              <h2 className="font-display text-headline-lg font-bold text-on-surface mb-3">Analysing your current state…</h2>
              <p className="text-body-lg text-on-surface-variant">Reading the signs of imbalance</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="bg-error-container p-6 rounded-xl text-center">
              <p className="text-on-error-container text-body-md mb-4">{error}</p>
              <button
                type="button"
                onClick={() => { setError(null); setIsSubmitting(false) }}
                className="saffron-gradient text-on-primary px-6 py-2 rounded-full text-label-md font-semibold"
              >
                Try again
              </button>
            </div>
          )}

          {/* Result card */}
          {vikritiResult && !isSubmitting && (
            <div className="space-y-6">
              <div
                className="rounded-xl p-8 text-white shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${DOSHA_COLOR[vikritiResult.vikritiType] ?? '#7EC8E3'} 0%, #2D6A4F 100%)` }}
              >
                <p className="text-sm font-bold tracking-widest uppercase opacity-80 mb-2">Your Current Imbalance (Vikriti)</p>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">{DOSHA_EMOJI[vikritiResult.vikritiType] ?? '🌊'}</span>
                  <h2 className="font-display text-5xl font-bold">{vikritiResult.vikritiType}</h2>
                </div>
                <p className="text-base opacity-90 mb-5">
                  {BALANCE_MESSAGES[vikritiResult.vikritiType] ?? ''}
                </p>

                {/* Dosha distribution */}
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  {([
                    { label: 'Vata', value: vikritiResult.percentages.vata },
                    { label: 'Pitta', value: vikritiResult.percentages.pitta },
                    { label: 'Kapha', value: vikritiResult.percentages.kapha },
                  ] as const).map(({ label, value }) => (
                    <div key={label} className="bg-white/20 rounded-lg py-3">
                      <div className="text-2xl font-bold">{value}%</div>
                      <div className="text-xs opacity-80">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prakriti vs Vikriti comparison */}
              {prakritiType && (
                <div className="bg-surface-container border border-outline-variant rounded-xl p-6">
                  <h3 className="font-display text-headline-md font-semibold text-on-surface mb-4">Prakriti vs. Vikriti</h3>
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-surface rounded-lg p-4 border border-outline-variant">
                      <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Your Prakriti</p>
                      <p className="font-bold text-on-surface text-lg">{prakritiType}</p>
                      <p className="text-xs text-on-surface-variant mt-1">Constitutional nature</p>
                    </div>
                    <div className="bg-surface rounded-lg p-4 border border-outline-variant">
                      <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Your Vikriti</p>
                      <p className="font-bold text-on-surface text-lg">{vikritiResult.vikritiType}</p>
                      <p className="text-xs text-on-surface-variant mt-1">Current state</p>
                    </div>
                  </div>

                  {inBalance ? (
                    <div className="flex items-start gap-3 bg-primary-container/40 rounded-lg px-4 py-3 text-sm text-on-surface">
                      <span aria-hidden>✅</span>
                      <p><strong>You are currently in balance with your constitution.</strong> Your Vikriti aligns with your Prakriti — a good sign. Continue with your standard {prakritiType} recommendations.</p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 bg-surface-container-high rounded-lg px-4 py-3 text-sm text-on-surface-variant">
                      <span aria-hidden>⚠️</span>
                      <p>
                        <strong className="text-on-surface">Your {vikritiResult.vikritiType} is currently aggravated</strong> — separate from your {prakritiType} constitution.
                        Temporarily add {vikritiResult.vikritiType}-balancing practices to your routine while keeping your {prakritiType} foundation.
                        Consider consulting a Vaidya for a personalised protocol.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="flex gap-3">
                <Link
                  href="/results"
                  className="flex-1 saffron-gradient text-on-primary px-6 py-3 rounded-full text-label-md font-semibold text-center sun-shadow hover:scale-105 active:scale-95 transition-all"
                >
                  ← Back to My Prakriti Results
                </Link>
              </div>

              <p className="text-xs text-on-surface-variant text-center">
                Vikriti can change week to week. Reassess when your life circumstances shift significantly.
              </p>
            </div>
          )}

          {/* Quiz flow */}
          {!quiz.isComplete && !isSubmitting && !error && (
            <>
              <ProgressBar
                percent={quiz.progressPercent}
                sectionLabel={`${quiz.currentSection.emoji} ${quiz.currentSection.title}`}
                sectionCount={1}
                currentSection={1}
                questionNumber={quiz.questionIndex + 1}
                totalQuestions={totalQuestions}
              />

              <QuizCard
                question={quiz.currentQuestion}
                section={quiz.currentSection}
                selectedAnswer={quiz.selectedAnswer}
                onSelect={(questionId: string, dosha: DoshaSymbol) => quiz.selectAnswer(questionId, dosha)}
              />

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={quiz.goPrev}
                  disabled={quiz.isFirstQuestion}
                  className="flex items-center gap-2 text-on-surface-variant text-label-md font-semibold hover:text-primary transition-colors py-2 px-4 rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={quiz.goNext}
                  disabled={!quiz.canProceed}
                  className="saffron-gradient text-on-primary px-10 py-3 rounded-full text-label-md font-semibold sun-shadow flex items-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {quiz.isLastQuestion ? 'See Current State →' : 'Next →'}
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<VikritiPageProps> = async () => {
  return {
    props: {
      sections: vikritData.sections as QuizSection[],
      totalQuestions: vikritData._meta.totalQuestions,
    },
  }
}

export default VikritiPage
