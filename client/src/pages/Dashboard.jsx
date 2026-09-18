import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const stats = [
    {
      title: 'Stories Posted',
      value: '24',
      color: 'text-green-400',
    },
    {
      title: 'Total Views',
      value: '12.5K',
      color: 'text-blue-400',
    },
    {
      title: 'Reactions',
      value: '892',
      color: 'text-pink-400',
    },
    {
      title: 'Followers',
      value: '1.2K',
      color: 'text-yellow-400',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        <Header />

        <main className="p-6 space-y-6">

          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  Welcome back 👋
                </h1>

                <p className="text-green-100 max-w-2xl">
                  Create beautiful WhatsApp-style stories using
                  ready-made templates and your own photos.
                </p>
              </div>

              <Link
                to="/templates"
                className="inline-flex items-center justify-center bg-white text-green-600 hover:bg-green-50 px-6 py-3 rounded-xl font-bold transition"
              >
                🎨 Create Story
              </Link>

            </div>

          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {stats.map((stat) => (
              <div
                key={stat.title}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition"
              >

                <p className="text-slate-400 text-sm mb-2">
                  {stat.title}
                </p>

                <h3
                  className={`text-3xl font-bold ${stat.color}`}
                >
                  {stat.value}
                </h3>

              </div>
            ))}

          </div>

          {/* Create Story */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  Create a New Story
                </h2>

                <p className="text-slate-400 max-w-xl">
                  Choose from festival, celebration, friendship,
                  and memory templates. Add your photo and
                  customize your story.
                </p>

              </div>

              <Link
                to="/templates"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold text-center transition"
              >
                Browse Templates →
              </Link>

            </div>

          </div>

          {/* Recent Stories */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-xl font-bold text-white">
                Recent Stories
              </h2>

              <Link
                to="/feed"
                className="text-green-400 hover:text-green-300 text-sm font-medium"
              >
                View All →
              </Link>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {[1, 2, 3].map((story) => (
                <div
                  key={story}
                  className="bg-slate-800 rounded-2xl p-4 border border-slate-700"
                >

                  <div className="h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl mb-4 flex items-center justify-center text-3xl">
                    📷
                  </div>

                  <h3 className="font-semibold text-white mb-1">
                    Story #{story}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    Recent story
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Logout */}
          <div className="flex justify-end">

            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold transition"
            >
              🚪 Logout
            </button>

          </div>

        </main>

      </div>

    </div>
  )
}

export default Dashboard