import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../utils/authConfig";
import { Button } from "../components/ui/button";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <div>
      <Button as="button" onClick={() => handleLogin("popup")}>
        Sign in using Popup
      </Button>
      <Button as="button" onClick={() => handleLogin("redirect")}>
        Sign in using Redirect
      </Button>
    </div>
  );
};
