import { NextResponse } from "next/server";
import { client } from "@/app/lib/weaviateClient";
import { insertIntoCollection } from "@/app/lib/insertToCollection";
import { createCollection } from "@/app/lib/createCollection";
import { json } from "stream/consumers";
interface userData {
  name: string;
  email: string;
  linkedin: string;
  skills: string[];
  experience: string;
  education: string;
}
export async function storeVector(user: userData) {
  const { name, email, linkedin, skills, experience, education } = user;

  try {
    if (!name || !email || !linkedin || !skills || !experience || !education) {
      console.log("all fields are required");
      return NextResponse.json("all fields are required ");
    }
    //connect to weaviate cloud db
    const clientReadiness = await client.isReady();
    if (clientReadiness) {
      console.log("sucessfully connected to the weavaite cloud");
    } else {
      console.log("could not connect to weaviate db");
      return NextResponse.json({ error: "could not connect to the DB" });
    }

    //create a collection
    const collectionName = "userDetails";
    const collectionExists = await client.collections.exists(collectionName);
    if (!collectionExists) {
      await createCollection(client, collectionName);
    }

    //now send data to the collection
    const userData = {
      name: name,
      email: email,
      linkedin: linkedin,
      skills: skills,
      experience: experience,
      education: education,
    };

    await insertIntoCollection(client, collectionName, userData);

    return NextResponse.json(
      {
        message: "Candidates profile stored successfully",
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json(
      { sucess: false, data: err.message },
      { status: 500 }
    );
  } finally {
    client.close();
  }
}
