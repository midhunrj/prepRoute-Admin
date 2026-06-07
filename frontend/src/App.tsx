
import './App.css'
import { Navigate, Route, Routes } from 'react-router'
import { useAuth } from './context/authContext'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import ProtectedRoute from './components/protectedRoute'
import TestCreation from './pages/testCreation'
import AddQuestions from './pages/addQuestions'
import Preview from './pages/preview'
import TestTracking from './pages/testTracking'

function App() {
const {isAuthenticated}=useAuth()

  return (
    <>
      <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
       <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
       <Route path="/test-creation" element={<ProtectedRoute><TestCreation/></ProtectedRoute>} />
      <Route path="/test-creation/:id" element={<ProtectedRoute><TestCreation /></ProtectedRoute>} />
      <Route path="/add-questions/:testId" element={<ProtectedRoute><AddQuestions /></ProtectedRoute>} />
      <Route path="/preview/:testId" element={<ProtectedRoute><Preview /></ProtectedRoute>} />
      <Route path="/test-tracking" element={<ProtectedRoute><TestTracking /></ProtectedRoute>} />  
    </Routes>
    </>
  )
}

export default App
