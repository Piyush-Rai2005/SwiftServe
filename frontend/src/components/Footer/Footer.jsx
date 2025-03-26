import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, exercitationem consequatur quibusdam nulla natus praesentium veniam voluptates neque corrupti dolores esse illo vel, ex excepturi dolorem quas. Nisi nemo tempore quae architecto qui minima saepe officiis vero praesentium iste, amet culpa, aliquid id ducimus sapiente error harum nihil illum! Aliquam?</p>
            <div className="footer-socail-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
            </div>
            <div className="footer-content-centre">
                <h2>COMPANY</h2>
                <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+0731-238-232-6353</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright © 2025 Tomato.com. All rights reserved. </p>
    </div>
  )
}

export default Footer