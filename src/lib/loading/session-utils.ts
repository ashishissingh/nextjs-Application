import axios from 'axios'
import { CONFIG, updateApiConfig } from '@/lib/config'
import { sessionManager } from '@/lib/session'
import { useAuthStore } from '@/stores/useAuthStore'
import { refreshTokens, scheduleRefresh } from './token-refresh'

export const createTempProjectObj = () => {
  if (typeof window === 'undefined') return

  const emptyState = {
    basicObj: {}, vpcObj: {}, dbObj: {}, bastionObj: {},
    applicationObj: {}, workspaceHostObj: {}, workspaceS3fileObj: {}
  }

  ;(window as any).__globalTempProjectObj = JSON.parse(JSON.stringify(emptyState))
}

export const fetchSiteConfig = async () => {
  if (typeof window === 'undefined') return

  try {
    const response = await axios.get(`${CONFIG.apiUrl}siteconfig`)
    updateApiConfig(response.data)
  } catch (error) {
    console.error('Site config fetch failed:', error)
  }
}

export const checkUserSession = async () => {
  const session = sessionManager.get()
  console.log("Session", session);
  const { setUserData } = useAuthStore.getState()

  if (session.id_token && session.appUserLoggedin) {
    setUserData({ appUserLoggedin: true })
    try {
      await refreshTokens()
      setUserData({ isAppPage: true })
      
      scheduleRefresh()
      if (typeof window !== 'undefined') {
        const currentUrl = window.location.href
        console.log("checking curr route", window.location.href)
        
        const urlParts = currentUrl.split('/')
        let pathIndex = 3
        if (CONFIG.redirectUri === "http://localhost:8080/") {
          pathIndex = 4
        }
        const newPath = "/" + urlParts.slice(pathIndex).join('/')
        console.log("newpath", newPath)
        
        return { success: true, redirectTo: '/dashboard' }
      }
      
      return { success: true, redirectTo: '/dashboard' }
    } catch (error) {
      console.error('Token refresh failed:', error)
      return { success: false }
    }
  } else {
    console.log("Session data:", session)
    return { success: false }
  }
}