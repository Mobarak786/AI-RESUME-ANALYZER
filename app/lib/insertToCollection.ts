import { WeaviateClient } from "weaviate-client";

export async function insertIntoCollection(
  client: WeaviateClient,
  collectionName: string,
  data: any
) {
  const collection = client.collections.get(collectionName);

  try {
    await collection.data.insert({ properties: data });
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}
