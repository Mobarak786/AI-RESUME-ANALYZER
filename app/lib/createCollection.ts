import {
  configure,
  dataType,
  vectorizer,
  WeaviateClient,
} from "weaviate-client";

export async function createCollection(
  client: WeaviateClient,
  collectionName: string
) {
  try {
    // create a collection in to the cloud db
    await client.collections.create({
      name: collectionName,
      // Define the vectorizer module
      vectorizers: [
        vectorizer.text2VecCohere({
          name: "userDetails",
          sourceProperties: ["userDetails"],
          vectorIndexConfig: configure.vectorIndex.hnsw(),
        }),
      ],
      // define the collection properties
      properties: [
        {
          name: "name",
          dataType: dataType.TEXT,
        },
        {
          name: "email",
          dataType: dataType.TEXT,
        },
        {
          name: "linkedin",
          dataType: dataType.TEXT,
        },
        {
          name: "skills",
          dataType: dataType.TEXT_ARRAY,
        },
        {
          name: "experience",
          dataType: dataType.TEXT,
        },
        {
          name: "education",
          dataType: dataType.TEXT,
        },
      ],
      // Define the generative module
      generative: configure.generative.cohere(),
    });
    console.log("colletion created successfuly");
  } catch (error: any) {
    console.log(error.message);
  }
}
