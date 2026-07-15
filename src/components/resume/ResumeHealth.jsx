import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

function ResumeHealth() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

      <h2 className="text-3xl font-bold mb-8">
        Resume Health
      </h2>

      <div className="space-y-6">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <CheckCircle2 className="text-green-400" />

            <span>Formatting</span>

          </div>

          <span className="text-green-400 font-semibold">
            Excellent
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <CheckCircle2 className="text-green-400" />

            <span>Education</span>

          </div>

          <span className="text-green-400 font-semibold">
            Excellent
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <CheckCircle2 className="text-green-400" />

            <span>Contact Information</span>

          </div>

          <span className="text-green-400 font-semibold">
            Good
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <AlertTriangle className="text-yellow-400" />

            <span>Projects</span>

          </div>

          <span className="text-yellow-400 font-semibold">
            Needs Improvement
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <XCircle className="text-red-400" />

            <span>Skills</span>

          </div>

          <span className="text-red-400 font-semibold">
            Missing
          </span>

        </div>

      </div>

    </div>
  );
}

export default ResumeHealth;