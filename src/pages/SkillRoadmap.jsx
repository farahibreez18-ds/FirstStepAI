import { useState } from "react";
import Navbar from "../components/Navbar";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";

const DOMAINS = {
  "Web Development": [
    { title: "HTML, CSS & JavaScript fundamentals", resources: ["MDN Web Docs", "freeCodeCamp"] },
    { title: "React & component-based UI", resources: ["React official docs", "Scrimba React course"] },
    { title: "Backend basics (Node.js/Express)", resources: ["Node.js docs", "The Odin Project"] },
    { title: "Databases & deployment", resources: ["MongoDB University", "Vercel deployment guide"] },
  ],
  "Data Science": [
    { title: "Python & statistics fundamentals", resources: ["Kaggle Learn", "StatQuest (YouTube)"] },
    { title: "Data wrangling with Pandas", resources: ["Pandas docs", "Kaggle Titanic dataset"] },
    { title: "Machine learning basics", resources: ["scikit-learn docs", "Andrew Ng ML course"] },
    { title: "Visualization & storytelling", resources: ["Matplotlib/Seaborn docs", "Tableau Public"] },
  ],
  "Cloud Computing": [
    { title: "Cloud fundamentals (AWS/Azure basics)", resources: ["AWS Cloud Practitioner", "Azure Fundamentals"] },
    { title: "Containers & Docker", resources: ["Docker docs", "Docker Get Started guide"] },
    { title: "CI/CD pipelines", resources: ["GitHub Actions docs"] },
    { title: "Infrastructure as code", resources: ["Terraform docs"] },
  ],
};

function SkillRoadmap() {
  const [domain, setDomain] = useState("Web Development");
  const [completed, setCompleted] = useState([]);

  const toggle = (title) => {
    setCompleted((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const steps = DOMAINS[domain];
  const progress = Math.round((completed.length / steps.length) * 100) || 0;

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-display font-bold text-3xl text-[#F5F7FA]">Skill Roadmap</h1>
        <p className="text-[#8A93A6] mt-2">Pick a domain and track your progress.</p>

        <div className="flex gap-2 mt-6 flex-wrap">
          {Object.keys(DOMAINS).map((d) => (
            <button
              key={d}
              onClick={() => setDomain(d)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                domain === d
                  ? "bg-[#4C6FFF] text-white"
                  : "bg-[#121A2E] border border-[#232D42] text-[#8A93A6] hover:text-[#F5F7FA]"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="mt-6 bg-[#121A2E] border border-[#232D42] rounded-xl p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#8A93A6]">Progress</span>
            <span className="font-data text-[#F5F7FA]">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-[#0B1120] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4C6FFF] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {steps.map((step) => {
            const done = completed.includes(step.title);
            return (
              <div
                key={step.title}
                className="bg-[#121A2E] border border-[#232D42] rounded-xl p-5 flex gap-4"
              >
                <button onClick={() => toggle(step.title)} className="mt-0.5 shrink-0">
                  {done ? (
                    <CheckCircle2 className="w-5 h-5 text-[#4C6FFF]" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#8A93A6]" />
                  )}
                </button>
                <div>
                  <h3 className={`font-display font-semibold ${done ? "text-[#8A93A6] line-through" : "text-[#F5F7FA]"}`}>
                    {step.title}
                  </h3>
                  <div className="flex gap-3 mt-2 flex-wrap">
                    {step.resources.map((r) => (
                      <span key={r} className="flex items-center gap-1 text-xs text-[#4C6FFF] bg-[#4C6FFF]/10 px-2.5 py-1 rounded-full">
                        <ExternalLink className="w-3 h-3" /> {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SkillRoadmap;