//
import { NextRequest, NextResponse } from "next/server";
// the pdf-parser libary has a bug so direct import gives error. i found that after wasting many times.
import pdf from "pdf-parse/lib/pdf-parse.js";
import fs from "fs";
import { storeVector } from "@/app/lib/storeVector";
import { extractResumeData } from "@/app/lib/extractResume";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("resume") as File;

    if (!file) {
      console.error("❌ No file found");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("✅ File received:", file.name, file.type, file.size);

    // Ensure file is a PDF
    if (!file.type.includes("pdf")) {
      console.error("❌ Uploaded file is not a PDF");
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("✅ Buffer created successfully");

    //  Debugging: Save buffer as a file to check content
    fs.writeFileSync("./uploaded.pdf", buffer);
    console.log("📝 Saved uploaded PDF for debugging");

    // Parse PDF
    let pdfData;
    try {
      pdfData = await pdf(buffer);
      console.log("✅ PDF parsed successfully");
    } catch (pdfError) {
      console.error("❌ PDF Parsing Error:", pdfError);
      return NextResponse.json(
        { error: "Failed to process PDF." },
        { status: 500 }
      );
    }

    if (!pdfData.text) {
      console.error("❌ PDF has no readable text");
      return NextResponse.json(
        { error: "PDF contains no readable text." },
        { status: 400 }
      );
    }
    const resumeText = pdfData.text || "";

    //extract the important data from the resume using LLM
    const filteredData = await extractResumeData(resumeText);

    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const linkedin = formData.get("linkedin")?.toString() || "";
    const skills =
      formData.get("skills")?.toString().split(",") || filteredData?.skills;
    const experience =
      formData.get("experience")?.toString() ||
      filteredData?.experience.join(" ,");
    const education =
      formData.get("education")?.toString() ||
      filteredData?.education.join(" ,");

    // STORE THE DATA IN VECTOR DB WEAVIATE
    await storeVector({ name, email, linkedin, skills, experience, education });
   return  NextResponse.json({success:true,response:"Form submitted successsfuly"},{status:201})
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
