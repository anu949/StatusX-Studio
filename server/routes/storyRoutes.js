const express = require('express')
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const { v2: cloudinary } = require('cloudinary')

const Story = require('../models/Story')

const router = express.Router()

// --------------------------------------
// Cloudinary configuration
// --------------------------------------

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// --------------------------------------
// Multer + Cloudinary storage
// --------------------------------------

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith('video/')

    return {
      folder: 'statusx-studio/stories',
      resource_type: isVideo ? 'video' : 'image',
      allowed_formats: [
        'jpg',
        'jpeg',
        'png',
        'webp',
        'gif',
        'mp4',
        'mov',
        'webm',
      ],
    }
  },
})

const upload = multer({
  storage,
  limits: {
    files: 10,
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedImages = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ]

    const allowedVideos = [
      'video/mp4',
      'video/quicktime',
      'video/webm',
    ]

    if (
      allowedImages.includes(file.mimetype) ||
      allowedVideos.includes(file.mimetype)
    ) {
      cb(null, true)
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}`))
    }
  },
})

// --------------------------------------
// POST /api/stories
// Upload multiple media files as ONE story
// --------------------------------------

router.post('/', upload.array('media', 10), async (req, res) => {
  try {
    console.log('Files received:', req.files)

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one photo or video',
      })
    }

    const media = req.files.map((file) => ({
      url: file.path,
      publicId: file.filename || '',
      type: file.mimetype.startsWith('video/') ? 'video' : 'image',
      originalName: file.originalname,
    }))

    const story = await Story.create({
      caption: req.body.caption || '',
      media,
    })

    res.status(201).json({
      success: true,
      message: 'Story uploaded successfully',
      story,
    })
  } catch (error) {
    console.error('Story upload error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to upload story',
      error: error.message,
    })
  }
})

// --------------------------------------
// GET /api/stories
// Get active stories only
// --------------------------------------

router.get('/', async (req, res) => {
  try {
    const stories = await Story.find({
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 })

    res.json({
      success: true,
      stories,
    })
  } catch (error) {
    console.error('Fetch stories error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch stories',
    })
  }
})

// --------------------------------------
// GET /api/stories/:id
// Get one complete story
// --------------------------------------

router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findOne({
      _id: req.params.id,
      expiresAt: { $gt: new Date() },
    })

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found or expired',
      })
    }

    res.json({
      success: true,
      story,
    })
  } catch (error) {
    console.error('Get story error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to get story',
    })
  }
})

// --------------------------------------
// PATCH /api/stories/:id/view
// Increment view count
// --------------------------------------

router.patch('/:id/view', async (req, res) => {
  try {
    const story = await Story.findOneAndUpdate(
      {
        _id: req.params.id,
        expiresAt: { $gt: new Date() },
      },
      {
        $inc: {
          views: 1,
        },
      },
      {
        new: true,
      }
    )

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found or expired',
      })
    }

    res.json({
      success: true,
      views: story.views,
    })
  } catch (error) {
    console.error('View update error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to update views',
    })
  }
})

// DELETE STORY
router.delete('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found',
      });
    }

    // Delete media from Cloudinary
    for (const media of story.media) {
      if (media.publicId) {
        try {
          await cloudinary.uploader.destroy(
            media.publicId,
            {
              resource_type:
                media.type === 'video'
                  ? 'video'
                  : 'image',
            }
          );
        } catch (cloudinaryError) {
          console.error(
            'Cloudinary delete error:',
            cloudinaryError.message
          );
        }
      }
    }

    // Delete story from MongoDB
    await Story.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Story deleted successfully',
    });
  } catch (error) {
    console.error(
      'Delete story error:',
      error
    );

    res.status(500).json({
      success: false,
      message: 'Failed to delete story',
      error: error.message,
    });
  }
});

module.exports = router