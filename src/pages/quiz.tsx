import { useEffect } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import type { QuizSection } from '@/types'
import { useQuiz } from '@/hooks/useQuiz'
import { usePrakriti } from '@/hooks/usePrakriti'
import { useLocale } from '@/contexts/LocaleContext'
import { ProgressBar } from '@/components/quiz/ProgressBar'
import { QuizCard } from '@/components/quiz/QuizCard'
import { SectionTransition } from '@/components/quiz/SectionTransition'
import { Footer } from '@/components/layout/Footer'
import questionsData from '../../data/questions.json'
import questionsHiData from '../../data/questions.hi.json'

interface QuizProps {
  sectionsEn: QuizSection[]
  sectionsHi: QuizSection[]
}

const QuizPage: NextPage<QuizProps> = ({ sectionsEn, sectionsHi }) => {
  const t = useTranslations('quiz')
  const { locale, setLocale } = useLocale()
  const sections = locale === 'hi' ? sectionsHi : sectionsEn

  const quiz = useQuiz(sections)
  const prakriti = usePrakriti()

  useEffect(() => {
    if (quiz.isComplete && !prakriti.isLoading && !prakriti.result) {
      void prakriti.scoreQuiz(quiz.answers)
    }
  }, [quiz.isComplete, prakriti, quiz.answers])

  const nextSection = sections[quiz.sectionIndex + 1]

  return (
    <>
      <Head>
        <title>{t('loading').replace('…', '')} — PrakritiMe</title>
        <meta name="description" content="Answer questions to discover your Ayurvedic mind-body constitution." />
      </Head>

      <div className="fixed inset-0 z-[-1] flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="text-[800px] opacity-[0.03] text-primary">🪷</span>
      </div>

      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-5 md:px-10 h-20 bg-surface/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="PrakritiMe logo" width={36} height={36} className="rounded-full" />
          <span className="font-display text-headline-md text-primary font-bold">PrakritiMe</span>
        </Link>
        <div className="flex items-center gap-1 border border-outline-variant rounded-full px-1 py-1">
          {(['en', 'hi'] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              className={`px-3 py-1 rounded-full text-label-md font-semibold transition-all ${
                locale === l ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {l === 'en' ? 'EN' : 'हि'}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-grow pt-28 pb-16 px-5 flex justify-center items-start min-h-screen">
        <div className="w-full max-w-[680px] space-y-10">
          {prakriti.isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-6 animate-spin">🪷</div>
              <h2 className="font-display text-headline-lg font-bold text-on-surface mb-3">{t('loading')}</h2>
              <p className="text-body-lg text-on-surface-variant">{t('loadingSubtitle')}</p>
            </div>
          ) : prakriti.error ? (
            <div className="bg-error-container p-6 rounded-xl text-center">
              <p className="text-on-error-container text-body-md mb-4">{prakriti.error}</p>
              <button
                type="button"
                onClick={() => void prakriti.scoreQuiz(quiz.answers)}
                className="saffron-gradient text-on-primary px-6 py-2 rounded-full text-label-md font-semibold"
              >
                {t('tryAgain')}
              </button>
            </div>
          ) : quiz.isTransitioning && nextSection ? (
            <SectionTransition
              nextSection={nextSection}
              completedSectionNumber={quiz.sectionIndex + 1}
            />
          ) : (
            <>
              <ProgressBar
                percent={quiz.progressPercent}
                sectionLabel={`${quiz.currentSection.emoji} ${quiz.currentSection.title}`}
                sectionCount={sections.length}
                currentSection={quiz.sectionIndex + 1}
                questionNumber={quiz.questionIndex + 1}
                totalQuestions={questionsData._meta.totalQuestions}
              />

              <QuizCard
                question={quiz.currentQuestion}
                section={quiz.currentSection}
                selectedAnswer={quiz.selectedAnswer}
                onSelect={quiz.selectAnswer}
              />

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={quiz.goPrev}
                  disabled={quiz.isFirstQuestion}
                  className="flex items-center gap-2 text-on-surface-variant text-label-md font-semibold hover:text-primary transition-colors py-2 px-4 rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t('prev')}
                </button>
                <button
                  type="button"
                  onClick={quiz.goNext}
                  disabled={!quiz.canProceed}
                  className="saffron-gradient text-on-primary px-10 py-3 rounded-full text-label-md font-semibold sun-shadow flex items-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {quiz.isLastQuestion ? t('seeResults') : t('next')}
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

export const getStaticProps: GetStaticProps<QuizProps> = async () => {
  return {
    props: {
      sectionsEn: questionsData.sections as QuizSection[],
      sectionsHi: questionsHiData.sections as QuizSection[],
    },
  }
}

export default QuizPage
