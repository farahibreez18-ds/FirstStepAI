import { Link } from "react-router-dom";

import {
  FileText,
  Bot,
  GraduationCap,
  Briefcase,
  BarChart3,
  BookOpen
} from "lucide-react";

const cards = [
  {
    title: "Resume Analyzer",
    desc: "Analyze your ATS score",
    icon: <FileText size={40} />,
    path: "/resume"
  },
  {
    title: "AI Career Coach",
    desc: "Chat with AI",
    icon: <Bot size={40} />,
    path: "/coach"
  },
  {
    title: "Mock Interview",
    desc: "Practice interviews",
    icon: <GraduationCap size={40} />,
    path: "/interview"
  },
  {
    title: "Skill Roadmap",
    desc: "Learning path",
    icon: <BarChart3 size={40} />,
    path: "/roadmap"
  },
  {
    title: "Job Tracker",
    desc: "Track applications",
    icon: <Briefcase size={40} />,
    path: "/jobs"
  },
  {
    title: "Learning Hub",
    desc: "Courses & Notes",
    icon: <BookOpen size={40} />,
    path: "/learning"
  }
];

function DashboardCards() {
  return (

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

      {cards.map((card) => (

        <Link key={card.title} to={card.path}>

          <div className="group bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 h-full">

            <div className="text-blue-500">

              {card.icon}

            </div>

            <h2 className="text-2xl font-bold mt-6">

              {card.title}

            </h2>

            <p className="text-slate-400 mt-3">

              {card.desc}

            </p>
            <div className="mt-6 text-blue-500 font-semibold opacity-0 group-hover:opacity-100 transition">

  Open →

</div>

          </div>

        </Link>

      ))}

    </div>

  );
}

export default DashboardCards;