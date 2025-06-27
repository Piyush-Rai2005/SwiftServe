import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar' style={{backgroundColor: '#24323d', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',borderRadius: '12px 12px 12px 0px'}}>
        <img  className="logo" alt="" src={assets.logo_admin} />
        <img className="profile"src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar