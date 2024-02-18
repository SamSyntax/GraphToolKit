// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   BlobSASPermissions,
//   BlobServiceClient,
//   generateBlobSASQueryParameters,
// } from "@azure/storage-blob";
// import Image from "next/image";

// interface BlobItem {
//   name: string;
//   properties: {
//     contentLength?: number; // contentLength might be undefined
//   };
// }

// const AuthComponent = () => {
//   const [blobsFound, setBlobsFound] = useState<BlobItem[]>([]);
//   const [containerUrl, setContainerUrl] = useState<string>("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const blobServiceClient = new BlobServiceClient(
//         // Update with your blob service URL
//         "https://nextblob.blob.core.windows.net/",
//         // Pass SAS token as the second argument
//         {
//           // Pass your SAS token here
//           credential:
//             "?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-03-12T21:53:11Z&st=2024-02-12T13:53:11Z&spr=https,http&sig=YWrUC%2BaJ%2BeTi7PEt0hLydgALPoKe%2FqKMbVbvzxrv014%3D",
//         }
//       );

//       const containerClient = blobServiceClient.getContainerClient("private");
//       const localBlobList: BlobItem[] = [];

//       for await (const blob of containerClient.listBlobsFlat()) {
//         localBlobList.push(blob);
//       }

//       setBlobsFound(localBlobList);
//       setContainerUrl(containerClient.url);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Blob name</th>
//             <th>Size</th>
//             <th>Url</th>
//             <th>Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {blobsFound.map((blob, index) => (
//             <tr key={index}>
//               <td>{blob.name}</td>
//               <td>{blob.properties.contentLength}</td>
//               <td>{containerUrl + "/" + blob.name}</td>
//               <td>
//                 <AzureBlobImage
//                   containerUrl={containerUrl}
//                   blobName={blob.name}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// interface AzureBlobImageProps {
//   containerUrl: string;
//   blobName: string;
// }

// const AzureBlobImage: React.FC<AzureBlobImageProps> = ({
//   containerUrl,
//   blobName,
// }) => {
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   useEffect(() => {
//     const generateSasToken = async () => {
//       const expiryDate = new Date();
//       expiryDate.setMinutes(expiryDate.getMinutes() + 30); // Set expiry date to 30 minutes from now

//       const sasToken = await generateSasTokenUsingSdk(
//         containerUrl,
//         blobName,
//         expiryDate
//       );

//       const signedUrl = `${containerUrl}/${blobName}?${sasToken}`;
//       setImageUrl(signedUrl);
//     };

//     generateSasToken();
//   }, [containerUrl, blobName]);

//   if (!imageUrl) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Image
//       src={imageUrl}
//       alt={blobName}
//       width={400}
//       height={400}
//       className="rounded-xl"
//     />
//   );
// };

// const generateSasTokenUsingSdk = async (
//   containerUrl: string,
//   blobName: string,
//   expiryDate: Date
// ): Promise<string> => {
//   // Generate Blob SAS token parameters
//   const blobSAS = generateBlobSASQueryParameters({
//     containerName: containerUrl,
//     blobName: blobName,
//     permissions: BlobSASPermissions.parse("r"), // Grant read permission
//     startsOn: new Date(),
//     expiresOn: expiryDate,
//   });

//   // Construct the SAS token string
//   return blobSAS.toString();
// };

// export default AuthComponent;
