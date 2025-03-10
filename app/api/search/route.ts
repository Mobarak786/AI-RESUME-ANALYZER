import { client } from "@/app/lib/weaviateClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const jobDescription: string = body.jobDescription;
    if (!jobDescription) {
      console.log("Please enter the job description");
      return NextResponse.json(
        { message: "Please enter the job description" },
        { status: 400 }
      );
    }

    const collectionName = "userDetails";
    // start the client
    client;

    // Get the collection (must await!)
    const collection = client.collections.get(collectionName);

    // Perform similarity search that returns most  matched data
    const results = await collection.query.nearText(jobDescription, {
      limit: 1,
      returnMetadata: ["distance"],
      // includeVector: true, //this line shows the vector. by default hidden
    });

    //perform RAG implementation to generate a precise information from similarity search
    const LLMprompt = `You are a genious HR who has geat resume evalution skills.Use the given Job Description:${jobDescription} and 
     Resume Details: {skills}. {experience}. {education} to evalute the users and return your conclusion( use emojies if needed for good looking text) in this format:
     #User Name:{name}
     #User Email:{email}
     #Conclution:write your conclution here after judging resume details.
     Finally give a rank to the Users from 1 to 10 where 10 means best matchs with job description and 1 means less keyword matches `;

    const RagResponse = await collection.generate.nearText(
      jobDescription,
      {
        singlePrompt: LLMprompt,
      },
      {
        returnProperties: [
          "name",
          "email",
          "skills",
          "experience",
          "education",
        ],
        limit: 1,
      }
    );

    const generatedPrompts = RagResponse.objects.map(
      (element) => element.generated
    );

    console.log(results, generatedPrompts);

    return NextResponse.json(
      { success: true, data: results, AiResponse: generatedPrompts },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
