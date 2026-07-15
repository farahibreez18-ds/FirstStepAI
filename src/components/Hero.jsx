function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-28">

      <div className="bg-blue-600/20 border border-blue-500 text-blue-400 px-5 py-2 rounded-full mb-8">
        🚀 AI Powered Career Platform
      </div>

      <h1 className="text-6xl md:text-7xl font-extrabold leading-tight max-w-5xl">
        Build Your Dream Career
        <span className="text-blue-500"> with AI</span>
      </h1>

      <p className="text-slate-400 text-xl mt-8 max-w-3xl leading-relaxed">
        Create ATS-friendly resumes, prepare for interviews,
        chat with AI mentors, discover career paths and land
        your dream job faster.
      </p>

      <div className="flex gap-6 mt-12">

        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold transition">
          Check Resume
        </button>

        <button className="border border-slate-700 hover:border-blue-500 hover:text-blue-400 px-8 py-4 rounded-xl text-lg transition">
          Chat with AI
        </button>

      </div>

    </section>
  );
}

export default Hero;