function Testimonials() {
  return (
    <section className="py-24 px-8 bg-slate-900">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <span className="text-blue-500 uppercase tracking-widest font-semibold">
            SUCCESS STORIES
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Students Love FirstStep AI
          </h2>

          <p className="text-slate-400 mt-5 text-lg">
            Helping students improve resumes and prepare for interviews.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8">
            <div className="text-yellow-400 text-xl mb-4">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="text-slate-300 leading-8">
              "My ATS score increased from 58% to 91%. I got shortlisted for my internship within a week."
            </p>

            <div className="mt-8">
              <h3 className="font-bold">Rahul S.</h3>
              <p className="text-slate-500 text-sm">
                CSE Student
              </p>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8">
            <div className="text-yellow-400 text-xl mb-4">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="text-slate-300 leading-8">
              "The AI Interview feature helped me prepare for technical interviews with confidence."
            </p>

            <div className="mt-8">
              <h3 className="font-bold">Priya M.</h3>
              <p className="text-slate-500 text-sm">
                Data Science Student
              </p>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8">
            <div className="text-yellow-400 text-xl mb-4">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="text-slate-300 leading-8">
              "Instead of using multiple websites, I found everything in one place."
            </p>

            <div className="mt-8">
              <h3 className="font-bold">Ananya K.</h3>
              <p className="text-slate-500 text-sm">
                Software Engineering Student
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Testimonials;