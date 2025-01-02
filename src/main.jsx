import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from './utils/ToastContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

// const CLIENT_ID = '138307122002-9ef6h5tjevfdkmm9ffokmglmedj2fu22.apps.googleusercontent.com'
const CLIENT_ID ='511566881440-t5oc18ajh3icfvlf9sgt728p3vo0t11t.apps.googleusercontent.com'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <ToastProvider>
      <App />
    </ToastProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
