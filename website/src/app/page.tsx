import { Suspense } from 'react'
import { Hero } from '@/components/Hero'
import { Spinner } from '@/components/ui/loading'
import { 
  LazyFeatures, 
  LazyStats, 
  LazyCommunityShowcase, 
  LazyCallToAction 
} from '@/lib/dynamic-imports'

export default function Home() {
  return (
    <>
      {/* Hero loads immediately as it's above the fold */}
      <Hero />
      
      {/* Below-the-fold components are lazy loaded */}
      <Suspense fallback={
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" />
        </div>
      }>
        <LazyFeatures />
      </Suspense>
      
      <Suspense fallback={
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" />
        </div>
      }>
        <LazyStats />
      </Suspense>
      
      <Suspense fallback={
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" />
        </div>
      }>
        <LazyCommunityShowcase />
      </Suspense>
      
      <Suspense fallback={
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" />
        </div>
      }>
        <LazyCallToAction />
      </Suspense>
    </>
  )
}