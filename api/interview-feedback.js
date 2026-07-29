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

Give short, specific feedback (2-3 sentences max) on this answer. Point out one genuine strength and one concrete way to improve. Keep the tone warm and constructive, like a mentor, not a critic. Do not use markdown formatting, just plain text.`;

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
    const feedback = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!feedback) {
      return res.status(500).json({ error: "No response from AI", debug: data });
    }

    return res.status(200).json({ feedback });
  } catch (err) {
    return res.status(500).json({ error: "AI request failed", debug: err.message });
  }
}