function RecentActivity() {

  const activities = [

    "Resume analyzed successfully",

    "Mock interview completed",

    "AI Coach session finished",

    "Skill Roadmap updated"

  ];

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-12">

      <h2 className="text-3xl font-bold">

        Recent Activity

      </h2>

      <div className="space-y-5 mt-8">

        {activities.map((activity) => (

          <div
            key={activity}
            className="bg-slate-950 rounded-xl p-4"
          >

            ✅ {activity}

          </div>

        ))}

      </div>

    </div>

  );
}

export default RecentActivity;