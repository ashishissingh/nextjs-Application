'use client'
import { useState, useEffect } from 'react'
import { sessionManager } from '@/lib/session'

export const useSession = () => {
  const [session, setSession] = useState(sessionManager.get())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initial load
    setSession(sessionManager.get())
    setIsLoading(false)

    // Poll for session changes
    const interval = setInterval(() => {
      const currentSession = sessionManager.get()
      setSession(currentSession)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const isAuthenticated = () => {
    return !!(session.id_token && !sessionManager.isTokenExpired(session.id_token))
  }

  const logout = () => {
    sessionManager.clear()
    setSession({})
    window.location.href = '/'
  }

  return {
    session,
    isLoading,
    isAuthenticated: isAuthenticated(),
    logout,
    user: {
      name: session.username,
      email: session.usermail,
      id: session.usercid,
      type: session.userType,
      isSuperAdmin: session.isSuperAdmin,
      orgId: session.orgId,
      imageUrl: session.imageUrl
    }
  }
}