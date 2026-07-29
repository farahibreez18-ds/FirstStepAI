import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Plus, Trash2, Briefcase, Loader2 } from "lucide-react";

const STATUS_COLORS = {
  Applied: "bg-[#4C6FFF]/10 text-[#4C6FFF]",
  Interview: "bg-[#F2B84B]/10 text-[#F2B84B]",
  Offer: "bg-green-500/10 text-green-400",
  Rejected: "bg-red-500/10 text-red-400",
};

function JobTracker() {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ company: "", role: "", status: "Applied" });

  useEffect(() => {
    if (!currentUser) return;

    const q = query(collection(db, "jobs"), where("userId", "==", currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobList = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      jobList.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setJobs(jobList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const addJob = async () => {
    if (!form.company.trim() || !form.role.trim()) return;
    await addDoc(collection(db, "jobs"), {
      ...form,
      userId: currentUser.uid,
      createdAt: Date.now(),
    });
    setForm({ company: "", role: "", status: "Applied" });
  };

  const removeJob = async (id) => {
    await deleteDoc(doc(db, "jobs", id));
  };

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "jobs", id), { status });
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-display font-bold text-3xl text-[#F5F7FA]">Job Tracker</h1>
        <p className="text-[#8A93A6] mt-2">Keep track of your applications in one place.</p>

        <div className="mt-8 bg-[#121A2E] border border-[#232D42] rounded-xl p-5 flex flex-col sm:flex-row gap-3">
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Company"
            className="flex-1 bg-[#0B1120] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
          />
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="Role"
            className="flex-1 bg-[#0B1120] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="bg-[#0B1120] border border-[#232D42] text-[#F5F7FA] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
          >
            {Object.keys(STATUS_COLORS).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={addJob}
            className="flex items-center justify-center gap-1.5 bg-[#4C6FFF] hover:bg-[#3D5AE0] text-white font-medium px-4 py-2.5 rounded-lg transition"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {loading && (
            <div className="flex items-center justify-center gap-2 text-[#8A93A6] py-10">
              <Loader2 className="w-5 h-5 animate-spin" /> Loading your applications...
            </div>
          )}

          {!loading && jobs.length === 0 && (
            <div className="text-center text-[#8A93A6] py-10">
              <Briefcase className="w-8 h-8 mx-auto mb-3 opacity-50" />
              No applications tracked yet.
            </div>
          )}

          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-[#121A2E] border border-[#232D42] rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-display font-semibold text-[#F5F7FA]">{job.role}</h3>
                <p className="text-sm text-[#8A93A6]">{job.company}</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={job.status}
                  onChange={(e) => updateStatus(job.id, e.target.value)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-[#4C6FFF] ${STATUS_COLORS[job.status]}`}
                >
                  {Object.keys(STATUS_COLORS).map((s) => (
                    <option key={s} value={s} className="bg-[#121A2E] text-[#F5F7FA]">{s}</option>
                  ))}
                </select>
                <button onClick={() => removeJob(job.id)} className="text-[#8A93A6] hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobTracker;