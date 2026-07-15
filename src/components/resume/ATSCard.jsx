import { Award } from "lucide-react";

function ATSCard({ score }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

      <div className="flex items-center gap-4">

        <div className="bg-blue-600 p-4 rounded-2xl">
          <Award size={30} />
        </div>

        <div>

          <h2 className="text-3xl font-bold">
            ATS Score
          </h2>

          <p className="text-slate-400">
            Resume Compatibility
          </p>

        </div>

      </div>

      <div className="mt-10">

        <div className="w-full bg-slate-800 rounded-full h-5">
            <div
  className="bg-blue-500 h-5 rounded-full transition-all duration-1000"
  style={{ width: `${score}%` }}
></div>

        
        </div>

        <h1 className="text-7xl font-extrabold text-blue-500 mt-8">
          {score}%
        </h1>

        <p className="text-green-400 text-xl mt-3">
          Excellent Resume
        </p>

      </div>

    </div>
  );
}

export default ATSCard;