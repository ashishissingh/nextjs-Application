import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProfileObj {
  access_token: string
  id_token?: string
  refresh_token?: string
  usercid: string
  name: string
  email: string
  appUserLoggedin: boolean
}

interface AuthState {
  appUserLoggedin: boolean
  usercid: string
  username: string
  usermail: string
  coguser: string
  userType: string
  isSuperAdmin: boolean
  primary_org: string
  
  orgId: {
    domain: string
    userPerms: {
      admin: string[]
      readonly: string[]
      dev: string[]
    }
    userType: string
  } | null
  
  userPerms: {
    admin: string[]
    readonly: string[]
    dev: string[]
    current_org: string
    primary_org: string
  } | null
  
  imageUrl: string
  profileObj: ProfileObj | null
  isAppPage: boolean
  
  setUserData: (userData: Partial<AuthState>) => void
  setProfile: (profile: Partial<ProfileObj>) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      appUserLoggedin: false,
      usercid: '',
      username: '',
      usermail: '',
      coguser: '',
      userType: '',
      isSuperAdmin: false,
      primary_org: '',
      orgId: null,
      userPerms: null,
      imageUrl: '',
      profileObj: null,
      isAppPage: false,
      
      setUserData: (userData) => set((state) => ({ ...state, ...userData })),
      setProfile: (profile) => set({ profileObj: profile as ProfileObj }),
      clearAuth: () => set({
        appUserLoggedin: false,
        usercid: '',
        username: '',
        usermail: '',
        coguser: '',
        userType: '',
        isSuperAdmin: false,
        primary_org: '',
        orgId: null,
        userPerms: null,
        imageUrl: '',
        profileObj: null,
        isAppPage: false
      })
    }),
    {
      name: 'auth-storage'
    }
  )
)