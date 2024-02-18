"use client";
import React, { useEffect, useState } from "react";
import { InteractiveBrowserCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import Image from "next/image";

interface BlobItem {
  name: string;
  properties: {
    contentLength?: number; // contentLength might be undefined
  };
}

const BlobView = () => {
  const [blobsFound, setBlobsFound] = useState<BlobItem[]>([]);
  const [containerUrl, setContainerUrl] = useState<string>("");

  useEffect(() => {
    const signInOptions = {
      clientId: "6efab348-fbab-4e26-96a9-216232f930d5",
      tenantId: "5d09469f-9ebd-45b5-872a-dc3b70ec0af5",
    };

    const fetchData = async () => {
      const blobStorageClient = new BlobServiceClient(
        "https://nextblob.blob.core.windows.net/",
        new InteractiveBrowserCredential(signInOptions)
      );

      const containerClient = blobStorageClient.getContainerClient("private");
      const localBlobList: BlobItem[] = [];

      for await (const blob of containerClient.listBlobsFlat()) {
        localBlobList.push(blob);
      }

      setBlobsFound(localBlobList);
      setContainerUrl(containerClient.url);
    };

    fetchData();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Blob name</th>
            <th>Size</th>
            <th>Url</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {blobsFound.map((blob, index) => (
            <tr key={index}>
              <td>{blob.name}</td>
              <td>{blob.properties.contentLength}</td>
              <td>{containerUrl + "/" + blob.name}</td>
              <td>
                <Image
                  src={containerUrl + "/" + blob.name}
                  alt={blob.name}
                  width={400}
                  height={400}
                  className="rounded-xl"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlobView;
