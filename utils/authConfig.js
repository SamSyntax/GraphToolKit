import { getLayoutOrPageModule } from "@azure/msal-browser";
import { redirect } from "next/dist/server/api-utils";

export const msalConfig = {
  auth: {
    clientId: "031c5aa3-19ef-4df7-8802-f77124450b2d",
    authority:
      "https://login.microsoftonline.com/5d09469f-9ebd-45b5-872a-dc3b70ec0af5",
    redirectUri: "http://localhost:3000/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, messsage, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case msal.LogLevel.Error:
            console.error(messsage);
            return;
          case msal.LogLevel.Info:
            console.info(messsage);
            return;
          case msal.LogLevel.Verbose:
            console.debug(messsage);
            return;
          case msal.LogLevel.Warning:
            console.warn(messsage);
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read", "Mail.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
