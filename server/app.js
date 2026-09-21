require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const connectDB = require('./config/db')
const storyRoutes = require('./routes/storyRoutes')
const authRoutes = require('./routes/authRoutes')



const app = express()

// Connect MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// API Routes
app.use('/api/stories', storyRoutes)
app.use('/api/auth', authRoutes)

// Test Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'StatusX Studio Backend Running 🚀',
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})