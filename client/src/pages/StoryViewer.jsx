import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api'

function StoryViewer() {
  const { id } = useParams()

  const [story, setStory] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reaction, setReaction] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // --------------------------------------
  // Fetch story
  // --------------------------------------

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true)
        setError('')

       const response = await api.get(`/stories/${id}`)

        setStory(response.data.story)
        setCurrentIndex(0)
      } catch (err) {
        console.error('Story fetch error:', err)

        setError(
          err.response?.data?.message ||
            'Unable to load story.'
        )
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchStory()
    }
  }, [id])

  // --------------------------------------
  // Increase view count
  // --------------------------------------

  useEffect(() => {
    if (!id) return

    const increaseView = async () => {
      try {
        await api.patch(`/stories/${id}/view`)
      } catch (err) {
        console.error('View count error:', err)
      }
    }

    increaseView()
  }, [id])

  // --------------------------------------
  // Auto-play images
  // --------------------------------------

  useEffect(() => {
    if (!story || !story.media?.length) {
      return
    }

    const currentMedia =
      story.media[currentIndex]

    if (currentMedia?.type === 'video') {
      return
    }

    const timer = setTimeout(() => {
      nextStory()
    }, 5000)

    return () => clearTimeout(timer)
  }, [currentIndex, story])

  // --------------------------------------
  // Next story
  // --------------------------------------

  const nextStory = () => {
    if (!story?.media?.length) {
      return
    }

    setCurrentIndex((prev) => {
      if (
        prev >=
        story.media.length - 1
      ) {
        return prev
      }

      return prev + 1
    })
  }

  // --------------------------------------
  // Previous story
  // --------------------------------------

  const prevStory = () => {
    if (!story?.media?.length) {
      return
    }

    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return 0
      }

      return prev - 1
    })
  }

  // --------------------------------------
  // Loading
  // --------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">
            ⏳
          </div>

          <p className="text-slate-400">
            Loading story...
          </p>
        </div>
      </div>
    )
  }

  // --------------------------------------
  // Error
  // --------------------------------------

  if (error || !story) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="text-5xl mb-4">
            😕
          </div>

          <p className="text-red-400 mb-5">
            {error || 'Story not found'}
          </p>

          <Link
            to="/feed"
            className="inline-block bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-semibold"
          >
            ← Back to Stories
          </Link>
        </div>
      </div>
    )
  }

  const currentMedia =
    story.media[currentIndex]

  const isLastSlide =
    currentIndex ===
    story.media.length - 1

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* -------------------------------- */}
      {/* Header */}
      {/* -------------------------------- */}

      <div className="w-full max-w-5xl mx-auto px-4 pt-4">

        {/* Progress */}

        <div className="flex gap-1 mb-4">
          {story.media.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden"
            >
              <div
                className={`h-full transition-all duration-300 ${
                  index < currentIndex
                    ? 'bg-white'
                    : index === currentIndex
                    ? 'bg-white'
                    : 'bg-transparent'
                }`}
              />
            </div>
          ))}
        </div>

        {/* User/header */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold">
              S
            </div>

            <div>
              <p className="font-semibold">
                StatusX User
              </p>

              <p className="text-xs text-slate-400">
                Story
              </p>
            </div>

          </div>

          <Link
            to="/feed"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition"
          >
            ×
          </Link>

        </div>

      </div>

      {/* -------------------------------- */}
      {/* Main Story Area */}
      {/* -------------------------------- */}

      <div className="flex-1 flex items-center justify-center px-4 py-6">

        <div className="relative w-full max-w-[430px]">

          {/* Previous button */}

          <button
            type="button"
            onClick={prevStory}
            disabled={currentIndex === 0}
            className="absolute -left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 flex items-center justify-center text-3xl transition"
          >
            ‹
          </button>

          {/* -------------------------------- */}
          {/* Story container */}
          {/* -------------------------------- */}

          <div className="relative w-full aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl">

            {currentMedia.type === 'video' ? (

              <video
                key={currentMedia.url}
                src={currentMedia.url}
                className="w-full h-full object-contain bg-black"
                autoPlay
                controls
                onEnded={nextStory}
              />

            ) : (

              <img
                key={currentMedia.url}
                src={currentMedia.url}
                alt={`Story ${currentIndex + 1}`}
                className="w-full h-full object-contain bg-black"
              />

            )}

            {/* -------------------------------- */}
            {/* Invisible left/right click areas */}
            {/* -------------------------------- */}

            <button
              type="button"
              onClick={prevStory}
              disabled={currentIndex === 0}
              aria-label="Previous story"
              className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer"
            />

            <button
              type="button"
              onClick={nextStory}
              disabled={isLastSlide}
              aria-label="Next story"
              className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer"
            />

            {/* Slide number */}

            <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
              {currentIndex + 1}/
              {story.media.length}
            </div>

          </div>

          {/* Next button */}

          <button
            type="button"
            onClick={nextStory}
            disabled={isLastSlide}
            className="absolute -right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 flex items-center justify-center text-3xl transition"
          >
            ›
          </button>

        </div>

      </div>

      {/* -------------------------------- */}
      {/* Caption */}
      {/* -------------------------------- */}

      {story.caption && (
        <div className="px-6 pb-4 text-center">
          <p className="text-white text-base font-medium">
            {story.caption}
          </p>
        </div>
      )}

      {/* -------------------------------- */}
      {/* Reactions */}
      {/* -------------------------------- */}

      <div className="w-full max-w-2xl mx-auto px-6 pb-8">

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">

          <div className="flex items-center justify-center gap-5">

            {[
              '❤️',
              '🔥',
              '😍',
              '😂',
              '👏',
            ].map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() =>
                  setReaction(emoji)
                }
                className={`text-3xl transition-transform duration-200 ${
                  reaction === emoji
                    ? 'scale-125'
                    : 'hover:scale-125'
                }`}
              >
                {emoji}
              </button>
            ))}

          </div>

          {reaction && (
            <p className="text-center text-green-400 text-sm mt-3">
              You reacted with {reaction}
            </p>
          )}

          <p className="text-center text-slate-500 text-xs mt-3">
            👁️ {story.views || 0} views
          </p>

        </div>

      </div>

    </div>
  )
}

export default StoryViewer