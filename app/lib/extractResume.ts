import { GoogleGenerativeAI } from "@google/generative-ai";

interface userDetails {
  skills: string[];
  education: string[];
  experience: string[];
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from environment variables.");
}

// Initialize Google Gemini API
const genAI = new GoogleGenerativeAI(apiKey);

export async function extractResumeData(
  resumeText: string
): Promise<userDetails> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Analyze the following resume text and extract the following structured information:
      - Skills (list of relevant technical and soft skills)
      - Education (list of degrees, universities, and years if available)
      - Experience (list of job roles, companies, and duration)

      Resume Text: ${resumeText}

      Format the response in a JSON structure. Only return pure JSON:
      {
        "skills": ["skill1", "skill2"],
        "education": ["degree - university - year"],
        "experience": ["role - company - duration"]
      }
    `;

    const response = await model.generateContent(prompt);
    const LLMresult = response.response.text();

    try {
      const jsonStart = LLMresult.indexOf("{");
      const jsonEnd = LLMresult.lastIndexOf("}");

      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("No JSON found in LLM response");
      }

      const jsonString = LLMresult.slice(jsonStart, jsonEnd + 1).trim();
      const parsedData: userDetails = JSON.parse(jsonString);

      console.log("✅ Parsed JSON:", parsedData);
      return parsedData;
    } catch (jsonError) {
      console.error("❌ JSON Parsing Error:", jsonError);
    }
  } catch (error) {
    console.error("❌ Error extracting resume data:", error);
  }

  // If we reach here, return a default empty structure to satisfy TypeScript
  return {
    skills: [],
    education: [],
    experience: [],
  };
}
