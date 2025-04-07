import React from 'react'

const Header = () => {
  return (
    <div className="h-[34vw] my-[30px] mx-auto bg-no-repeat bg-contain relative"
    style={{ backgroundImage: "url('/header_img.png')" }}>
        <div className="absolute flex flex-wrap flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[5vw] animate-fadeIn">
            <h2 className="font-black text-amber-50 text-[clamp(20px,4vw,65px)] max-w-[90%] break-words leading-[1.2] mx-auto animate-fadeIn">Order your favourite food here</h2>
            <p className='text-white text-lg'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest of ingredients</p>
        <button className="border-0 text-[#747474] font-medium py-[1.5vw] px-[3vw] bg-white text-[max(0.8vw,16px)] rounded-full hover:bg-orange-500">View Menu</button>
        
        </div>
    </div>
  )
}

export default Header