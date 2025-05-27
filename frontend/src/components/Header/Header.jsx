import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <div className="relative w-full h-[34vw] my-[30px] rounded-3xl overflow-hidden shadow-xl">
      {/* Background image */}
      <img
        src={assets.header_image}
        alt="Header Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Full overlay that covers the entire image */}
      <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
        <div className="text-white max-w-[60%] text-center animate-fadeIn p-6 rounded-2xl bg-black/30 backdrop-blur-sm">
          <h2 className="font-black text-[clamp(28px,4vw,64px)] leading-tight mb-4">
            Satisfy Your <br /> Cravings Instantly
          </h2>
          <p className="text-lg mb-6">
            Explore a curated selection of mouth-watering dishes, freshly
            prepared and delivered fast. Quality meets convenience.
          </p>
          <a href="#explore-menu">
  <button className="bg-gradient-to-r from-blue-400 to-orange-600 hover:from-blue-500 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300">
    Browse Menu
  </button>
</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
