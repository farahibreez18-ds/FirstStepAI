import { Brain, FileText, Search, Sparkles } from "lucide-react";

function LoadingScreen() {
  return (
    <div className="max-w-5xl mx-auto mt-12">

      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-10 shadow-xl">

        <div className="flex items-center gap-4 mb-8">

          <div className="bg-blue-600 p-4 rounded-2xl">
            <Brain size={35} />
          </div>

          <div>

            <h2 className="text-3xl font-bold">
              FirstStep AI
            </h2>

            <p className="text-slate-400">
              AI is analyzing your resume...
            </p>

          </div>

        </div>

        <div className="space-y-8">

          <div>

            <div className="flex justify-between mb-2">

              <div className="flex items-center gap-3">
                <FileText className="text-blue-500" />
                <span>Reading Resume</span>
              </div>

              <span>100%</span>

            </div>

            <div className="w-full bg-slate-800 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full w-full animate-pulse"></div>
            </div>

          </div>

          <div>

            <div className="flex justify-between mb-2">

              <div className="flex items-center gap-3">
                <Search className="text-green-400" />
                <span>Checking ATS Score</span>
              </div>

              <span>100%</span>

            </div>

            <div className="w-full bg-slate-800 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full w-full animate-pulse"></div>
            </div>

          </div>

          <div>

            <div className="flex justify-between mb-2">

              <div className="flex items-center gap-3">
                <Sparkles className="text-purple-400" />
                <span>Generating AI Suggestions</span>
              </div>

              <span>100%</span>

            </div>

            <div className="w-full bg-slate-800 rounded-full h-3">
              <div className="bg-purple-500 h-3 rounded-full w-full animate-pulse"></div>
            </div>

          </div>

        </div>

        <div className="mt-10 bg-green-500/10 border border-green-500 rounded-2xl p-5 text-center">

          <p className="text-green-400 text-lg font-semibold">

            ✔ Analysis Complete

          </p>

        </div>

      </div>

    </div>
  );
}

export default LoadingScreen;