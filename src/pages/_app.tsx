import type { AppProps } from 'next/app'
import { NextIntlClientProvider } from 'next-intl'
import { LocaleProvider, useLocale } from '@/contexts/LocaleContext'
import '@/styles/globals.css'

import enMessages from '../../messages/en.json'
import hiMessages from '../../messages/hi.json'

const MESSAGE_MAP = { en: enMessages, hi: hiMessages } as const

function AppInner({ Component, pageProps }: AppProps): JSX.Element {
  const { locale } = useLocale()
  return (
    <NextIntlClientProvider locale={locale} messages={MESSAGE_MAP[locale as keyof typeof MESSAGE_MAP]}>
      <Component {...pageProps} />
    </NextIntlClientProvider>
  )
}

export default function App(props: AppProps): JSX.Element {
  return (
    <LocaleProvider>
      <AppInner {...props} />
    </LocaleProvider>
  )
}
