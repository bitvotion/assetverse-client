import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppWrapper from './Utilities/AppWrapper.jsx'
import router from './Routes/router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper router={router} />
  </StrictMode>,
)
