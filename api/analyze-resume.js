export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { resumeText, jobDescription } = req.body;
  if (!resumeText || resumeText.trim().length < 30) {
    return res.status(400).json({ error: "Resume text is missing or too short" });
  }

  const hasJobDescription = jobDescription && jobDescription.trim().length > 20;

  const prompt = hasJobDescription
    ? `You are an experienced technical recruiter comparing a candidate's resume against a specific job description.

Resume:
"""
${resumeText.slice(0, 8000)}
"""

Job description:
"""
${jobDescription.slice(0, 4000)}
"""

Analyze how well this resume matches this SPECIFIC job. Respond with ONLY a valid JSON object (no markdown, no code fences, no extra text) in exactly this shape:
{
  "score": <number 0-100, how well this resume matches THIS specific job>,
  "verdict": "<one short phrase, e.g. 'Strong match for this role' or 'Significant gaps for this role'>",
  "strengths": ["<specific way the resume matches this job 1>", "<match 2>", "<up to 4>"],
  "suggestions": ["<specific, actionable suggestion to better match THIS job 1>", "<suggestion 2>", "<up to 5>"],
  "missingSkills": ["<skill or requirement from the job description that's missing from the resume>", "<up to 6>"]
}

Be honest and specific — reference actual requirements from the job description and actual content from the resume. Write suggestions in plain, friendly language.`
    : `You are an experienced technical recruiter and resume coach reviewing a resume.

Here is the resume text:
"""
${resumeText.slice(0, 8000)}
"""

Analyze this resume and respond with ONLY a valid JSON object (no markdown, no code fences, no extra text) in exactly this shape:
{
  "score": <number 0-100, your honest assessment of how strong this resume is for ATS systems and recruiters>,
  "verdict": "<one short phrase, e.g. 'Strong resume' or 'Needs work'>",
  "strengths": ["<specific genuine strength 1>", "<specific genuine strength 2>", "<up to 4>"],
  "suggestions": ["<specific, actionable, plain-language suggestion 1>", "<suggestion 2>", "<up to 5>"],
  "missingSkills": ["<skill 1>", "<skill 2>", "<up to 6, only relevant skills genuinely missing for what this resume seems to be targeting>"]
}

Be honest and specific — reference actual content from the resume in your feedback, not generic advice. Write suggestions in plain, friendly language a first-time job seeker could understand, with a concrete example where helpful.`;
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!rawText) {
      return res.status(500).json({ error: "No response from AI", debug: data });
    }

    let parsed;
    try {
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      return res.status(500).json({ error: "Could not parse AI response", debug: rawText });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: "AI request failed", debug: err.message });
  }
}