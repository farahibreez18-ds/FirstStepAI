export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: "Missing question or answer" });
  }

  const prompt = `You are a friendly, encouraging interview coach helping a student practice.

Interview question: "${question}"
Candidate's answer: "${answer}"

Respond with ONLY a valid JSON object (no markdown, no code fences, no extra text) in exactly this shape:
{
  "feedback": "2-3 sentences of warm, specific feedback on their answer. Point out one genuine strength and one concrete way to improve.",
  "sampleAnswer": "A strong, realistic example answer to this exact question, written in first person as if the candidate were answering well. Keep it natural and concise, 3-5 sentences, not overly perfect or robotic."
}`; 

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
      return res.status(200).json({ feedback: rawText, sampleAnswer: "" });
    }

    return res.status(200).json({
      feedback: parsed.feedback || "Good effort on this answer.",
      sampleAnswer: parsed.sampleAnswer || "",
    });
  } catch (err) {
    return res.status(500).json({ error: "AI request failed", debug: err.message });
  }
}