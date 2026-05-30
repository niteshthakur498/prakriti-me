import Link from 'next/link'

export function Footer(): JSX.Element {
  return (
    <footer className="w-full py-16 px-5 md:px-10 mt-10 flex flex-col items-center text-center bg-surface-container">
      <div className="max-w-[1200px] w-full mx-auto">
        <Link href="/" className="flex items-center justify-center gap-2 mb-3">
          <span className="text-2xl">🪷</span>
          <span className="font-display text-headline-md text-primary font-bold">PrakritiMe</span>
        </Link>
        <p className="text-on-surface-variant text-body-md max-w-sm mx-auto mb-8">
          Aligning your modern lifestyle with ancient rhythmic wisdom.
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-10">
          <Link href="/about" className="text-on-surface-variant text-label-md hover:text-primary transition-colors font-semibold">
            About Ayurveda
          </Link>
          <Link href="/about#doshas" className="text-on-surface-variant text-label-md hover:text-primary transition-colors font-semibold">
            Dosha Guide
          </Link>
          <Link href="/quiz" className="text-on-surface-variant text-label-md hover:text-primary transition-colors font-semibold">
            Take the Quiz
          </Link>
          <a href="#" className="text-on-surface-variant text-label-md hover:text-primary transition-colors font-semibold">
            Privacy Policy
          </a>
          <a href="#" className="text-on-surface-variant text-label-md hover:text-primary transition-colors font-semibold">
            Terms of Service
          </a>
        </div>
        <div className="w-full pt-6 border-t border-outline-variant/30 text-on-surface-variant text-label-md">
          © 2024 PrakritiMe. Built with heart for Ayurveda lovers.
        </div>
      </div>
    </footer>
  )
}
