## AI RESUME TO JOB MATCH

🚨 This project is designed to match resumes to job descriptions using AI technologies. It involves collecting user data, parsing resumes, storing details in a vector database, and using a Retrieval-Augmented Generation (RAG) approach to find the most similar resumes based on job descriptions

## Features

1. **User Data Collection**: A basic form is created to collect user data along with their resumes.
2. **Resume Parsing**: Utilizes PDF parsing to extract text from resumes.
3. **Vector Database**: A Weaviate vector database is used to store user details.
4. **Resume Matching**: Implements a RAG approach to match resumes with job descriptions and generate enhanced responses using a Language Model (LLM).

## HOW TO RUN THE APP

N.B: CREATE A .ENV FILE IN THE ROOT DIRECTORY AND ADD THE FOLLOWING:

WEAVIATE_CLOUD_URL=
WEAVIATE_API_KEY=
GEMINI_API_KEY=(not used in the project) optional
COHERE_API_KEY=

## Steps

1. **Install Dependencies**: Run the following command to install the necessary dependencies:

```bash
npm install

## POSTMAN ROUTE CHECK

[1]#use this route to send job description in the following format:
👉 http://localhost:3000/api/search POST

{
 "jobDescription": "I need a React.js developer who knows Docker. Experience: 2 years minimum."
}

[2]#use this route to send user details to the vector db in the following format:
👉 http://localhost:3000/api/resume-parser POST

{
 "name": "Jane Doe",
 "email": "jane.doe@example.com",
 "linkedin": "https://www.linkedin.com/in/janedoe",
 "skills": ["React.js","Docker", "JavaScript", "Node.js", "CSS" ],
 "experience": "3 years as a Frontend Developer",
 "education": "Bachelor of Science in Computer Science",
}
OR
👉 fill the form and submit to send data to this route.
```
