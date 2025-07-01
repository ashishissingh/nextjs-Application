import axios from 'axios'
import qs from 'qs'
import { CONFIG, apiConfig } from '@/lib/config'
import { sessionManager } from '@/lib/session'
import { setAxiosHeaders } from '@/lib/config/axios-config'
import { useAuthStore } from '@/stores/useAuthStore'
import { scheduleRefresh } from './token-refresh'

export const processTokens = async (idToken: string, accessToken: string, refreshToken: string) => {
  setAxiosHeaders(idToken)

  try {
    const cognitoResponse = await axios.post(
      `https://cognito-idp.${CONFIG.region}.amazonaws.com/`,
      { AccessToken: accessToken },
      {
        headers: {
          'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser',
          'Content-Type': 'application/x-amz-json-1.1'
        }
      }
    )

    const userData = cognitoResponse.data
    let username = '', usermail = '', usercid = '', orgId = '', userType = 'User'

    userData.UserAttributes?.forEach((attr: any) => {
      switch (attr.Name) {
        case 'name': username = attr.Value || ''; break
        case 'email': usermail = attr.Value || ''; break
        case 'sub': usercid = attr.Value || ''; break
        case 'custom:org_id': orgId = attr.Value; break
        case 'custom:userType': userType = attr.Value || 'User'; break
      }
    })

    orgId = orgId || usermail.split('@')[1]

    let userCheckResponse, checkData
    try {
      userCheckResponse = await axios.post(`${apiConfig.apiUrl}checkUsr`, {
        _id: usercid,
        email: usermail,
        name: username,
        coguser: userData.Username,
        user_type: userType,
        org_id: orgId,
        external_org: [],
        userPerms: { admin: [], readonly: [], dev: [] },
        domain: orgId
      })
      checkData = userCheckResponse.data
    } catch (checkUsrError) {
      console.error('checkUsr API failed:', checkUsrError)
      sessionManager.clear()
      sessionStorage.setItem('authError', 'Error authenticating')
      window.location.href = '/login'
      throw checkUsrError
    }

    if (checkData.admin_approve) {
      const { setUserData, setProfile } = useAuthStore.getState()

      setUserData({
        userPerms: {
          admin: checkData.userPerms.admin,
          readonly: checkData.userPerms.readonly,
          dev: checkData.userPerms.dev,
          current_org: checkData.primary_org,
          primary_org: checkData.primary_org
        },
        userType: checkData.user_type || 'User'
      })

      const primaryOrg = checkData.primary_org
      const orgIdData = {
        domain: primaryOrg,
        userPerms: {
          admin: checkData.userPerms.admin,
          readonly: checkData.userPerms.readonly,
          dev: checkData.userPerms.dev
        },
        userType: checkData.user_type || 'User'
      }

      setUserData({ appUserLoggedin: true })

      // Session management
      sessionManager.set('primary_org', primaryOrg)
      sessionManager.set('access_token', accessToken)
      sessionManager.set('id_token', idToken)
      sessionManager.set('refresh_token', refreshToken)
      sessionManager.set('appUserLoggedin', true)
      sessionManager.set('usercid', usercid)
      sessionManager.set('username', username)
      sessionManager.set('coguser', userData.Username)
      sessionManager.set('usermail', usermail)
      sessionManager.set('isSuperAdmin', checkData.user_type === 'Superadmin')
      sessionManager.set('orgId', orgIdData)
      sessionManager.set('userType', checkData.user_type)

      // Set profile payload
      const payload = {
        'access_token': accessToken,
        'id_token': idToken,
        'refresh_token': refreshToken,
        'usercid': usercid,
        'name': username,
        'email': usermail,
        'appUserLoggedin': true
      }

      setProfile(payload)

      // Schedule refresh
      scheduleRefresh()

      // Fetch profile image
      try {
        const profileResponse = await axios.get(`${apiConfig.apiUrl}profile/get`, {
          params: { userid: usercid }
        })
        setUserData({ imageUrl: profileResponse.data.imageUrl })
      } catch (error) {
        console.error('Error fetching profile image:', error)
      }

      // Conditional routing - return routing info for component to handle
      const isSuperAdmin = checkData.user_type === 'Superadmin'
      setUserData({ 
        isSuperAdmin,
        isAppPage: true 
      })

      return {
        success: true,
        redirectTo: '/choose-organization',
        isSuperAdmin,
        setAppPage: true
      }
    }

    return { success: false }
  } catch (error) {
    console.error('Token processing error:', error)
    throw error
  }
}

export const processAuthCode = async (code: string) => {
  try {
    const tokenResponse = await axios.post(
      `${CONFIG.cognitoDomain}/token`,
      qs.stringify({
        grant_type: 'authorization_code',
        client_id: CONFIG.clientId,
        client_secret: CONFIG.clientSecret,
        code,
        redirect_uri: CONFIG.redirectUri
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )

    const { id_token, access_token, refresh_token } = tokenResponse.data
    return await processTokens(id_token, access_token, refresh_token)
  } catch (error) {
    console.error('Auth code processing failed:', error)
    throw error
  }
}