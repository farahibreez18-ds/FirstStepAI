import { XCircle } from "lucide-react";

function MissingSkills({ skills }) {

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

      <h2 className="text-3xl font-bold mb-8">
        Missing Skills
      </h2>

      <div className="space-y-5">

        {skills.map((skill) => (

          <div
            key={skill}
            className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl"
          >

            <XCircle className="text-red-400" />

            <span className="text-lg">
              {skill}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MissingSkills;