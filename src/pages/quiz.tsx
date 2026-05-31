import { useEffect } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import type { QuizSection } from '@/types'
import { useQuiz } from '@/hooks/useQuiz'
import { usePrakriti } from '@/hooks/usePrakriti'
import { ProgressBar } from '@/components/quiz/ProgressBar'
import { QuizCard } from '@/components/quiz/QuizCard'
import { SectionTransition } from '@/components/quiz/SectionTransition'
import { Footer } from '@/components/layout/Footer'
import questionsData from '../../data/questions.json'

interface QuizProps {
  sections: QuizSection[]
}

const QuizPage: NextPage<QuizProps> = ({ sections }) => {
  const quiz = useQuiz(sections)
  const prakriti = usePrakriti()

  // Submit when complete
  useEffect(() => {
    if (quiz.isComplete && !prakriti.isLoading && !prakriti.result) {
      void prakriti.scoreQuiz(quiz.answers)
    }
  }, [quiz.isComplete, prakriti, quiz.answers])

  const nextSection = sections[quiz.sectionIndex + 1]

  return (
    <>
      <Head>
        <title>Prakriti Quiz — PrakritiMe</title>
        <meta name="description" content="Answer 25 questions to discover your Ayurvedic mind-body constitution." />
      </Head>

      {/* Fixed mandala watermark */}
      <div className="fixed inset-0 z-[-1] flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="text-[800px] opacity-[0.03] text-primary">🪷</span>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-5 md:px-10 h-20 bg-surface/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="PrakritiMe logo" width={36} height={36} className="rounded-full" />
          <span className="font-display text-headline-md text-primary font-bold">PrakritiMe</span>
        </Link>
        {/* Practitioner Mode toggle — V2 feature, hidden until ready */}
      </header>

      <main className="flex-grow pt-28 pb-16 px-5 flex justify-center items-start min-h-screen">
        <div className="w-full max-w-[680px] space-y-10">
          {prakriti.isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-6 animate-spin">🪷</div>
              <h2 className="font-display text-headline-lg font-bold text-on-surface mb-3">Calculating your Prakriti…</h2>
              <p className="text-body-lg text-on-surface-variant">Analysing your answers with ancient wisdom</p>
            </div>
          ) : prakriti.error ? (
            <div className="bg-error-container p-6 rounded-xl text-center">
              <p className="text-on-error-container text-body-md mb-4">{prakriti.error}</p>
              <button
                type="button"
                onClick={() => void prakriti.scoreQuiz(quiz.answers)}
                className="saffron-gradient text-on-primary px-6 py-2 rounded-full text-label-md font-semibold"
              >
                Try again
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
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={quiz.goNext}
                  disabled={!quiz.canProceed}
                  className="saffron-gradient text-on-primary px-10 py-3 rounded-full text-label-md font-semibold sun-shadow flex items-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {quiz.isLastQuestion ? 'See Results →' : 'Next →'}
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
      sections: questionsData.sections as QuizSection[],
    },
  }
}

export default QuizPage
