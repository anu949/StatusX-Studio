# StatusX Studio

A full-stack web application for creating and sharing personalized social-media-style stories using ready-made templates and custom images.

## 🌐 Live Demo

👉 https://anu949.github.io/StatusX-Studio/

## 📌 About the Project

StatusX Studio is a MERN stack application that allows users to create personalized stories using professionally designed templates.

Users can select a template, customize their content, upload their own images, publish stories, and view them through a dedicated story feed.

The project demonstrates practical full-stack development with authentication, REST APIs, database integration, media uploads, and cloud deployment.

## ✨ Features

- 🔐 User Registration and Login
- 📊 Personalized Dashboard
- 🎨 Ready-made Story Templates
- 🖼️ Custom Image Upload
- ✏️ Personalized Story Content
- 📱 Responsive User Interface
- 📖 Story Feed
- 👁️ Story Views
- 🗑️ Story Management
- ☁️ Cloud Media Storage
- 💾 Persistent Database Storage
- 🚀 Production Deployment

## 🎨 Story Templates

The application currently provides templates for:

- 🪁 Sankranti
- ❤️ Rakhi
- 🪔 Diwali
- 🎨 Holi
- 🌿 Ugadi
- 🎄 Christmas
- 🎉 New Year
- 🎂 Birthday
- 👫 Friendship
- 📸 Memories

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express.js
- JWT Authentication
- Multer
- REST API

### Database

- MongoDB
- Mongoose
- MongoDB Atlas

### Cloud Services & Deployment

- Cloudinary
- Render
- GitHub Pages
- GitHub Actions

## 🏗️ System Architecture

```text
              User
                │
                ▼
       React + Vite Frontend
                │
             REST API
                │
                ▼
       Node.js + Express
          │             │
          ▼             ▼
   MongoDB Atlas     Cloudinary
     Database       Media Storage

     Register / Login
       ↓
   Dashboard
       ↓
Select Story Template
       ↓
 Customize Story
       ↓
 Upload Image
       ↓
    Publish
       ↓
  Story Feed
       ↓
  View Story
  StatusX-Studio/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── api.js
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── app.js
│   └── package.json
│
└── README.md