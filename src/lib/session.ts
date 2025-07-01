// Session management using cookies
let refreshInterval: NodeJS.Timeout;

export const sessionManager = {
  get: (key?: string) => {
    if (typeof document === 'undefined') return key ? undefined : {};
    try {
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('session='));
      const data = cookie ? JSON.parse(decodeURIComponent(cookie.split('=')[1])) : {};
      return key ? data[key] : data;
    } catch {
      return key ? undefined : {};
    }
  },
  
  set: (key: string, value: any) => {
    if (typeof document === 'undefined') return;
    try {
      const session = sessionManager.get();
      session[key] = value;
      const isSecure = window.location.protocol === 'https:';
      document.cookie = `session=${encodeURIComponent(JSON.stringify(session))}; path=/; SameSite=Strict${isSecure ? '; Secure' : ''}`;

    } catch {}
  },
  
  clear: () => {
    if (typeof document !== 'undefined') {
      document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      clearInterval(refreshInterval);
    }
  },

  isTokenExpired: (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  },

  getTokenExpiry: (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000;
    } catch {
      return 0;
    }
  },



  scheduleSmartRefresh: (idToken: string, refreshCallback: () => Promise<void>) => {
    clearInterval(refreshInterval);
    const expiresAt = sessionManager.getTokenExpiry(idToken);
    const refreshTime = expiresAt - Date.now() - (5 * 60 * 1000); // 5 min before expiry
    const delay = Math.max(refreshTime, 60000); // minimum 1 minute
    
    refreshInterval = setTimeout(async () => {
      try {
        await refreshCallback();
      } catch (error) {
        console.error('Smart refresh failed:', error);
      }
    }, delay);
  }
};

