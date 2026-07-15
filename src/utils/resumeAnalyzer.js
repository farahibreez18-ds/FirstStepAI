export function analyzeResumeText(text) {

  const skills = [
    "java",
    "python",
    "sql",
    "javascript",
    "react",
    "node",
    "docker",
    "aws",
    "git",
    "mongodb",
    "html",
    "css"
  ];

  const foundSkills = [];
  const missingSkills = [];

  skills.forEach((skill) => {

    if (text.toLowerCase().includes(skill)) {
      foundSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }

  });

  const atsScore = Math.min(
    100,
    40 + foundSkills.length * 5
  );

  return {
    atsScore,
    foundSkills,
    missingSkills
  };

}