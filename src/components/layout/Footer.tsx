import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export function Footer(): JSX.Element {
  const t = useTranslations('footer')

  return (
    <footer className="w-full py-16 px-5 md:px-10 mt-10 flex flex-col items-center text-center bg-surface-container">
      <div className="max-w-[1200px] w-full mx-auto">
        <Link href="/" className="flex items-center justify-center gap-2 mb-3">
          <Image src="/logo.png" alt="PrakritiMe logo" width={36} height={36} className="rounded-full" />
          <span className="font-display text-headline-md text-primary font-bold">PrakritiMe</span>
        </Link>
        <p className="text-on-surface-variant text-body-md max-w-sm mx-auto mb-8">
          {t('tagline')}
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-10">
          <Link href="/about" className="text-on-surface-variant text-label-md hover:text-primary transition-colors font-semibold">
            {t('aboutAyurveda')}
          </Link>
          <Link href="/about#doshas" className="text-on-surface-variant text-label-md hover:text-primary transition-colors font-semibold">
            {t('doshaGuide')}
          </Link>
          <Link href="/quiz" className="text-on-surface-variant text-label-md hover:text-primary transition-colors font-semibold">
            {t('takeQuiz')}
          </Link>
          <a href="#" className="text-on-surface-variant text-label-md hover:text-primary transition-colors font-semibold">
            {t('privacy')}
          </a>
          <a href="#" className="text-on-surface-variant text-label-md hover:text-primary transition-colors font-semibold">
            {t('terms')}
          </a>
        </div>
        <div className="w-full pt-6 border-t border-outline-variant/30 text-on-surface-variant text-label-md">
          {t('copyright')}
        </div>
      </div>
    </footer>
  )
}
