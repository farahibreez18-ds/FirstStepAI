import { Link } from "react-router-dom";

const features = [
  { title: "Resume Analyzer", desc: "Get an ATS score and improvement tips.", icon: "📄", path: "/resume" },
  { title: "Cover Letter Generator", desc: "Generate a tailored cover letter from your resume.", icon: "✉️", path: "/cover-letter" },
  { title: "Mock Interview", desc: "Practice with AI-generated feedback.", icon: "🎤", path: "/interview" },
  { title: "Job Tracker", desc: "Track internships and applications.", icon: "💼", path: "/jobs" },
];

function FeatureMenu() {
  const [primary, ...rest] = features;

  return (
    <section id="features" className="max-w-6xl mx-auto px-6 pb-28">
      <div className="text-center mb-12">
        <h2 className="font-display font-bold text-3xl text-[#F5F7FA]">
          Everything you need, in one place
        </h2>
        <p className="text-[#8A93A6] mt-2">Four tools. One career journey.</p>
      </div>

      <Link
        to={primary.path}
        className="group relative flex items-center gap-6 bg-[#121A2E] border border-[#4C6FFF]/40 hover:border-[#4C6FFF] rounded-2xl p-8 mb-6 transition-all hover:-translate-y-1"
      >
        <span className="absolute top-5 right-5 text-[10px] font-data tracking-wide text-[#F2B84B] bg-[#F2B84B]/10 px-2 py-1 rounded-full">
          START HERE
        </span>
        <div className="w-14 h-14 rounded-xl bg-[#0B1120] border border-[#232D42] flex items-center justify-center text-2xl shrink-0">
          {primary.icon}
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-[#F5F7FA] group-hover:text-[#4C6FFF] transition-colors">
            {primary.title}
          </h3>
          <p className="text-sm text-[#8A93A6] mt-1">{primary.desc}</p>
        </div>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-stretch">
        {rest.map((f) => (
          <Link
            key={f.path}
            to={f.path}
            className="group flex flex-col bg-[#121A2E] border border-[#232D42] hover:border-[#4C6FFF] rounded-xl p-6 transition-all hover:-translate-y-1"
          >
            <div className="w-11 h-11 rounded-lg bg-[#0B1120] border border-[#232D42] flex items-center justify-center text-xl mb-4 shrink-0">
              {f.icon}
            </div>
            <h3 className="font-display font-semibold text-[#F5F7FA] group-hover:text-[#4C6FFF] transition-colors">
              {f.title}
            </h3>
            <p className="text-sm text-[#8A93A6] mt-1.5">{f.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default FeatureMenu;