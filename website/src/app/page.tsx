import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Stats } from '@/components/Stats'
import { CommunityShowcase } from '@/components/CommunityShowcase'
import { CallToAction } from '@/components/CallToAction'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <CommunityShowcase />
      <CallToAction />
    </>
  )
}