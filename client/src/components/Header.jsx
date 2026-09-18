function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-slate-400 text-sm">
          Manage your stories and social content
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium text-white transition duration-200">
          + New Story
        </button>

        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold text-white">
          A
        </div>
      </div>
    </header>
  )
}

export default Header