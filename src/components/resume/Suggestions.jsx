import { Sparkles } from "lucide-react";

function Suggestions({ suggestions }) {

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">

        <Sparkles className="text-yellow-400" />

        AI Suggestions

      </h2>

      <div className="space-y-5">

        {suggestions.map((item) => (

          <div
            key={item}
            className="bg-slate-950 rounded-xl p-5"
          >

            💡 {item}

          </div>

        ))}

      </div>

    </div>
  );
}

export default Suggestions;