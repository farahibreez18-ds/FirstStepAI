import { Link } from "react-router-dom";

const features = [
  {
    title: "Resume Analyzer",
    desc: "Get an ATS score and improvement tips.",
    icon: "📄",
    path: "/resume",
  },
  {
    title: "AI Career Coach",
    desc: "Chat for guidance and learning advice.",
    icon: "🤖",
    path: "/coach",
  },
  {
    title: "Mock Interview",
    desc: "Practice with AI-generated feedback.",
    icon: "🎤",
    path: "/interview",
  },
  {
    title: "Skill Roadmap",
    desc: "Personalized learning paths by domain.",
    icon: "📈",
    path: "/roadmap",
  },
  {
    title: "Job Tracker",
    desc: "Track internships and applications.",
    icon: "💼",
    path: "/jobs",
  },
  {
    title: "Learning Hub",
    desc: "Curated courses and resources.",
    icon: "📚",
    path: "/learning",
  },
];

function FeatureMenu() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-6 pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <Link
            key={f.path}
            to={f.path}
            className="group bg-slate-900/60 border border-slate-800 hover:border-blue-500 rounded-xl p-6 transition"
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
              {f.title}
            </h3>
            <p className="text-sm text-slate-400 mt-1">{f.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default FeatureMenu;