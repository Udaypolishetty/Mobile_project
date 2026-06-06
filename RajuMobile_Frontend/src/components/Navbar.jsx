









// import { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   FaBars, FaShoppingCart, FaSearch, FaTimes, FaHeart,
//    FaSignOutAlt, FaArrowLeft, FaHome,
//   FaMobileAlt, FaPhoneAlt, FaChevronRight,FaUserCircle,FaInstagram, FaYoutube, FaFacebookF, FaEnvelope
// } from "react-icons/fa";
// import { MdOutlinePerson } from "react-icons/md";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { User } from "lucide-react";

// function Navbar({ onSearchOpen }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [accountOpen, setAccountOpen] = useState(false);
//   const { cartCount, wishlist } = useCart();
//   const { user, logout, setShowAuthModal } = useAuth();
//   const navigate = useNavigate();
//   const [showCategories, setShowCategories] = useState(false);
//   const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
//   const location = useLocation();
//   const isActive = (path) => location.pathname === path;


//   const isProductPage =
//     location.pathname === "/catalog" ||
//     location.pathname.startsWith("/product");

//   const navLinks = [
//     { label: "All Products", cat: "All" },
//     { label: "Mobiles", cat: "Mobiles" },
//     { label: "Cases & Covers", cat: "Cases & Covers" },
//     { label: "Chargers", cat: "Chargers" },
//     { label: "Earphones", cat: "Earphones" },
//     { label: "Smart Watches", cat: "Smart Watches" },
//     { label: "Power Banks", cat: "Power Banks" },
//     { label: "Accessories", cat: "Accessories" },
//   ];

//   const goToCatalog = (cat) => {
//     if (cat === "All") {
//       navigate("/catalog");
//     } else {
//       navigate(`/catalog?category=${encodeURIComponent(cat)}`);
//     }
//     setMenuOpen(false);
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

//         .navbar-root {
//           font-family: 'DM Sans', sans-serif;
//         }
//         .brand-font {
//           font-family: 'Syne', sans-serif;
//         }

//         /* Marquee */
//         @keyframes marquee {
//           0% { transform: translateX(100vw); }
//           100% { transform: translateX(-100%); }
//         }
//         .marquee-text {
//           display: inline-block;
//           animation: marquee 22s linear infinite;
//           white-space: nowrap;
//         }

//         /* Fade in */
//         @keyframes fadeSlideDown {
//           from { opacity: 0; transform: translateY(-8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .fade-slide-down {
//           animation: fadeSlideDown 0.22s ease forwards;
//         }

//         /* Mobile menu slide */
//         @keyframes slideInLeft {
//           from { opacity: 0; transform: translateX(-24px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//         .slide-in-left {
//           animation: slideInLeft 0.28s cubic-bezier(.4,0,.2,1) forwards;
//         }

//         .cat-btn:hover {
//           letter-spacing: 0.04em;
//         }

//         /* Pill badge */
//         .badge {
//           position: absolute;
//           top: -7px;
//           right: -8px;
//           min-width: 17px;
//           height: 17px;
//           border-radius: 999px;
//           font-size: 9px;
//           font-weight: 700;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           line-height: 1;
//           padding: 0 3px;
//         }

//         /* Desktop underline nav item */
//         .nav-item {
//           position: relative;
//           cursor: pointer;
//           padding-bottom: 2px;
//           transition: color 0.18s;
//         }
//         .nav-item::after {
//           content: '';
//           position: absolute;
//           bottom: -2px;
//           left: 0;
//           width: 0;
//           height: 2px;
//           background: #06b6d4;
//           border-radius: 2px;
//           transition: width 0.22s cubic-bezier(.4,0,.2,1);
//         }
//         .nav-item:hover::after,
//         .nav-item.active::after {
//           width: 100%;
//         }
//         .nav-item:hover {
//           color: #06b6d4;
//         }

//         /* Search bar glow */
//         .search-bar:focus-within {
//           box-shadow: 0 0 0 2px #06b6d4;
//         }

//         /* Account dropdown */
//         .acct-dropdown {
//           animation: fadeSlideDown 0.18s ease forwards;
//           transform-origin: top right;
//         }

//         /* Mobile full-screen menu */
//         .mobile-menu-overlay {
//           animation: fadeSlideDown 0.22s ease forwards;
//         }
//         .mobile-menu-item {
//           transition: background 0.15s, padding-left 0.15s;
//         }
//         .mobile-menu-item:hover {
//           background: rgba(0,0,0,0.05);
//           padding-left: 28px;
//         }
//         .mobile-cat-item {
//           transition: background 0.13s, padding-left 0.13s;
//         }
//         .mobile-cat-item:hover {
//           background: rgba(0,0,0,0.05);
//           padding-left: 30px;
//         }

//         /* Logo image – remove white bg on dark navbar */
//         .logo-img-dark {
//           mix-blend-mode: lighten;
//         }
//       `}</style>

//       <nav className="navbar-root sticky top-0 z-50" style={{
//   background: "linear-gradient(90deg, #081120 0%, #0d2240 60%, #133b70 100%)"
// }}   >

//         {/* ── Announcement bar ── */}
//         <div style={{ background: 'linear-gradient(90deg,#0e7490,#1d4ed8,#0e7490)', overflow: 'hidden' }}
//           className="py-1.5 text-white text-xs font-medium tracking-wide">
//           <div className="marquee-text px-4">
//             🎉 HOT SUMMER SUPER SALE IS LIVE &nbsp;•&nbsp; Free Shipping All Over India &nbsp;•&nbsp;
//             Cash on Delivery Available &nbsp;•&nbsp; 🎉 HOT SUMMER SUPER SALE IS LIVE &nbsp;•&nbsp; Free Shipping All Over India &nbsp;•&nbsp;
//             Easy Returns &nbsp;•&nbsp; Genuine Products Only
//           </div>
//         </div>

//         {/* ══════════════════════════════════════
//             MOBILE TOPBAR
//         ══════════════════════════════════════ */}
//         <div className="flex md:hidden items-center justify-between px-4 py-3"
//           style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

//           {/* Left: hamburger + search */}
//           <div className="flex items-center gap-3">
//             {menuOpen ? (
//               <FaTimes className="text-xl cursor-pointer text-cyan-400" onClick={() => setMenuOpen(false)} />
//             ) : (
//               <button
//                 onClick={() => setMenuOpen(true)}
//                 className="flex flex-col gap-[5px] justify-center w-8 h-8"
//               >
//                 <span className="block h-[2px] w-6 bg-white rounded-full" />
//                 <span className="block h-[2px] w-4 bg-cyan-400 rounded-full" />
//                 <span className="block h-[2px] w-6 bg-white rounded-full" />
//               </button>
//             )}
//             <button onClick={onSearchOpen}
//               className="w-8 h-8 flex items-center justify-center rounded-full"
//               style={{ background: 'rgba(6,182,212,0.12)' }}>
//               <FaSearch className="text-cyan-400 text-sm" />
//             </button>
//           </div>

//           {/* Center: logo image */}
//           <Link to="/" className="absolute left-1/2 -translate-x-1/2">
//             <img
//               src="/mobile_logo.png"
//               alt="Raju's Mobile Accessories"
//               className="h-10 bg-[#f5f0eb] w-auto object-contain logo-img-dark"
//             />
//           </Link>

//           {/* Right: wishlist, cart, user */}
//           <div className="flex items-center gap-3">
//             <Link to="/wishlist" className="relative">
//               <FaHeart className="text-lg text-gray-300 hover:text-pink-400 transition" />
//               {wishlist.length > 0 && (
//                 <span className="badge bg-pink-500 text-white">{wishlist.length}</span>
//               )}
//             </Link>
//             <Link to="/cart" className="relative">
//               <FaShoppingCart className="text-lg text-gray-300 hover:text-cyan-400 transition" />
//               {cartCount > 0 && (
//                 <span className="badge bg-cyan-400 text-black">{cartCount}</span>
//               )}
//             </Link>
//             {user ? (
//               <button onClick={logout}
//                 className="text-gray-300 hover:text-red-400 transition">
//                 <FaSignOutAlt className="text-lg" />
//               </button>
//             ) : (
//               <button onClick={() => setShowAuthModal(true)}
//                 className="text-gray-300 hover:text-cyan-400 transition">
//                 <MdOutlinePerson className="text-xl" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* ══════════════════════════════════════
//             MOBILE FULL-SCREEN MENU
//         ══════════════════════════════════════ */}
//        {menuOpen && (
//           <div className="md:hidden mobile-menu-overlay fixed inset-0 z-[999] flex flex-col"
//             style={{ background: '#f5f0eb', fontFamily: "'DM Sans', sans-serif" }}>
 
//             {/* Menu header */}
//             <div className="flex items-center justify-between px-5 py-4"
//               style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
 
//               <button onClick={() => setMenuOpen(false)}
//                 className="w-9 h-9 flex items-center justify-center rounded-full"
//                 style={{ background: 'rgba(0,0,0,0.07)' }}>
//                 <FaTimes className="text-gray-700 text-base" />
//               </button>
 
//               {/* Logo image in menu header */}
//               <Link to="/" onClick={() => setMenuOpen(false)}>
//                 <img
//                   src="/mobile_logo.png"
//                   alt="Raju's Mobile Accessories"
//                   className="h-18 w-auto object-contain"
//                 />
//               </Link>
 
//               <button onClick={() => { onSearchOpen(); setMenuOpen(false); }}
//                 className="w-9 h-9 flex items-center justify-center rounded-full"
//                 style={{ background: 'rgba(0,0,0,0.07)' }}>
//                 <FaSearch className="text-gray-700 text-sm" />
//               </button>
//             </div>
 
//             {/* Menu body */}
//             <div className="flex-1 overflow-y-auto">
//               {!mobileProductsOpen ? (
//                 <div className="slide-in-left py-4">
//                   {/* Home */}
//                   <button
//                     className="mobile-menu-item w-full text-left px-6 py-3.5 text-slate-800 text-base font-medium border-b"
//                     style={{ borderColor: 'rgba(0,0,0,0.07)' }}
//                     onClick={() => { navigate("/"); setMenuOpen(false); }}
//                   >
//                     Home
//                   </button>
 
//                   {/* Products → */}
//                   <button
//                     className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium border-b flex items-center justify-between"
//                     style={{ borderColor: 'rgba(0,0,0,0.07)', color: '#c0392b' }}
//                     onClick={() => setMobileProductsOpen(true)}
//                   >
//                     <span>Products</span>
//                     <FaChevronRight className="text-xs" />
//                   </button>
 
//                   {/* Contact */}
//                   <button
//                     className="mobile-menu-item w-full text-left px-6 py-3.5 text-slate-800 text-base font-medium border-b"
//                     style={{ borderColor: 'rgba(0,0,0,0.07)' }}
//                     onClick={() => { navigate("/contact"); setMenuOpen(false); }}
//                   >
//                     Contact
//                   </button>
 
//                   {/* Offers */}
//                   <button
//                     className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium border-b flex items-center gap-2.5"
//                     style={{ borderColor: 'rgba(0,0,0,0.07)', color: '#d97706' }}
//                     onClick={() => { navigate("/catalog?sale=true"); setMenuOpen(false); }}
//                   >
//                     <span className="text-lg leading-none">🏷️</span>
//                     <span>Offers</span>
//                   </button>
//                 </div>
//               ) : (
//                 <div className="slide-in-left py-4">
//                   <button
//                     className="flex items-center gap-2 px-6 py-3 text-sm font-medium mb-2"
//                     style={{ color: '#c0392b' }}
//                     onClick={() => setMobileProductsOpen(false)}
//                   >
//                     <FaArrowLeft className="text-xs" />
//                     Back to Menu
//                   </button>
 
//                   <div className="px-6 pb-2">
//                     <p className="text-[10px] tracking-[3px] uppercase text-gray-400 font-semibold">Browse Categories</p>
//                   </div>
 
//                   {navLinks.map((link, i) => (
//                     <button
//                       key={link.cat}
//                       className="mobile-cat-item w-full text-left px-6 py-3.5 text-slate-700 text-base font-medium border-b flex items-center justify-between"
//                       style={{
//                         borderColor: 'rgba(0,0,0,0.07)',
//                         transitionDelay: `${i * 25}ms`
//                       }}
//                       onClick={() => { goToCatalog(link.cat); setMenuOpen(false); }}
//                     >
//                       <span>{link.label}</span>
//                       <FaChevronRight className="text-[10px] text-gray-400" />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
 
//             {/* Bottom: Sign In + Social */}
//             <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
//               <button
//                 className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium flex items-center justify-between"
//                 style={{ color: '#c0392b', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
//                 onClick={() => { setShowAuthModal(true); setMenuOpen(false); }}
//               >
//                 <span>{user ? user.name : "Sign In / Register"}</span>
//                 <MdOutlinePerson className="text-lg" />
//               </button>
//               <div className="px-6 pt-4 pb-5">
//                 <p className="text-[9px] tracking-[3px] uppercase text-gray-400 font-semibold mb-3">Follow Us</p>
//                 <div className="flex items-center gap-3">
//                   <a href="https://instagram.com" target="_blank" rel="noreferrer"
//                     className="group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
//                     style={{ background: 'rgba(0,0,0,0.06)' }}
//                     onMouseEnter={e => e.currentTarget.style.background='linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)'}
//                     onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0.06)'}>
//                     <FaInstagram className="text-sm text-slate-500 group-hover:text-white transition-colors duration-200" />
//                   </a>
//                   <a href="https://youtube.com" target="_blank" rel="noreferrer"
//                     className="group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
//                     style={{ background: 'rgba(0,0,0,0.06)' }}
//                     onMouseEnter={e => e.currentTarget.style.background='#FF0000'}
//                     onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0.06)'}>
//                     <FaYoutube className="text-sm text-slate-500 group-hover:text-white transition-colors duration-200" />
//                   </a>
//                   <a href="https://facebook.com" target="_blank" rel="noreferrer"
//                     className="group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
//                     style={{ background: 'rgba(0,0,0,0.06)' }}
//                     onMouseEnter={e => e.currentTarget.style.background='#1877F2'}
//                     onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0.06)'}>
//                     <FaFacebookF className="text-sm text-slate-500 group-hover:text-white transition-colors duration-200" />
//                   </a>
//                   <a href="mailto:rajusmobile@gmail.com"
//                     className="group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
//                     style={{ background: 'rgba(0,0,0,0.06)' }}
//                     onMouseEnter={e => e.currentTarget.style.background='#0a0f1e'}
//                     onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0.06)'}>
//                     <FaEnvelope className="text-sm text-slate-500 group-hover:text-white transition-colors duration-200" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ══════════════════════════════════════
//             DESKTOP NAVBAR
//         ══════════════════════════════════════ */}
//         <div className="hidden md:block">

//           {/* Top row: logo | search | actions */}
//           <div className="max-w-7xl mx-auto px-6 py-4">
//             <div className="grid grid-cols-3 items-center gap-6">

//               {/* Brand */}
//               <Link to="/" className="group">
//                 <img
//                   src="/mobile_logo.png"
//                   alt="Raju's Mobile Accessories"
//                   className="h-18 bg-[#f5f0eb] w-auto object-contain logo-img-dark transition-transform duration-300 group-hover:scale-105"
//                 />
//               </Link>

// {/* Search */}
// <div className="relative w-full max-w-xl">
//   <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

//   <input
//     type="text"
//     placeholder="Search for products, brands and more"
//     className="
//       w-full
//       bg-white
//       border
//       border-gray-200
//       rounded-xl
//       py-3
//       pl-11
//       pr-4
//       text-gray-700
//       placeholder-gray-400
//       text-sm
//       outline-none
//       shadow-sm
//       hover:shadow-md
//       focus:ring-2
//       focus:ring-cyan-400
//       transition-all
//       cursor-pointer
//     "
//     onFocus={onSearchOpen}
//     readOnly
//   />
// </div>

//               {/* Actions */}
//               <div className="flex justify-end items-center gap-5">

//                 {/* Wishlist */}
//                 <Link to="/wishlist" className="flex items-center gap-2 group">
//                   <div className="relative">
//                     <FaHeart className="text-lg text-gray-400 group-hover:text-pink-400 transition" />
//                     {wishlist.length > 0 && (
//                       <span className="badge bg-pink-500 text-white">{wishlist.length}</span>
//                     )}
//                   </div>
//                   <div>
//                     <div className="text-[9px] text-gray-600 uppercase tracking-widest leading-none mb-0.5">Saved</div>
//                     <div className="text-xs font-semibold text-gray-300 group-hover:text-pink-400 transition leading-none">Wishlist</div>
//                   </div>
//                 </Link>

//                 {/* Cart */}
//                 <Link to="/cart" className="flex items-center gap-2 group">
//                   <div className="relative">
//                     <FaShoppingCart className="text-lg text-gray-400 group-hover:text-cyan-400 transition" />
//                     {cartCount > 0 && (
//                       <span className="badge bg-cyan-400 text-black">{cartCount}</span>
//                     )}
//                   </div>
//                   <div>
//                     <div className="text-[9px] text-gray-600 uppercase tracking-widest leading-none mb-0.5">My</div>
//                     <div className="text-xs font-semibold text-gray-300 group-hover:text-cyan-400 transition leading-none">Cart</div>
//                   </div>
//                 </Link>

// {/* Account */}
// <div className="relative">
//   <button
//     onClick={() => setAccountOpen(!accountOpen)}
//     className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/10 hover:shadow-[0_8px_24px_rgba(34,211,238,0.10)]"
//   >
//     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10">
//       <FaUserCircle className="text-xl text-gray-300 transition-all duration-300 group-hover:text-cyan-400" />
//     </div>

//     <div className="text-left leading-tight">
//       <div className="text-[11px] font-medium text-gray-400 tracking-[0.18em] uppercase transition-colors duration-300 group-hover:text-cyan-300">
//         {user ? "Welcome back" : "My Account"}
//       </div>

//       <div className="mt-0.5 text-sm font-semibold text-white transition-all duration-300 group-hover:text-cyan-200">
//         {user ? user.name.split(" ")[0] : "Sign In"}
//       </div>
//     </div>
//   </button>


//                   {accountOpen && (
//                     <div className="acct-dropdown absolute right-0 top-11 w-52 rounded-2xl overflow-hidden z-50"
//                       style={{ background: '#131b2e', border: '1px solid rgba(6,182,212,0.18)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
//                       {user ? (
//                         <>
//                           <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
//                             <p className="font-semibold text-sm text-white">{user.name}</p>
//                             <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
//                           </div>
//                           <Link to="/account" onClick={() => setAccountOpen(false)}
//                             className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">
//                             My Profile
//                           </Link>
//                           <Link to="/wishlist" onClick={() => setAccountOpen(false)}
//                             className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">
//                             Wishlist
//                           </Link>
//                           <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
//                             <button onClick={() => { logout(); setAccountOpen(false); }}
//                               className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition">
//                               <FaSignOutAlt className="text-xs" />
//                               Sign Out
//                             </button>
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           <button onClick={() => { setShowAuthModal(true); setAccountOpen(false); }}
//                             className="w-full text-left px-4 py-3.5 text-sm font-semibold text-cyan-400 hover:bg-cyan-400/10 transition">
//                             Sign In
//                           </button>
//                           <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
//                             {/* <button onClick={() => { setShowAuthModal(true); setAccountOpen(false); }}
//                               className="w-full text-left px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition">
//                               Create Account
//                             </button> */}
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Category / page nav strip */}
//           <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
//             <div className="max-w-7xl mx-auto px-6">
//               <ul className="flex justify-center items-center gap-12 py-3 text-xs font-semibold uppercase tracking-widest" style={{ scrollbarWidth: 'none' }}>
//                 {!isProductPage ? (
//                   <>
// <li>
//   <button
//     onClick={() => navigate("/")}
//     className={`relative w-[120px] h-8 flex items-center justify-center text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-200
//       ${isActive("/") ? "text-white after:scale-x-100" : "text-gray-300 hover:text-white after:scale-x-0 hover:after:scale-x-100"}
//       after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:bg-cyan-400 after:transition-transform after:duration-300`}
//   >
//     Home
//   </button>
// </li>

// <li>
//   <button
//     onClick={() => navigate("/catalog")}
//     className={`relative w-[120px] h-8 flex items-center justify-center text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-200
//       ${isActive("/catalog") ? "text-white after:scale-x-100" : "text-gray-300 hover:text-white after:scale-x-0 hover:after:scale-x-100"}
//       after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:bg-cyan-400 after:transition-transform after:duration-300`}
//   >
//     Products
//   </button>
// </li>

// <li>
//   <button
//     onClick={() => navigate("/contact")}
//     className={`relative w-[120px] h-8 flex items-center justify-center text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-200
//       ${isActive("/contact") ? "text-white after:scale-x-100" : "text-gray-300 hover:text-white after:scale-x-0 hover:after:scale-x-100"}
//       after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:bg-cyan-400 after:transition-transform after:duration-300`}
//   >
//     Contact
//   </button>
// </li>
// <li>
//   <button
//     onClick={() => navigate("/catalog?sale=true")}
//     className="flex items-center gap-1 px-2 py-2 text-[12px] font-bold uppercase tracking-[0.18em] text-amber-300 hover:text-amber-200 transition-colors"
//   >
//     <img
//       src="/offer.png"
//       alt="Offers"
//       className="w-4 h-4 object-contain"
//     />
//     <span>Offers</span>
//   </button>
// </li>
//                   </>
//                 ) : (
//                   <>
//                     <li className="nav-item flex items-center gap-1.5 px-3 py-1.5 text-cyan-400 rounded-lg mr-2"
//                       onClick={() => navigate("/")}>
//                       <FaArrowLeft className="text-[10px]" />
//                       Back
//                     </li>
//                     <div className="w-px h-4 bg-white/10 mx-1" />
//                     {navLinks.map((link) => (
//                       <li key={link.cat}
//                         className="nav-item px-3 py-1.5 text-gray-400 whitespace-nowrap rounded-lg"
//                         onClick={() => goToCatalog(link.cat)}>
//                         {link.label}
//                       </li>
//                     ))}
//                   </>
//                 )}
//               </ul>
//             </div>
//           </div>

//         </div>
//       </nav>
//     </>
//   );
// }

// export default Navbar;



import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars, FaShoppingCart, FaSearch, FaTimes, FaHeart,
  FaUserCircle, FaSignOutAlt, FaArrowLeft, FaHome,
  FaMobileAlt, FaPhoneAlt, FaChevronRight,
  FaInstagram, FaYoutube, FaFacebookF, FaEnvelope
} from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar({ onSearchOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
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

        /* Logo image – remove white bg on dark navbar */
        .logo-img-dark {
          mix-blend-mode: lighten;
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

          {/* Center: logo image */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img
              src="/mobile_logo.png"
              alt="Raju's Mobile Accessories"
              className="h-12 bg-white w-auto object-contain logo-img-dark"
            />
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
            {/* Always show account icon — logout is in hamburger menu */}
            <button
              onClick={() => user ? navigate("/account") : setShowAuthModal(true)}
              className="text-gray-300 hover:text-cyan-400 transition"
            >
              <FaUserCircle className="text-xl" />
            </button>
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

              {/* Logo image in menu header */}
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <img
                  src="/mobile_logo.png"
                  alt="Raju's Mobile Accessories"
                  className="h-18 w-auto object-contain"
                />
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
                    className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium border-b flex items-center gap-2.5"
                    style={{ borderColor: 'rgba(0,0,0,0.07)', color: '#d97706' }}
                    onClick={() => { navigate("/catalog?sale=true"); setMenuOpen(false); }}
                  >
                    <span className="text-lg leading-none">🏷️</span>
                    <span>Offers</span>
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

            {/* Bottom: Sign In + Social */}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              {!user ? (
                <button
                  className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium flex items-center justify-between"
                  style={{ color: '#c0392b', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
                  onClick={() => { setShowAuthModal(true); setMenuOpen(false); }}
                >
                  <span>Sign In / Register</span>
                  <MdOutlinePerson className="text-lg" />
                </button>
              ) : !logoutConfirm ? (
                <>
                  <button
                    className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium flex items-center justify-between"
                    style={{ color: '#1e293b', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
                    onClick={() => navigate("/account")}
                  >
                    <span>{user.name}</span>
                    <FaUserCircle className="text-gray-400 text-lg" />
                  </button>
                  <button
                    className="mobile-menu-item w-full text-left px-6 py-3.5 text-sm font-medium flex items-center justify-between"
                    style={{ color: '#ef4444', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
                    onClick={() => setLogoutConfirm(true)}
                  >
                    <span>Sign Out</span>
                    <FaSignOutAlt className="text-sm" />
                  </button>
                </>
              ) : (
                <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', background: 'rgba(239,68,68,0.04)' }}>
                  <p className="text-sm font-semibold text-slate-800 mb-3">Sign out of your account?</p>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2 rounded-xl text-sm font-semibold text-white"
                      style={{ background: '#ef4444' }}
                      onClick={() => { logout(); setLogoutConfirm(false); setMenuOpen(false); }}
                    >
                      Yes, Sign Out
                    </button>
                    <button
                      className="flex-1 py-2 rounded-xl text-sm font-semibold text-slate-700"
                      style={{ border: '1.5px solid #e2e8f0', background: 'white' }}
                      onClick={() => setLogoutConfirm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <div className="px-6 pt-4 pb-5">
                <p className="text-[9px] tracking-[3px] uppercase text-gray-400 font-semibold mb-3">Follow Us</p>
                <div className="flex items-center gap-3">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer"
                    className="group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
                    style={{ background: 'rgba(0,0,0,0.06)' }}
                    onMouseEnter={e => e.currentTarget.style.background='linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)'}
                    onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0.06)'}>
                    <FaInstagram className="text-sm text-slate-500 group-hover:text-white transition-colors duration-200" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer"
                    className="group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
                    style={{ background: 'rgba(0,0,0,0.06)' }}
                    onMouseEnter={e => e.currentTarget.style.background='#FF0000'}
                    onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0.06)'}>
                    <FaYoutube className="text-sm text-slate-500 group-hover:text-white transition-colors duration-200" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer"
                    className="group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
                    style={{ background: 'rgba(0,0,0,0.06)' }}
                    onMouseEnter={e => e.currentTarget.style.background='#1877F2'}
                    onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0.06)'}>
                    <FaFacebookF className="text-sm text-slate-500 group-hover:text-white transition-colors duration-200" />
                  </a>
                  <a href="mailto:rajusmobile@gmail.com"
                    className="group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
                    style={{ background: 'rgba(0,0,0,0.06)' }}
                    onMouseEnter={e => e.currentTarget.style.background='#0a0f1e'}
                    onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0.06)'}>
                    <FaEnvelope className="text-sm text-slate-500 group-hover:text-white transition-colors duration-200" />
                  </a>
                </div>
              </div>
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
                <img
                  src="/mobile_logo.png"
                  alt="Raju's Mobile Accessories"
                  className="h-14 bg-white w-auto object-contain logo-img-dark transition-transform duration-300 group-hover:scale-105"
                />
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
                            My Profile
                          </Link>
                          <Link to="/wishlist" onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">
                            Wishlist
                          </Link>
                          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            {!logoutConfirm ? (
                              <button onClick={() => setLogoutConfirm(true)}
                                className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition">
                                <FaSignOutAlt className="text-xs" />
                                Sign Out
                              </button>
                            ) : (
                              <div className="px-4 py-3">
                                <p className="text-xs text-gray-400 mb-2">Confirm sign out?</p>
                                <div className="flex gap-2">
                                  <button onClick={() => { logout(); setAccountOpen(false); setLogoutConfirm(false); }}
                                    className="flex-1 py-1.5 rounded-lg text-xs font-bold text-white"
                                    style={{ background: '#ef4444' }}>
                                    Yes
                                  </button>
                                  <button onClick={() => setLogoutConfirm(false)}
                                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-gray-400"
                                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <button onClick={() => { setShowAuthModal(true); setAccountOpen(false); }}
                            className="w-full text-left px-4 py-3.5 text-sm font-semibold text-cyan-400 hover:bg-cyan-400/10 transition">
                            Sign In
                          </button>
                          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            <button onClick={() => { setShowAuthModal(true); setAccountOpen(false); }}
                              className="w-full text-left px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition">
                              Create Account
                            </button>
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
              <ul className="flex justify-center items-center gap-12 py-3 text-xs font-semibold uppercase tracking-widest" style={{ scrollbarWidth: 'none' }}>
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
<li className="nav-item">
  <button
    onClick={() => navigate("/catalog?sale=true")}
    className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-orange-500 hover:text-orange-600 transition"
  >
    <span>🏷️</span>
    <span>OFFERS</span>
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