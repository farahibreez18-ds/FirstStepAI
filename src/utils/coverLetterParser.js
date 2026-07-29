import { extractTextFromFile } from "./resumeAnalyzer";

const KNOWN_SKILLS = [
  "Java", "Python", "C++", "C", "JavaScript", "TypeScript", "React", "Node.js",
  "SQL", "MongoDB", "HTML", "CSS", "Machine Learning", "Data Structures",
  "DBMS", "AWS", "Docker", "Git", "REST API", "Arduino", "Deep Learning",
];

export async function parseResumeForCoverLetter(file) {
  const text = await extractTextFromFile(file);
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  // Name — usually the first meaningful line, no digits/@ symbol
  const nameLine = lines.find(
    (l) => l.length < 50 && !/[@\d]/.test(l) && l.split(" ").length <= 5
  );

  // Email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);

  // Phone
  const phoneMatch = text.match(/(\+?\d{1,3}[\s-]?)?\d{10}|\(\d{3}\)\s?\d{3}[\s-]?\d{4}/);

  const degreeMatch = text.match(/(B\.?E\.?|B\.?Tech\.?|M\.?Tech\.?|B\.?Sc\.?|M\.?Sc\.?|BCA|MCA|MBA)[^\n|,]{0,60}/i);
  const degreeLine = degreeMatch ? degreeMatch[0].trim() : "";

  // College — grab just the matching line, capped in length so it can't swallow other content
  const collegeMatch = text.match(/[^\n]*?(university|college|institute|academy)[^\n]*/i);
  let collegeLine = collegeMatch ? collegeMatch[0].trim() : "";
  if (collegeLine.length > 80) collegeLine = collegeLine.slice(0, 80).trim() + "...";

  // CGPA
  const cgpaMatch = text.match(/CGPA[:\s]*([\d.]+)/i);

  // Skills — match against known list
  const skillsFound = KNOWN_SKILLS.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );

  // Projects — grab a snippet after a "Projects" heading, if found
  const projectSectionMatch = text.match(/projects?[:\s]*\n?([\s\S]{0,300})/i);
  let projectsSnippet = "";
  if (projectSectionMatch) {
    projectsSnippet = projectSectionMatch[1]
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .slice(0, 3)
      .join(", ")
      .slice(0, 250);
  }

  return {
    fullName: nameLine || "",
    email: emailMatch ? emailMatch[0] : "",
    phone: phoneMatch ? phoneMatch[0] : "",
    degree: degreeLine || "",
    college: collegeLine || "",
    cgpa: cgpaMatch ? cgpaMatch[1] : "",
    skills: skillsFound.join(", "),
    projects: projectsSnippet,
  };
}