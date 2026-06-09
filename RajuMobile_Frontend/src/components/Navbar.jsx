// import { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   FaShoppingCart, FaSearch, FaTimes, FaHeart,
//   FaUserCircle, FaSignOutAlt, FaArrowLeft, FaChevronRight,
//   FaInstagram, FaYoutube, FaFacebookF, FaEnvelope,
// } from "react-icons/fa";
// import { MdOutlinePerson } from "react-icons/md";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";

// function Navbar({ onSearchOpen }) {
//   const [menuOpen,           setMenuOpen]           = useState(false);
//   const [accountOpen,        setAccountOpen]        = useState(false);
//   const [logoutConfirm,      setLogoutConfirm]      = useState(false);
//   const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

//   const { cartCount, wishlist } = useCart();
//   const { user, logout, setShowAuthModal } = useAuth();
//   const navigate  = useNavigate();
//   const location  = useLocation();

//   const isActive = (path) =>
//     path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

//   const isProductPage =
//     location.pathname === "/catalog" ||
//     location.pathname.startsWith("/product");

//   const navLinks = [
//     { label: "All Products",  cat: "All" },
//     { label: "Mobiles",       cat: "Mobiles" },
//     { label: "Cases & Covers",cat: "Cases & Covers" },
//     { label: "Chargers",      cat: "Chargers" },
//     { label: "Earphones",     cat: "Earphones" },
//     { label: "Smart Watches", cat: "Smart Watches" },
//     { label: "Power Banks",   cat: "Power Banks" },
//     { label: "Accessories",   cat: "Accessories" },
//   ];

//   const goToCatalog = (cat) => {
//     navigate(cat === "All" ? "/catalog" : `/catalog?category=${encodeURIComponent(cat)}`);
//     setMenuOpen(false);
//     setMobileProductsOpen(false);
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

//         .navbar-root { font-family: 'DM Sans', sans-serif; }

//         @keyframes marquee { 0%{transform:translateX(100vw)} 100%{transform:translateX(-100%)} }
//         .marquee-text { display:inline-block; animation:marquee 22s linear infinite; white-space:nowrap; }

//         @keyframes fadeSlideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
//         .fade-slide-down { animation:fadeSlideDown 0.22s ease forwards; }
//         .acct-dropdown  { animation:fadeSlideDown 0.18s ease forwards; transform-origin:top right; }

//         @keyframes slideInLeft { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
//         .slide-in-left { animation:slideInLeft 0.28s cubic-bezier(.4,0,.2,1) forwards; }
//         .mobile-menu-overlay { animation:fadeSlideDown 0.22s ease forwards; }

//         /* badge */
//         .badge { position:absolute;top:-7px;right:-8px;min-width:17px;height:17px;border-radius:999px;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 3px; }

//         /* desktop nav items — underline stays when active */
//         .nav-link {
//           position: relative;
//           cursor: pointer;
//           padding: 6px 12px;
//           border-radius: 6px;
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.12em;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0.5);
//           transition: color 0.18s;
//           white-space: nowrap;
//         }
//         .nav-link::after {
//           content: '';
//           position: absolute;
//           bottom: -2px;
//           left: 12px;
//           right: 12px;
//           height: 2px;
//           background: #06b6d4;
//           border-radius: 2px;
//           transform: scaleX(0);
//           transform-origin: left;
//           transition: transform 0.22s cubic-bezier(.4,0,.2,1);
//         }
//         .nav-link:hover { color: #e2e8f0; }
//         .nav-link:hover::after { transform: scaleX(1); }
//         /* ACTIVE — underline always visible */
//         .nav-link.active { color: #fff; }
//         .nav-link.active::after { transform: scaleX(1); }

//         /* services link gets a subtle teal tint when active */
//         .nav-link.services-active { color: #06b6d4; }
//         .nav-link.services-active::after { background: #06b6d4; transform: scaleX(1); }

//         .mobile-menu-item { transition: background 0.15s, padding-left 0.15s; }
//         .mobile-menu-item:hover { background:rgba(0,0,0,0.05); padding-left:28px; }
//         .mobile-cat-item { transition: background 0.13s, padding-left 0.13s; }
//         .mobile-cat-item:hover { background:rgba(0,0,0,0.05); padding-left:30px; }
//       `}</style>

//       <nav className="navbar-root sticky top-0 z-50" style={{ background: "#0a0f1e" }}>

//         {/* ── Announcement bar ── */}
//         <div style={{ background: "linear-gradient(90deg,#0e7490,#1d4ed8,#0e7490)", overflow: "hidden" }}
//           className="py-1.5 text-white text-xs font-medium tracking-wide">
//           <div className="marquee-text px-4">
//             🎉 HOT SUMMER SUPER SALE IS LIVE &nbsp;•&nbsp; Free Shipping All Over India &nbsp;•&nbsp;
//             Cash on Delivery Available &nbsp;•&nbsp; Genuine Products Only &nbsp;•&nbsp; iPhone Fix Available &nbsp;•&nbsp; Free Pickup Upto 12 KM
//           </div>
//         </div>

//         {/* ══════════════════════════════════════
//             MOBILE TOP BAR
//         ══════════════════════════════════════ */}
//         <div className="flex md:hidden items-center justify-between px-4 py-3"
//           style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>

//           {/* Left: hamburger + search */}
//           <div className="flex items-center gap-3">
//             {menuOpen ? (
//               <FaTimes className="text-xl cursor-pointer text-cyan-400" onClick={() => setMenuOpen(false)} />
//             ) : (
//               <button onClick={() => setMenuOpen(true)} className="flex flex-col gap-[5px] justify-center w-8 h-8">
//                 <span className="block h-[2px] w-6 bg-white rounded-full" />
//                 <span className="block h-[2px] w-4 bg-cyan-400 rounded-full" />
//                 <span className="block h-[2px] w-6 bg-white rounded-full" />
//               </button>
//             )}
//             <button onClick={onSearchOpen} className="w-8 h-8 flex items-center justify-center rounded-full"
//               style={{ background: "rgba(6,182,212,0.12)" }}>
//               <FaSearch className="text-cyan-400 text-sm" />
//             </button>
//           </div>

//           {/* Center: logo */}
//           <Link to="/" className="absolute left-1/2 -translate-x-1/2">
//             <img src="/mobile_logo.png" alt="Raju's Mobile" className="h-12 bg-white w-auto object-contain" style={{ mixBlendMode: "lighten" }} />
//           </Link>

//           {/* Right: wishlist, cart, account */}
//           <div className="flex items-center gap-3">
//             <Link to="/wishlist" className="relative">
//               <FaHeart className="text-lg text-gray-300 hover:text-pink-400 transition" />
//               {wishlist.length > 0 && <span className="badge bg-pink-500 text-white">{wishlist.length}</span>}
//             </Link>
//             <Link to="/cart" className="relative">
//               <FaShoppingCart className="text-lg text-gray-300 hover:text-cyan-400 transition" />
//               {cartCount > 0 && <span className="badge bg-cyan-400 text-black">{cartCount}</span>}
//             </Link>
//             <button
//               onClick={() => user ? navigate("/account") : setShowAuthModal(true)}
//               className="text-gray-300 hover:text-cyan-400 transition"
//             >
//               {user ? (
//                 <div className="w-8 h-8 rounded-full bg-cyan-700 flex items-center justify-center text-white text-xs font-bold">
//                   {(user.name || "U")[0].toUpperCase()}
//                 </div>
//               ) : (
//                 <FaUserCircle className="text-xl" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* ══════════════════════════════════════
//             MOBILE FULL-SCREEN MENU
//         ══════════════════════════════════════ */}
//         {menuOpen && (
//           <div className="md:hidden mobile-menu-overlay fixed inset-0 z-[999] flex flex-col"
//             style={{ background: "#f5f0eb" }}>

//             {/* Header */}
//             <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
//               <button onClick={() => setMenuOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: "rgba(0,0,0,0.07)" }}>
//                 <FaTimes className="text-gray-700 text-base" />
//               </button>
//               <Link to="/" onClick={() => setMenuOpen(false)}>
//                 <img src="/mobile_logo.png" alt="Raju's Mobile" className="h-10 w-auto object-contain" />
//               </Link>
//               <button onClick={() => { onSearchOpen(); setMenuOpen(false); }} className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: "rgba(0,0,0,0.07)" }}>
//                 <FaSearch className="text-gray-700 text-sm" />
//               </button>
//             </div>

//             {/* Body */}
//             <div className="flex-1 overflow-y-auto">
//               {!mobileProductsOpen ? (
//                 <div className="slide-in-left py-4">

//                   {/* Active indicator helper */}
//                   {[
//                     { label: "Home",     path: "/",         exact: true },
//                     { label: "Services", path: "/services", exact: false },
//                     { label: "Contact",  path: "/contact",  exact: false },
//                   ].map(({ label, path, exact }) => (
//                     <button
//                       key={path}
//                       className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium border-b flex items-center justify-between"
//                       style={{
//                         borderColor: "rgba(0,0,0,0.07)",
//                         color: (exact ? location.pathname === path : location.pathname.startsWith(path)) ? "#0891b2" : "#1e293b",
//                         fontWeight: (exact ? location.pathname === path : location.pathname.startsWith(path)) ? 700 : 500,
//                       }}
//                       onClick={() => { navigate(path); setMenuOpen(false); }}
//                     >
//                       <span>{label}</span>
//                       {(exact ? location.pathname === path : location.pathname.startsWith(path)) && (
//                         <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
//                       )}
//                     </button>
//                   ))}

//                   {/* Products → */}
//                   <button
//                     className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium border-b flex items-center justify-between"
//                     style={{ borderColor: "rgba(0,0,0,0.07)", color: "#c0392b" }}
//                     onClick={() => setMobileProductsOpen(true)}
//                   >
//                     <span>Products</span><FaChevronRight className="text-xs" />
//                   </button>

//                   {/* Offers */}
//                   <button
//                     className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium border-b flex items-center gap-2.5"
//                     style={{ borderColor: "rgba(0,0,0,0.07)", color: "#d97706" }}
//                     onClick={() => { navigate("/catalog?sale=true"); setMenuOpen(false); }}
//                   >
//                     <span>🏷️</span><span>Offers</span>
//                   </button>

//                   {/* My Account (if logged in) */}
//                   {user && (
//                     <button
//                       className="mobile-menu-item w-full text-left px-6 py-3.5 text-slate-800 text-base font-medium border-b"
//                       style={{ borderColor: "rgba(0,0,0,0.07)" }}
//                       onClick={() => { navigate("/account"); setMenuOpen(false); }}
//                     >
//                       My Account
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="slide-in-left py-4">
//                   <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium mb-2" style={{ color: "#c0392b" }}
//                     onClick={() => setMobileProductsOpen(false)}>
//                     <FaArrowLeft className="text-xs" /> Back to Menu
//                   </button>
//                   <div className="px-6 pb-2">
//                     <p className="text-[10px] tracking-[3px] uppercase text-gray-400 font-semibold">Browse Categories</p>
//                   </div>
//                   {navLinks.map((link, i) => (
//                     <button key={link.cat}
//                       className="mobile-cat-item w-full text-left px-6 py-3.5 text-slate-700 text-base font-medium border-b flex items-center justify-between"
//                       style={{ borderColor: "rgba(0,0,0,0.07)", transitionDelay: `${i * 25}ms` }}
//                       onClick={() => goToCatalog(link.cat)}>
//                       <span>{link.label}</span><FaChevronRight className="text-[10px] text-gray-400" />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Bottom: auth + social */}
//             <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
//               {!user ? (
//                 <button className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium flex items-center justify-between"
//                   style={{ color: "#c0392b", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
//                   onClick={() => { setShowAuthModal(true); setMenuOpen(false); }}>
//                   <span>Sign In / Register</span><MdOutlinePerson className="text-lg" />
//                 </button>
//               ) : !logoutConfirm ? (
//                 <>
//                   <button className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium flex items-center justify-between"
//                     style={{ color: "#1e293b", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
//                     onClick={() => navigate("/account")}>
//                     <span>{user.name}</span><FaUserCircle className="text-gray-400 text-lg" />
//                   </button>
//                   <button className="mobile-menu-item w-full text-left px-6 py-3.5 text-sm font-medium flex items-center justify-between"
//                     style={{ color: "#ef4444", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
//                     onClick={() => setLogoutConfirm(true)}>
//                     <span>Sign Out</span><FaSignOutAlt className="text-sm" />
//                   </button>
//                 </>
//               ) : (
//                 <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", background: "rgba(239,68,68,0.04)" }}>
//                   <p className="text-sm font-semibold text-slate-800 mb-3">Sign out of your account?</p>
//                   <div className="flex gap-2">
//                     <button className="flex-1 py-2 rounded-xl text-sm font-bold text-white" style={{ background: "#ef4444" }}
//                       onClick={() => { logout(); setLogoutConfirm(false); setMenuOpen(false); }}>
//                       Yes, Sign Out
//                     </button>
//                     <button className="flex-1 py-2 rounded-xl text-sm font-semibold text-slate-700" style={{ border: "1.5px solid #e2e8f0", background: "white" }}
//                       onClick={() => setLogoutConfirm(false)}>
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Social */}
//               <div className="px-6 pt-4 pb-5">
//                 <p className="text-[9px] tracking-[3px] uppercase text-gray-400 font-semibold mb-3">Follow Us</p>
//                 <div className="flex items-center gap-3">
//                   {[
//                     { Icon: FaInstagram, href: "https://www.instagram.com/raju_mobiles_knr/", hover: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)" },
//                     { Icon: FaYoutube,   href: "https://youtube.com",   hover: "#FF0000" },
//                     { Icon: FaFacebookF, href: "https://facebook.com",  hover: "#1877F2" },
//                     { Icon: FaEnvelope,  href: "mailto:rajusmobile@gmail.com", hover: "#0a0f1e" },
//                   ].map(({ Icon, href, hover }) => (
//                     <a key={href} href={href} target="_blank" rel="noreferrer"
//                       className="group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
//                       style={{ background: "rgba(0,0,0,0.06)" }}
//                       onMouseEnter={e => { e.currentTarget.style.background = hover; }}
//                       onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.06)"; }}>
//                       <Icon className="text-sm text-slate-500 group-hover:text-white transition-colors duration-200" />
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ══════════════════════════════════════
//             DESKTOP NAVBAR
//         ══════════════════════════════════════ */}
//         <div className="hidden md:block">

//           {/* Top row */}
//           <div className="max-w-7xl mx-auto px-6 py-4">
//             <div className="grid grid-cols-3 items-center gap-6">

//               {/* Logo */}
//               <Link to="/" className="group">
//                 <img src="/mobile_logo.png" alt="Raju's Mobile"
//                   className="h-14 bg-white w-auto object-contain transition-transform duration-300 group-hover:scale-105"
//                   style={{ mixBlendMode: "lighten" }} />
//               </Link>

//               {/* Search */}
//               <div className="flex rounded-xl overflow-hidden transition-all"
//                 style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
//                 <input type="text" placeholder="Search mobiles, cases, chargers..."
//                   className="flex-1 px-4 py-2.5 bg-transparent text-white placeholder-gray-500 text-sm outline-none"
//                   onFocus={onSearchOpen} readOnly />
//                 <button onClick={onSearchOpen} className="px-4 flex items-center justify-center transition"
//                   style={{ background: "rgba(6,182,212,0.85)" }}>
//                   <FaSearch className="text-white text-sm" />
//                 </button>
//               </div>

//               {/* Actions */}
//               <div className="flex justify-end items-center gap-5">
//                 <Link to="/wishlist" className="flex items-center gap-2 group">
//                   <div className="relative">
//                     <FaHeart className="text-lg text-gray-400 group-hover:text-pink-400 transition" />
//                     {wishlist.length > 0 && <span className="badge bg-pink-500 text-white">{wishlist.length}</span>}
//                   </div>
//                   <div>
//                     <div className="text-[9px] text-gray-600 uppercase tracking-widest leading-none mb-0.5">Saved</div>
//                     <div className="text-xs font-semibold text-gray-300 group-hover:text-pink-400 transition leading-none">Wishlist</div>
//                   </div>
//                 </Link>

//                 <Link to="/cart" className="flex items-center gap-2 group">
//                   <div className="relative">
//                     <FaShoppingCart className="text-lg text-gray-400 group-hover:text-cyan-400 transition" />
//                     {cartCount > 0 && <span className="badge bg-cyan-400 text-black">{cartCount}</span>}
//                   </div>
//                   <div>
//                     <div className="text-[9px] text-gray-600 uppercase tracking-widest leading-none mb-0.5">My</div>
//                     <div className="text-xs font-semibold text-gray-300 group-hover:text-cyan-400 transition leading-none">Cart</div>
//                   </div>
//                 </Link>

//                 {/* Account dropdown */}
//                 <div className="relative">
//                   <button onClick={() => setAccountOpen(!accountOpen)} className="flex items-center gap-2 group">
//                     <div className="w-8 h-8 rounded-full flex items-center justify-center"
//                       style={{ background: accountOpen ? "rgba(6,182,212,0.2)" : "rgba(255,255,255,0.07)", border: "1px solid rgba(6,182,212,0.3)", transition: "all 0.15s" }}>
//                       <FaUserCircle className="text-base text-cyan-400" />
//                     </div>
//                     <div>
//                       <div className="text-[9px] text-gray-600 uppercase tracking-widest leading-none mb-0.5">
//                         {user ? "Hello" : "Account"}
//                       </div>
//                       <div className="text-xs font-semibold text-gray-300 group-hover:text-cyan-400 transition leading-none">
//                         {user ? user.name.split(" ")[0] : "Sign In"}
//                       </div>
//                     </div>
//                   </button>

//                   {accountOpen && (
//                     <div className="acct-dropdown absolute right-0 top-11 w-52 rounded-2xl overflow-hidden z-50"
//                       style={{ background: "#131b2e", border: "1px solid rgba(6,182,212,0.18)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
//                       {user ? (
//                         <>
//                           <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
//                             <p className="font-semibold text-sm text-white">{user.name}</p>
//                             <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
//                           </div>
//                           <Link to="/account" onClick={() => setAccountOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">My Profile</Link>
//                           <Link to="/wishlist" onClick={() => setAccountOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">Wishlist</Link>
//                           <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
//                             {!logoutConfirm ? (
//                               <button onClick={() => setLogoutConfirm(true)}
//                                 className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition">
//                                 <FaSignOutAlt className="text-xs" /> Sign Out
//                               </button>
//                             ) : (
//                               <div className="px-4 py-3">
//                                 <p className="text-xs text-gray-400 mb-2">Confirm sign out?</p>
//                                 <div className="flex gap-2">
//                                   <button onClick={() => { logout(); setAccountOpen(false); setLogoutConfirm(false); navigate("/"); }}
//                                     className="flex-1 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: "#ef4444" }}>
//                                     Yes
//                                   </button>
//                                   <button onClick={() => setLogoutConfirm(false)}
//                                     className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-gray-400" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
//                                     Cancel
//                                   </button>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           <button onClick={() => { setShowAuthModal(true); setAccountOpen(false); }}
//                             className="w-full text-left px-4 py-3.5 text-sm font-semibold text-cyan-400 hover:bg-cyan-400/10 transition">
//                             Sign In
//                           </button>
//                           <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
//                             <button onClick={() => { setShowAuthModal(true); setAccountOpen(false); }}
//                               className="w-full text-left px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition">
//                               Create Account
//                             </button>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── Nav strip ── */}
//           <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
//             <div className="max-w-7xl mx-auto px-6">
//               <ul className="flex justify-center items-center gap-1 py-2">

//                 {!isProductPage ? (
//                   <>
//                     {/* Home */}
//                     <li>
//                       <button
//                         onClick={() => navigate("/")}
//                         className={`nav-link ${isActive("/") && !isProductPage ? "active" : ""}`}
//                       >
//                         Home
//                       </button>
//                     </li>

//                     {/* Products */}
//                     <li>
//                       <button
//                         onClick={() => navigate("/catalog")}
//                         className={`nav-link ${isActive("/catalog") ? "active" : ""}`}
//                       >
//                         Products
//                       </button>
//                     </li>

//                     {/* Services ← NEW */}
//                     <li>
//                       <button
//                         onClick={() => navigate("/services")}
//                         className={`nav-link ${isActive("/services") ? "services-active active" : ""}`}
//                       >
//                         Services
//                       </button>
//                     </li>

//                     {/* Contact */}
//                     <li>
//                       <button
//                         onClick={() => navigate("/contact")}
//                         className={`nav-link ${isActive("/contact") ? "active" : ""}`}
//                       >
//                         Contact
//                       </button>
//                     </li>

//                     {/* Offers */}
//                     <li>
//                       <button
//                         onClick={() => navigate("/catalog?sale=true")}
//                         className="nav-link"
//                         style={{ color: "#f59e0b" }}
//                       >
//                         🏷️ Offers
//                       </button>
//                     </li>
//                   </>
//                 ) : (
//                   <>
//                     <li>
//                       <button onClick={() => navigate("/")} className="nav-link" style={{ color: "#06b6d4" }}>
//                         <FaArrowLeft className="inline text-[9px] mr-1" />Back
//                       </button>
//                     </li>
//                     <div className="w-px h-4 bg-white/10 mx-1" />
//                     {navLinks.map((link) => (
//                       <li key={link.cat}>
//                         <button className="nav-link" onClick={() => goToCatalog(link.cat)}>
//                           {link.label}
//                         </button>
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
  FaShoppingCart, FaSearch, FaTimes, FaHeart,
  FaUserCircle, FaSignOutAlt, FaArrowLeft, FaChevronRight,
  FaInstagram, FaYoutube, FaFacebookF, FaEnvelope,
} from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar({ onSearchOpen }) {
  const [menuOpen,           setMenuOpen]           = useState(false);
  const [accountOpen,        setAccountOpen]        = useState(false);
  const [logoutConfirm,      setLogoutConfirm]      = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const { cartCount, wishlist } = useCart();
  const { user, logout, setShowAuthModal } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const isProductPage =
    location.pathname === "/catalog" ||
    location.pathname.startsWith("/product");

  const navLinks = [
    { label: "All Products",  cat: "All" },
    { label: "Mobiles",       cat: "Mobiles" },
    { label: "Cases & Covers",cat: "Cases & Covers" },
    { label: "Chargers",      cat: "Chargers" },
    { label: "Earphones",     cat: "Earphones" },
    { label: "Smart Watches", cat: "Smart Watches" },
    { label: "Power Banks",   cat: "Power Banks" },
    { label: "Accessories",   cat: "Accessories" },
  ];

  const goToCatalog = (cat) => {
    navigate(cat === "All" ? "/catalog" : `/catalog?category=${encodeURIComponent(cat)}`);
    setMenuOpen(false);
    setMobileProductsOpen(false);
  };
console.log(user);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .navbar-root { font-family: 'DM Sans', sans-serif; }

        @keyframes marquee { 0%{transform:translateX(100vw)} 100%{transform:translateX(-100%)} }
        .marquee-text { display:inline-block; animation:marquee 22s linear infinite; white-space:nowrap; }

        @keyframes fadeSlideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .fade-slide-down { animation:fadeSlideDown 0.22s ease forwards; }
        .acct-dropdown  { animation:fadeSlideDown 0.18s ease forwards; transform-origin:top right; }

        @keyframes slideInLeft { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
        .slide-in-left { animation:slideInLeft 0.28s cubic-bezier(.4,0,.2,1) forwards; }
        .mobile-menu-overlay { animation:fadeSlideDown 0.22s ease forwards; }

        /* badge */
        .badge { position:absolute;top:-7px;right:-8px;min-width:17px;height:17px;border-radius:999px;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 3px; }

        /* desktop nav items — underline stays when active */
        .nav-link {
          position: relative;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          transition: color 0.18s;
          white-space: nowrap;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 12px;
          right: 12px;
          height: 2px;
          background: #06b6d4;
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.22s cubic-bezier(.4,0,.2,1);
        }
        .nav-link:hover { color: #e2e8f0; }
        .nav-link:hover::after { transform: scaleX(1); }
        /* ACTIVE — underline always visible */
        .nav-link.active { color: #fff; }
        .nav-link.active::after { transform: scaleX(1); }

        /* services link gets a subtle teal tint when active */
        .nav-link.services-active { color: #06b6d4; }
        .nav-link.services-active::after { background: #06b6d4; transform: scaleX(1); }

        .mobile-menu-item { transition: background 0.15s, padding-left 0.15s; }
        .mobile-menu-item:hover { background:rgba(0,0,0,0.05); padding-left:28px; }
        .mobile-cat-item { transition: background 0.13s, padding-left 0.13s; }
        .mobile-cat-item:hover { background:rgba(0,0,0,0.05); padding-left:30px; }
      `}</style>

      <nav className="navbar-root sticky top-0 z-50" style={{ background: "#0a0f1e" }}>

        {/* ── Announcement bar ── */}
        <div style={{ background: "linear-gradient(90deg,#0e7490,#1d4ed8,#0e7490)", overflow: "hidden" }}
          className="py-1.5 text-white text-xs font-medium tracking-wide">
          <div className="marquee-text px-4">
            🎉 HOT SUMMER SUPER SALE IS LIVE &nbsp;•&nbsp; Free Shipping &nbsp;•&nbsp;
            Cash on Delivery Available &nbsp;•&nbsp; Genuine Products Only &nbsp;•&nbsp; iPhone Fix Available &nbsp;•&nbsp; Free Pickup Upto 12 KM
          </div>
        </div>

        {/* ══════════════════════════════════════
            MOBILE TOP BAR
        ══════════════════════════════════════ */}
        <div className="flex md:hidden items-center justify-between px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>

          {/* Left: hamburger + search */}
          <div className="flex items-center gap-3">
            {menuOpen ? (
              <FaTimes className="text-xl cursor-pointer text-cyan-400" onClick={() => setMenuOpen(false)} />
            ) : (
              <button onClick={() => setMenuOpen(true)} className="flex flex-col gap-[5px] justify-center w-8 h-8">
                <span className="block h-[2px] w-6 bg-white rounded-full" />
                <span className="block h-[2px] w-4 bg-cyan-400 rounded-full" />
                <span className="block h-[2px] w-6 bg-white rounded-full" />
              </button>
            )}
            <button onClick={onSearchOpen} className="w-8 h-8 flex items-center justify-center rounded-full"
              style={{ background: "rgba(6,182,212,0.12)" }}>
              <FaSearch className="text-cyan-400 text-sm" />
            </button>
          </div>

          {/* Center: logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img src="/mobile_logo.png" alt="Raju's Mobile" className="h-12 bg-white w-auto object-contain" style={{ mixBlendMode: "lighten" }} />
          </Link>

          {/* Right: wishlist, cart, account */}
          <div className="flex items-center gap-3">
            <Link to="/wishlist" className="relative">
              <FaHeart className="text-lg text-gray-300 hover:text-pink-400 transition" />
              {wishlist.length > 0 && <span className="badge bg-pink-500 text-white">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-lg text-gray-300 hover:text-cyan-400 transition" />
              {cartCount > 0 && <span className="badge bg-cyan-400 text-black">{cartCount}</span>}
            </Link>
            <button
              onClick={() => user ? navigate("/account") : setShowAuthModal(true)}
              className="text-gray-300 hover:text-cyan-400 transition"
            >
              {user ? (
                <div className="w-8 h-8 rounded-full bg-cyan-700 flex items-center justify-center text-white text-xs font-bold">
                  {(user.name || "U")[0].toUpperCase()}
                </div>
              ) : (
                <FaUserCircle className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════
            MOBILE FULL-SCREEN MENU
        ══════════════════════════════════════ */}
        {menuOpen && (
          <div className="md:hidden mobile-menu-overlay fixed inset-0 z-[999] flex flex-col"
            style={{ background: "#f5f0eb" }}>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
              <button onClick={() => setMenuOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: "rgba(0,0,0,0.07)" }}>
                <FaTimes className="text-gray-700 text-base" />
              </button>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <img src="/mobile_logo.png" alt="Raju's Mobile" className="h-10 w-auto object-contain" />
              </Link>
              <button onClick={() => { onSearchOpen(); setMenuOpen(false); }} className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: "rgba(0,0,0,0.07)" }}>
                <FaSearch className="text-gray-700 text-sm" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {!mobileProductsOpen ? (
                <div className="slide-in-left py-4">

                  {/* Active indicator helper */}
                  {[
                    { label: "Home",     path: "/",         exact: true },
                    { label: "Services", path: "/services", exact: false },
                    { label: "Contact",  path: "/contact",  exact: false },
                  ].map(({ label, path, exact }) => (
                    <button
                      key={path}
                      className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium border-b flex items-center justify-between"
                      style={{
                        borderColor: "rgba(0,0,0,0.07)",
                        color: (exact ? location.pathname === path : location.pathname.startsWith(path)) ? "#0891b2" : "#1e293b",
                        fontWeight: (exact ? location.pathname === path : location.pathname.startsWith(path)) ? 700 : 500,
                      }}
                      onClick={() => { navigate(path); setMenuOpen(false); }}
                    >
                      <span>{label}</span>
                      {(exact ? location.pathname === path : location.pathname.startsWith(path)) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      )}
                    </button>
                  ))}

                  {/* Products → */}
                  <button
                    className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium border-b flex items-center justify-between"
                    style={{ borderColor: "rgba(0,0,0,0.07)", color: "#c0392b" }}
                    onClick={() => setMobileProductsOpen(true)}
                  >
                    <span>Products</span><FaChevronRight className="text-xs" />
                  </button>

                  {/* Offers */}
                  <button
                    className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium border-b flex items-center gap-2.5"
                    style={{ borderColor: "rgba(0,0,0,0.07)", color: "#d97706" }}
                    onClick={() => { navigate("/catalog?sale=true"); setMenuOpen(false); }}
                  >
                    <span>🏷️</span><span>Offers</span>
                  </button>

                  {/* My Account (if logged in) */}
                  {user && (
                    <button
                      className="mobile-menu-item w-full text-left px-6 py-3.5 text-slate-800 text-base font-medium border-b"
                      style={{ borderColor: "rgba(0,0,0,0.07)" }}
                      onClick={() => { navigate("/account"); setMenuOpen(false); }}
                    >
                      My Account
                    </button>
                  )}
                </div>
              ) : (
                <div className="slide-in-left py-4">
                  <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium mb-2" style={{ color: "#c0392b" }}
                    onClick={() => setMobileProductsOpen(false)}>
                    <FaArrowLeft className="text-xs" /> Back to Menu
                  </button>
                  <div className="px-6 pb-2">
                    <p className="text-[10px] tracking-[3px] uppercase text-gray-400 font-semibold">Browse Categories</p>
                  </div>
                  {navLinks.map((link, i) => (
                    <button key={link.cat}
                      className="mobile-cat-item w-full text-left px-6 py-3.5 text-slate-700 text-base font-medium border-b flex items-center justify-between"
                      style={{ borderColor: "rgba(0,0,0,0.07)", transitionDelay: `${i * 25}ms` }}
                      onClick={() => goToCatalog(link.cat)}>
                      <span>{link.label}</span><FaChevronRight className="text-[10px] text-gray-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom: auth + social */}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              {!user ? (
                <button className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium flex items-center justify-between"
                  style={{ color: "#c0392b", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
                  onClick={() => { setShowAuthModal(true); setMenuOpen(false); }}>
                  <span>Sign In / Register</span><MdOutlinePerson className="text-lg" />
                </button>
              ) : !logoutConfirm ? (
                <>
                  <button className="mobile-menu-item w-full text-left px-6 py-3.5 text-base font-medium flex items-center justify-between"
                    style={{ color: "#1e293b", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
                    onClick={() => navigate("/account")}>
                    <span>{user.name}</span><FaUserCircle className="text-gray-400 text-lg" />
                  </button>
                  <button className="mobile-menu-item w-full text-left px-6 py-3.5 text-sm font-medium flex items-center justify-between"
                    style={{ color: "#ef4444", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
                    onClick={() => setLogoutConfirm(true)}>
                    <span>Sign Out</span><FaSignOutAlt className="text-sm" />
                  </button>
                </>
              ) : (
                <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", background: "rgba(239,68,68,0.04)" }}>
                  <p className="text-sm font-semibold text-slate-800 mb-3">Sign out of your account?</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl text-sm font-bold text-white" style={{ background: "#ef4444" }}
                      onClick={() => { logout(); setLogoutConfirm(false); setMenuOpen(false); }}>
                      Yes, Sign Out
                    </button>
                    <button className="flex-1 py-2 rounded-xl text-sm font-semibold text-slate-700" style={{ border: "1.5px solid #e2e8f0", background: "white" }}
                      onClick={() => setLogoutConfirm(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Social */}
              <div className="px-6 pt-4 pb-5">
                <p className="text-[9px] tracking-[3px] uppercase text-gray-400 font-semibold mb-3">Follow Us</p>
                <div className="flex items-center gap-3">
                  {[
                    { Icon: FaInstagram, href: "https://www.instagram.com/raju_mobiles_knr/", hover: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)" },
                    { Icon: FaYoutube,   href: "https://youtube.com",   hover: "#FF0000" },
                    { Icon: FaFacebookF, href: "https://facebook.com",  hover: "#1877F2" },
                    { Icon: FaEnvelope,  href: "mailto:rajusmobile@gmail.com", hover: "#0a0f1e" },
                  ].map(({ Icon, href, hover }) => (
                    <a key={href} href={href} target="_blank" rel="noreferrer"
                      className="group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
                      style={{ background: "rgba(0,0,0,0.06)" }}
                      onMouseEnter={e => { e.currentTarget.style.background = hover; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.06)"; }}>
                      <Icon className="text-sm text-slate-500 group-hover:text-white transition-colors duration-200" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            DESKTOP NAVBAR
        ══════════════════════════════════════ */}
        <div className="hidden md:block">

          {/* Top row */}
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="grid grid-cols-3 items-center gap-6">

              {/* Logo */}
              <Link to="/" className="group">
                <img src="/mobile_logo.png" alt="Raju's Mobile"
                  className="h-14 bg-white w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  style={{ mixBlendMode: "lighten" }} />
              </Link>

              {/* Search */}
              <div className="flex rounded-xl overflow-hidden transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <input type="text" placeholder="Search mobiles, cases, chargers..."
                  className="flex-1 px-4 py-2.5 bg-transparent text-white placeholder-gray-500 text-sm outline-none"
                  onFocus={onSearchOpen} readOnly />
                <button onClick={onSearchOpen} className="px-4 flex items-center justify-center transition"
                  style={{ background: "rgba(6,182,212,0.85)" }}>
                  <FaSearch className="text-white text-sm" />
                </button>
              </div>

              {/* Actions */}
              <div className="flex justify-end items-center gap-5">
                <Link to="/wishlist" className="flex items-center gap-2 group">
                  <div className="relative">
                    <FaHeart className="text-lg text-gray-400 group-hover:text-pink-400 transition" />
                    {wishlist.length > 0 && <span className="badge bg-pink-500 text-white">{wishlist.length}</span>}
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-widest leading-none mb-0.5">Saved</div>
                    <div className="text-xs font-semibold text-gray-300 group-hover:text-pink-400 transition leading-none">Wishlist</div>
                  </div>
                </Link>

                <Link to="/cart" className="flex items-center gap-2 group">
                  <div className="relative">
                    <FaShoppingCart className="text-lg text-gray-400 group-hover:text-cyan-400 transition" />
                    {cartCount > 0 && <span className="badge bg-cyan-400 text-black">{cartCount}</span>}
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-widest leading-none mb-0.5">My</div>
                    <div className="text-xs font-semibold text-gray-300 group-hover:text-cyan-400 transition leading-none">Cart</div>
                  </div>
                </Link>

                {/* Account dropdown */}
                <div className="relative">
                  <button onClick={() => setAccountOpen(!accountOpen)} className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: accountOpen ? "rgba(6,182,212,0.2)" : "rgba(255,255,255,0.07)", border: "1px solid rgba(6,182,212,0.3)", transition: "all 0.15s" }}>
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
                      style={{ background: "#131b2e", border: "1px solid rgba(6,182,212,0.18)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
                      {user ? (
                        <>
                          <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                            <p className="font-semibold text-sm text-white">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                          </div>
                          <Link to="/account" onClick={() => setAccountOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">My Profile</Link>
                          <Link to="/wishlist" onClick={() => setAccountOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">Wishlist</Link>
                          {user?.is_staff && (
  <button
    onClick={() => navigate("/admin-dashboard")}
    className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold"
  >
    Admin Dashboard
  </button>
)}
                          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                            {!logoutConfirm ? (
                              <button onClick={() => setLogoutConfirm(true)}
                                className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition">
                                <FaSignOutAlt className="text-xs" /> Sign Out
                              </button>
                            ) : (
                              <div className="px-4 py-3">
                                <p className="text-xs text-gray-400 mb-2">Confirm sign out?</p>
                                <div className="flex gap-2">
                                  <button onClick={() => { logout(); setAccountOpen(false); setLogoutConfirm(false); navigate("/"); }}
                                    className="flex-1 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: "#ef4444" }}>
                                    Yes
                                  </button>
                                  <button onClick={() => setLogoutConfirm(false)}
                                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-gray-400" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
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
                          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
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

          {/* ── Nav strip ── */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
            <div className="max-w-7xl mx-auto px-6">
              <ul className="flex justify-center items-center gap-3 py-2">

                {!isProductPage ? (
                  <>
                    {/* Home */}
                    <li>
                      <button
                        onClick={() => navigate("/")}
                        className={`nav-link ${isActive("/") && !isProductPage ? "active" : ""}`}
                      >
                        Home
                      </button>
                    </li>

                    {/* Products */}
                    <li>
                      <button
                        onClick={() => navigate("/catalog")}
                        className={`nav-link ${isActive("/catalog") ? "active" : ""}`}
                      >
                        Products
                      </button>
                    </li>

                    {/* Services ← NEW */}
                    <li>
                      <button
                        onClick={() => navigate("/services")}
                        className={`nav-link ${isActive("/services") ? "services-active active" : ""}`}
                      >
                        Services
                      </button>
                    </li>

                    {/* Contact */}
                    <li>
                      <button
                        onClick={() => navigate("/contact")}
                        className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                      >
                        Contact
                      </button>
                    </li>

                    {/* Offers */}
                    <li>
                      <button
                        onClick={() => navigate("/catalog?sale=true")}
                        className="nav-link"
                        style={{ color: "#f59e0b" }}
                      >
                        🏷️ Offers
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button onClick={() => navigate("/")} className="nav-link" style={{ color: "#06b6d4" }}>
                        <FaArrowLeft className="inline text-[9px] mr-1" />Back
                      </button>
                    </li>
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    {navLinks.map((link) => (
                      <li key={link.cat}>
                        <button className="nav-link" onClick={() => goToCatalog(link.cat)}>
                          {link.label}
                        </button>
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
