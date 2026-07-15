function WhyChooseUs() {
  return (
    <section className="py-24 px-8 bg-slate-900">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}

        <div>

          <span className="text-blue-500 font-semibold uppercase tracking-widest">
            WHY FIRSTSTEP AI?
          </span>

          <h2 className="text-5xl font-bold mt-4 leading-tight">
            Your Complete Career
            <br />
            Growth Platform
          </h2>

          <p className="text-slate-400 mt-8 text-lg leading-8">
            Stop using multiple websites. FirstStep AI combines
            Resume Analysis, AI Mentoring, Interview Preparation,
            Job Tracking and Personalized Learning into one
            intelligent platform.
          </p>

          <button className="mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition">
            Explore Features →
          </button>

        </div>

        {/* Right Side */}

        <div className="grid grid-cols-2 gap-6">

          <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800">
            <h1 className="text-5xl font-bold text-blue-500">
              95%
            </h1>
            <p className="text-slate-400 mt-3">
              ATS Resume Score
            </p>
          </div>

          <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800">
            <h1 className="text-5xl font-bold text-green-400">
              10K+
            </h1>
            <p className="text-slate-400 mt-3">
              Students Guided
            </p>
          </div>

          <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800">
            <h1 className="text-5xl font-bold text-yellow-400">
              24/7
            </h1>
            <p className="text-slate-400 mt-3">
              AI Career Assistant
            </p>
          </div>

          <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800">
            <h1 className="text-5xl font-bold text-pink-500">
              500+
            </h1>
            <p className="text-slate-400 mt-3">
              Interview Questions
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;