import StoryDesigner from '../components/StoryDesigner'

function StoryDesignPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            🎨 Story Designer
          </h1>
          <p className="text-slate-400 mt-2">
            Create Instagram-style stories with music, text overlays, and beautiful templates.
          </p>
        </div>

        <StoryDesigner />
      </div>
    </div>
  )
}

export default StoryDesignPage