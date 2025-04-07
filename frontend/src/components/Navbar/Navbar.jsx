import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {getTotalCartAmount} = useContext(StoreContext);

  return (
    <div className='py-5 flex items-center justify-between px-4 md:px-8'>
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="" className='w-32 md:w-40' />
      </Link>

      {/* Mobile menu button (hidden on desktop) */}
      <div className='md:hidden cursor-pointer'>
  <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
    {mobileMenuOpen ? (
      <img src={assets.cross_icon} alt="" className='w-8' />
    ) : (
      <IoIosMenu className='w-10 h-10 text-[#49557e]' />
    )}
  </button>
</div>

      {/* Desktop Navigation (hidden on mobile) */}
      <ul className='hidden md:flex gap-5 text-[#49557e] text-lg md:text-xl list-none'>
        <Link 
          to='/' 
          onClick={() => setMenu("home")} 
          className={`${menu === 'home' ? "pb-1 border-b border-[#49557e]" : ""} hover:opacity-80`}
        >
          home
        </Link>
        <a 
          href='#explore-menu' 
          onClick={() => setMenu("menu")} 
          className={`${menu === 'menu' ? "pb-1 border-b border-[#49557e]" : ""} hover:opacity-80`}
        >
          menu
        </a>
        <a 
          href='#app-download' 
          onClick={() => setMenu("mobile-app")}  
          className={`${menu === 'mobile-app' ? "pb-1 border-b border-[#49557e]" : ""} hover:opacity-80`}
        >
          mobile-app
        </a>
        <a 
          href='#footer' 
          onClick={() => setMenu("contact-us")}  
          className={`${menu === 'contact-us' ? "pb-1 border-b border-[#49557e]" : ""} hover:opacity-80`}
        >
          contact us
        </a>
      </ul>

      {/* Mobile Navigation (shown when menu is open) */}
      {mobileMenuOpen && (
        <div className='md:hidden absolute top-24 left-0 right-0 bg-white z-50 p-4 shadow-lg'>
          <ul className='flex flex-col gap-4 text-[#49557e] text-xl list-none'>
            <Link 
              to='/' 
              onClick={() => {setMenu("home"); setMobileMenuOpen(false);}} 
              className={`${menu === 'home' ? "pb-1 border-b border-[#49557e]" : ""}`}
            >
              home
            </Link>
            <a 
              href='#explore-menu' 
              onClick={() => {setMenu("menu"); setMobileMenuOpen(false);}} 
              className={`${menu === 'menu' ? "pb-1 border-b border-[#49557e]" : ""}`}
            >
              menu
            </a>
            <a 
              href='#app-download' 
              onClick={() => {setMenu("mobile-app"); setMobileMenuOpen(false);}}  
              className={`${menu === 'mobile-app' ? "pb-1 border-b border-[#49557e]" : ""}`}
            >
              mobile-app
            </a>
            <a 
              href='#footer' 
              onClick={() => {setMenu("contact-us"); setMobileMenuOpen(false);}}  
              className={`${menu === 'contact-us' ? "pb-1 border-b border-[#49557e]" : ""}`}
            >
              contact us
            </a>
          </ul>
        </div>
      )}

      {/* Right side icons (always visible) */}
      <div className='flex items-center gap-6 md:gap-10'>
        <img src={assets.search_icon} alt="Search" className='w-6 md:w-auto' />
        <div className='relative'>
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" className='w-6 md:w-auto' />
          </Link>
          <div className={getTotalCartAmount()===0?"":'absolute min-w-2.5 min-h-2.5 bg-[tomato] rounded-full -top-1 -right-1 animate-bounce'}></div>
        </div>
        <button 
          className='bg-transparent text-sm md:text-base text-[#49557e] px-3 md:px-4 py-1 cursor-pointer border border-[tomato] rounded-2xl hover:bg-[#fff4f2]'
          onClick={() => setShowLogin(true)}
        >
          sign in
        </button>
      </div>
    </div>
  );
};

export default Navbar;