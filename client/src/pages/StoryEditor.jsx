import { Link } from 'react-router-dom'
import StoryUpload from '../components/StoryUpload'

function StoryEditor() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-green-400">StatusX Studio</h1>

        <Link
          to="/dashboard"
          className="border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-lg transition text-slate-300 hover:text-white"
        >
          ← Dashboard
        </Link>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Multi Story Editor
          </h1>

          <p className="text-slate-400 max-w-3xl mx-auto text-lg">
            Upload multiple images and videos for a single story sequence,
            preview them, remove unwanted slides, and prepare your
            Instagram-style status for publishing.
          </p>
        </div>

        {/* Upload Component */}
        <StoryUpload />

        {/* Future Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">🎵</div>
            <h3 className="font-semibold text-white mb-2">Add Music</h3>
            <p className="text-slate-400 text-sm">
              Attach background songs and sync them with your story slides.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-semibold text-white mb-2">Apply Filters</h3>
            <p className="text-slate-400 text-sm">
              Enhance your photos with modern social-media style filters.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">😊</div>
            <h3 className="font-semibold text-white mb-2">Stickers & Text</h3>
            <p className="text-slate-400 text-sm">
              Add captions, emojis, stickers, and interactive story elements.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StoryEditor