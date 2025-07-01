import axios from 'axios'
import qs from 'qs'
import { apiConfig, CONFIG } from '@/lib/config'
import { sessionManager } from '@/lib/session'
import { setAxiosHeaders } from '@/lib/config/axios-config'
import { useAuthStore } from '@/stores/useAuthStore'

let refreshInterval: NodeJS.Timeout | null = null

export const refreshTokens = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const refreshToken = sessionManager.get('refresh_token')
    console.log("Starting token refresh process")

    const requestData = qs.stringify({
      grant_type: "refresh_token",
      client_id: apiConfig.clientId,
      refresh_token: refreshToken
    })

    axios.post(`${CONFIG.cognitoDomain}/token`, requestData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((tokenResponse) => {
      const accessToken = tokenResponse.data.access_token
      const idToken = tokenResponse.data.id_token

      console.log("New tokens received")
      console.log("Current cognito user:", sessionManager.get('coguser'))

      const storedRefreshToken = sessionManager.get('refresh_token')
      const userId = sessionManager.get('usercid')
      const userName = sessionManager.get('username')
      const userEmail = sessionManager.get('usermail')
      const cognitoUser = sessionManager.get('coguser')
      const currentUserType = sessionManager.get('userType')
      const orgDomain = sessionManager.get('orgId')?.domain
      const isLoggedIn = sessionManager.get('appUserLoggedin')
      const primaryOrg = sessionManager.get('primary_org') || ""

      const checkUserData = {
        "_id": userId,
        "email": userEmail,
        "name": userName,
        "org_id": orgDomain,
        "coguser": cognitoUser,
        "external_org": [],
        "userPerms": {
          "admin": [],
          "readonly": [],
          "dev": []
        },
        "domain": sessionManager.get('orgId')?.domain || sessionManager.get('primary_org')
      }

      console.log("User validation data:", checkUserData)

      axios.post(`${apiConfig.apiUrl}checkUsr`, checkUserData).then((userResponse) => {
        const { setUserData, setProfile } = useAuthStore.getState()

        console.log("User validation response received:", userResponse)
        console.log("Current organization data:", sessionManager.get('orgId'))
        
        sessionManager.set('access_token', accessToken)
        sessionManager.set('id_token', idToken)
        setAxiosHeaders(idToken)

        setUserData({
          userPerms: {
            admin: userResponse.data.userPerms.admin,
            readonly: userResponse.data.userPerms.readonly,
            dev: userResponse.data.userPerms.dev,
            current_org: sessionManager.get('orgId')?.domain || '',
            primary_org: userResponse.data.primary_org
          },
          userType: userResponse.data.user_type || "User"
        })

        sessionManager.set('primary_org', userResponse.data.primary_org)

        const finalAccessToken = accessToken
        const finalIdToken = idToken

        const isSuperAdmin = userResponse.data.user_type === 'Superadmin'
        const finalUserType = userResponse.data.user_type
        sessionManager.set('userType', finalUserType)

        setUserData({
          isSuperAdmin,
          userType: finalUserType || "User"
        })

        const payload = {
          'access_token': finalAccessToken,
          'id_token': finalIdToken,
          'refresh_token': storedRefreshToken,
          'usercid': userId,
          'name': userName,
          'email': userEmail,
          'appUserLoggedin': isLoggedIn
        }

        axios.get(`${apiConfig.apiUrl}profile/get`, { params: { userid: userId } })
          .then(profileResponse => {
            console.log("Profile data received:", profileResponse)
            const profileImageUrl = profileResponse.data.imageUrl
            setUserData({ imageUrl: profileImageUrl })
            console.log("Profile image URL:", profileImageUrl)
            setProfile(payload)
          })
          .catch(error => {
            console.error('Error fetching profile image:', error)
          })

        resolve()
      }).catch((checkUsrError) => {
        console.error('checkUsr API failed:', checkUsrError)
        sessionManager.clear()
        sessionStorage.setItem('authError', 'Error authenticating')
        window.location.href = '/login'
        reject(checkUsrError)
      })

    }).catch((error) => {
      const { setUserData, setProfile } = useAuthStore.getState()

      const payload = {
        'access_token': '',
        'usercid': '',
        'name': '',
        'email': '',
        'appUserLoggedin': false
      }

      setProfile(payload)
      sessionManager.set('appUserLoggedin', false)
      setUserData({ userPerms: null })
      setUserData({
        appUserLoggedin: false,
        isAppPage: false
      })

      sessionManager.clear()
      reject(error)
    })

    console.log("Token refresh process completed")
  })
}

export const scheduleRefresh = () => {
  if (refreshInterval) clearInterval(refreshInterval)
  const delay = 1320 * 1000
  refreshInterval = setInterval(() => refreshTokens().catch(console.error), delay)
}