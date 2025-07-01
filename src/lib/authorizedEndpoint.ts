export function getAuthorizeEndpoint(): string {
    const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI;
    const identityProvider = process.env.NEXT_PUBLIC_COGNITO_IDP_NAME;
    const scope = process.env.NEXT_PUBLIC_COGNITO_SCOPE;

    const authorizeEndpoint = `${domain}/authorize?identity_provider=${identityProvider}&redirect_uri=${redirectUri}&response_type=CODE&client_id=${clientId}&scope=${scope}`;
    
    return authorizeEndpoint;
}
