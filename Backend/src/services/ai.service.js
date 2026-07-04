import Groq from "groq-sdk";
import 'dotenv/config';

 


const groq = new Groq({
  apiKey:process.env.GROQ_API_KEY,

});

async function analysisResumeandgetscoreandinterviewquestion(resume,jobDescription) {
 const prompt = `
You are an expert ATS Resume Analyzer and AI Interview Coach.

IMPORTANT:
Before performing any analysis, first determine whether the provided job description is valid.

A VALID job description should include most of the following:
- A clear job title
- Responsibilities
- Required skills or technologies
- Qualifications or experience
- Meaningful professional language

An INVALID job description includes:
- Random characters
- Random words
- Gibberish
- Single letters
- Very short text
- Text that is not describing a real job

Examples of INVALID input:
"a"
"abc"
"asdfgh"
"123456"
"hello"
"test"

If the job description is INVALID, DO NOT analyze the resume.

Instead return ONLY this JSON:

{
  "success": false,
  "message": "Please provide a valid job description."
}

If the job description is valid, continue with the analysis below.

-------------------------
PART 1 — RESUME ANALYSIS
-------------------------

Carefully compare the candidate's resume against the job description.

Evaluate:

- Skill match
- Technology match
- Project relevance
- Experience relevance
- Missing skills
- Overall suitability

Assign a matchScore from 0-100.

Scoring Guide:

90-100 = Excellent match

70-89 = Strong match

50-69 = Moderate match

Below 50 = Weak match

-------------------------
PART 2 — INTERVIEW QUESTIONS
-------------------------

Generate exactly:

- 3 Technical Questions
- 3 Behavioral Questions

Every question must be directly related to BOTH the resume and the job description.

For every question include:

- question
- intention
- answer

The answer should be written in first person as if the candidate is responding.

-------------------------
INPUT
-------------------------

Resume:

${resume}

Job Description:

${jobDescription}

-------------------------
OUTPUT
-------------------------

Return ONLY valid JSON.

{
  "success": true,
  "matchScore": number,
  "matchSummary": "string",
  "technicalQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    },
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    },
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "behaviorQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    },
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    },
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ]
}
`;









  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

     const content = chatCompletion.choices[0].message.content;
      const data = JSON.parse(content);
      return data
      //  console.log(data);
      //   console.log(data.technicalQuestions);

  } catch (error) {
    console.error(error);
  }
}

export default analysisResumeandgetscoreandinterviewquestion;