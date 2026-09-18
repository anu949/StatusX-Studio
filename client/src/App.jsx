import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Profile from './pages/Profile'
import StoryViewer from './pages/StoryViewer'
import StoriesFeed from './pages/StoriesFeed'
import ProtectedRoute from './components/ProtectedRoute'
import TemplateEditor from './pages/TemplateEditor'
import StoryTemplates from './pages/StoryTemplates'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
           path="/stories/:id"
           element={
             <ProtectedRoute>
               <StoryViewer />
             </ProtectedRoute>
         }
        />

        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <StoriesFeed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/template-editor/:templateId"
          element={
            <ProtectedRoute>
              <TemplateEditor />
            </ProtectedRoute>
            }
        /> 
        <Route
          path="/templates"
          element={
           <ProtectedRoute>
             <StoryTemplates />
            </ProtectedRoute>
             }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App