function ProgressCard() {
  return (

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-12">

      <h2 className="text-3xl font-bold">

        Career Progress

      </h2>

      <div className="mt-8">

        <div className="w-full bg-slate-800 rounded-full h-5">

          <div className="bg-blue-500 h-5 rounded-full w-[72%]"></div>

        </div>

        <h1 className="text-5xl font-bold text-blue-500 mt-6">

          72%

        </h1>

        <p className="text-green-400 mt-3">

          Great Progress! 🚀

        </p>

      </div>

    </div>

  );
}

export default ProgressCard;