import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Toaster} from 'sonner'
import { AuthProvider } from './context/authContext.tsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
      <Toaster/>
    <App />
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
