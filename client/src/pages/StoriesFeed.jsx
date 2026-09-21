import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import { Trash2, Loader2 } from 'lucide-react'

function StoriesFeed() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  // --------------------------------------
  // Fetch stories
  // --------------------------------------

  const fetchStories = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await api.get('/stories')

      console.log('Stories:', response.data)

      setStories(response.data.stories || [])
    } catch (err) {
      console.error('Fetch stories error:', err)

      setError(
        err.response?.data?.message ||
          'Unable to load stories.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStories()
  }, [])

  // --------------------------------------
  // Delete story
  // --------------------------------------

  const handleDelete = async (storyId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this story? This action cannot be undone.'
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(storyId)
      setError('')

      const response = await api.delete(`/stories/${storyId}`)

      console.log('Delete response:', response.data)

      if (response.data.success) {
        // Remove deleted story immediately from UI
        setStories((currentStories) =>
          currentStories.filter(
            (story) => story._id !== storyId
          )
        )
      } else {
        setError(
          response.data.message ||
            'Failed to delete story.'
        )
      }
    } catch (err) {
      console.error('Delete story error:', err)

      setError(
        err.response?.data?.message ||
          'Unable to delete story.'
      )
    } finally {
      setDeletingId(null)
    }
  }

  // --------------------------------------
  // Remaining expiry time
  // --------------------------------------

  const getRemainingTime = (expiresAt) => {
    if (!expiresAt) {
      return 'Expiry unavailable'
    }

    const difference =
      new Date(expiresAt).getTime() - Date.now()

    if (difference <= 0) {
      return 'Expired'
    }

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    )

    const minutes = Math.floor(
      (difference % (1000 * 60 * 60)) /
        (1000 * 60)
    )

    if (hours > 0) {
      return `${hours}h ${minutes}m left`
    }

    return `${minutes}m left`
  }

  // --------------------------------------
  // Loading
  // --------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">
            ⏳
          </div>

          <p className="text-slate-400">
            Loading stories...
          </p>
        </div>
      </div>
    )
  }

  // --------------------------------------
  // Page
  // --------------------------------------

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}

      <header className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-green-400">
              StatusX Stories
            </h1>

            <p className="text-sm text-slate-500">
              Your published stories
            </p>
          </div>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={fetchStories}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition"
            >
              ↻ Refresh
            </button>

            <Link
              to="/templates"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition"
            >
              + Create Story
            </Link>

          </div>

        </div>
      </header>

      {/* Content */}

      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* Error */}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {/* No stories */}

        {stories.length === 0 ? (

          <div className="text-center py-20">

            <div className="text-6xl mb-5">
              📷
            </div>

            <h2 className="text-2xl font-bold mb-2">
              No active stories
            </h2>

            <p className="text-slate-500 mb-6">
              Choose a template and create your first story.
            </p>

            <Link
              to="/templates"
              className="inline-block bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold transition"
            >
              🎨 Choose Template
            </Link>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {stories.map((story) => {

              const firstMedia =
                story.media?.[0]

              const isDeleting =
                deletingId === story._id

              return (

                <div
                  key={story._id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-green-500/50 transition"
                >

                  {/* Story Preview */}

                  <div className="relative aspect-[9/16] max-h-[520px] bg-black">

                    {firstMedia?.type === 'video' ? (

                      <video
                        src={firstMedia.url}
                        className="w-full h-full object-contain"
                        muted
                      />

                    ) : (

                      <img
                        src={firstMedia?.url}
                        alt="Story preview"
                        className="w-full h-full object-contain"
                      />

                    )}

                    {/* Dark overlay */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                    {/* Slide count */}

                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {story.media?.length || 0} slide
                      {story.media?.length === 1
                        ? ''
                        : 's'}
                    </div>

                    {/* Media type */}

                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                      {firstMedia?.type === 'video'
                        ? '🎥 Video'
                        : '📷 Photo'}
                    </div>

                    {/* Caption on preview */}

                    {story.caption && (
                      <div className="absolute bottom-5 left-4 right-4">
                        <p className="text-white font-semibold text-center drop-shadow-lg line-clamp-2">
                          {story.caption}
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Details */}

                  <div className="p-5">

                    <div className="flex justify-between text-sm text-slate-400 mb-4">

                      <span>
                        👁️ {story.views || 0} views
                      </span>

                      <span>
                        ⏰ {getRemainingTime(story.expiresAt)}
                      </span>

                    </div>

                    {/* View Story */}

                    <Link
                      to={`/stories/${story._id}`}
                      className="block text-center bg-green-500 hover:bg-green-600 py-3 rounded-xl font-semibold transition mb-3"
                    >
                      ▶ View Story
                    </Link>

                    {/* Delete Story */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(story._id)
                      }
                      disabled={isDeleting}
                      className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 hover:border-red-500 py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >

                      {isDeleting ? (
                        <>
                          <Loader2
                            size={18}
                            className="animate-spin"
                          />

                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 size={18} />

                          Delete Story
                        </>
                      )}

                    </button>

                  </div>

                </div>

              )
            })}

          </div>

        )}

      </main>

    </div>
  )
}

export default StoriesFeed