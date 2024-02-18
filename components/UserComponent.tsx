// import React, { useEffect, useState } from "react";
// import { PublicClientApplication } from "@azure/msal-browser";
// import { GraphRbacManagementClient } from "@azure/graph";
// import { Browser}
// import Image from "next/image";

// interface User {
//   id: string;
//   displayName: string;
//   userPrincipalName: string;
// }

// const BlobView = () => {
//   const [userProfile, setUserProfile] = useState<User | null>(null);
//   const uri = "https://graph.microsoft.com/v1.0";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Initialize MSAL PublicClientApplication
//         const msalConfig = {
//           auth: {
//             clientId: "6efab348-fbab-4e26-96a9-216232f930d5",
//             authority: "https://login.microsoftonline.com/YourTenantId",
//             redirectUri: window.location.origin,
//           },
//         };
//         const msalInstance = new PublicClientApplication(msalConfig);

//         // Authenticate user
//         const loginRequest = {
//           scopes: ["User.Read"],
//         };
//         const authResult = await msalInstance.loginPopup(loginRequest);

//         // Initialize GraphRbacManagementClient with access token
//         const accessToken = authResult.accessToken;
//         const graphClient = new GraphRbacManagementClient(accessToken);

//         // Fetch user profile
//         const userProfileResponse = await graphClient.users.get("userObjectId");
//         const userProfile: User = {
//           id: userProfileResponse?.objectId ?? "",
//           displayName: userProfileResponse?.displayName ?? "",
//           userPrincipalName: userProfileResponse?.userPrincipalName ?? "",
//         };
//         setUserProfile(userProfile);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {userProfile && (
//         <div>
//           <h2>User Profile</h2>
//           <p>Name: {userProfile.displayName}</p>
//           <p>Email: {userProfile.userPrincipalName}</p>
//           {/* Display profile picture if available */}
//           {userProfile.id && (
//             <Image
//               src={`https://graph.microsoft.com/v1.0/users/${userProfile.id}/photo/$value`}
//               alt="User Profile Picture"
//               width={400}
//               height={400}
//               className="rounded-xl"
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlobView;
