function DashboardPreview() {
  return (
    <section className="py-24 px-8">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">

          <span className="text-blue-500 font-semibold uppercase tracking-widest">
            LIVE AI PREVIEW
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Your Career at a Glance
          </h2>

          <p className="text-slate-400 mt-6 text-lg">
            Upload your resume and instantly receive AI-powered career insights.
          </p>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Left */}

            <div>

              <h3 className="text-2xl font-bold mb-8">
                Career Health
              </h3>

              <div className="mb-6">

                <div className="flex justify-between mb-2">
                  <span>Overall Score</span>
                  <span className="text-green-400 font-bold">89%</span>
                </div>

                <div className="bg-slate-800 rounded-full h-4">

                  <div className="bg-blue-500 h-4 rounded-full w-[89%]"></div>

                </div>

              </div>

              <div className="space-y-4 mt-10">

                <div className="flex justify-between">
                  <span>Resume</span>
                  <span>95%</span>
                </div>

                <div className="flex justify-between">
                  <span>Projects</span>
                  <span>82%</span>
                </div>

                <div className="flex justify-between">
                  <span>Skills</span>
                  <span>74%</span>
                </div>

                <div className="flex justify-between">
                  <span>Interview</span>
                  <span>61%</span>
                </div>

              </div>

            </div>

            {/* Right */}

            <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800">

              <h3 className="text-2xl font-bold">
                AI Suggestions
              </h3>

              <div className="space-y-5 mt-8">

                <div className="bg-slate-900 rounded-xl p-4">
                  ✅ Improve Resume Summary
                </div>

                <div className="bg-slate-900 rounded-xl p-4">
                  🚀 Add GitHub Projects
                </div>

                <div className="bg-slate-900 rounded-xl p-4">
                  💡 Learn SQL
                </div>

                <div className="bg-slate-900 rounded-xl p-4">
                  🎯 Practice Aptitude
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default DashboardPreview;