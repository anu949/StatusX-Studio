import { Link } from 'react-router-dom'

function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Story Editor', path: '/editor', icon: '📸' },
    { name: 'Analytics', path: '/analytics', icon: '📊' },
    { name: 'Profile', path: '/profile', icon: '👤' },
  ]

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-green-400">StatusX Studio</h1>
        <p className="text-slate-400 text-sm mt-1">
          Social Story Platform
        </p>
      </div>

      <nav className="space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition duration-200"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar