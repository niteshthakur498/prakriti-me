import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { useLocale } from '@/contexts/LocaleContext'
import type { Locale } from '@/contexts/LocaleContext'

const LOCALES: { value: Locale; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'hi', label: 'हि' },
]

export function Navbar(): JSX.Element {
  const router = useRouter()
  const t = useTranslations('nav')
  const { locale, setLocale } = useLocale()

  return (
    <header className="fixed top-0 w-full z-50 glass-nav sun-shadow">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 flex justify-between items-center h-20">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="PrakritiMe logo"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <span className="font-display text-headline-md text-primary font-bold">PrakritiMe</span>
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          <Link
            href="/about"
            className="text-on-surface-variant text-label-md font-semibold hover:text-primary transition-colors"
          >
            {t('about')}
          </Link>
          <Link
            href="/about#doshas"
            className="text-on-surface-variant text-label-md font-semibold hover:text-primary transition-colors"
          >
            {t('doshaGuide')}
          </Link>
          <Link
            href="/quiz"
            className={`px-6 py-2.5 rounded-full text-label-md font-semibold transition-all ${
              router.pathname === '/quiz'
                ? 'bg-primary text-on-primary'
                : 'bg-primary-container text-on-primary-container hover:brightness-105'
            }`}
          >
            {t('takeQuiz')}
          </Link>

          {/* Language switcher */}
          <div className="flex items-center gap-1 border border-outline-variant rounded-full px-1 py-1">
            {LOCALES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setLocale(value)}
                className={`px-3 py-1 rounded-full text-label-md font-semibold transition-all ${
                  locale === value
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          {/* Mobile language switcher */}
          <div className="flex items-center gap-1 border border-outline-variant rounded-full px-1 py-1">
            {LOCALES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setLocale(value)}
                className={`px-2.5 py-0.5 rounded-full text-label-md font-semibold transition-all ${
                  locale === value
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <Link
            href="/quiz"
            className="bg-primary-container text-on-primary-container px-4 py-2 rounded-full text-label-md font-semibold"
          >
            {t('quiz')}
          </Link>
        </div>
      </div>
    </header>
  )
}
