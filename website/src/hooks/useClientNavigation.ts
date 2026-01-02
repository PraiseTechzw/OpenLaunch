'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useClientNavigation() {
  const router = useRouter()

  const navigate = useCallback((href: string, options?: { replace?: boolean }) => {
    // Prevent full page refresh for internal links
    if (href.startsWith('/') || href.startsWith('#')) {
      if (options?.replace) {
        router.replace(href)
      } else {
        router.push(href)
      }
    } else {
      // External links open in new tab
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }, [router])

  const prefetch = useCallback((href: string) => {
    if (href.startsWith('/')) {
      router.prefetch(href)
    }
  }, [router])

  return {
    navigate,
    prefetch,
    router,
  }
}