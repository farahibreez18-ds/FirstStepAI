import { UploadCloud } from "lucide-react";

function UploadResume() {
  return (
    <section className="py-24 px-8">

      <div className="max-w-5xl mx-auto">

        <div className="text-center">

          <span className="text-blue-500 uppercase tracking-widest font-semibold">
            START HERE
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Upload Your Resume
          </h2>

          <p className="text-slate-400 mt-5 text-lg">
            Upload your resume and let FirstStep AI analyze it instantly.
          </p>

        </div>

        <div className="mt-16 border-2 border-dashed border-blue-500/40 rounded-3xl bg-slate-900 p-16 text-center hover:border-blue-400 transition">

          <UploadCloud
            size={70}
            className="mx-auto text-blue-500"
          />

          <h3 className="text-3xl font-bold mt-8">
            Drag & Drop Resume
          </h3>

          <p className="text-slate-400 mt-4">
            PDF • DOCX • Maximum 5 MB
          </p>

          <button className="mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold">
            Choose File
          </button>

        </div>

      </div>

    </section>
  );
}

export default UploadResume;