import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiError } from '@/types'

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void

export function withValidation(handler: ApiHandler, methods: string[]): ApiHandler {
  return async (req, res) => {
    if (!methods.includes(req.method ?? '')) {
      const body: ApiError = {
        success: false,
        error: `Method ${req.method ?? 'UNKNOWN'} not allowed`,
        code: 'METHOD_NOT_ALLOWED',
      }
      return res.status(405).json(body)
    }
    return handler(req, res)
  }
}
