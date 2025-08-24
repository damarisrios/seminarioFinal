import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <div className="blur-overlay" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <App />
      </div>
    </>
  </StrictMode>
)
