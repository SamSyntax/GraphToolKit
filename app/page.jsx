// // import AuthComponent from "@/components/AuthComponent";
// "use client";
// import BlobView from "@/components/Blob";
// import Msal from "@/components/Msal";
// import Ren from "@/components/ProfileContent";
// import TestBlob from "@/components/TestBlob";
// import { msalConfig } from "@/utils/authConfig";
// import { PublicClientApplication } from "@azure/msal-browser";
// import { MsalProvider, useMsal } from "@azure/msal-react";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen w-screen gap-2 items-center justify-between p-24 bg-white text-black">
//       <div className="App">
//         {/* <BlobView /> */}
//         {/* <Msal /> */}
//         {/* <AuthComponent /> */}
//         <Ren />
//         {/* <TestBlob /> */}
//       </div>
//     </main>
//   );
// }
"use client";
import React, { useState } from "react";
import "./styles/App.css";
import { PageLayout } from "../components/PageLayout";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import { loginRequest } from "../utils/authConfig";
import { callMsGraph } from "../utils/graph";
import { ProfileData } from "../components/ProfileData";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
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
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
    localStorage.setItem("profileData", true);
  }

  return (
    <>
      <h5 className="card-title">Welcome {accounts[0].name}</h5>
      {graphData ? (
        <ProfileData graphData={graphData} />
      ) : (
        <Button variant="secondary" onClick={RequestProfileData}>
          Request Profile Information {accounts[0].username}
        </Button>
      )}
    </>
  );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h5 className="card-title">
          Please sign-in to see your profile information.
        </h5>
      </UnauthenticatedTemplate>
    </div>
  );
};

function App() {
  return (
    <PageLayout>
      <MainContent />
    </PageLayout>
  );
}

export default App;
