import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaShoppingCart, FaSearch, FaTimes, FaHeart } from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";
import { useCart } from "../context/CartContext";
import {
  Smartphone,
  Shield,
  BatteryCharging,
  Headphones,
  Watch,
  BatteryFull,
  Cable,
} from "lucide-react";

function Navbar({ onSearchOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, wishlist } = useCart();
  const navigate = useNavigate();

const navLinks = [
  { label: "Mobiles", cat: "Mobiles", icon: Smartphone },
  { label: "Cases & Covers", cat: "Cases & Covers", icon: Shield },
  { label: "Chargers", cat: "Chargers", icon: BatteryCharging },
  { label: "Earphones", cat: "Earphones", icon: Headphones },
  { label: "Smart Watches", cat: "Smart Watches", icon: Watch },
  { label: "Power Banks", cat: "Power Banks", icon: BatteryFull },
  { label: "Accessories", cat: "Accessories", icon: Cable },
];

  const goToCatalog = (cat) => {
    navigate(`/catalog?category=${encodeURIComponent(cat)}`);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
      {/* Announcement bar */}
<div className="bg-black text-white overflow-hidden">
    {/* Shipping Bar */}
  <div className="bg-cyan-500 text-black text-center py-2 text-xs md:text-sm font-semibold">
     Premium Mobile Accessories • Best Prices • Free Shipping Across India
  </div>
  {/* Moving Sale Banner */}
  <div className="bg-gradient-to-r from-red-600 via-pink-600 to-red-600 py-2 overflow-hidden">
    <div className="whitespace-nowrap animate-marquee font-bold text-sm md:text-lg">
      🔥 HOT SUMMER SUPER SALE IS LIVE • UP TO 70% OFF • BEST DEALS ON MOBILES & ACCESSORIES • 🔥
    </div>
  </div>



</div>

      {/* Mobile navbar */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-3">
          {menuOpen ? (
            <FaTimes className="text-2xl cursor-pointer text-cyan-400" onClick={() => setMenuOpen(false)} />
          ) : (
            <FaBars className="text-2xl cursor-pointer" onClick={() => setMenuOpen(true)} />
          )}
          <FaSearch className="text-xl cursor-pointer" onClick={onSearchOpen} />
        </div>

        <Link to="/" className="text-center">
          <h1 className="text-base font-bold leading-none">
            <span className="text-cyan-400">Raju</span>
            <span className="text-white"> Mobile</span>
          </h1>
          <p className="text-[8px] text-gray-400 tracking-widest uppercase">Accessories</p>
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/wishlist" className="relative cursor-pointer">
            <FaHeart className="text-xl text-gray-300" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative cursor-pointer">
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/account">
            <MdOutlinePerson className="text-2xl cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950 border-b border-gray-800 animate-fadeIn">
          <ul className="flex flex-col">
{navLinks.map(({ label, cat, icon: Icon }) => (
  <li
    key={cat}
    className="px-6 py-3.5 border-b border-gray-800 hover:bg-gray-900 cursor-pointer text-sm font-medium tracking-wide transition flex items-center gap-3"
    onClick={() => goToCatalog(cat)}
  >
    <Icon size={18} className="text-cyan-400" />
    {label}
  </li>
))}
            <li
              className="px-6 py-3.5 text-yellow-400 font-semibold hover:bg-gray-900 cursor-pointer text-sm tracking-wide"
              onClick={() => { navigate("/catalog?sale=true"); setMenuOpen(false); }}
            >
              🔥 Offers
            </li>
          </ul>
        </div>
      )}

      {/* Desktop navbar */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            {/* Logo */}
            <Link to="/">
              <h1 className="text-2xl font-extrabold leading-tight">
                <span className="text-cyan-400">Rajus Mobiless</span>
                <br />
                <span className="text-white text-base font-semibold">Accessories Store!!!</span>
              </h1>
              <p className="text-gray-500 text-xs mt-0.5">Best Price!! • Free Shipping Across India</p>
            </Link>

            {/* Search bar */}
<div className="w-full max-w-2xl">
  <div className="flex items-center bg-white rounded-full border border-gray-300 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-cyan-500 transition">
    <FaSearch className="text-gray-400 ml-4 text-sm" />
    
    <input
      type="text"
      placeholder="Search for mobiles, accessories and more"
      className="flex-1 px-3 py-3 text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none"
      onFocus={onSearchOpen}
      readOnly
    />

    <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-3 text-sm font-medium transition">
      Search
    </button>
  </div>
</div>

            {/* Icons */}
            <div className="flex justify-end gap-6">
              <Link to="/wishlist" className="flex items-center gap-1.5 cursor-pointer hover:text-pink-400 transition group">
                <div className="relative">
                  <FaHeart className="text-xl" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium">Wishlist</span>
              </Link>
              <Link to="/cart" className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-400 transition">
                <div className="relative">
                  <FaShoppingCart className="text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium">My Cart</span>
              </Link>
              <Link to="/account" className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-400 transition">
                <MdOutlinePerson className="text-xl" />
                <span className="text-sm font-medium">Account</span>
              </Link>
            </div>
          </div>
        </div>



        {/* Category nav */}
{/* Category nav */}
<div className="bg-white border-t border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex items-center justify-center gap-8 py-3 overflow-x-auto scrollbar-hide">
      {navLinks.map(({ label, cat, icon: Icon }, i) => {
        const active = i === 0;

        return (
          <button
            key={cat}
            onClick={() => goToCatalog(cat)}
            className="group flex min-w-[90px] flex-col items-center text-center"
          >
            <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 group-hover:bg-cyan-50 transition">
              <Icon
                size={24}
                strokeWidth={1.8}
                className={active ? "text-cyan-600" : "text-gray-700 group-hover:text-cyan-600"}
              />
            </div>

            <span
              className={`text-[13px] font-medium whitespace-nowrap ${
                active ? "text-black" : "text-gray-700 group-hover:text-black"
              }`}
            >
              {label}
            </span>

            <span
              className={`mt-2 h-[3px] w-12 rounded-full ${
                active ? "bg-cyan-600" : "bg-transparent group-hover:bg-cyan-200"
              }`}
            />
          </button>
        );
      })}

      <button
        onClick={() => navigate("/catalog?sale=true")}
        className="group flex min-w-[90px] flex-col items-center text-center"
      >
        <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50 text-yellow-500">
          <span className="text-xl">🔥</span>
        </div>
        <span className="text-[13px] font-medium whitespace-nowrap text-gray-700 group-hover:text-black">
          Offers
        </span>
        <span className="mt-2 h-[3px] w-12 rounded-full bg-transparent group-hover:bg-yellow-300" />
      </button>
    </div>
  </div>
</div>
        
      </div>
    </nav>
  );
}

export default Navbar;
