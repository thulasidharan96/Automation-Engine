/*
import { PublicClientApplication, EventType, InteractionType } from '@azure/msal-browser';

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID as string,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: (import.meta.env.VITE_REDIRECT_URI as string) || window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
});

export const loginRequest = {
  scopes: ['openid', 'profile', 'email'],
};
*/

// Placeholder exports so imports resolve even when MSAL is disabled
export const msalInstance: unknown = null;
export const loginRequest: unknown = null;
