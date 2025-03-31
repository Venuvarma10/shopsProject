import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ShopProvider } from './Components/ContextAPI/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <ShopProvider>
    <App />
  </ShopProvider>
    
)
