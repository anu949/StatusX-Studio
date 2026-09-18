import { useEffect, useRef, useState } from 'react'
import { Canvas, FabricImage, Rect } from 'fabric'
import api from '../services/api'

function StoryUpload() {
  const canvasElementRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  const [selectedFiles, setSelectedFiles] = useState([])
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)
  const [selectedObject, setSelectedObject] = useState(null) 
  const [objectCount, setObjectCount] = useState(0)
  const [status, setStatus] = useState('')

  //create canvas
  useEffect(()=>{
    const canvas = new Canvas(canvasElementRef.current,{
      width:360,height:640,backgroundColor:'#111827',
      preserveObjectStacking:true,
      selection:true,
    })
    
  })

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles(files)
  }

  // Remove a selected file
  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // Upload story
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one image or video')
      return
    }

    try {
      setUploading(true)

      const formData = new FormData()

      // ✅ IMPORTANT: field name must be "media"
      selectedFiles.forEach((file) => {
        formData.append('media', file)
      })

      formData.append('caption', caption)

      const response = await api.post('/stories/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('Upload success:', response.data)

      alert('Story uploaded successfully 🚀')

      // Clear form
      setSelectedFiles([])
      setCaption('')
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed. Check console for details.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
      {/* File Input */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Select Images / Videos
        </label>

        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-green-500 file:px-4 file:py-2 file:text-white hover:file:bg-green-600"
        />
      </div>

      {/* Caption */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Story Caption
        </label>

        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write something about your story..."
          rows={3}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Preview */}
      {selectedFiles.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Preview ({selectedFiles.length})
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative group">
                {file.type.startsWith('video') ? (
                  <video
                    src={URL.createObjectURL(file)}
                    className="w-full h-32 object-cover rounded-xl border border-slate-700"
                    controls
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}` }
                    className="w-full h-32 object-cover rounded-xl border border-slate-700"
                  />
                )}

                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition duration-200"
      >
        {uploading ? 'Uploading...' : '🚀 Upload Story'}
      </button>
    </div>
  )
}

export default StoryUpload