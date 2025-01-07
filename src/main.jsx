import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Todo from './Components/Todo'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Todo/>
  </StrictMode>,
)
