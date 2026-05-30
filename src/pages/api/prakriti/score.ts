import type { NextApiRequest, NextApiResponse } from 'next'
import { prakritiController } from '@/backend/controllers/prakritiController'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return prakritiController.score(req, res)
}
