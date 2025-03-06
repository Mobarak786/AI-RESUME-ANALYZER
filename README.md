## AI RESME TO JOB MATCH

[1] Created basic form to colect user data with resume
[2]created resume parser using pdf parse to extract text
[3]created vectore weviate database to store user details
[4] created RAG to match most similar resume using job description prompt and extract
an enhanced response from a LLM .

## HOW TO RUN THE APP

## N.B: CREATE A .ENV FILE IN THE ROOT DIRECTORY AND ADD THE FOLLOWING:

WEAVIATE_CLOUD_URL=
WEAVIATE_API_KEY=
GEMINI_API_KEY=(not used in the project) optional
COHERE_API_KEY=

[1]Install dependencies
///base/// npm install

[2]Run the app
///base/// npm run dev

## POSTMAN ROUTE CHECK

[1]#use this route to send job description in the following format:
http://localhost:3000/api/search POST

{"jobDescription": "i need a react js developer who knows docker.Experience 2 years minimum"}

[2]#use this route to send user details to the vector db in the following format:
http://localhost:3000/api/resume-parser POST

fill the form and submit to send data to this route . you can check by postman also.
