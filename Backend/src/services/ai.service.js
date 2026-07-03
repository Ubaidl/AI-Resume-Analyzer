import Groq from "groq-sdk";
import 'dotenv/config';

 


const groq = new Groq({
  apiKey:process.env.GROQ_API_KEY,

});

async function analysisResumeandgetscoreandinterviewquestion(resume,jobDescription) {
  const prompt = `
You are an expert technical resume analyzer and interview coach.

Your task has two parts:

PART 1 — ANALYSIS
Carefully compare the candidate's resume against the job description below.
Evaluate:
- How well the candidate's skills, tools, and experience align with the role's requirements
- Relevant strengths that match the job description
- Any notable gaps or missing skills relative to the job description

Based on this analysis, assign a "matchScore" from 0 to 100, where:
- 90-100 = excellent match, nearly all key requirements met
- 70-89 = strong match, minor gaps
- 50-69 = moderate match, some important gaps
- below 50 = weak match, significant gaps

PART 2 — INTERVIEW QUESTIONS
Using the SAME analysis, generate interview questions that probe the candidate's fit for this specific role:

- Generate exactly 3 technical questions: based on the technical skills, tools, and projects mentioned in the resume, tailored to what the job description requires
- Generate exactly 3 behavioral questions: based on the candidate's work history, role transitions, or soft skills implied by the resume, tailored to what the role likely demands

For every question, include:
- "question": the interview question itself, grounded in specific resume details (not generic)
- "intension": what the interviewer is actually trying to assess by asking this, and why it matters for this role
- "answer": a strong sample answer written in first person, as if the candidate is answering, using specific details from the resume

INPUT DATA

Resume:
${resume}

Job Description:
${jobDescription}

OUTPUT FORMAT

Respond with ONLY valid JSON. No markdown, no code fences, no commentary before or after. Match this exact structure:

{
  "matchScore": number,
  "matchSummary": "string - 2-3 sentence summary of why this score was given, mentioning key strengths and gaps",
  "technicalQuestions": [
    { "question": "string", "intention": "string", "answer": "string" },
    { "question": "string", "intention": "string", "answer": "string" },
    { "question": "string", "intention": "string", "answer": "string" }
  ],
  "behaviorQuestions": [
    { "question": "string", "intention": "string", "answer": "string" },
    { "question": "string", "intention": "string", "answer": "string" },
    { "question": "string", "intention": "string", "answer": "string" }
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