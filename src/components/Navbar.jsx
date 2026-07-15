function Navbar() {
  return (
    <header className="w-full border-b border-slate-800">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        <h1 className="text-2xl font-bold text-blue-500">
          FirstStep AI
        </h1>

        <div className="flex items-center gap-8">

          <a href="/" className="text-slate-300 hover:text-blue-400">
            Home
          </a>

          <a href="/" className="text-slate-300 hover:text-blue-400">
            Features
          </a>

          <a href="/" className="text-slate-300 hover:text-blue-400">
            About
          </a>

          <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg">
            Get Started
          </button>

        </div>

      </nav>
    </header>
  );
}

export default Navbar;