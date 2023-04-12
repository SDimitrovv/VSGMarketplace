import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "86ceffd4-8632-4677-bbb6-e7badafa26ec",
        authority: "https://login.microsoftonline.com/50ae1bf7-d359-4aff-91ac-b084dc52111e",
        redirectUri: "https://vsg-marketplace-front-end.vercel.app/",
        navigateToLoginRequestUrl: false
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
};

export const loginRequest = {
    scopes: ["User.Read"],
};

export const instance = new PublicClientApplication(msalConfig);
