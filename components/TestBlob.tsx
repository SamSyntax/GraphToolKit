import React from "react";
import { BlobItem, BlobServiceClient } from "@azure/storage-blob";
import Image from "next/image";

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const sasToken = process.env.AZURE_STORAGE_SAS_TOKEN;
if (!accountName) throw Error("Azure Storage accountName not found");
if (!sasToken) throw Error("Azure Storage accountKey not found");

const blobServiceUri = "https://nextblob.blob.core.windows.net/";

const blobServiceClient = new BlobServiceClient(
  `${blobServiceUri}?${sasToken}`
);

console.log(blobServiceClient);

export interface TestBlobProps {}

const TestBlob = async () => {
  const containerName = "private";
  const blobName = "privdir/Front.png";

  const containerClient = await blobServiceClient.getContainerClient(
    containerName
  );

  const localBlobList: BlobItem[] = [];

  for await (const blob of containerClient.listBlobsFlat()) {
    localBlobList.push(blob);
  }

  const blobClient = await containerClient.getBlockBlobClient(blobName);

  await blobClient.containerName;
  //   await blobClient.downloadToFile(fileName);

  console.log(`${blobName} downloaded`);
  console.log(`${localBlobList[1].name} downloaded`);

  return (
    <div>
      <h1>{containerClient.url + "/" + localBlobList[1].name}</h1>
      <Image
        src="https://nextblob.blob.core.windows.net/private/privdir/clouds.jpg"
        alt={localBlobList[1].name}
        width={400}
        height={400}
      />
    </div>
  );
};

export default TestBlob;
