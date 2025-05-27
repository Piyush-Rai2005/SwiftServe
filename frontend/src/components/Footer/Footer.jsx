
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className="relative">
      {/* Anchor point for navigation */}
      <div id='footer'></div>
      
      {/* Footer content */}
      <div className="text-[#d9d9d9] bg-[#323232] flex flex-col items-center px-5 py-5 pt-25 gap-5">
        {/* Grid container - responsive columns */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-8 lg:gap-20 items-start">
          
          {/* Leftmost Section (Logo + Text) */}
          <div className="flex flex-col items-start gap-5">
            <div>
              <img src={assets.logo_main} alt="Logo" className="w-40 rounded-lg" />
              <p className="text-sm md:text-base">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, exercitationem 
                consequatur quibusdam nulla natus praesentium veniam voluptates neque corrupti dolores 
                esse illo vel, ex excepturi dolorem quas.
              </p>
            </div>
            <div className="flex gap-3">
              <img className="w-8 md:w-10" src={assets.facebook_icon} alt="Facebook" />
              <img className="w-8 md:w-10" src={assets.twitter_icon} alt="Twitter" />
              <img className="w-8 md:w-10" src={assets.linkedin_icon} alt="LinkedIn" />
            </div>
          </div>

          {/* Company Section */}
          <div className="flex flex-col items-start gap-3 md:gap-5">
            <h2 className="text-white font-medium text-lg">COMPANY</h2>
            <ul className="list-none space-y-2 cursor-pointer">
              <li className="text-sm md:text-base">Home</li>
              <li className="text-sm md:text-base">About us</li>
              <li className="text-sm md:text-base">Delivery</li>
              <li className="text-sm md:text-base">Privacy Policy</li>
            </ul>
          </div>

          {/* Get In Touch Section */}
          <div className="flex flex-col items-start gap-3 md:gap-5">
            <h2 className="text-white font-medium text-lg">GET IN TOUCH</h2>
            <ul className="list-none space-y-2 cursor-pointer">
              <li className="text-sm md:text-base">+0731-238-232-6353</li>
              <li className="text-sm md:text-base">contact@swiftserve.com</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="w-full h-px my-5 bg-gray-500 border-none" />
        
        {/* Copyright */}
        <p className="text-xs md:text-sm text-center">
          Copyright © 2025 SwiftServe.com. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;