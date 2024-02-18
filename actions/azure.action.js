import "isomorphic-fetch";
// import { Client } from "@microsoft/microsoft-graph-client";
import { SubscriptionClient } from "@azure/arm-subscriptions";
import {
  ClientSecretCredential,
  DefaultAzureCredential,
  TokenCredential,
} from "@azure/identity";

const tenantId = process.env.TENANT_ID;
const clientId = process.env.CLIENT_ID;
const secret = process.env.SECRET;

let credentials = null;

if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
  // prod
  credentials = new DefaultAzureCredential();
} else {
  if (tenantId && clientId && secret) {
    credentials = new ClientSecretCredential(tenantId, clientId, secret);
  } else {
    credentials = new DefaultAzureCredential();
  }
}

export async function listSubscriptions() {
  try {
    const client = new SubscriptionClient(credentials);

    for await (const item of client.subscriptions.list()) {
      const subscriptionDetails = await client.subscriptions.get(
        item.subscriptionId
      );

      console.log(subscriptionDetails);
    }
  } catch (err) {
    console.error(JSON.stringify(err));
  }
}

listSubscriptions()
  .then(() => {
    console.log("done");
  })
  .catch((ex) => {
    console.log(ex);
  });
