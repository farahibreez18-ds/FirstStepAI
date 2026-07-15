import { UserCircle2 } from "lucide-react";

function DashboardHero() {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-400 uppercase tracking-widest">
            Career Hub
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Welcome back, Farah 👋
          </h1>

          <p className="text-slate-400 mt-3">
            Manage your career journey from one intelligent dashboard.
          </p>

        </div>

        <div className="bg-slate-800 p-4 rounded-2xl">

          <UserCircle2 size={45} className="text-blue-500"/>

        </div>

      </div>

    </section>
  );
}

export default DashboardHero;