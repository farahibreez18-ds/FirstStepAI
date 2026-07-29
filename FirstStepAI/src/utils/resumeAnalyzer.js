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
      text += content.items.map((item) => item.str).join(" ") + "\n";
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

const SECTION_HEADERS = ["experience", "education", "skills", "projects", "summary"];

export function analyzeResume(text) {
  const lower = text.toLowerCase();
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const matched = SKILL_KEYWORDS.filter((kw) => lower.includes(kw));
  const missing = SKILL_KEYWORDS.filter((kw) => !lower.includes(kw)).slice(0, 6);
  const keywordScore = matched.length / SKILL_KEYWORDS.length;

  const sectionsFound = SECTION_HEADERS.filter((s) => lower.includes(s));
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
  const contactScore = hasEmail ? 1 : 0.3;

  const rawScore =
    keywordScore * 30 +
    sectionScore * 20 +
    lengthScore * 15 +
    verbScore * 15 +
    quantScore * 10 +
    contactScore * 10;

  const score = Math.round(Math.min(rawScore, 100));

  const suggestions = [];
  const missingSections = SECTION_HEADERS.filter((s) => !sectionsFound.includes(s));
  if (missingSections.length > 0)
    suggestions.push(`Add missing sections: ${missingSections.join(", ")}.`);
  if (wordCount < 300)
    suggestions.push("Your resume is quite short — add more detail to your experience and projects.");
  if (wordCount > 1000)
    suggestions.push("Your resume is long — consider trimming to the most relevant experience.");
  if (verbHits.length < 4)
    suggestions.push("Use more action verbs (e.g. 'led', 'built', 'improved') to describe your experience.");
  if (numberMatches.length < 2)
    suggestions.push("Add measurable results — numbers and percentages make achievements more convincing.");
  if (!hasEmail)
    suggestions.push("Make sure your email address is clearly listed for recruiters to contact you.");
  if (missing.length > 0)
    suggestions.push(`Consider adding relevant keywords like: ${missing.slice(0, 3).join(", ")}.`);

  return {
    score,
    wordCount,
    matched: matched.slice(0, 8),
    missing,
    suggestions: suggestions.slice(0, 5),
  };
}
