
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Routes, Route} from 'react-router-dom'
import Add from './pages/Add/Add'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

const AdminApp = () => {
    const url=import.meta.env.VITE_BACKEND_URL
  return (
    <div className="admin-app">
  <ToastContainer />
  <Navbar />
  <hr />
  <div className="admin-layout" style={{ display: 'flex' }}>
    <Sidebar />
    <div className="admin-pages" style={{ flex: 1 }}>
      <Routes>
        <Route path="add" element={<Add url={url} />} />
        <Route path="orders" element={<Orders url={url} />} />
        <Route path="list" element={<List url={url} />} />
      </Routes>
    </div>
  </div>
</div>

)

}

export default AdminApp