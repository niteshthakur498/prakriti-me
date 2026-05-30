import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import type { UsePrakritiReturn, AnswerMap, ScoreResponseData } from '@/types'
import { apiClient } from '@/lib/apiClient'

export function usePrakriti(): UsePrakritiReturn {
  const router = useRouter()
  const [result, setResult] = useState<ScoreResponseData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const scoreQuiz = useCallback(async (answers: AnswerMap) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await apiClient.post<ScoreResponseData>('/api/prakriti/score', { answers })
      if (!response.success) {
        setError(response.error)
        return
      }
      setResult(response.data)
      sessionStorage.setItem('prakriti_result', JSON.stringify(response.data))
      await router.push('/results')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  return { result, isLoading, error, scoreQuiz }
}
