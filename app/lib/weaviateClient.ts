import weaviate, { WeaviateClient } from "weaviate-client";

const wcdUrl = process.env.WEAVIATE_CLOUD_URL as string;
const wcdApiKey = process.env.WEAVIATE_API_KEY as string;
const coHereKey = process.env.COHERE_API_KEY as string;

export const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  wcdUrl,
  {
    authCredentials: new weaviate.ApiKey(wcdApiKey),
    headers: {
      "X-Cohere-Api-Key": coHereKey,
    },
  }
);
