import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { FileText, Mail, Mic, Briefcase, ArrowUpRight, Clock, Sparkles } from "lucide-react";

const secondary = [
  { title: "Cover Letter", desc: "Generate a tailored draft", icon: Mail, path: "/cover-letter", accent: "#8B7CF6" },
  { title: "Mock Interview", desc: "Practice a new session", icon: Mic, path: "/interview", accent: "#F2B84B" },
];

const jobStats = [
  { label: "Applied", value: 8, color: "#4C6FFF" },
  { label: "Interview", value: 3, color: "#F2B84B" },
  { label: "Offer", value: 1, color: "#22C55E" },
];
const maxJob = Math.max(...jobStats.map((j) => j.value));

const profileSteps = [
  { label: "Resume uploaded", done: false },
  { label: "First mock interview", done: false },
  { label: "Cover letter generated", done: false },
  { label: "3+ applications tracked", done: false },
];

function Dashboard() {
  const { currentUser } = useAuth();
  const firstName = currentUser?.displayName?.split(" ")[0] || currentUser?.email?.split("@")[0] || "there";

  const [jobCount, setJobCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [resumeScore, setResumeScore] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, "jobs"), where("userId", "==", currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => setJobCount(snapshot.size));
    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, "activity"), where("userId", "==", currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setRecentActivity(items.slice(0, 4));
    });
    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = onSnapshot(doc(db, "resumeScores", currentUser.uid), (snap) => {
      if (snap.exists()) setResumeScore(snap.data());
    });
    return () => unsubscribe();
  }, [currentUser]);

  const quickStats = [
    { label: "Applications", value: String(jobCount) },
  ];

  const profileDone = profileSteps.filter((s) => s.done).length;
  const profilePct = Math.round((profileDone / profileSteps.length) * 100);

  return (
    <div className="min-h-screen bg-[#0B1120] text-white relative overflow-hidden">
      <Navbar />

      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4C6FFF]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-52 right-0 w-72 h-72 bg-[#F2B84B]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 className="font-display font-bold text-3xl text-[#F5F7FA]">
              Welcome back, <span className="text-[#4C6FFF]">{firstName}</span>
            </h1>
            <p className="text-[#8A93A6] mt-2">Here's where your career journey stands today.</p>
          </div>

          <div className="flex gap-6 bg-[#121A2E] border border-[#232D42] rounded-xl px-6 py-3.5">
            {quickStats.map((s, i) => (
              <div key={s.label} className={i > 0 ? "pl-6 border-l border-[#232D42]" : ""}>
                <div className="font-data font-semibold text-lg text-[#F5F7FA]">{s.value}</div>
                <div className="text-[11px] text-[#8A93A6]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8 items-start">

          <div className="lg:col-span-2 flex flex-col gap-5">

            <Link
              to="/resume"
              className="group relative bg-gradient-to-br from-[#121A2E] to-[#161F38] border border-[#4C6FFF]/40 hover:border-[#4C6FFF] rounded-2xl p-7 transition-all hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#4C6FFF]/10 rounded-full blur-2xl"></div>
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-data tracking-wide text-[#F2B84B] bg-[#F2B84B]/10 px-2.5 py-1 rounded-full">
                    YOUR FLAGSHIP TOOL
                  </span>
                  <Sparkles className="w-4 h-4 text-[#4C6FFF]/50" />
                </div>
                <div className="flex items-end justify-between mt-5">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#4C6FFF]/15 border border-[#4C6FFF]/30 flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 text-[#4C6FFF]" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-[#F5F7FA] group-hover:text-[#4C6FFF] transition-colors">
                      Resume Analyzer
                    </h3>
                    <p className="text-sm text-[#8A93A6] mt-1.5">Check your latest ATS score</p>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-[#8A93A6] group-hover:text-[#4C6FFF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                </div>
              </div>
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-stretch">

              <div className="bg-[#121A2E] border border-[#232D42] rounded-xl p-6 flex flex-col justify-between">
                <span className="text-[10px] font-data text-[#8A93A6] tracking-wide">RESUME SCORE</span>
                {resumeScore ? (
                  <div className="mt-4">
                    <div className="font-display font-bold text-2xl text-[#F5F7FA]">
                      {resumeScore.score}<span className="text-sm text-[#8A93A6]">/100</span>
                    </div>
                    <p className="text-xs text-[#8A93A6] mt-1">{resumeScore.verdict}</p>
                  </div>
                ) : (
                  <div className="mt-4">
                    <div className="font-display font-bold text-lg text-[#8A93A6]">Not analyzed yet</div>
                    <p className="text-xs text-[#8A93A6] mt-1">Upload your resume to get a score</p>
                  </div>
                )}
              </div>

              {secondary.map((f) => {
                const Icon = f.icon;
                return (
                  <Link
                    key={f.path}
                    to={f.path}
                    className="group bg-[#121A2E] border border-[#232D42] rounded-xl p-6 transition-all hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = f.accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#232D42")}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${f.accent}1A`, border: `1px solid ${f.accent}40` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: f.accent }} />
                      </div>
                      <ArrowUpRight
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                        style={{ color: f.accent }}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="font-display font-semibold text-[#F5F7FA]">{f.title}</h3>
                      <p className="text-sm text-[#8A93A6] mt-1">{f.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <Link
              to="/jobs"
              className="group bg-[#121A2E] border border-[#232D42] rounded-xl p-6 transition-all flex items-center justify-between gap-6 flex-wrap"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#22C55E")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#232D42")}
            >
              <div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: "#22C55E1A", border: "1px solid #22C55E40" }}>
                  <Briefcase className="w-5 h-5" style={{ color: "#22C55E" }} />
                </div>
                <h3 className="font-display font-semibold text-[#F5F7FA]">Job Tracker</h3>
                <p className="text-sm text-[#8A93A6] mt-1">{jobCount} application{jobCount === 1 ? "" : "s"} tracked</p>
              </div>

              <div className="flex items-end gap-5">
                {jobStats.map((j) => (
                  <div key={j.label} className="flex flex-col items-center gap-2">
                    <div className="w-7 h-14 bg-[#0B1120] rounded-md flex items-end overflow-hidden">
                      <div className="w-full rounded-md" style={{ height: `${(j.value / maxJob) * 100}%`, backgroundColor: j.color }}></div>
                    </div>
                    <span className="text-[10px] text-[#8A93A6]">{j.label}</span>
                  </div>
                ))}
              </div>
            </Link>

          </div>

          <div className="flex flex-col gap-5">

            <div className="bg-[#121A2E] border border-[#232D42] rounded-2xl p-6">
              <h3 className="font-display font-semibold text-[#F5F7FA] mb-5">Recent Activity</h3>
              {recentActivity.length > 0 ? (
                <div className="space-y-5">
                  {recentActivity.map((a) => (
                    <div key={a.id} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4C6FFF] mt-1.5 shrink-0"></div>
                      <div>
                        <p className="text-sm text-[#F5F7FA] leading-snug">{a.text}</p>
                        <span className="flex items-center gap-1 text-xs text-[#8A93A6] mt-1">
                          <Clock className="w-3 h-3" /> Recently
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-[#8A93A6]">
                    Nothing here yet — start by analyzing your resume or tracking an application.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-[#121A2E] border border-[#232D42] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-semibold text-[#F5F7FA]">Profile Setup</h3>
                <span className="font-data text-sm text-[#4C6FFF]">{profilePct}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#0B1120] rounded-full overflow-hidden mb-5">
                <div className="h-full bg-[#4C6FFF] rounded-full transition-all" style={{ width: `${profilePct}%` }}></div>
              </div>
              <div className="space-y-3">
                {profileSteps.map((s) => (
                  <div key={s.label} className="flex items-center gap-2.5 text-sm">
                    <div
                      className={`w-4 h-4 rounded-full border shrink-0 ${
                        s.done ? "bg-[#4C6FFF] border-[#4C6FFF]" : "border-[#232D42]"
                      }`}
                    ></div>
                    <span className={s.done ? "text-[#8A93A6] line-through" : "text-[#F5F7FA]"}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;