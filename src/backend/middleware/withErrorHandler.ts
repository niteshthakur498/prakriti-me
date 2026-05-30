import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiError } from '@/types'

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void

export function withErrorHandler(handler: ApiHandler): ApiHandler {
  return async (req, res) => {
    try {
      await handler(req, res)
    } catch (error) {
      console.error('[API Error]', error)
      const body: ApiError = {
        success: false,
        error: 'An unexpected error occurred',
        code: 'INTERNAL_ERROR',
      }
      res.status(500).json(body)
    }
  }
}
