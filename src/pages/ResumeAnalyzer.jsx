import { useState } from "react";
import Navbar from "../components/Navbar";
import { extractTextFromFile } from "../utils/resumeAnalyzer";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, AlertTriangle } from "lucide-react";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const radius = 40;
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
    } catch (err) {
      setError(err.message || "Something went wrong analyzing this file.");
    } finally {
      setAnalyzing(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#0B1120] text-white relative overflow-hidden">
      <Navbar />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4C6FFF]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <h1 className="font-display font-bold text-3xl text-[#F5F7FA]">Resume Analyzer</h1>
        <p className="text-[#8A93A6] mt-2">Upload your resume to get a real, content-based ATS score.</p>

        <label className="mt-8 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#232D42] hover:border-[#4C6FFF] rounded-2xl py-14 cursor-pointer transition-colors bg-[#121A2E]/50">
          <Upload className="w-8 h-8 text-[#4C6FFF]" />
          <span className="text-sm text-[#F5F7FA] font-medium">
            {file ? file.name : "Click to upload your resume (PDF or DOCX)"}
          </span>
          <span className="text-xs text-[#8A93A6]">Max 5MB</span>
          <input type="file" accept=".pdf,.docx" className="hidden" onChange={handleFile} />
       <div className="mt-8">
          <label className="block text-sm text-[#8A93A6] mb-2">
            Paste a job description <span className="text-[#4C6FFF]">(optional — get a match score for this specific role)</span>
          </label>
          <textarea
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job posting here to see how well your resume matches this specific role..."
            className="w-full bg-[#121A2E] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
          />
        </div>
        </label>
        

        {analyzing && (
          <div className="flex items-center gap-3 justify-center mt-8 text-[#8A93A6]">
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
          <div className="mt-10 grid md:grid-cols-2 gap-6">
           <div className="bg-[#121A2E] border border-[#232D42] rounded-2xl p-8 flex flex-col items-center justify-center">
  <div className="relative w-[110px] h-[110px]">
    <svg width="110" height="110" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="#232D42" strokeWidth="8" />
      <circle
        cx="50" cy="50" r={radius} fill="none"
        stroke="#4C6FFF" strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - result.score / 100)}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="font-display font-bold text-2xl text-[#F5F7FA] text-center leading-none">
        {result.score}<span className="text-xs text-[#8A93A6]">/100</span>
      </div>
    </div>
  </div>

 <p className="text-[#8A93A6] text-sm mt-2">{result.verdict}</p>
</div>

            <div className="bg-[#121A2E] border border-[#232D42] rounded-2xl p-6">
              <h3 className="font-display font-semibold text-[#F5F7FA] mb-4">Strengths</h3>
              <div className="space-y-2 mb-5">
                {result.strengths?.length > 0 ? (
                  result.strengths.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-[#F5F7FA]">
                      <CheckCircle2 className="w-4 h-4 text-[#4C6FFF] shrink-0 mt-0.5" /> {s}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#8A93A6]">No strengths detected.</p>
                )}
              </div>
              {result.missingSkills?.length > 0 && (
                <>
                  <h4 className="text-xs font-data text-[#8A93A6] tracking-wide mb-2">CONSIDER ADDING</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((kw) => (
                      <span key={kw} className="flex items-center gap-1 text-xs text-[#F2B84B] bg-[#F2B84B]/10 px-2.5 py-1 rounded-full">
                        <AlertCircle className="w-3 h-3" /> {kw}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="md:col-span-2 bg-[#121A2E] border border-[#232D42] rounded-2xl p-6">
              <h3 className="font-display font-semibold text-[#F5F7FA] mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#4C6FFF]" /> Suggestions
              </h3>
              <ul className="space-y-3">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-[#8A93A6] flex gap-2">
                    <span className="text-[#4C6FFF] font-data">{i + 1}.</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {result.strengths.length > 0 && (
              <div className="md:col-span-2 bg-[#121A2E] border border-[#232D42] rounded-2xl p-6">
                <h3 className="font-display font-semibold text-[#F5F7FA] mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> What's Working Well
                </h3>
                <ul className="space-y-3">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-[#8A93A6] flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeAnalyzer;