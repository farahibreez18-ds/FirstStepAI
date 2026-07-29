import { useState } from "react";
import Navbar from "../components/Navbar";
import { extractTextFromFile } from "../utils/resumeAnalyzer";
import { useAuth } from "../context/AuthContext";
import { logActivity, saveResumeScore } from "../utils/activityLog";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, AlertTriangle, Sparkles } from "lucide-react";

function ResumeAnalyzer() {
  const { currentUser } = useAuth();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  const handleFile = async (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setResult(null);
    setError("");
    setAnalyzing(true);

    try {
      const text = await extractTextFromFile(f);
      if (!text || text.trim().length < 30) {
        throw new Error("Couldn't read enough text from this file — it may be a scanned image rather than text.");
      }

      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: text, jobDescription }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error("The AI couldn't analyze this resume right now. Please try again.");
      }

      setResult(data);
      logActivity(currentUser?.uid, `Analyzed resume — scored ${data.score}/100`);
      saveResumeScore(currentUser?.uid, data.score, data.verdict);
    } catch (err) {
      setError(err.message || "Something went wrong analyzing this file.");
    } finally {
      setAnalyzing(false);
    }
  };

  const scoreColor = !result ? "#4C6FFF" : result.score >= 75 ? "#22C55E" : result.score >= 50 ? "#F2B84B" : "#EF4444";

  return (
    <div className="min-h-screen bg-[#0B1120] text-white relative overflow-hidden">
      <Navbar />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4C6FFF]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-40 right-0 w-72 h-72 bg-[#F2B84B]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">

        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-data tracking-wide text-[#F2B84B] bg-[#F2B84B]/10 px-2.5 py-1 rounded-full">
            YOUR FLAGSHIP TOOL
          </span>
        </div>
        <h1 className="font-display font-bold text-3xl text-[#F5F7FA]">Resume Analyzer</h1>
        <p className="text-[#8A93A6] mt-2">Upload your resume to get a real, AI-powered ATS score.</p>

        {/* Upload zone */}
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#232D42] hover:border-[#4C6FFF] rounded-2xl py-10 px-6 cursor-pointer transition-colors bg-[#121A2E]/50 text-center">
            <Upload className="w-7 h-7 text-[#4C6FFF]" />
            <span className="text-sm text-[#F5F7FA] font-medium">
              {file ? file.name : "Click to upload your resume"}
            </span>
            <span className="text-xs text-[#8A93A6]">PDF or DOCX, max 5MB</span>
            <input type="file" accept=".pdf,.docx" className="hidden" onChange={handleFile} />
          </label>

          <div className="bg-[#121A2E] border border-[#232D42] rounded-2xl p-5">
            <label className="block text-sm text-[#F5F7FA] font-medium mb-1">
              Job description <span className="text-[#8A93A6] font-normal">(optional)</span>
            </label>
            <p className="text-xs text-[#8A93A6] mb-3">Paste a job posting to get a match score for that specific role.</p>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job posting here..."
              className="w-full bg-[#0B1120] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
            />
          </div>
        </div>

        {analyzing && (
          <div className="flex items-center gap-3 justify-center mt-10 text-[#8A93A6]">
            <Loader2 className="w-5 h-5 animate-spin text-[#4C6FFF]" />
            Reading and analyzing your resume...
          </div>
        )}

        {error && (
          <div className="mt-8 flex items-center gap-3 bg-red-950/30 border border-red-900 rounded-xl p-4 text-sm text-red-300">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        {result && (
          <div className="mt-10">

            {/* Verdict banner */}
            <div className="relative bg-gradient-to-br from-[#121A2E] to-[#161F38] border border-[#232D42] rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8 overflow-hidden">
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full blur-2xl" style={{ backgroundColor: `${scoreColor}22` }}></div>

              <div className="relative w-[130px] h-[130px] shrink-0">
                <svg width="130" height="130" viewBox="0 0 110 110">
                  <circle cx="55" cy="55" r={radius} fill="none" stroke="#232D42" strokeWidth="9" />
                  <circle
                    cx="55" cy="55" r={radius} fill="none"
                    stroke={scoreColor} strokeWidth="9"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - result.score / 100)}
                    strokeLinecap="round"
                    transform="rotate(-90 55 55)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-display font-bold text-3xl text-[#F5F7FA] leading-none">
                    {result.score}<span className="text-sm text-[#8A93A6]">/100</span>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-left relative z-10">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Sparkles className="w-4 h-4" style={{ color: scoreColor }} />
                  <span className="font-display font-bold text-xl text-[#F5F7FA]">{result.verdict}</span>
                </div>
                <p className="text-sm text-[#8A93A6] mt-2 max-w-md">
                  {jobDescription.trim().length > 20
                    ? "Scored against the job description you provided."
                    : "General ATS strength score — paste a job description above for a role-specific match."}
                </p>
              </div>
            </div>

            {/* Strengths + Missing skills */}
            <div className="grid md:grid-cols-2 gap-5 mt-6 items-stretch">
              <div className="bg-[#121A2E] border border-[#232D42] rounded-2xl p-6">
                <h3 className="font-display font-semibold text-[#F5F7FA] mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Strengths
                </h3>
                <div className="space-y-3">
                  {result.strengths?.length > 0 ? (
                    result.strengths.map((s, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-[#F5F7FA]">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> {s}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[#8A93A6]">No strengths detected.</p>
                  )}
                </div>
              </div>

              <div className="bg-[#121A2E] border border-[#232D42] rounded-2xl p-6">
                <h3 className="font-display font-semibold text-[#F5F7FA] mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#F2B84B]" /> Consider Adding
                </h3>
                {result.missingSkills?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((kw) => (
                      <span key={kw} className="text-xs text-[#F2B84B] bg-[#F2B84B]/10 border border-[#F2B84B]/20 px-3 py-1.5 rounded-full">
                        {kw}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#8A93A6]">No obvious gaps detected — nice work.</p>
                )}
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-[#121A2E] border border-[#232D42] rounded-2xl p-6 mt-5">
              <h3 className="font-display font-semibold text-[#F5F7FA] mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#4C6FFF]" /> Suggestions
              </h3>
              <ul className="space-y-3">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#8A93A6]">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#4C6FFF]/10 text-[#4C6FFF] text-xs font-data flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeAnalyzer;