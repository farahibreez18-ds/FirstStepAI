import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 text-center">
      <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        FirstStep AI
      </h1>

      <p className="mt-4 text-lg text-slate-400">
        Your AI-powered career companion — resumes, interviews, and skills, all in one place.
      </p>

      <div className="mt-10 flex justify-center gap-4">
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Sign In
        </Link>

        <Link
          to="/signup"
          className="border border-slate-700 hover:border-blue-500 text-slate-200 font-semibold px-8 py-3 rounded-lg transition"
        >
          Create Account
        </Link>
      </div>
    </section>
  );
}

export default Hero;