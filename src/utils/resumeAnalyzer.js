import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function extractTextFromFile(file) {
  const ext = file.name.split(".").pop().toLowerCase();

 if (ext === "pdf") {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const lineMap = new Map();
      content.items.forEach((item) => {
        const y = Math.round(item.transform[5] / 2) * 2;
        if (!lineMap.has(y)) lineMap.set(y, []);
        lineMap.get(y).push(item.str);
      });

      const sortedYs = Array.from(lineMap.keys()).sort((a, b) => b - a);
      const pageLines = sortedYs.map((y) => lineMap.get(y).join(" ").trim()).filter(Boolean);

      text += pageLines.join("\n") + "\n";
    }
    return text;
  }

  if (ext === "docx") {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  throw new Error("Unsupported file type. Please upload a PDF or DOCX file.");
}

const SKILL_KEYWORDS = [
  "javascript", "react", "node.js", "python", "sql", "git", "rest api",
  "typescript", "html", "css", "aws", "docker", "agile", "communication",
  "leadership", "teamwork", "problem solving", "project management",
  "java", "machine learning", "data analysis",
];

const ACTION_VERBS = [
  "managed", "built", "led", "developed", "designed", "improved",
  "increased", "reduced", "created", "implemented", "launched",
  "optimized", "automated", "delivered", "collaborated",
];
const CLICHE_PHRASES = [
  "hardworking", "team player", "detail-oriented", "self-motivated",
  "go-getter", "think outside the box", "results-driven", "passionate",
];

const SECTION_HEADERS = ["experience", "education", "skills", "projects", "summary"];

export function analyzeResume(text) {
  const lower = text.toLowerCase();
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const matched = SKILL_KEYWORDS.filter((kw) => lower.includes(kw));
  const missing = SKILL_KEYWORDS.filter((kw) => !lower.includes(kw)).slice(0, 6);
  const keywordScore = matched.length / SKILL_KEYWORDS.length;

  const sectionsFound = SECTION_HEADERS.filter((s) => lower.includes(s));
  const missingSections = SECTION_HEADERS.filter((s) => !sectionsFound.includes(s));
  const sectionScore = sectionsFound.length / SECTION_HEADERS.length;

  let lengthScore = 1;
  if (wordCount < 200) lengthScore = 0.4;
  else if (wordCount < 350) lengthScore = 0.7;
  else if (wordCount > 1000) lengthScore = 0.6;

  const verbHits = ACTION_VERBS.filter((v) => lower.includes(v));
  const verbScore = Math.min(verbHits.length / 6, 1);

  const numberMatches = text.match(/\d+%|\$\d+|\d+\+/g) || [];
  const quantScore = Math.min(numberMatches.length / 3, 1);

  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(text);
  const hasPhone = /(\+?\d{1,3}[\s-]?)?\d{10}|\(\d{3}\)\s?\d{3}[\s-]?\d{4}/.test(text);
  const hasLink = /linkedin\.com|github\.com|http/.test(lower);
  const contactScore = (hasEmail ? 0.5 : 0) + (hasPhone || hasLink ? 0.5 : 0.15);

  const bulletCount = (text.match(/^[\s]*[•\-*]/gm) || []).length;
  const bulletScore = bulletCount >= 5 ? 1 : bulletCount >= 2 ? 0.6 : 0.3;

  const rawScore =
    keywordScore * 25 +
    sectionScore * 18 +
    lengthScore * 12 +
    verbScore * 15 +
    quantScore * 12 +
    contactScore * 10 +
    bulletScore * 8;

  const score = Math.round(Math.min(rawScore, 100));

 const suggestions = [];
  const strengths = [];

  // Strengths — what's already working
  if (sectionsFound.length >= 4) {
    strengths.push("Your resume includes all the key sections recruiters expect to see.");
  }
  if (verbHits.length >= 5) {
    strengths.push("You're using strong action words consistently — this makes your experience sound active and specific.");
  }
  if (numberMatches.length >= 3) {
    strengths.push("You've backed up your experience with real numbers — this is one of the most effective things a resume can do.");
  }
  if (bulletCount >= 5) {
    strengths.push("Your resume is well-structured with bullet points, making it easy to skim quickly.");
  }
  if (hasEmail && (hasPhone || hasLink)) {
    strengths.push("Your contact information is clear and easy to find.");
  }
  if (wordCount >= 350 && wordCount <= 700) {
    strengths.push("Your resume length is right in the sweet spot — detailed, but not overwhelming.");
  }

  // Suggestions — what to improve
  if (missingSections.length > 0) {
    suggestions.push(
      `Add a clear "${missingSections[0]}" heading to your resume. Recruiters (and the software that scans resumes first) look for these exact section titles, so even if you have the content, it might get missed without the right heading.`
    );
  }
if (wordCount < 250) {
    suggestions.push(
      `There's room to say more about yourself here — right now your resume is quite brief. Pick one or two of your experiences and add a couple more lines about what you did day-to-day and what came out of it. Even small projects have more to say than you'd think!`
    );
  } else if (wordCount > 900) {
    suggestions.push(
      `You clearly have a lot to share, which is great — but a recruiter often skims for under a minute. Try picking your 2-3 strongest experiences and trimming the rest, so your best work doesn't get lost in the length.`
    );
  }

  if (verbHits.length <= 2) {
    suggestions.push(
      `Here's a small but powerful tweak: swap phrases like "Responsible for managing a project" for something like "Led a project that...". Starting with a word like "led", "built", or "improved" instantly makes your experience sound more hands-on.`
    );
  } else if (verbHits.length <= 4) {
    suggestions.push(
      `You're off to a good start with action words in your bullet points — a few more sprinkled in across the rest of your resume would make the whole thing feel consistently strong.`
    );
  }

  if (numberMatches.length === 0) {
    suggestions.push(
      `One of the easiest upgrades you can make: add a number wherever you can. Even a rough estimate like "helped around 50 customers a week" or "cut load time by 30%" gives people something concrete to picture, instead of just taking your word for it.`
    );
  } else if (numberMatches.length < 3) {
    suggestions.push(
      `You've already started backing things up with real numbers — that's genuinely one of the best things on a resume. See if you can find a number for one or two more bullet points too.`
    );
  }

  if (bulletCount < 2) {
    suggestions.push(
      `Right now your resume reads more like paragraphs than a quick scan. Try breaking things into short bullet points instead — 2-4 lines per role — so someone skimming it for 10 seconds can still catch the highlights.`
    );
  }

  if (!hasEmail) {
    suggestions.push(`Make sure your email address is clearly visible at the top of your resume so recruiters can contact you.`);
  }
  if (!hasPhone && !hasLink) {
    suggestions.push(`Add a phone number or a link to your LinkedIn/GitHub profile near the top — this gives recruiters an easy way to learn more about you or reach out.`);
  }

  const clichesFound = CLICHE_PHRASES.filter((c) => lower.includes(c));
  if (clichesFound.length > 0) {
    suggestions.push(
      `You're using some overused phrases (like "${clichesFound[0]}") that recruiters see constantly and tend to skip over. Try replacing them with a specific example instead — e.g. instead of "hardworking", describe a time you went above what was asked.`
    );
  }

  if (missing.length > 0) {
    suggestions.push(
      `If you have experience with any of these, consider adding them: ${missing.slice(0, 4).join(", ")}. Only include skills you can genuinely speak to if asked about them in an interview.`
    );
  }

  return {
    score,
    wordCount,
    matched: matched.slice(0, 8),
    missing,
    strengths: strengths.slice(0, 4),
    suggestions: suggestions.slice(0, 6),
  };
}