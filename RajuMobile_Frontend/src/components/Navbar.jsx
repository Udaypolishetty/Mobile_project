import { useState } from "react";
import { Link, useNavigate,  useLocation } from "react-router-dom";
import { FaBars, FaShoppingCart, FaSearch, FaTimes, FaHeart, FaUserCircle, FaSignOutAlt,  FaArrowLeft } from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar({ onSearchOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { cartCount, wishlist } = useCart();
  const { user, logout, setShowAuthModal } = useAuth();
  const navigate = useNavigate();
const [showCategories, setShowCategories] = useState(false);
const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

const location = useLocation();

const isProductPage =
  location.pathname === "/catalog" ||
  location.pathname.startsWith("/product");

  const navLinks = [
    { label: "All Products", cat: "All"},
    { label: "Mobiles", cat: "Mobiles" },
    { label: "Cases & Covers", cat: "Cases & Covers" },
    { label: "Chargers", cat: "Chargers" },
    { label: "Earphones", cat: "Earphones" },
    { label: "Smart Watches", cat: "Smart Watches" },
    { label: "Power Banks", cat: "Power Banks" },
    { label: "Accessories", cat: "Accessories" },
  ];

  const goToCatalog = (cat) => {
  if (cat === "All") {
    navigate("/catalog");
  } else {
    navigate(`/catalog?category=${encodeURIComponent(cat)}`);
  }

  setMenuOpen(false);
};
  return (
    <nav className="bg-black text-white  shadow-lg">
      {/* Announcement bar */}
      <div className="bg-pink-700 text-white text-center text-xs py-1.5 tracking-wide font-medium overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          🎉 HOT SUMMER SUPER SALE IS LIVE &nbsp;•&nbsp; Free Shipping All Over India &nbsp;•&nbsp; 
          Cash on Delivery Available &nbsp;•&nbsp; 🎉 HOT SUMMER SUPER SALE IS LIVE &nbsp;•&nbsp; Free Shipping All Over India
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
            <span className="text-cyan-400">Raju</span><span className="text-white"> Mobile</span>
          </h1>
          <p className="text-[8px] text-gray-400 tracking-widest uppercase">Accessories</p>
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/wishlist" className="relative">
            <FaHeart className="text-xl text-gray-300" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>
            )}
          </Link>
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
            )}
          </Link>
          {user ? (
            <button onClick={() => { logout(); }} className="text-cyan-400 text-xs font-semibold">
              <FaSignOutAlt className="text-xl" />
            </button>
          ) : (
            <button onClick={() => setShowAuthModal(true)}>
              <MdOutlinePerson className="text-2xl cursor-pointer" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {/* {menuOpen && (
        <div className="md:hidden bg-gray-950 border-b border-gray-800 animate-fadeIn">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.cat} className="px-6 py-3.5 border-b border-gray-800 hover:bg-gray-900 cursor-pointer text-sm font-medium tracking-wide transition" onClick={() => goToCatalog(link.cat)}>
                {link.label}
              </li>
            ))}
            <li className="px-6 py-3.5 text-yellow-400 font-semibold hover:bg-gray-900 cursor-pointer text-sm" onClick={() => { navigate("/catalog?sale=true"); setMenuOpen(false); }}>
              🔥 Offers
            </li>
          </ul>
        </div>
      )} */}
      {menuOpen && (
  <div className="md:hidden bg-gray-950 border-b border-gray-800">

    {!mobileProductsOpen ? (
      <ul className="flex flex-col">

        <li
          className="px-6 py-4 border-b border-gray-800 cursor-pointer"
          onClick={() => {
            navigate("/");
            setMenuOpen(false);
          }}
        >
          Home
        </li>

        <li
          className="px-6 py-4 border-b border-gray-800 cursor-pointer"
          onClick={() => {
            setMobileProductsOpen(true);
            navigate("/catalog");
          }}
        >
          Products
        </li>

        <li
          className="px-6 py-4 border-b border-gray-800 cursor-pointer"
          onClick={() => {
            navigate("/contact");
            setMenuOpen(false);
          }}
        >
          Contact
        </li>

      </ul>
    ) : (
      <ul className="flex flex-col">

        <li
          className="px-6 py-4 border-b border-gray-800 text-cyan-400 cursor-pointer"
          onClick={() => {
            setMobileProductsOpen(false);
            navigate("/");
          }}
        >
          ← Back
        </li>

        {navLinks.map((link) => (
          <li
            key={link.cat}
            className="px-6 py-4 border-b border-gray-800 cursor-pointer"
            onClick={() => {
              goToCatalog(link.cat);
              setMenuOpen(false);
            }}
          >
            {link.label}
          </li>
        ))}

      </ul>
    )}

  </div>
)}

      {/* Desktop navbar */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Link to="/">
              <h1 className="text-2xl font-extrabold leading-tight">
                <span className="text-cyan-400">Raju Mobile</span><br />
                <span className="text-white text-base font-semibold">Accessories Store!</span>
              </h1>
              <p className="text-gray-500 text-xs mt-0.5">Best Price • Free Shipping Across India</p>
            </Link>

            <div className="flex w-full">
              <input
                type="text" placeholder="Search mobiles, accessories..."
                className="flex-1 px-4 py-2.5 text-black bg-white rounded-l-md outline-none text-sm"
                onFocus={onSearchOpen} readOnly
              />
              <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 rounded-r-md transition" onClick={onSearchOpen}>
                <FaSearch />
              </button>
            </div>

            <div className="flex justify-end gap-5 items-center">
              <Link to="/wishlist" className="flex items-center gap-1.5 cursor-pointer hover:text-pink-400 transition">
                <div className="relative">
                  <FaHeart className="text-xl" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>
                  )}
                </div>
                <span className="text-sm font-medium">Wishlist</span>
              </Link>
              <Link to="/cart" className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-400 transition">
                <div className="relative">
                  <FaShoppingCart className="text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
                  )}
                </div>
                <span className="text-sm font-medium">My Cart</span>
              </Link>
              
              {/* Account dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-400 transition"
                  onClick={() => setAccountOpen(!accountOpen)}
                >
                  <FaUserCircle className="text-xl" />
                  <span className="text-sm font-medium">{user ? user.name.split(" ")[0] : "Account"}</span>
                </button>
                {accountOpen && (
                  <div className="absolute right-0 top-9 bg-white text-gray-800 rounded-xl shadow-xl w-48 py-2 border border-gray-100 z-50 animate-fadeIn">
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="font-semibold text-sm">{user.name}</p>
                          <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                        <Link to="/account" onClick={() => setAccountOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition">My Orders</Link>
                        <Link to="/wishlist" onClick={() => setAccountOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition">Wishlist</Link>
                        <button onClick={() => { logout(); setAccountOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition">Sign Out</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => { setShowAuthModal(true); setAccountOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition font-semibold text-cyan-700">Sign In</button>
                        <button onClick={() => { setShowAuthModal(true); setAccountOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition">Create Account</button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
  <div className="max-w-7xl mx-auto px-6">
    <ul className="flex justify-center items-center gap-8 py-3 font-semibold text-sm uppercase tracking-wider">

      {!isProductPage ? (
        <>
          <li
            className="cursor-pointer hover:text-cyan-400 transition"
            onClick={() => navigate("/")}
          >
            Home
          </li>

          <li
            className="cursor-pointer hover:text-cyan-400"
  onClick={() => navigate("/catalog")}
          >
            Products
          </li>

          <li
            className="cursor-pointer hover:text-cyan-400 transition"
            onClick={() => navigate("/contact")}
          >
            Contact
          </li>
        </>
      ) : (
        <>
          <li
            className="flex items-center gap-2 cursor-pointer text-cyan-400 hover:text-cyan-300"
            onClick={() => navigate("/")}
          >
            <FaArrowLeft />
            Back
          </li>

          {navLinks.map((link) => (
            <li
              key={link.cat}
              className="cursor-pointer hover:text-cyan-400 transition whitespace-nowrap"
              onClick={() => goToCatalog(link.cat)}
            >
              {link.label}
            </li>
          ))}
        </>
      )}

    </ul>
  </div>
</div>
      </div>
    </nav>
  );
}

export default Navbar;
