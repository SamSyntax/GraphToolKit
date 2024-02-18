"use client";

import {
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

const clientId = "6efab348-fbab-4e26-96a9-216232f930d5";
const tenantId = "5d09469f-9ebd-45b5-872a-dc3b70ec0af5";

const msalConfig = {
  auth: {
    clientId: clientId!,
    authority: `https://login.microsoftonline.com/${tenantId}`,
  },
};

// eslint-disable-next-line @next/next/no-async-client-component
async function Msal() {
  const msalInstance = new PublicClientApplication(msalConfig);

  await msalInstance.initialize();

  msalInstance.loginPopup();
  msalInstance
    .handleRedirectPromise()
    .then((tokenResponse) => {
      console.log(tokenResponse);
      // Check if the tokenResponse is null
      // If the tokenResponse !== null, then you are coming back from a successful authentication redirect.
      // If the tokenResponse === null, you are not coming back from an auth redirect.
    })
    .catch((error) => {
      // handle error, either in the library or coming back from the server
      console.error(error);
    });

  msalInstance.getAllAccounts().forEach((account) => {
    return <div>account.displayName</div>;
  });

  return <div>oj</div>;
}

Msal();

export default Msal;
