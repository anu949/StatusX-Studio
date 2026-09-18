const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      enum: ['image', 'video'],
      required: true,
    },
    originalName: {
      type: String,
      default: '',
    },
  },
  { _id: true }
)

const storySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },

    caption: {
      type: String,
      default: '',
      trim: true,
    },

    media: {
      type: [mediaSchema],
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0
        },
        message: 'A story must contain at least one media file',
      },
    },

    views: {
      type: Number,
      default: 0,
    },

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Story', storySchema)