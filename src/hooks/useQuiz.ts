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

  const currentQuestion = useMemo<QuizQuestion>(() => {
    const q = allQuestions[questionIndex]
    if (!q) throw new Error(`No question at index ${questionIndex}`)
    return q
  }, [allQuestions, questionIndex])

  const sectionIndex = useMemo(() => {
    return sections.findIndex((s) => s.id === currentQuestion.sectionId)
  }, [sections, currentQuestion])

  const currentSection = useMemo<QuizSection>(() => {
    const s = sections[sectionIndex]
    if (!s) throw new Error(`No section at index ${sectionIndex}`)
    return s
  }, [sections, sectionIndex])

  const selectedAnswer = answers[currentQuestion.id] ?? null

  const progressPercent = Math.round((questionIndex / totalQuestions) * 100)
  const isFirstQuestion = questionIndex === 0
  const isLastQuestion = questionIndex === totalQuestions - 1
  const isComplete = questionIndex >= totalQuestions && Object.keys(answers).length === totalQuestions
  const canProceed = selectedAnswer !== null

  const selectAnswer = useCallback((questionId: string, dosha: DoshaSymbol) => {
    setAnswers((prev: AnswerMap) => ({ ...prev, [questionId]: dosha }))
  }, [])

  const goNext = useCallback(() => {
    if (!canProceed) return
    if (isLastQuestion) {
      // Mark complete by advancing past total
      setQuestionIndex(totalQuestions)
      return
    }

    const nextIndex = questionIndex + 1
    // Check if crossing a section boundary
    const currentSectionId = currentQuestion.sectionId
    const nextQuestion = allQuestions[nextIndex]
    const isSectionChange = nextQuestion && nextQuestion.sectionId !== currentSectionId

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

  // If questionIndex >= totalQuestions, quiz is complete — return last question for render safety
  const safeCurrentQuestion = questionIndex >= totalQuestions
    ? (allQuestions[totalQuestions - 1] ?? currentQuestion)
    : currentQuestion

  const safeSectionIndex = sections.findIndex((s) => s.id === safeCurrentQuestion.sectionId)
  const safeCurrentSection = sections[safeSectionIndex] ?? sections[0]

  if (!safeCurrentSection) throw new Error('No sections provided to useQuiz')

  return {
    currentQuestion: safeCurrentQuestion,
    currentSection: safeCurrentSection,
    questionIndex,
    sectionIndex: safeSectionIndex,
    progressPercent,
    answers,
    selectedAnswer: answers[safeCurrentQuestion.id] ?? null,
    selectAnswer,
    goNext,
    goPrev,
    isFirstQuestion,
    isLastQuestion,
    isComplete: questionIndex >= totalQuestions,
    canProceed,
    isTransitioning,
  }
}
