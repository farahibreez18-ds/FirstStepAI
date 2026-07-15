import Navbar from "../components/Navbar";

import DashboardHero from "../components/dashboard/DashboardHero";
import TopBar from "../components/dashboard/TopBar";
import DashboardCards from "../components/dashboard/DashboardCards";
import ProgressCard from "../components/dashboard/ProgressCard";
import RecentActivity from "../components/dashboard/RecentActivity";


function Dashboard() {
  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        <DashboardHero />
        <TopBar />

        <DashboardCards />

        <div className="grid lg:grid-cols-2 gap-8">

          <ProgressCard />

          <RecentActivity />

        </div>

      </main>

    </div>

  );
}

export default Dashboard;