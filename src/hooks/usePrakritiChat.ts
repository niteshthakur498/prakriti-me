import type { UsePrakritiChatReturn, PrakritiResultType } from '@/types'

// V2 stub — isAvailable is always false until backend chat endpoint exists
export function usePrakritiChat(_doshaType: PrakritiResultType): UsePrakritiChatReturn {
  return {
    messages: [],
    sendMessage: async () => undefined,
    isLoading: false,
    isAvailable: false,
  }
}
