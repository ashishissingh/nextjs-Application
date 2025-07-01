// Configuration constants
export const CONFIG = {
  mode: process.env.NEXT_PUBLIC_APP_MODE,
  region: process.env.NEXT_PUBLIC_COGNITO_REGION,
  apiUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  cognitoDomain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
  clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI,
  userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
};

// API configuration
export let apiConfig = {
  clientId: '',
  tokenEndpoint: '',
  authorizeEndpoint: '',
  apiUrl: CONFIG.apiUrl
};

export const updateApiConfig = (config: any) => {
  apiConfig = {
    clientId: config.app_client_id,
    tokenEndpoint: `${config.user_pool_domain}/oauth2/token`,
    authorizeEndpoint: `${config.user_pool_domain}/oauth2/authorize?identity_provider=AzureAD&redirect_uri=${typeof window !== 'undefined' ? window.location.origin : ''}/loading&response_type=CODE&client_id=${config.app_client_id}&scope=aws.cognito.signin.user.admin email openid phone profile`,
    apiUrl: CONFIG.apiUrl
  };
};