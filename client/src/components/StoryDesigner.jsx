import { useState } from 'react'

const templates = [
  {
    id: 'default',
    name: 'Default',
    bg: 'bg-slate-900',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    bg: 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    bg: 'bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500',
  },
  {
    id: 'neon',
    name: 'Neon',
    bg: 'bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600',
  },
]

const musicOptions = [
  'No Music',
  'Chill Vibes 🎵',
  'Summer Beats ☀️',
  'Night Drive 🌙',
  'Party Mood 🎉',
]

function StoryDesigner() {
  const [overlayText, setOverlayText] = useState('My Awesome Story ✨')
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [selectedMusic, setSelectedMusic] = useState(musicOptions[0])

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Preview */}
      <div className="flex justify-center">
        <div
          className={`relative w-full max-w-sm h-[650px] rounded-3xl overflow-hidden shadow-2xl border border-slate-700 ${selectedTemplate.bg}` }
        >
          {/* Demo image */}
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200"
            alt="Story preview"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Music badge */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-sm text-white border border-white/10">
            🎵 {selectedMusic}
          </div>

          {/* Text overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-2xl leading-tight">
              {overlayText}
            </h2>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur rounded-2xl p-3 border border-white/10">
            <p className="text-white text-sm font-medium">🚀 StatusX Studio Preview</p>
            <p className="text-slate-200 text-xs mt-1">
              Template: {selectedTemplate.name}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
          <h3 className="text-white font-semibold mb-3">📝 Story Text</h3>
          <textarea
            value={overlayText}
            onChange={(e) => setOverlayText(e.target.value)}
            rows="3"
            placeholder="Write something amazing..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
          <h3 className="text-white font-semibold mb-3">🎵 Background Music</h3>
          <select
            value={selectedMusic}
            onChange={(e) => setSelectedMusic(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {musicOptions.map((music) => (
              <option key={music} value={music}>
                {music}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
          <h3 className="text-white font-semibold mb-3">🎨 Story Template</h3>

          <div className="grid grid-cols-2 gap-3">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={`p-4 rounded-xl text-white font-medium transition border ${
                  selectedTemplate.id === template.id
                    ? 'border-green-500 ring-2 ring-green-500/40'
                    : 'border-slate-700 hover:border-slate-500'
                } ${template.bg}` }
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition">
          💾 Apply Design to Story
        </button>
      </div>
    </div>
  )
}

export default StoryDesigner