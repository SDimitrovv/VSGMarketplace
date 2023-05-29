import { PublicClientApplication, Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
    auth: {
        clientId: '86ceffd4-8632-4677-bbb6-e7badafa26ec',
        authority: 'https://login.microsoftonline.com/50ae1bf7-d359-4aff-91ac-b084dc52111e',
        navigateToLoginRequestUrl: false
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
};

interface LoginRequest {
    scopes: string[];
}

export const loginRequest: LoginRequest = {
    scopes: ['email profile openid api://86ceffd4-8632-4677-bbb6-e7badafa26ec/Files.Read'],
};

export const instance = new PublicClientApplication(msalConfig);
