import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StoreContextProvider from './context/StoreContext.jsx'
import AdminStoreContextProvider from './src/Context/StoreContext.jsx' // Ensure this is the correct import path


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <AdminStoreContextProvider>
      <App />
      </AdminStoreContextProvider>
    </StoreContextProvider>
  </BrowserRouter>

)
