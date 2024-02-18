"use client";

import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { SetStateAction, useState } from "react";
import { loginRequest, msalConfig } from "@/utils/authConfig";
import { callMsGraph } from "../utils/graph";
import { ProfileData } from "@/components/ProfileData";
import { Button } from "./ui/button";
import { PublicClientApplication } from "@azure/msal-browser";
import { SignInButton } from "./Button.jsx";

// export const ProfileContent = () => {
//   const { instance, accounts } = useMsal();
//   const [graphData, setGraphData] = useState(null);

//   function RequestProfileData() {
//     instance
//       .acquireTokenSilent({
//         ...loginRequest,
//         account: accounts[0],
//       })
//       .then((response) => {
//         callsMsGraph(response.accessToken).then(
//           (response: SetStateAction<null>) => {
//             setGraphData(response);
//           }
//         );
//       });
//     localStorage.setItem("profileData", "data");
//   }

//   return (
//     <div className="bg-slate-800">
//       <ProfileData graphData={graphData} />
//     </div>
//   );
// };
const msalInstance = new PublicClientApplication(msalConfig);

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callsMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  }

  return (
    <>
      <MsalProvider instance={msalInstance}>
        <h5 className="card-title">Welcome {accounts[0].name}</h5>
        {graphData ? (
          <ProfileData graphData={graphData} />
        ) : (
          <Button onClick={RequestProfileData}>
            Request Profile Information {accounts[0].username}
          </Button>
        )}
      </MsalProvider>
    </>
  );
};

const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <SignInButton />
        <h5 className="card-title">
          Please sign-in to see your profile information.
        </h5>
      </UnauthenticatedTemplate>
    </div>
  );
};

function Ren() {
  return (
    <div>
      <MainContent />
    </div>
  );
}

export default Ren;
