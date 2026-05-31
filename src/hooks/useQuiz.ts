import { useState, useCallback, useMemo } from 'react'
import type { UseQuizReturn, QuizSection, QuizQuestion, DoshaSymbol, AnswerMap } from '@/types'

export function useQuiz(sections: QuizSection[]): UseQuizReturn {
  const allQuestions = useMemo<QuizQuestion[]>(
    () => sections.flatMap((s) => s.questions),
    [sections],
  )
  const totalQuestions = allQuestions.length

  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [isTransitioning, setIsTransitioning] = useState(false)

  const isComplete = questionIndex >= totalQuestions

  // Clamp index so memos never go out of bounds — the quiz page
  // checks isComplete and shows loading/redirect instead of the card.
  const safeIndex = Math.min(questionIndex, totalQuestions - 1)

  const currentQuestion = useMemo<QuizQuestion>(() => {
    const q = allQuestions[safeIndex]
    if (!q) throw new Error('useQuiz: no sections provided')
    return q
  }, [allQuestions, safeIndex])

  const sectionIndex = useMemo(
    () => sections.findIndex((s) => s.id === currentQuestion.sectionId),
    [sections, currentQuestion],
  )

  const currentSection = useMemo<QuizSection>(() => {
    const s = sections[sectionIndex]
    if (!s) throw new Error('useQuiz: section not found')
    return s
  }, [sections, sectionIndex])

  const progressPercent = isComplete
    ? 100
    : Math.round((questionIndex / totalQuestions) * 100)

  const isFirstQuestion = questionIndex === 0
  const isLastQuestion = questionIndex === totalQuestions - 1
  const selectedAnswer = answers[currentQuestion.id] ?? null
  const canProceed = selectedAnswer !== null

  const selectAnswer = useCallback((questionId: string, dosha: DoshaSymbol) => {
    setAnswers((prev: AnswerMap) => ({ ...prev, [questionId]: dosha }))
  }, [])

  const goNext = useCallback(() => {
    if (!canProceed) return

    if (isLastQuestion) {
      setQuestionIndex(totalQuestions) // triggers isComplete
      return
    }

    const nextIndex = questionIndex + 1
    const nextQuestion = allQuestions[nextIndex]
    const isSectionChange = nextQuestion && nextQuestion.sectionId !== currentQuestion.sectionId

    if (isSectionChange) {
      setIsTransitioning(true)
      setTimeout(() => {
        setIsTransitioning(false)
        setQuestionIndex(nextIndex)
      }, 1600)
    } else {
      setQuestionIndex(nextIndex)
    }
  }, [canProceed, isLastQuestion, questionIndex, totalQuestions, currentQuestion, allQuestions])

  const goPrev = useCallback(() => {
    if (isFirstQuestion) return
    setIsTransitioning(false)
    setQuestionIndex((i) => i - 1)
  }, [isFirstQuestion])

  return {
    currentQuestion,
    currentSection,
    questionIndex,
    sectionIndex,
    progressPercent,
    answers,
    selectedAnswer,
    selectAnswer,
    goNext,
    goPrev,
    isFirstQuestion,
    isLastQuestion,
    isComplete,
    canProceed,
    isTransitioning,
  }
}
