import { useState } from "react";

import UploadSection from "../components/resume/UploadSection";
import LoadingScreen from "../components/resume/LoadingScreen";
import ATSCard from "../components/resume/ATSCard";
import ResumeHealth from "../components/resume/ResumeHealth";
import SkillsFound from "../components/resume/SkillsFound";
import MissingSkills from "../components/resume/MissingSkills";
import Suggestions from "../components/resume/Suggestions";
import DownloadReport from "../components/resume/DownloadReport";

import sampleAnalysis from "../data/sampleAnalysis";

function ResumeAnalyzer() {

  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  function handleFileChange(e) {

    if (e.target.files.length > 0) {

      setFileName(e.target.files[0].name);

      setAnalyzed(false);

    }

  }

  function analyzeResume() {

    setLoading(true);

    setTimeout(() => {

      setLoading(false);

      setAnalyzed(true);

    }, 3000);

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto py-16 px-6">

        {!loading && !analyzed && (

          <UploadSection
            fileName={fileName}
            handleFileChange={handleFileChange}
            analyzeResume={analyzeResume}
          />

        )}

        {loading && (

          <LoadingScreen />

        )}

        {analyzed && (

          <>

            <h1 className="text-5xl font-bold text-center mb-16">

              Resume Analysis Report

            </h1>

            <div className="grid lg:grid-cols-2 gap-8">

              <ATSCard score={sampleAnalysis.score} />

              <ResumeHealth health={sampleAnalysis.health} />

              <SkillsFound
                skills={sampleAnalysis.skillsFound}
              />

              <MissingSkills
                skills={sampleAnalysis.missingSkills}
              />

            </div>

            <div className="mt-8">

              <Suggestions
                suggestions={sampleAnalysis.suggestions}
              />

            </div>

            <DownloadReport />

          </>

        )}

      </div>

    </div>

  );

}

export default ResumeAnalyzer;