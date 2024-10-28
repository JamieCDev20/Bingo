import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SetupPage from './Components/Setup/SetupPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SetupPage/>
  </StrictMode>,
)
