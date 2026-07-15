import { Upload } from "lucide-react";

function UploadSection({
  fileName,
  handleFileChange,
  analyzeResume,
}) {
  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-6xl font-bold text-center text-blue-500">
        Resume Analyzer
      </h1>

      <p className="text-center text-slate-400 text-xl mt-5">
        Upload your resume for AI-powered analysis
      </p>

      <div className="mt-16 bg-slate-900 rounded-3xl border border-slate-800 p-12 shadow-xl">

        <div className="border-2 border-dashed border-slate-700 rounded-3xl p-16 text-center hover:border-blue-500 transition">

          <Upload size={70} className="mx-auto text-blue-500" />

          <h2 className="text-3xl font-bold mt-6">
            Drop Resume Here
          </h2>

          <p className="text-slate-400 mt-3">
            PDF / DOCX • Max 5 MB
          </p>

          <input
            type="file"
            id="resumeUpload"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />

          <label
            htmlFor="resumeUpload"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl cursor-pointer font-semibold transition"
          >
            Browse File
          </label>

        </div>

        {fileName && (

          <div className="mt-10 text-center">

            <h3 className="text-xl font-semibold">
              Selected File
            </h3>

            <p className="text-green-400 mt-3">
              📄 {fileName}
            </p>

            <button
              onClick={analyzeResume}
              className="mt-8 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl font-semibold transition"
            >
              Analyze Resume
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default UploadSection;