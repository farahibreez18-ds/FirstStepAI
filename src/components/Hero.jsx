import { Link } from "react-router-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";

function Hero() {
  const score = 0.87;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;

  return (
    <section className="relative max-w-6xl mx-auto px-6 pt-12 pb-10">

      <div className="grid lg:grid-cols-2 gap-10 items-center">

        {/* Left: copy */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-[#121A2E] border border-[#232D42] rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2B84B]"></span>
            <span className="text-xs font-data text-[#8A93A6] tracking-wide">
              BUILT FOR YOUR NEXT CAREER MOVE
            </span>
          </div>

          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-[#F5F7FA] leading-tight">
            Every career starts <br className="hidden lg:block" />
            with a <span className="text-[#4C6FFF]">first step.</span>
          </h1>

          <p className="mt-5 text-lg text-[#8A93A6] max-w-md mx-auto lg:mx-0">
            Resume analysis, mock interviews, and a personalized roadmap —
            everything you need to land the role, in one place.
          </p>

          <div className="mt-7 flex justify-center lg:justify-start gap-4">
            <Link
              to="/login"
              className="bg-[#4C6FFF] hover:bg-[#3D5AE0] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="border border-[#232D42] hover:border-[#4C6FFF] text-[#F5F7FA] font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Right: mock resume score card */}
        <div className="flex justify-center lg:justify-end">
          <div className="bg-[#121A2E] border border-[#232D42] rounded-2xl p-6 w-80 shadow-2xl shadow-black/40 rotate-1 hover:rotate-0 transition-transform">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-data text-[#8A93A6] tracking-wide">RESUME SCORE</span>
              <span className="text-xs bg-[#4C6FFF]/10 text-[#4C6FFF] px-2 py-0.5 rounded-full font-data">ATS</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r={radius} fill="none" stroke="#232D42" strokeWidth="6" />
                <circle
                  cx="32" cy="32" r={radius} fill="none"
                  stroke="#4C6FFF" strokeWidth="6"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - score)}
                  strokeLinecap="round"
                  transform="rotate(-90 32 32)"
                />
              </svg>
              <div>
                <div className="font-display font-bold text-2xl text-[#F5F7FA]">87<span className="text-sm text-[#8A93A6]">/100</span></div>
                <div className="text-xs text-[#8A93A6]">Strong match</div>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-[#F5F7FA]">
                <CheckCircle2 className="w-4 h-4 text-[#4C6FFF] shrink-0" />
                Keyword match
              </div>
              <div className="flex items-center gap-2 text-sm text-[#F5F7FA]">
                <CheckCircle2 className="w-4 h-4 text-[#4C6FFF] shrink-0" />
                Formatting
              </div>
              <div className="flex items-center gap-2 text-sm text-[#8A93A6]">
                <AlertCircle className="w-4 h-4 text-[#F2B84B] shrink-0" />
                Missing: certifications
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Journey path */}
      <div className="mt-12 max-w-3xl mx-auto">
        <svg viewBox="0 0 700 100" className="w-full h-auto">
          <line x1="50" y1="50" x2="650" y2="50" stroke="#232D42" strokeWidth="2" />
          {[
            { x: 50, label: "Resume" },
            { x: 250, label: "Interview" },
            { x: 450, label: "Roadmap" },
            { x: 650, label: "Job" },
          ].map((node) => (
            <g key={node.label}>
              <circle cx={node.x} cy="50" r="7" fill="#0B1120" stroke="#4C6FFF" strokeWidth="2" />
              <text x={node.x} y="80" textAnchor="middle" className="font-data" fill="#8A93A6" fontSize="12">
                {node.label}
              </text>
            </g>
          ))}
          <circle r="5" fill="#F2B84B">
            <animateMotion dur="4s" repeatCount="indefinite" path="M50,50 L650,50" />
          </circle>
        </svg>
      </div>

    </section>
  );
}

export default Hero;