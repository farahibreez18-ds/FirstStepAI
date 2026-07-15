import { Link } from "react-router-dom";
import {
  FileText,
  Bot,
  GraduationCap,
  Briefcase,
  BarChart3,
  MessageSquare,
} from "lucide-react";

function Card({ icon, title, desc }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 hover:-translate-y-2 transition duration-300 cursor-pointer">

      <div className="text-blue-500 mb-6">
        {icon}
      </div>

      <h3 className="text-2xl font-bold">
        {title}
      </h3>

      <p className="text-slate-400 mt-4">
        {desc}
      </p>

    </div>
  );
}

function FeatureMenu() {
  return (
    <section className="py-24 px-8">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            Everything You Need
          </h2>

          <p className="text-slate-400 mt-5 text-lg">
            Select a feature to begin your journey.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
<Link to="/resume">

  <Card
    icon={<FileText size={45} />}
    title="Resume Analyzer"
    desc="Analyze your resume and improve your ATS score."
  />

</Link>

         <Link to="/coach">

  <Card
    icon={<Bot size={45} />}
    title="AI Career Coach"
    desc="Ask career questions and get AI guidance."
  />

</Link>
<Link to="/interview">

  <Card
    icon={<GraduationCap size={45} />}
    title="Mock Interview"
    desc="Practice interviews with AI."
  />

</Link>

          <Link to="/roadmap">

  <Card
    icon={<BarChart3 size={45} />}
    title="Skill Roadmap"
    desc="Know what to learn next."
  />

</Link>

         <Link to="/jobs">

  <Card
    icon={<Briefcase size={45} />}
    title="Job Tracker"
    desc="Track internship and job applications."
  />

</Link>

        <Link to="/learning">

  <Card
    icon={<MessageSquare size={45} />}
    title="Learning Hub"
    desc="Resources, notes and AI learning plans."
  />

</Link>
        </div>

      </div>

    </section>
  );
}

export default FeatureMenu;