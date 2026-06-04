// import { useState } from "react";
// import { Link, useNavigate,  useLocation } from "react-router-dom";
// import { FaBars, FaShoppingCart, FaSearch, FaTimes, FaHeart, FaUserCircle, FaSignOutAlt,  FaArrowLeft } from "react-icons/fa";
// import { MdOutlinePerson } from "react-icons/md";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import {
//   FaHome,
//   FaMobileAlt,
//   FaPhoneAlt,
//   FaChevronRight
// } from "react-icons/fa";

// function Navbar({ onSearchOpen }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [accountOpen, setAccountOpen] = useState(false);
//   const { cartCount, wishlist } = useCart();
//   const { user, logout, setShowAuthModal } = useAuth();
//   const navigate = useNavigate();
// const [showCategories, setShowCategories] = useState(false);
// const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

// const location = useLocation();

// const isProductPage =
//   location.pathname === "/catalog" ||
//   location.pathname.startsWith("/product");

//   const navLinks = [
//     { label: "All Products", cat: "All"},
//     { label: "Mobiles", cat: "Mobiles" },
//     { label: "Cases & Covers", cat: "Cases & Covers" },
//     { label: "Chargers", cat: "Chargers" },
//     { label: "Earphones", cat: "Earphones" },
//     { label: "Smart Watches", cat: "Smart Watches" },
//     { label: "Power Banks", cat: "Power Banks" },
//     { label: "Accessories", cat: "Accessories" },
//   ];

//   const goToCatalog = (cat) => {
//   if (cat === "All") {
//     navigate("/catalog");
//   } else {
//     navigate(`/catalog?category=${encodeURIComponent(cat)}`);
//   }

//   setMenuOpen(false);
// };
//   return (
//     <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white sticky top-0 z-50 shadow-lg">

//       {/* Announcement bar */}
//       <div className="bg-indigo-700 text-white text-center text-xs py-1.5 tracking-wide font-medium overflow-hidden">
//         <div className="animate-marquee whitespace-nowrap">
//           🎉 HOT SUMMER SUPER SALE IS LIVE &nbsp;•&nbsp; Free Shipping All Over India &nbsp;•&nbsp; 
//           Cash on Delivery Available &nbsp;•&nbsp; 🎉 HOT SUMMER SUPER SALE IS LIVE &nbsp;•&nbsp; Free Shipping All Over India
//         </div>
//       </div>

//       {/* Mobile navbar */}
//       <div className="flex md:hidden items-center justify-between px-4 py-3 border-b border-gray-800">
//         <div className="flex items-center gap-3">
//           {menuOpen ? (
//             <FaTimes className="text-2xl cursor-pointer text-cyan-400" onClick={() => setMenuOpen(false)} />
//           ) : (
//             <FaBars className="text-2xl cursor-pointer" onClick={() => setMenuOpen(true)} />
//           )}
//           <FaSearch className="text-xl cursor-pointer" onClick={onSearchOpen} />
//         </div>

//         <Link to="/" className="text-center">
//           <h1 className="text-base font-bold leading-none">
//             <span className="text-cyan-400">Raju</span><span className="text-white"> Mobile</span>
//           </h1>
//           <p className="text-[8px] text-gray-400 tracking-widest uppercase">Accessories</p>
//         </Link>

//         <div className="flex items-center gap-3">
//           <Link to="/wishlist" className="relative">
//             <FaHeart className="text-xl text-gray-300" />
//             {wishlist.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>
//             )}
//           </Link>
//           <Link to="/cart" className="relative">
//             <FaShoppingCart className="text-xl" />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
//             )}
//           </Link>
//           {user ? (
//             <button onClick={() => { logout(); }} className="text-cyan-400 text-xs font-semibold">
//               <FaSignOutAlt className="text-xl" />
//             </button>
//           ) : (
//             <button onClick={() => setShowAuthModal(true)}>
//               <MdOutlinePerson className="text-2xl cursor-pointer" />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Mobile dropdown */}
//       {/* {menuOpen && (
//         <div className="md:hidden bg-gray-950 border-b border-gray-800 animate-fadeIn">
//           <ul className="flex flex-col">
//             {navLinks.map((link) => (
//               <li key={link.cat} className="px-6 py-3.5 border-b border-gray-800 hover:bg-gray-900 cursor-pointer text-sm font-medium tracking-wide transition" onClick={() => goToCatalog(link.cat)}>
//                 {link.label}
//               </li>
//             ))}
//             <li className="px-6 py-3.5 text-yellow-400 font-semibold hover:bg-gray-900 cursor-pointer text-sm" onClick={() => { navigate("/catalog?sale=true"); setMenuOpen(false); }}>
//               🔥 Offers
//             </li>
//           </ul>
//         </div>
//       )} */}

//  {menuOpen && (
//   <div className="md:hidden fixed inset-0 z-[999] bg-[#f5f0eb] animate-fadeIn flex flex-col">

//     {/* Header */}
//     <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200">

//       <button onClick={() => setMenuOpen(false)}>
//         <FaTimes className="text-2xl text-gray-700" />
//       </button>

// <Link
//   to="/"
//   onClick={() => setMenuOpen(false)}
//   className="absolute left-1/2 -translate-x-1/2"
// >
//   <div className="bg-gradient-to-b from-red-600 to-red-700 border border-white/20 rounded-2xl px-5 py-3 text-center shadow-lg">
//     <p className="text-white text-[10px] font-bold tracking-widest uppercase">
//       Raju's
//     </p>

//     <p className="text-white text-xl font-extrabold leading-none">
//       MOBILE
//     </p>

//     <p className="text-white/90 text-[9px] tracking-widest uppercase">
//       Accessories
//     </p>
//   </div>
// </Link>

//       <div className="flex items-center gap-4">
//         <FaSearch
//           className="text-xl text-gray-700 cursor-pointer"
//           onClick={onSearchOpen}
//         />

//         <Link to="/cart" onClick={() => setMenuOpen(false)}>
//           <FaShoppingCart className="text-xl text-gray-700" />
//         </Link>
//       </div>

//     </div>

//     {/* Menu Items */}
//     {!mobileProductsOpen ? (

//       <div className="flex-1">

//         <button
//           className="
// w-full
// text-left
// px-6
// py-5
// text-[28px]
// font-light
// tracking-wide
// text-slate-700
// hover:bg-[#ece9e2]
// transition
// "
//           onClick={() => {
//             navigate("/");
//             setMenuOpen(false);
//           }}
//         >
//           Home
//         </button>

//         <button
//           className="w-full text-left px-6 py-5 text-xl text-gray-700 bg-[#ece9e2]"
//           onClick={() => {
//             setMobileProductsOpen(true);
//           }}
//         >
//           Products
//         </button>

//         <button
//           className="w-full text-left px-6 py-5 text-xl text-gray-700 hover:bg-[#ece9e2] transition"
//           onClick={() => {
//             navigate("/contact");
//             setMenuOpen(false);
//           }}
//         >
//           Contact
//         </button>

//       </div>

//     ) : (

//       <div className="flex-1">

//         <button
//           className="px-6 py-5 text-cyan-600 flex items-center gap-2"
//           onClick={() => setMobileProductsOpen(false)}
//         >
//           <FaArrowLeft />
//           Back
//         </button>

//         {navLinks.map((link) => (
//           <button
//             key={link.cat}
//             className="w-full text-left px-6 py-4 text-lg text-gray-700 hover:bg-[#ece9e2]"
//             onClick={() => {
//               goToCatalog(link.cat);
//               setMenuOpen(false);
//             }}
//           >
//             {link.label}
//           </button>
//         ))}

//       </div>

//     )}

//     {/* Bottom Login Section */}
// <div className="border-t border-gray-200 bg-[#f0ece6] px-6 py-5">
//       <button
//         className="flex items-center gap-3 px-6 py-5 text-gray-700"
//         onClick={() => {
//           setShowAuthModal(true);
//           setMenuOpen(false);
//         }}
//       >
//         <MdOutlinePerson className="text-2xl" />
//         <span className="text-lg">
//           {user ? user.name : "Log in"}
//         </span>
//       </button>

//     </div>

//   </div>
// )}

//       {/* Desktop navbar */}
//       <div className="hidden md:block">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="grid grid-cols-3 items-center gap-4">
//             <Link to="/">
//               <h1 className="text-2xl font-extrabold leading-tight">
//                 <span className="text-cyan-400">Raju Mobile</span><br />
//                 <span className="text-white text-base font-semibold">Accessories Store!</span>
//               </h1>
//               <p className="text-gray-500 text-xs mt-0.5">Best Price • Free Shipping Across India</p>
//             </Link>

//             <div className="flex w-full">
//               <input
//                 type="text" placeholder="Search mobiles, accessories..."
//                 className="flex-1 px-4 py-2.5 text-black bg-white rounded-l-md outline-none text-sm"
//                 onFocus={onSearchOpen} readOnly
//               />
//               <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 rounded-r-md transition" onClick={onSearchOpen}>
//                 <FaSearch />
//               </button>
//             </div>

//             <div className="flex justify-end gap-5 items-center">
//               <Link to="/wishlist" className="flex items-center gap-1.5 cursor-pointer hover:text-pink-400 transition">
//                 <div className="relative">
//                   <FaHeart className="text-xl" />
//                   {wishlist.length > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>
//                   )}
//                 </div>
//                 <span className="text-sm font-medium">Wishlist</span>
//               </Link>
//               <Link to="/cart" className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-400 transition">
//                 <div className="relative">
//                   <FaShoppingCart className="text-xl" />
//                   {cartCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
//                   )}
//                 </div>
//                 <span className="text-sm font-medium">My Cart</span>
//               </Link>
              
//               {/* Account dropdown */}
//               <div className="relative">
//                 <button
//                   className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-400 transition"
//                   onClick={() => setAccountOpen(!accountOpen)}
//                 >
//                   <FaUserCircle className="text-xl" />
//                   <span className="text-sm font-medium">{user ? user.name.split(" ")[0] : "Account"}</span>
//                 </button>
//                 {accountOpen && (
//                   <div className="absolute right-0 top-9 bg-white text-gray-800 rounded-xl shadow-xl w-48 py-2 border border-gray-100 z-50 animate-fadeIn">
//                     {user ? (
//                       <>
//                         <div className="px-4 py-2 border-b border-gray-100">
//                           <p className="font-semibold text-sm">{user.name}</p>
//                           <p className="text-xs text-gray-400 truncate">{user.email}</p>
//                         </div>
//                         <Link to="/account" onClick={() => setAccountOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition">My Orders</Link>
//                         <Link to="/wishlist" onClick={() => setAccountOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition">Wishlist</Link>
//                         <button onClick={() => { logout(); setAccountOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition">Sign Out</button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={() => { setShowAuthModal(true); setAccountOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition font-semibold text-cyan-700">Sign In</button>
//                         <button onClick={() => { setShowAuthModal(true); setAccountOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition">Create Account</button>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-800">
//   <div className="max-w-7xl mx-auto px-6">
//     <ul className="flex justify-center items-center gap-8 py-3 font-semibold text-sm uppercase tracking-wider">

//       {!isProductPage ? (
//         <>
//           <li
//             className="cursor-pointer hover:text-cyan-400 transition"
//             onClick={() => navigate("/")}
//           >
//             Home
//           </li>

//           <li
//             className="cursor-pointer hover:text-cyan-400"
//   onClick={() => navigate("/catalog")}
//           >
//             Products
//           </li>

//           <li
//             className="cursor-pointer hover:text-cyan-400 transition"
//             onClick={() => navigate("/contact")}
//           >
//             Contact
//           </li>
//         </>
//       ) : (
//         <>
//           <li
//             className="flex items-center gap-2 cursor-pointer text-cyan-400 hover:text-cyan-300"
//             onClick={() => navigate("/")}
//           >
//             <FaArrowLeft />
//             Back
//           </li>

//           {navLinks.map((link) => (
//             <li
//               key={link.cat}
//               className="cursor-pointer hover:text-cyan-400 transition whitespace-nowrap"
//               onClick={() => goToCatalog(link.cat)}
//             >
//               {link.label}
//             </li>
//           ))}
//         </>
//       )}

//     </ul>
//   </div>
// </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;





import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars, FaShoppingCart, FaSearch, FaTimes, FaHeart,
  FaUserCircle, FaSignOutAlt, FaArrowLeft, FaHome,
  FaMobileAlt, FaPhoneAlt, FaChevronRight
} from "react-icons/fa";
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
    { label: "All Products", cat: "All" },
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .navbar-root {
          font-family: 'DM Sans', sans-serif;
        }
        .brand-font {
          font-family: 'Syne', sans-serif;
        }

        /* Marquee */
        @keyframes marquee {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .marquee-text {
          display: inline-block;
          animation: marquee 22s linear infinite;
          white-space: nowrap;
        }

        /* Fade in */
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-slide-down {
          animation: fadeSlideDown 0.22s ease forwards;
        }

        /* Mobile menu slide */
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .slide-in-left {
          animation: slideInLeft 0.28s cubic-bezier(.4,0,.2,1) forwards;
        }

        .cat-btn:hover {
          letter-spacing: 0.04em;
        }

        /* Pill badge */
        .badge {
          position: absolute;
          top: -7px;
          right: -8px;
          min-width: 17px;
          height: 17px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          padding: 0 3px;
        }

        /* Desktop underline nav item */
        .nav-item {
          position: relative;
          cursor: pointer;
          padding-bottom: 2px;
          transition: color 0.18s;
        }
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #06b6d4;
          border-radius: 2px;
          transition: width 0.22s cubic-bezier(.4,0,.2,1);
        }
        .nav-item:hover::after,
        .nav-item.active::after {
          width: 100%;
        }
        .nav-item:hover {
          color: #06b6d4;
        }

        /* Search bar glow */
        .search-bar:focus-within {
          box-shadow: 0 0 0 2px #06b6d4;
        }

        /* Account dropdown */
        .acct-dropdown {
          animation: fadeSlideDown 0.18s ease forwards;
          transform-origin: top right;
        }

        /* Mobile full-screen menu */
        .mobile-menu-overlay {
          animation: fadeSlideDown 0.22s ease forwards;
        }
        .mobile-menu-item {
          transition: background 0.15s, padding-left 0.15s;
        }
        .mobile-menu-item:hover {
          background: rgba(0,0,0,0.05);
          padding-left: 28px;
        }
        .mobile-cat-item {
          transition: background 0.13s, padding-left 0.13s;
        }
        .mobile-cat-item:hover {
          background: rgba(0,0,0,0.05);
          padding-left: 30px;
        }

        /* Logo card shimmer */
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .logo-card {
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 40%, #c0392b 100%);
          border-radius: 16px;
          padding: 10px 18px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(192,57,43,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
          position: relative;
          overflow: hidden;
        }
        .logo-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>

      <nav className="navbar-root sticky top-0 z-50" style={{ background: '#0a0f1e' }}>

        {/* ── Announcement bar ── */}
        <div style={{ background: 'linear-gradient(90deg,#0e7490,#1d4ed8,#0e7490)', overflow: 'hidden' }}
          className="py-1.5 text-white text-xs font-medium tracking-wide">
          <div className="marquee-text px-4">
            🎉 HOT SUMMER SUPER SALE IS LIVE &nbsp;•&nbsp; Free Shipping All Over India &nbsp;•&nbsp;
            Cash on Delivery Available &nbsp;•&nbsp; 🎉 HOT SUMMER SUPER SALE IS LIVE &nbsp;•&nbsp; Free Shipping All Over India &nbsp;•&nbsp;
            Easy Returns &nbsp;•&nbsp; Genuine Products Only
          </div>
        </div>

        {/* ══════════════════════════════════════
            MOBILE TOPBAR
        ══════════════════════════════════════ */}
        <div className="flex md:hidden items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

          {/* Left: hamburger + search */}
          <div className="flex items-center gap-3">
            {menuOpen ? (
              <FaTimes className="text-xl cursor-pointer text-cyan-400" onClick={() => setMenuOpen(false)} />
            ) : (
              <button
                onClick={() => setMenuOpen(true)}
                className="flex flex-col gap-[5px] justify-center w-8 h-8"
              >
                <span className="block h-[2px] w-6 bg-white rounded-full" />
                <span className="block h-[2px] w-4 bg-cyan-400 rounded-full" />
                <span className="block h-[2px] w-6 bg-white rounded-full" />
              </button>
            )}
            <button onClick={onSearchOpen}
              className="w-8 h-8 flex items-center justify-center rounded-full"
              style={{ background: 'rgba(6,182,212,0.12)' }}>
              <FaSearch className="text-cyan-400 text-sm" />
            </button>
          </div>

          {/* Center: brand */}
          <Link to="/" className="text-center">
            <div className="leading-none">
              <span className="text-cyan-400 text-[15px] font-extrabold tracking-tight">Raju</span>
              <span className="text-white text-[15px] font-extrabold tracking-tight"> Mobile</span>
            </div>
            <div className="text-[8px] tracking-[3px] text-gray-500 uppercase mt-0.5">Accessories</div>
          </Link>

          {/* Right: wishlist, cart, user */}
          <div className="flex items-center gap-3">
            <Link to="/wishlist" className="relative">
              <FaHeart className="text-lg text-gray-300 hover:text-pink-400 transition" />
              {wishlist.length > 0 && (
                <span className="badge bg-pink-500 text-white">{wishlist.length}</span>
              )}
            </Link>
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-lg text-gray-300 hover:text-cyan-400 transition" />
              {cartCount > 0 && (
                <span className="badge bg-cyan-400 text-black">{cartCount}</span>
              )}
            </Link>
            {user ? (
              <button onClick={logout}
                className="text-gray-300 hover:text-red-400 transition">
                <FaSignOutAlt className="text-lg" />
              </button>
            ) : (
              <button onClick={() => setShowAuthModal(true)}
                className="text-gray-300 hover:text-cyan-400 transition">
                <MdOutlinePerson className="text-xl" />
              </button>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════
            MOBILE FULL-SCREEN MENU
        ══════════════════════════════════════ */}
        {menuOpen && (
          <div className="md:hidden mobile-menu-overlay fixed inset-0 z-[999] flex flex-col"
            style={{ background: '#f5f0eb', fontFamily: "'DM Sans', sans-serif" }}>

            {/* Menu header */}
            <div className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>

              <button onClick={() => setMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full"
                style={{ background: 'rgba(0,0,0,0.07)' }}>
                <FaTimes className="text-gray-700 text-base" />
              </button>

              {/* Elegant red logo card */}
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <div className="logo-card">
                  <p className="brand-font text-white/80 text-[8px] font-semibold tracking-[3px] uppercase leading-none mb-1">
                    Raju's
                  </p>
                  <p className="brand-font text-white text-[18px] font-extrabold leading-none tracking-tight">
                    MOBILE
                  </p>
                  <p className="brand-font text-white/75 text-[7px] tracking-[2.5px] uppercase mt-1 leading-none">
                    Accessories
                  </p>
                </div>
              </Link>

              <button onClick={() => { onSearchOpen(); setMenuOpen(false); }}
                className="w-9 h-9 flex items-center justify-center rounded-full"
                style={{ background: 'rgba(0,0,0,0.07)' }}>
                <FaSearch className="text-gray-700 text-sm" />
              </button>
            </div>

            {/* Menu body */}
            <div className="flex-1 overflow-y-auto">
              {!mobileProductsOpen ? (
                <div className="slide-in-left py-4">
                  {/* Home */}
                  <button
                    className="mobile-menu-item w-full text-left px-6 py-3.5 text-slate-800 text-base font-medium border-b"
                    style={{ borderColor: 'rgba(0,0,0,0.07)' }}
                    onClick={() => { navigate("/"); setMenuOpen(false); }}
                  >
                    Home
                  </button>

                  {/* Products → */}
                  <button
                    className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium border-b flex items-center justify-between"
                    style={{ borderColor: 'rgba(0,0,0,0.07)', color: '#c0392b' }}
                    onClick={() => setMobileProductsOpen(true)}
                  >
                    <span>Products</span>
                    <FaChevronRight className="text-xs" />
                  </button>

                  {/* Contact */}
                  <button
                    className="mobile-menu-item w-full text-left px-6 py-3.5 text-slate-800 text-base font-medium border-b"
                    style={{ borderColor: 'rgba(0,0,0,0.07)' }}
                    onClick={() => { navigate("/contact"); setMenuOpen(false); }}
                  >
                    Contact
                  </button>

                  {/* Offers */}
                  <button
                    className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium"
                    style={{ color: '#d97706' }}
                    onClick={() => { navigate("/catalog?sale=true"); setMenuOpen(false); }}
                  >
                    🔥 Offers
                  </button>
                </div>
              ) : (
                <div className="slide-in-left py-4">
                  <button
                    className="flex items-center gap-2 px-6 py-3 text-sm font-medium mb-2"
                    style={{ color: '#c0392b' }}
                    onClick={() => setMobileProductsOpen(false)}
                  >
                    <FaArrowLeft className="text-xs" />
                    Back to Menu
                  </button>

                  <div className="px-6 pb-2">
                    <p className="text-[10px] tracking-[3px] uppercase text-gray-400 font-semibold">Browse Categories</p>
                  </div>

                  {navLinks.map((link, i) => (
                    <button
                      key={link.cat}
                      className="mobile-cat-item w-full text-left px-6 py-3.5 text-slate-700 text-base font-medium border-b flex items-center justify-between"
                      style={{
                        borderColor: 'rgba(0,0,0,0.07)',
                        transitionDelay: `${i * 25}ms`
                      }}
                      onClick={() => { goToCatalog(link.cat); setMenuOpen(false); }}
                    >
                      <span>{link.label}</span>
                      <FaChevronRight className="text-[10px] text-gray-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom: Login */}
            <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', background: 'rgba(0,0,0,0.03)' }}>
              <button
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium"
                style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
                onClick={() => { setShowAuthModal(true); setMenuOpen(false); }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#c0392b' }}>
                  <MdOutlinePerson className="text-white text-lg" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-slate-800">{user ? user.name : "Sign In / Register"}</div>
                  {!user && <div className="text-[10px] text-gray-400">Access orders, wishlist & more</div>}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            DESKTOP NAVBAR
        ══════════════════════════════════════ */}
        <div className="hidden md:block">

          {/* Top row: logo | search | actions */}
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="grid grid-cols-3 items-center gap-6">

              {/* Brand */}
              <Link to="/" className="group">
                <div className="brand-font leading-none">
                  <span className="text-2xl font-extrabold tracking-tight" style={{ color: '#06b6d4' }}>RAJU</span>
                  <span className="text-2xl font-extrabold tracking-tight text-white"> MOBILE</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[9px] tracking-[2.5px] uppercase text-gray-500 group-hover:text-gray-400 transition">
                    Best Price • Free Shipping Across India
                  </span>
                </div>
              </Link>

              {/* Search */}
              <div className="search-bar flex rounded-xl overflow-hidden transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <input
                  type="text"
                  placeholder="Search mobiles, cases, chargers..."
                  className="flex-1 px-4 py-2.5 bg-transparent text-white placeholder-gray-500 text-sm outline-none"
                  onFocus={onSearchOpen}
                  readOnly
                />
                <button
                  onClick={onSearchOpen}
                  className="px-4 flex items-center justify-center transition"
                  style={{ background: 'rgba(6,182,212,0.85)' }}
                >
                  <FaSearch className="text-white text-sm" />
                </button>
              </div>

              {/* Actions */}
              <div className="flex justify-end items-center gap-5">

                {/* Wishlist */}
                <Link to="/wishlist" className="flex items-center gap-2 group">
                  <div className="relative">
                    <FaHeart className="text-lg text-gray-400 group-hover:text-pink-400 transition" />
                    {wishlist.length > 0 && (
                      <span className="badge bg-pink-500 text-white">{wishlist.length}</span>
                    )}
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-widest leading-none mb-0.5">Saved</div>
                    <div className="text-xs font-semibold text-gray-300 group-hover:text-pink-400 transition leading-none">Wishlist</div>
                  </div>
                </Link>

                {/* Cart */}
                <Link to="/cart" className="flex items-center gap-2 group">
                  <div className="relative">
                    <FaShoppingCart className="text-lg text-gray-400 group-hover:text-cyan-400 transition" />
                    {cartCount > 0 && (
                      <span className="badge bg-cyan-400 text-black">{cartCount}</span>
                    )}
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-widest leading-none mb-0.5">My</div>
                    <div className="text-xs font-semibold text-gray-300 group-hover:text-cyan-400 transition leading-none">Cart</div>
                  </div>
                </Link>

                {/* Account */}
                <div className="relative">
                  <button
                    onClick={() => setAccountOpen(!accountOpen)}
                    className="flex items-center gap-2 group"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: accountOpen ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.07)', border: '1px solid rgba(6,182,212,0.3)', transition: 'all 0.15s' }}>
                      <FaUserCircle className="text-base text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-600 uppercase tracking-widest leading-none mb-0.5">
                        {user ? "Hello" : "Account"}
                      </div>
                      <div className="text-xs font-semibold text-gray-300 group-hover:text-cyan-400 transition leading-none">
                        {user ? user.name.split(" ")[0] : "Sign In"}
                      </div>
                    </div>
                  </button>

                  {accountOpen && (
                    <div className="acct-dropdown absolute right-0 top-11 w-52 rounded-2xl overflow-hidden z-50"
                      style={{ background: '#131b2e', border: '1px solid rgba(6,182,212,0.18)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                      {user ? (
                        <>
                          <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                            <p className="font-semibold text-sm text-white">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                          </div>
                          <Link to="/account" onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">
                            My Orders
                          </Link>
                          <Link to="/wishlist" onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">
                            Wishlist
                          </Link>
                          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            <button onClick={() => { logout(); setAccountOpen(false); }}
                              className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition">
                              <FaSignOutAlt className="text-xs" />
                              Sign Out
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <button onClick={() => { setShowAuthModal(true); setAccountOpen(false); }}
                            className="w-full text-left px-4 py-3.5 text-sm font-semibold text-cyan-400 hover:bg-cyan-400/10 transition">
                            Sign In
                          </button>
                          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            {/* <button onClick={() => { setShowAuthModal(true); setAccountOpen(false); }}
                              className="w-full text-left px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition">
                              Create Account
                            </button> */}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Category / page nav strip */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <div className="max-w-7xl mx-auto px-6">
              <ul className="flex items-center gap-1 py-2.5 text-xs font-semibold uppercase tracking-widest overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                {!isProductPage ? (
                  <>
                    <li className="nav-item px-3 py-1.5 text-gray-400 rounded-lg" onClick={() => navigate("/")}>
                      Home
                    </li>
                    <li className="nav-item px-3 py-1.5 text-gray-400 rounded-lg" onClick={() => navigate("/catalog")}>
                      Products
                    </li>
                    <li className="nav-item px-3 py-1.5 text-gray-400 rounded-lg" onClick={() => navigate("/contact")}>
                      Contact
                    </li>
                    <li className="ml-auto">
                      <button
                        onClick={() => navigate("/catalog?sale=true")}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold tracking-widest transition"
                        style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                        🔥 OFFERS
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item flex items-center gap-1.5 px-3 py-1.5 text-cyan-400 rounded-lg mr-2"
                      onClick={() => navigate("/")}>
                      <FaArrowLeft className="text-[10px]" />
                      Back
                    </li>
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    {navLinks.map((link) => (
                      <li key={link.cat}
                        className="nav-item px-3 py-1.5 text-gray-400 whitespace-nowrap rounded-lg"
                        onClick={() => goToCatalog(link.cat)}>
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
    </>
  );
}

export default Navbar;