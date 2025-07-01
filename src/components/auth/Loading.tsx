'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CONFIG } from '@/lib/config'
import { setAxiosHeaders } from '@/lib/config/axios-config'
import { processAuthCode } from '@/lib/loading/auth-processing'
import { createTempProjectObj, fetchSiteConfig, checkUserSession } from '@/lib/loading/session-utils'
import LoadingIcon from '../ui/loadingIcon'

export default function LoadingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleAuthCode = async () => {
    const code = searchParams.get('code')
    if (!code) return

    try {
      const success = await processAuthCode(code)
      if (success) {
        router.push('/choose-organization')
      }
    } catch (error) {
      console.error('Auth code processing failed:', error)
    }
  }

  const handleUserSession = async () => {
    const result = await checkUserSession()
    console.log("Result", result);
    if (result.success) {
      router.push('/dashboard')
    }
  }

  useEffect(() => {
    const initialize = async () => {
      createTempProjectObj()
      setAxiosHeaders()

      if (CONFIG.mode === 'local') {
        await handleUserSession()

        if (window.location.search.includes('code')) {
          await handleAuthCode()
        }
      } else {
        await fetchSiteConfig()
        await handleUserSession()

        if (window.location.search.includes('code')) {
          await handleAuthCode()
        }
      }
    }

    initialize()
  }, [])


  return (
    <LoadingIcon />
  );

}