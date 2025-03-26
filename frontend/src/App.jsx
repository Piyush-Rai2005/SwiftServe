import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes ,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/cart'
import Footer from './components/Footer/Footer'
import './App.css'

const App = () => {
  return (
    <>
    <div className='app'>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
        </Routes>
    </div>
    <Footer>
    </Footer>
    </>
  )
}

export default App