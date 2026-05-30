import Link from 'next/link'
import { useRouter } from 'next/router'

export function Navbar(): JSX.Element {
  const router = useRouter()

  return (
    <header className="fixed top-0 w-full z-50 glass-nav sun-shadow">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 flex justify-between items-center h-20">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-lg">
            🪷
          </div>
          <span className="font-display text-headline-md text-primary font-bold">PrakritiMe</span>
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          <Link
            href="/about"
            className="text-on-surface-variant text-label-md font-semibold hover:text-primary transition-colors"
          >
            About Prakriti
          </Link>
          <Link
            href="/about#doshas"
            className="text-on-surface-variant text-label-md font-semibold hover:text-primary transition-colors"
          >
            Dosha Guide
          </Link>
          <Link
            href="/quiz"
            className={`px-6 py-2.5 rounded-full text-label-md font-semibold transition-all ${
              router.pathname === '/quiz'
                ? 'bg-primary text-on-primary'
                : 'bg-primary-container text-on-primary-container hover:brightness-105'
            }`}
          >
            Take the Quiz
          </Link>
        </nav>

        <Link
          href="/quiz"
          className="md:hidden bg-primary-container text-on-primary-container px-4 py-2 rounded-full text-label-md font-semibold"
        >
          Quiz
        </Link>
      </div>
    </header>
  )
}
