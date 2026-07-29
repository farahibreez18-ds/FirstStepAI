const FILLER_WORDS = ["um", "uh", "like", "you know", "sort of", "kind of", "basically", "actually", "literally"];

const RESULT_WORDS = ["result", "resulted", "outcome", "achieved", "increased", "decreased", "reduced", "improved", "led to", "which meant", "as a result", "learned"];

const ACTION_WORDS = ["decided", "implemented", "built", "created", "led", "organized", "managed", "designed", "solved", "planned", "developed"];

export function analyzeAnswer(question, answer) {
  const text = answer.trim();
  const lower = text.toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  const fillerHits = FILLER_WORDS.filter((f) => lower.includes(f));
  const hasNumbers = /\d+%|\d+\+|\$\d+|\d+ (people|users|customers|hours|days|weeks|months|team)/i.test(text);
  const hasResult = RESULT_WORDS.some((w) => lower.includes(w));
  const hasAction = ACTION_WORDS.some((w) => lower.includes(w));

  const feedback = [];
  let tone = "good"; // good | mixed | needs-work

  if (wordCount < 15) {
    feedback.push("This answer is quite brief — try expanding with a specific example or more detail. Interviewers want to hear you think through a real situation, not just a short statement.");
    tone = "needs-work";
  } else if (wordCount > 180) {
    feedback.push("This answer is fairly long. Try to keep responses to about 1-2 minutes when spoken — focus on the most relevant details rather than covering everything.");
    tone = "mixed";
  }

  if (fillerHits.length >= 3) {
    feedback.push(`You used filler words like "${fillerHits[0]}" a few times. In a real interview, pausing silently for a second sounds more confident than filling the gap with filler words.`);
    tone = tone === "good" ? "mixed" : tone;
  }

  if (!hasNumbers && wordCount > 20) {
    feedback.push("Try adding a specific number or detail — like a timeframe, team size, or measurable result. It makes your answer easier to remember and more convincing.");
  }

  if (hasAction && hasResult) {
    feedback.push("Good structure — you described what you did and what happened as a result. That's exactly what interviewers listen for.");
  } else if (hasAction && !hasResult) {
    feedback.push("You explained what you did well, but try adding what the outcome was — even something like 'which helped the team finish on time' makes the story land better.");
    tone = tone === "good" ? "mixed" : tone;
  } else if (!hasAction && wordCount > 20) {
    feedback.push("Try being more specific about the actions you personally took, using words like 'I decided', 'I built', or 'I led' — this makes your role in the story clear.");
    tone = tone === "good" ? "mixed" : tone;
  }

  if (feedback.length === 0) {
    feedback.push("Solid, clear answer.");
  }

  return {
    tone,
    wordCount,
    fillerCount: fillerHits.length,
    feedback: feedback.slice(0, 2).join(" "),
  };
}

export function summarizeSession(answerAnalyses) {
  const total = answerAnalyses.length;
  const avgWordCount = Math.round(
    answerAnalyses.reduce((sum, a) => sum + a.wordCount, 0) / total
  );
  const totalFillers = answerAnalyses.reduce((sum, a) => sum + a.fillerCount, 0);
  const goodCount = answerAnalyses.filter((a) => a.tone === "good").length;

  const overallNotes = [];
  if (totalFillers > total * 2) {
    overallNotes.push("You used filler words fairly often across your answers — practicing a short pause instead can make you sound more confident.");
  }
  if (avgWordCount < 20) {
    overallNotes.push("Most of your answers were quite short — try expanding them with real examples next time.");
  }
  if (goodCount === total) {
    overallNotes.push("Strong session overall — your answers were clear and well-structured throughout.");
  }

  return {
    avgWordCount,
    totalFillers,
    goodCount,
    total,
    overallNotes,
  };
}