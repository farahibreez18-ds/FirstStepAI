import { CalendarDays } from "lucide-react";

function TopBar() {

  const today = new Date();

  return (

    <div className="flex justify-between items-center mb-8">

      <div>

        <h2 className="text-2xl font-bold">
          Good Evening 👋
        </h2>

        <p className="text-slate-400 mt-1">
          Ready to level up your career today?
        </p>

      </div>

      <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-5 py-3 rounded-xl">

        <CalendarDays size={20} className="text-blue-500"/>

        <span>

          {today.toDateString()}

        </span>

      </div>

    </div>

  );

}

export default TopBar;