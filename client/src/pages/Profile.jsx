function Profile() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Avatar */}
            <div className="w-28 h-28 rounded-full bg-green-500 flex items-center justify-center text-4xl font-bold">
              A
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-green-400">Anusha G S</h1>
              <p className="text-slate-400 mt-1">@anusha_dev</p>

              <p className="text-slate-300 mt-4 max-w-xl">
                CSE student passionate about MERN stack development, UI design,
                and building modern social media applications.
              </p>

              <p className="text-slate-400 mt-3">📧 anusha@example.com</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 text-center">
            <div className="bg-slate-800 rounded-2xl p-4">
              <h2 className="text-2xl font-bold text-white">24</h2>
              <p className="text-slate-400 text-sm">Stories</p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-4">
              <h2 className="text-2xl font-bold text-white">1.2K</h2>
              <p className="text-slate-400 text-sm">Followers</p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-4">
              <h2 className="text-2xl font-bold text-white">320</h2>
              <p className="text-slate-400 text-sm">Following</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="flex-1 bg-green-500 hover:bg-green-600 py-3 rounded-xl font-semibold transition">
              Edit Profile
            </button>

            <button className="flex-1 border border-slate-700 hover:border-slate-500 py-3 rounded-xl font-semibold transition">
              Account Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile