import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './scss/style.scss'
import './js/main.js'


import  Router  from './routes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Router />

    
  </StrictMode>,
)
