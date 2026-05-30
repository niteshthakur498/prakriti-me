import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/landing/HeroSection'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { DoshaPreview } from '@/components/landing/DoshaPreview'
import { Testimonials } from '@/components/landing/Testimonials'
import recommendationsData from '../../data/recommendations.json'

interface DoshaCardData {
  name: string
  sanskrit: string
  tagline: string
  heroDescription: string
  keyTraits: string[]
  icon: string
  primaryColor: string
  gradientFrom: string
  gradientTo: string
}

interface HomeProps {
  doshaProfiles: DoshaCardData[]
}

const Home: NextPage<HomeProps> = ({ doshaProfiles }) => {
  return (
    <>
      <Head>
        <title>PrakritiMe — Discover Your Ayurvedic Nature</title>
        <meta name="description" content="Discover your Ayurvedic mind-body constitution in 5 minutes. Take the Prakriti quiz and receive personalized health recommendations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <HowItWorks />
        <DoshaPreview doshaProfiles={doshaProfiles} />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const doshaProfiles: DoshaCardData[] = Object.values(recommendationsData.doshas).map((d) => ({
    name: d.name,
    sanskrit: d.sanskrit,
    tagline: d.tagline,
    heroDescription: d.heroDescription,
    keyTraits: d.keyTraits,
    icon: d.icon,
    primaryColor: d.primaryColor,
    gradientFrom: d.gradientFrom,
    gradientTo: d.gradientTo,
  }))

  return { props: { doshaProfiles } }
}

export default Home
