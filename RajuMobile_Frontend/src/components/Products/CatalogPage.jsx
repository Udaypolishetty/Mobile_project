



// import { useState, useEffect, useRef } from "react";
// import { useSearchParams } from "react-router-dom";
// import { FaSortAmountDown, FaChevronDown, FaCheck, FaTag } from "react-icons/fa";
// import { MdTune, MdClose } from "react-icons/md";
// import ProductCard from "./ProductCard";
// import AnimatedSection from "../AnimatedSection";
// import OurService from "../HomeFiles/OurService";

// const SORT_OPTIONS = [
//   { label: "Relevance",          value: "relevance" },
//   { label: "A → Z",             value: "az" },
//   { label: "Z → A",             value: "za" },
//   { label: "Price: Low to High", value: "price_asc" },
//   { label: "Price: High to Low", value: "price_desc" },
//   { label: "Best Rated",         value: "rating" },
// ];

// const PRICE_RANGES = [
//   { label: "All Prices",          max: 50000, min: 0 },
//   { label: "Under ₹500",          max: 500,   min: 0 },
//   { label: "₹500 – ₹1,000",      max: 1000,  min: 500 },
//   { label: "₹1,000 – ₹5,000",    max: 5000,  min: 1000 },
//   { label: "₹5,000 – ₹15,000",   max: 15000, min: 5000 },
//   { label: "₹15,000 – ₹30,000",  max: 30000, min: 15000 },
//   { label: "Above ₹30,000",       max: 50000, min: 30000 },
// ];

// const categories = [
//   "All", "Mobiles", "Earphones", "Chargers",
//   "Cases & Covers", "Smart Watches", "Power Banks", "Accessories",
// ];

// function FilterSection({ title, children, defaultOpen = true }) {
//   const [open, setOpen] = useState(defaultOpen);
//   return (
//     <div style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
//       <button
//         className="w-full flex items-center justify-between px-5 py-4 text-left"
//         onClick={() => setOpen(!open)}
//       >
//         <span className="text-xs font-bold uppercase tracking-[2px] text-slate-600">{title}</span>
//         <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
//       </button>
//       <div style={{ maxHeight: open ? "400px" : "0", overflow: "hidden", transition: "max-height 0.3s cubic-bezier(.4,0,.2,1)" }}>
//         <div className="px-5 pb-4">{children}</div>
//       </div>
//     </div>
//   );
// }

// function CatalogPage() {
//   const [products, setProducts]               = useState([]);
//   const [searchParams, setSearchParams]       = useSearchParams();
//   const [selectedCat, setSelectedCat]         = useState("All");
//   const [sort, setSort]                       = useState("relevance");
//   const [saleOnly, setSaleOnly]               = useState(false);
//   const [priceRange, setPriceRange]           = useState({ min: 0, max: 50000 });
//   const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [activeSortOpen, setActiveSortOpen]   = useState(false);
//   const [activeFiltersCount, setActiveFiltersCount] = useState(0);
//   const sortRef = useRef(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/products/");
//         const data = await response.json();
//         setProducts(data.map((item) => ({
//   ...item,

//   inStock: item.stock > 0,

//   price: Number(item.price),

//   rating: Number(item.rating),

//   originalPrice: item.original_price
//     ? Number(item.original_price)
//     : null,

//   badge: item.badge || "",
// })))
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const cat = searchParams.get("category");
//     setSelectedCat(cat || "All");
//   }, [searchParams]);

//   useEffect(() => {
//     let count = 0;
//     if (selectedCat !== "All") count++;
//     if (saleOnly) count++;
//     if (priceRange.max !== 50000 || priceRange.min !== 0) count++;
//     setActiveFiltersCount(count);
//   }, [selectedCat, saleOnly, priceRange]);

//   // Close sort dropdown on outside click
//   useEffect(() => {
//     const handler = (e) => {
//       if (sortRef.current && !sortRef.current.contains(e.target)) setActiveSortOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // Lock body scroll when drawer open
//   useEffect(() => {
//     document.body.style.overflow = mobileFilterOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [mobileFilterOpen]);

//   const filtered = products
//     .filter((p) => selectedCat === "All" || p.category === selectedCat)
//     .filter((p) => !saleOnly || p.badge === "Sale" || p.badge === "40% Off" || p.originalPrice && p.originalPrice > p.price)
//     .filter((p) => Number(p.price) >= priceRange.min && Number(p.price) <= priceRange.max)
//     .sort((a, b) => {
//       if (sort === "az")         return a.name.localeCompare(b.name);
//       if (sort === "za")         return b.name.localeCompare(a.name);
//       if (sort === "price_asc")  return Number(a.price) - Number(b.price);
//       if (sort === "price_desc") return Number(b.price) - Number(a.price);
//       if (sort === "rating")     return Number(b.rating) - Number(a.rating);
//       return 0;
//     });

//   const setCategory = (cat) => {
//     setSelectedCat(cat);
//     setSaleOnly(false);
//     setSearchParams(cat !== "All" ? { category: cat } : {});
//   };

//   const clearAllFilters = () => {
//     setSelectedCat("All");
//     setSaleOnly(false);
//     setPriceRange({ min: 0, max: 50000 });
//     setSort("relevance");
//     setSearchParams({});
//   };

//   const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label || "Relevance";

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
//         .catalog-root { font-family: 'DM Sans', sans-serif; }

//         .cat-pill {
//           display: flex; align-items: center; justify-content: space-between;
//           width: 100%; padding: 8px 12px; border-radius: 8px;
//           font-size: 13px; font-weight: 500; color: #475569;
//           cursor: pointer; transition: all 0.15s; text-align: left;
//           background: transparent; border: none;
//         }
//         .cat-pill:hover { background: rgba(6,182,212,0.07); color: #0891b2; }
//         .cat-pill.active { background: rgba(6,182,212,0.12); color: #0891b2; font-weight: 600; }

//         .price-chip {
//           padding: 7px 12px; border-radius: 8px; font-size: 12px;
//           font-weight: 500; border: 1.5px solid #e2e8f0; color: #64748b;
//           cursor: pointer; transition: all 0.15s; background: white;
//           width: 100%; text-align: left; margin-bottom: 6px;
//           display: flex; align-items: center; justify-content: space-between;
//         }
//         .price-chip:hover { border-color: #06b6d4; color: #0891b2; background: rgba(6,182,212,0.04); }
//         .price-chip.active { border-color: #06b6d4; background: rgba(6,182,212,0.1); color: #0891b2; font-weight: 600; }

//         .sort-pill {
//           padding: 8px 14px; border-radius: 20px; font-size: 13px;
//           font-weight: 500; border: 1.5px solid #e2e8f0; color: #64748b;
//           cursor: pointer; white-space: nowrap; transition: all 0.15s; background: white;
//         }
//         .sort-pill.active { border-color: #0891b2; background: rgba(6,182,212,0.1); color: #0891b2; font-weight: 600; }
//         .sort-pill:hover { border-color: #06b6d4; }

//         .filter-tag {
//           display: inline-flex; align-items: center; gap: 5px;
//           padding: 4px 10px; background: rgba(6,182,212,0.1);
//           border: 1px solid rgba(6,182,212,0.3); color: #0891b2;
//           border-radius: 20px; font-size: 12px; font-weight: 500;
//         }

//         @keyframes slideUp {
//           from { transform: translateY(100%); opacity: 0; }
//           to   { transform: translateY(0);    opacity: 1; }
//         }
//         .slide-up { animation: slideUp 0.3s cubic-bezier(.4,0,.2,1) forwards; }

//         @keyframes fadeIn {
//           from { opacity: 0; } to { opacity: 1; }
//         }
//         .backdrop { animation: fadeIn 0.2s ease forwards; }

//         @keyframes dropIn {
//           from { opacity: 0; transform: translateY(-6px) scale(0.97); }
//           to   { opacity: 1; transform: translateY(0)    scale(1); }
//         }
//         .drop-in { animation: dropIn 0.18s cubic-bezier(.4,0,.2,1) forwards; }

//         .sidebar-card { background: white; border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); overflow: hidden; }

//         .grid-item { animation: fadeInUp 0.35s ease both; }
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }

//         .toggle-track {
//           width: 38px; height: 22px; border-radius: 999px;
//           transition: background 0.2s; position: relative; cursor: pointer; flex-shrink: 0;
//         }
//         .toggle-thumb {
//           position: absolute; top: 3px; left: 3px;
//           width: 16px; height: 16px; border-radius: 999px;
//           background: white; transition: transform 0.2s cubic-bezier(.4,0,.2,1);
//           box-shadow: 0 1px 3px rgba(0,0,0,0.2);
//         }
//         .toggle-track.on  { background: #06b6d4; }
//         .toggle-track.off { background: #cbd5e1; }
//         .toggle-track.on .toggle-thumb { transform: translateX(16px); }

//         .sort-dropdown-btn {
//           display: flex; align-items: center; gap: 8px; padding: 8px 14px;
//           border-radius: 10px; border: 1.5px solid #e2e8f0; background: white;
//           font-size: 13px; font-weight: 500; color: #374151;
//           cursor: pointer; transition: border-color 0.15s; white-space: nowrap;
//         }
//         .sort-dropdown-btn:hover, .sort-dropdown-btn.open { border-color: #06b6d4; }

//         .sort-option {
//           padding: 10px 14px; font-size: 13px; color: #475569;
//           cursor: pointer; transition: background 0.12s;
//           display: flex; align-items: center; justify-content: space-between; gap: 8px;
//         }
//         .sort-option:hover { background: #f8fafc; }
//         .sort-option.selected { color: #0891b2; font-weight: 600; background: rgba(6,182,212,0.06); }

//         .mob-filter-section { border-bottom: 1px solid #f1f5f9; padding: 18px 0; }
//         .mob-filter-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; margin-bottom: 12px; }
//       `}</style>

//       <div className="catalog-root min-h-screen" style={{ background: "#f8fafc" }}>
//         <div className="max-w-7xl mx-auto px-4 py-8">

//           {/* Page heading */}
//           <AnimatedSection direction="up">
//             <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-800 leading-none">
//                   {saleOnly ? "🔥 Sale Products" : selectedCat === "All" ? "All Products" : selectedCat}
//                 </h1>
//                 <p className="text-sm text-gray-400 mt-1">{filtered.length} items found</p>
//               </div>
//               {activeFiltersCount > 0 && (
//                 <div className="flex flex-wrap items-center gap-2">
//                   {selectedCat !== "All" && (
//                     <span className="filter-tag">
//                       {selectedCat}
//                       <button onClick={() => setCategory("All")}><MdClose /></button>
//                     </span>
//                   )}
//                   {saleOnly && (
//                     <span className="filter-tag">
//                       On Sale
//                       <button onClick={() => setSaleOnly(false)}><MdClose /></button>
//                     </span>
//                   )}
//                   {(priceRange.max !== 50000 || priceRange.min !== 0) && (
//                     <span className="filter-tag">
//                       {PRICE_RANGES.find(p => p.min === priceRange.min && p.max === priceRange.max)?.label || "Custom Price"}
//                       <button onClick={() => setPriceRange({ min: 0, max: 50000 })}><MdClose /></button>
//                     </span>
//                   )}
//                   <button onClick={clearAllFilters} className="text-xs text-red-400 hover:text-red-600 font-medium transition underline underline-offset-2">
//                     Clear all
//                   </button>
//                 </div>
//               )}
//             </div>
//           </AnimatedSection>

//           <div className="flex gap-6">

//             {/* ── DESKTOP SIDEBAR ── */}
//             <aside className="hidden md:flex flex-col gap-4 w-56 flex-shrink-0">
//               {/* <div className="sidebar-card">
//                 <FilterSection title="Categories">
//                   {categories.map((cat) => (
//                     <button key={cat} className={`cat-pill ${selectedCat === cat ? "active" : ""}`} onClick={() => setCategory(cat)}>
//                       <span>{cat}</span>
//                       {selectedCat === cat && <FaCheck className="text-[10px] text-cyan-500" />}
//                     </button>
//                   ))}
//                 </FilterSection>
//               </div> */}

//               <div className="sidebar-card">
//                 <FilterSection title="Price Range">
//                   {PRICE_RANGES.map((range) => (
//                     <button
//                       key={range.label}
//                       className={`price-chip ${priceRange.min === range.min && priceRange.max === range.max ? "active" : ""}`}
//                       onClick={() => setPriceRange({ min: range.min, max: range.max })}
//                     >
//                       <span>{range.label}</span>
//                       {priceRange.min === range.min && priceRange.max === range.max && <FaCheck className="text-[10px] text-cyan-500" />}
//                     </button>
//                   ))}
//                 </FilterSection>
//               </div>

//               <div className="sidebar-card">
//                 <FilterSection title="Availability">
//                   <div className="flex items-center justify-between py-1">
//                     <div>
//                       <p className="text-sm font-medium text-slate-700">Sale Items Only</p>
//                       <p className="text-xs text-gray-400 mt-0.5">Special discounts</p>
//                     </div>
//                     <div className={`toggle-track ${saleOnly ? "on" : "off"}`} onClick={() => setSaleOnly(!saleOnly)}>
//                       <div className="toggle-thumb" />
//                     </div>
//                   </div>
//                 </FilterSection>
//               </div>

//               {activeFiltersCount > 0 && (
//                 <button
//                   onClick={clearAllFilters}
//                   className="w-full py-2.5 rounded-xl text-sm font-semibold text-red-500 transition"
//                   style={{ border: "1.5px solid #fecaca", background: "#fff5f5" }}
//                 >
//                   Clear All Filters
//                 </button>
//               )}
//             </aside>

//             {/* ── MAIN CONTENT ── */}
//             <div className="flex-1 min-w-0">

//               {/* Desktop top bar */}
//               <div className="hidden md:flex items-center justify-between mb-5">
//                 <p className="text-sm text-gray-500 font-medium">
//                   Showing <span className="text-slate-700 font-semibold">{filtered.length}</span> products
//                 </p>
//                 <div className="relative" ref={sortRef}>
//                   <button
//                     className={`sort-dropdown-btn ${activeSortOpen ? "open" : ""}`}
//                     onClick={() => setActiveSortOpen(!activeSortOpen)}
//                   >
//                     <FaSortAmountDown className="text-gray-400 text-xs" />
//                     <span>Sort: <span className="text-cyan-600">{currentSortLabel}</span></span>
//                     <FaChevronDown className={`text-gray-400 text-[10px] transition-transform duration-200 ${activeSortOpen ? "rotate-180" : ""}`} />
//                   </button>
//                   {activeSortOpen && (
//                     <div
//                       className="drop-in absolute right-0 top-11 z-50 rounded-xl overflow-hidden"
//                       style={{ background: "white", border: "1px solid #e2e8f0", boxShadow: "0 10px 40px rgba(0,0,0,0.12)", minWidth: "200px" }}
//                     >
//                       {SORT_OPTIONS.map((o) => (
//                         <div
//                           key={o.value}
//                           className={`sort-option ${sort === o.value ? "selected" : ""}`}
//                           onClick={() => { setSort(o.value); setActiveSortOpen(false); }}
//                         >
//                           <span>{o.label}</span>
//                           {sort === o.value && <FaCheck className="text-[10px] text-cyan-500" />}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Mobile top bar */}
//               <div className="md:hidden flex items-center justify-between mb-4 gap-3">
//                 <button
//                   onClick={() => setMobileFilterOpen(true)}
//                   className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition"
//                   style={{
//                     background: activeFiltersCount > 0 ? "rgba(6,182,212,0.1)" : "white",
//                     border: activeFiltersCount > 0 ? "1.5px solid #06b6d4" : "1.5px solid #e2e8f0",
//                     color: activeFiltersCount > 0 ? "#0891b2" : "#374151",
//                   }}
//                 >
//                   <MdTune className="text-base" />
//                   <span>Filter & Sort</span>
//                   {activeFiltersCount > 0 && (
//                     <span className="w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] font-bold flex items-center justify-center">
//                       {activeFiltersCount}
//                     </span>
//                   )}
//                 </button>
//                 <p className="text-sm text-gray-400">{filtered.length} products</p>
//               </div>

//               {/* Product grid */}
//               {filtered.length === 0 ? (
//                 <div className="text-center py-20 text-gray-400">
//                   <p className="text-5xl mb-4">📦</p>
//                   <p className="font-semibold text-lg text-slate-600">No products found</p>
//                   <p className="text-sm mt-1">Try adjusting your filters</p>
//                   <button onClick={clearAllFilters} className="mt-4 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition" style={{ background: "#06b6d4" }}>
//                     Clear Filters
//                   </button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4">
//                   {filtered.map((p, i) => (
//                     <div key={p.id} className="grid-item" style={{ animationDelay: `${Math.min(i * 40, 300)}ms` }}>
//                       <ProductCard product={p} />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ── WHY BUY + SUBSCRIBE — outside the grid, full width ── */}
// <OurService />
//       </div>

//       {/* ═══════════════════════════════════════════
//           MOBILE FILTER DRAWER — rendered in a portal
//           outside all page content so nothing bleeds in
//       ═══════════════════════════════════════════ */}
//       {mobileFilterOpen && (
//         <>
//           {/* Backdrop */}
//           <div
//             className="backdrop fixed inset-0 z-[9998] md:hidden"
//             style={{ background: "rgba(0,0,0,0.45)" }}
//             onClick={() => setMobileFilterOpen(false)}
//           />

//           {/* Drawer — fixed to viewport bottom, never wraps page content */}
//           <div
//             className="slide-up fixed bottom-0 left-0 right-0 z-[9999] md:hidden flex flex-col"
//             style={{
//               background: "white",
//               borderRadius: "20px 20px 0 0",
//               maxHeight: "88vh",
//               boxShadow: "0 -10px 50px rgba(0,0,0,0.18)",
//             }}
//           >
//             {/* Drag handle */}
//             <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
//               <div className="w-10 h-1 rounded-full bg-gray-200" />
//             </div>

//             {/* Header */}
//             <div className="flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ borderBottom: "1px solid #f1f5f9" }}>
//               <div>
//                 <h2 className="text-lg font-bold text-slate-800">Filter & Sort</h2>
//                 <p className="text-xs text-gray-400">{filtered.length} products match</p>
//               </div>
//               <button
//                 onClick={() => setMobileFilterOpen(false)}
//                 className="w-9 h-9 flex items-center justify-center rounded-full"
//                 style={{ background: "#f1f5f9" }}
//               >
//                 <MdClose className="text-gray-600 text-lg" />
//               </button>
//             </div>

//             {/* ── Scrollable body — only this overflows, not the whole drawer ── */}
//             <div className="flex-1 overflow-y-auto overscroll-contain px-5">

//               {/* Sort */}
//               <div className="mob-filter-section">
//                 <p className="mob-filter-label">Sort By</p>
//                 <div className="flex flex-wrap gap-2">
//                   {SORT_OPTIONS.map((o) => (
//                     <button key={o.value} className={`sort-pill ${sort === o.value ? "active" : ""}`} onClick={() => setSort(o.value)}>
//                       {o.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Category */}
//               <div className="mob-filter-section">
//                 <p className="mob-filter-label">Category</p>
//                 <div className="grid grid-cols-2 gap-2">
//                   {categories.map((cat) => (
//                     <button
//                       key={cat}
//                       className="text-left px-3 py-2.5 rounded-xl text-sm font-medium transition"
//                       style={{
//                         border: selectedCat === cat ? "1.5px solid #06b6d4" : "1.5px solid #e2e8f0",
//                         background: selectedCat === cat ? "rgba(6,182,212,0.08)" : "white",
//                         color: selectedCat === cat ? "#0891b2" : "#475569",
//                       }}
//                       onClick={() => setCategory(cat)}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Range */}
//               <div className="mob-filter-section">
//                 <p className="mob-filter-label">Price Range</p>
//                 <div className="flex flex-col gap-2">
//                   {PRICE_RANGES.map((range) => {
//                     const isActive = priceRange.min === range.min && priceRange.max === range.max;
//                     return (
//                       <button
//                         key={range.label}
//                         className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition"
//                         style={{
//                           border: isActive ? "1.5px solid #06b6d4" : "1.5px solid #e2e8f0",
//                           background: isActive ? "rgba(6,182,212,0.08)" : "white",
//                           color: isActive ? "#0891b2" : "#475569",
//                         }}
//                         onClick={() => setPriceRange({ min: range.min, max: range.max })}
//                       >
//                         <span>{range.label}</span>
//                         {isActive && <FaCheck className="text-cyan-500 text-xs" />}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Availability */}
//               <div className="mob-filter-section">
//                 <p className="mob-filter-label">Availability</p>
//                 <div
//                   className="flex items-center justify-between px-4 py-3 rounded-xl transition cursor-pointer"
//                   style={{ border: "1.5px solid #e2e8f0", background: saleOnly ? "rgba(6,182,212,0.06)" : "white" }}
//                   onClick={() => setSaleOnly(!saleOnly)}
//                 >
//                   <div className="flex items-center gap-2">
//                     <FaTag className="text-cyan-500 text-sm" />
//                     <div>
//                       <p className="text-sm font-medium text-slate-700">Sale Items Only</p>
//                       <p className="text-xs text-gray-400">Special discounts & offers</p>
//                     </div>
//                   </div>
//                   <div className={`toggle-track ${saleOnly ? "on" : "off"}`}>
//                     <div className="toggle-thumb" />
//                   </div>
//                 </div>
//               </div>

//               <div className="pb-6" />
//             </div>

//             {/* Footer buttons — always visible at bottom of drawer */}
//             <div className="flex-shrink-0 px-5 py-4 flex gap-3" style={{ borderTop: "1px solid #f1f5f9" }}>
//               <button
//                 className="flex-1 py-3 rounded-xl text-sm font-semibold text-slate-600 transition"
//                 style={{ border: "1.5px solid #e2e8f0", background: "white" }}
//                 onClick={clearAllFilters}
//               >
//                 Clear All
//               </button>
//               <button
//                 className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition"
//                 style={{ background: "linear-gradient(135deg,#06b6d4,#0891b2)" }}
//                 onClick={() => setMobileFilterOpen(false)}
//               >
//                 Show {filtered.length} Products
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// export default CatalogPage;








import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSortAmountDown, FaChevronDown, FaCheck, FaTag, FaSync } from "react-icons/fa";
import { MdTune, MdClose } from "react-icons/md";
import ProductCard from "./ProductCard";
import AnimatedSection from "../AnimatedSection";
import OurService from "../HomeFiles/OurService";

const API = "http://127.0.0.1:8000";

const SORT_OPTIONS = [
  { label: "Relevance",          value: "relevance" },
  { label: "A to Z",             value: "az" },
  { label: "Z to A",             value: "za" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Best Rated",         value: "rating" },
];

const PRICE_RANGES = [
  { label: "All Prices",         max: 50000, min: 0 },
  { label: "Under Rs.500",       max: 500,   min: 0 },
  { label: "Rs.500 - Rs.1,000",  max: 1000,  min: 500 },
  { label: "Rs.1,000 - Rs.5,000",max: 5000,  min: 1000 },
  { label: "Rs.5,000 - Rs.15,000",max:15000, min: 5000 },
  { label: "Rs.15,000 - Rs.30,000",max:30000,min: 15000 },
  { label: "Above Rs.30,000",    max: 50000, min: 30000 },
];

const categories = [
  "All","Mobiles","Earphones","Chargers",
  "Cases & Covers","Smart Watches","Power Banks","Accessories",
];

/* ── Skeleton card ── */
function SkeletonCard() {
  return (
    <div style={{
      background: "white", borderRadius: "16px",
      border: "1px solid #f0f0f0", overflow: "hidden",
    }}>
      <div style={{ aspectRatio: "1/0.7", background: "#f1f5f9", position: "relative", overflow: "hidden" }}>
        <div className="shimmer-overlay" />
      </div>
      <div style={{ padding: "12px 14px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ height: "10px", width: "40%", borderRadius: "6px", background: "#f1f5f9", position: "relative", overflow: "hidden" }}><div className="shimmer-overlay" /></div>
        <div style={{ height: "14px", width: "80%", borderRadius: "6px", background: "#f1f5f9", position: "relative", overflow: "hidden" }}><div className="shimmer-overlay" /></div>
        <div style={{ height: "14px", width: "60%", borderRadius: "6px", background: "#f1f5f9", position: "relative", overflow: "hidden" }}><div className="shimmer-overlay" /></div>
        <div style={{ height: "20px", width: "45%", borderRadius: "6px", background: "#f1f5f9", marginTop: "4px", position: "relative", overflow: "hidden" }}><div className="shimmer-overlay" /></div>
        <div style={{ height: "34px", width: "100%", borderRadius: "10px", background: "#f1f5f9", marginTop: "4px", position: "relative", overflow: "hidden" }}><div className="shimmer-overlay" /></div>
      </div>
    </div>
  );
}

/* ── Default placeholder image ── */
function ProductCardWithFallback({ product }) {
  return <ProductCard product={product} />;
}

/* ── Filter section accordion ── */
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-xs font-bold uppercase tracking-[2px] text-slate-600">{title}</span>
        <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div style={{ maxHeight: open ? "400px" : "0", overflow: "hidden", transition: "max-height 0.3s cubic-bezier(.4,0,.2,1)" }}>
        <div className="px-5 pb-4">{children}</div>
      </div>
    </div>
  );
}

/* ── Main component ── */
function CatalogPage() {
  const [products, setProducts]         = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCat, setSelectedCat]   = useState("All");
  const [sort, setSort]                 = useState("relevance");
  const [saleOnly, setSaleOnly]         = useState(false);
  const [priceRange, setPriceRange]     = useState({ min: 0, max: 50000 });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeSortOpen, setActiveSortOpen]     = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Loading states
  const [initialLoading, setInitialLoading] = useState(true);  // first load
  const [refreshing, setRefreshing]         = useState(false);  // manual refresh
  const [lastUpdated, setLastUpdated]       = useState(null);

  const sortRef = useRef(null);

  // ── Fetch products ──────────────────────────────────────────────
  const fetchProducts = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res  = await fetch(`${API}/api/products/`);
      const data = await res.json();
      setProducts(data.map((item) => ({
        ...item,
        inStock:       item.stock > 0,
        price:         Number(item.price),
        rating:        Number(item.rating),
        originalPrice: item.original_price ? Number(item.original_price) : null,
        badge:         item.badge || "",
        images:        item.images || [],
      })));
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setInitialLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchProducts(false); }, [fetchProducts]);

  // ── Sync category from URL ──────────────────────────────────────
  useEffect(() => {
    const cat = searchParams.get("category");
    setSelectedCat(cat || "All");
  }, [searchParams]);

  // ── Active filter count ──────────────────────────────────────────
  useEffect(() => {
    let count = 0;
    if (selectedCat !== "All") count++;
    if (saleOnly) count++;
    if (priceRange.max !== 50000 || priceRange.min !== 0) count++;
    setActiveFiltersCount(count);
  }, [selectedCat, saleOnly, priceRange]);

  // ── Close sort dropdown outside click ───────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setActiveSortOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Lock body scroll when drawer open ───────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileFilterOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileFilterOpen]);

  // ── Filter + sort ────────────────────────────────────────────────
  const filtered = products
    .filter((p) => selectedCat === "All" || p.category === selectedCat)
    .filter((p) => !saleOnly || p.badge === "Sale" || p.badge === "40% Off" || (p.originalPrice && p.originalPrice > p.price))
    .filter((p) => Number(p.price) >= priceRange.min && Number(p.price) <= priceRange.max)
    .sort((a, b) => {
      if (sort === "az")          return a.name.localeCompare(b.name);
      if (sort === "za")          return b.name.localeCompare(a.name);
      if (sort === "price_asc")   return Number(a.price) - Number(b.price);
      if (sort === "price_desc")  return Number(b.price) - Number(a.price);
      if (sort === "rating")      return Number(b.rating) - Number(a.rating);
      return 0;
    });

  const setCategory = (cat) => {
    setSelectedCat(cat);
    setSaleOnly(false);
    setSearchParams(cat !== "All" ? { category: cat } : {});
  };

  const clearAllFilters = () => {
    setSelectedCat("All");
    setSaleOnly(false);
    setPriceRange({ min: 0, max: 50000 });
    setSort("relevance");
    setSearchParams({});
  };

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label || "Relevance";

  const fmtTime = (d) => d?.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .catalog-root { font-family: 'DM Sans', sans-serif; }

        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shimmer-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%);
          animation: shimmer 1.4s infinite;
        }

        .cat-pill {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 8px 12px; border-radius: 8px;
          font-size: 13px; font-weight: 500; color: #475569;
          cursor: pointer; transition: all 0.15s; text-align: left;
          background: transparent; border: none;
        }
        .cat-pill:hover  { background: rgba(6,182,212,0.07); color: #0891b2; }
        .cat-pill.active { background: rgba(6,182,212,0.12); color: #0891b2; font-weight: 600; }

        .price-chip {
          padding: 7px 12px; border-radius: 8px; font-size: 12px;
          font-weight: 500; border: 1.5px solid #e2e8f0; color: #64748b;
          cursor: pointer; transition: all 0.15s; background: white;
          width: 100%; text-align: left; margin-bottom: 6px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .price-chip:hover  { border-color: #06b6d4; color: #0891b2; background: rgba(6,182,212,0.04); }
        .price-chip.active { border-color: #06b6d4; background: rgba(6,182,212,0.1); color: #0891b2; font-weight: 600; }

        .sort-pill {
          padding: 8px 14px; border-radius: 20px; font-size: 13px;
          font-weight: 500; border: 1.5px solid #e2e8f0; color: #64748b;
          cursor: pointer; white-space: nowrap; transition: all 0.15s; background: white;
        }
        .sort-pill.active { border-color: #0891b2; background: rgba(6,182,212,0.1); color: #0891b2; font-weight: 600; }
        .sort-pill:hover  { border-color: #06b6d4; }

        .filter-tag {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 10px; background: rgba(6,182,212,0.1);
          border: 1px solid rgba(6,182,212,0.3); color: #0891b2;
          border-radius: 20px; font-size: 12px; font-weight: 500;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .slide-up  { animation: slideUp 0.3s cubic-bezier(.4,0,.2,1) forwards; }

        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        .backdrop { animation: fadeIn 0.2s ease forwards; }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .drop-in { animation: dropIn 0.18s cubic-bezier(.4,0,.2,1) forwards; }

        .sidebar-card { background: white; border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); overflow: hidden; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .grid-item { animation: fadeInUp 0.35s ease both; }

        .toggle-track {
          width: 38px; height: 22px; border-radius: 999px;
          transition: background 0.2s; position: relative; cursor: pointer; flex-shrink: 0;
        }
        .toggle-thumb {
          position: absolute; top: 3px; left: 3px;
          width: 16px; height: 16px; border-radius: 999px;
          background: white; transition: transform 0.2s cubic-bezier(.4,0,.2,1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .toggle-track.on  { background: #06b6d4; }
        .toggle-track.off { background: #cbd5e1; }
        .toggle-track.on .toggle-thumb { transform: translateX(16px); }

        .sort-dropdown-btn {
          display: flex; align-items: center; gap: 8px; padding: 8px 14px;
          border-radius: 10px; border: 1.5px solid #e2e8f0; background: white;
          font-size: 13px; font-weight: 500; color: #374151;
          cursor: pointer; transition: border-color 0.15s; white-space: nowrap;
        }
        .sort-dropdown-btn:hover,
        .sort-dropdown-btn.open { border-color: #06b6d4; }

        .sort-option {
          padding: 10px 14px; font-size: 13px; color: #475569;
          cursor: pointer; transition: background 0.12s;
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
        }
        .sort-option:hover    { background: #f8fafc; }
        .sort-option.selected { color: #0891b2; font-weight: 600; background: rgba(6,182,212,0.06); }

        .mob-filter-section { border-bottom: 1px solid #f1f5f9; padding: 18px 0; }
        .mob-filter-label   { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; margin-bottom: 12px; }

        /* refresh button spin */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinning { animation: spin 0.7s linear infinite; }

        /* top progress bar */
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 90%; }
        }
        .progress-bar {
          position: fixed; top: 0; left: 0; height: 3px; z-index: 9999;
          background: linear-gradient(90deg, #06b6d4, #0891b2);
          animation: progressBar 1.5s ease forwards;
          border-radius: 0 2px 2px 0;
        }

        /* refreshing overlay on grid */
        .grid-refreshing { opacity: 0.5; transition: opacity 0.3s; pointer-events: none; }
      `}</style>

      {/* Top progress bar on refresh */}
      {refreshing && <div className="progress-bar" />}

      <div className="catalog-root min-h-screen" style={{ background: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* ── Page heading ── */}
          <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 leading-none">
                {saleOnly ? "Sale Products" : selectedCat === "All" ? "All Products" : selectedCat}
              </h1>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                {initialLoading ? (
                  <div style={{ height: "16px", width: "80px", borderRadius: "6px", background: "#e2e8f0", position: "relative", overflow: "hidden" }}>
                    <div className="shimmer-overlay" />
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">{filtered.length} items found</p>
                )}
                {lastUpdated && !initialLoading && (
                  <p className="text-xs text-gray-300">Updated {fmtTime(lastUpdated)}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Active filter tags */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {selectedCat !== "All" && (
                    <span className="filter-tag">
                      {selectedCat}
                      <button onClick={() => setCategory("All")}><MdClose /></button>
                    </span>
                  )}
                  {saleOnly && (
                    <span className="filter-tag">
                      On Sale
                      <button onClick={() => setSaleOnly(false)}><MdClose /></button>
                    </span>
                  )}
                  {(priceRange.max !== 50000 || priceRange.min !== 0) && (
                    <span className="filter-tag">
                      {PRICE_RANGES.find(p => p.min === priceRange.min && p.max === priceRange.max)?.label || "Custom Price"}
                      <button onClick={() => setPriceRange({ min: 0, max: 50000 })}><MdClose /></button>
                    </span>
                  )}
                  <button onClick={clearAllFilters} className="text-xs text-red-400 hover:text-red-600 font-medium transition underline underline-offset-2">
                    Clear all
                  </button>
                </div>
              )}

              {/* Manual refresh button */}
              {!initialLoading && (
                <button
                  onClick={() => fetchProducts(true)}
                  disabled={refreshing}
                  title="Refresh products"
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "7px 14px", borderRadius: "10px",
                    border: "1.5px solid #e2e8f0", background: "white",
                    fontSize: "12px", fontWeight: 600, color: refreshing ? "#06b6d4" : "#64748b",
                    cursor: refreshing ? "not-allowed" : "pointer",
                    transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif",
                    borderColor: refreshing ? "#06b6d4" : "#e2e8f0",
                  }}
                  onMouseEnter={(e) => { if (!refreshing) { e.currentTarget.style.borderColor = "#06b6d4"; e.currentTarget.style.color = "#0891b2"; }}}
                  onMouseLeave={(e) => { if (!refreshing) { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#64748b"; }}}
                >
                  <FaSync className={refreshing ? "spinning" : ""} style={{ fontSize: "11px" }} />
                  {refreshing ? "Updating..." : "Refresh"}
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-6">

            {/* ── DESKTOP SIDEBAR ── */}
            <aside className="hidden md:flex flex-col gap-4 w-56 flex-shrink-0">
              {/* <div className="sidebar-card">
                <FilterSection title="Categories">
                  {categories.map((cat) => (
                    <button key={cat} className={`cat-pill ${selectedCat === cat ? "active" : ""}`} onClick={() => setCategory(cat)}>
                      <span>{cat}</span>
                      {selectedCat === cat && <FaCheck className="text-[10px] text-cyan-500" />}
                    </button>
                  ))}
                </FilterSection>
              </div> */}

              <div className="sidebar-card">
                <FilterSection title="Price Range">
                  {PRICE_RANGES.map((range) => (
                    <button
                      key={range.label}
                      className={`price-chip ${priceRange.min === range.min && priceRange.max === range.max ? "active" : ""}`}
                      onClick={() => setPriceRange({ min: range.min, max: range.max })}
                    >
                      <span>{range.label}</span>
                      {priceRange.min === range.min && priceRange.max === range.max && <FaCheck className="text-[10px] text-cyan-500" />}
                    </button>
                  ))}
                </FilterSection>
              </div>

              <div className="sidebar-card">
                <FilterSection title="Availability">
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <p className="text-sm font-medium text-slate-700">Sale Items Only</p>
                      <p className="text-xs text-gray-400 mt-0.5">Special discounts</p>
                    </div>
                    <div className={`toggle-track ${saleOnly ? "on" : "off"}`} onClick={() => setSaleOnly(!saleOnly)}>
                      <div className="toggle-thumb" />
                    </div>
                  </div>
                </FilterSection>
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-red-500 transition"
                  style={{ border: "1.5px solid #fecaca", background: "#fff5f5" }}
                >
                  Clear All Filters
                </button>
              )}
            </aside>

            {/* ── MAIN CONTENT ── */}
            <div className="flex-1 min-w-0">

              {/* Desktop top bar */}
              <div className="hidden md:flex items-center justify-between mb-5">
                <p className="text-sm text-gray-500 font-medium">
                  {initialLoading ? (
                    <span style={{ display: "inline-block", height: "14px", width: "120px", borderRadius: "6px", background: "#e2e8f0", position: "relative", overflow: "hidden", verticalAlign: "middle" }}>
                      <span className="shimmer-overlay" />
                    </span>
                  ) : (
                    <>Showing <span className="text-slate-700 font-semibold">{filtered.length}</span> products</>
                  )}
                </p>
                <div className="relative" ref={sortRef}>
                  <button
                    className={`sort-dropdown-btn ${activeSortOpen ? "open" : ""}`}
                    onClick={() => setActiveSortOpen(!activeSortOpen)}
                  >
                    <FaSortAmountDown className="text-gray-400 text-xs" />
                    <span>Sort: <span className="text-cyan-600">{currentSortLabel}</span></span>
                    <FaChevronDown className={`text-gray-400 text-[10px] transition-transform duration-200 ${activeSortOpen ? "rotate-180" : ""}`} />
                  </button>
                  {activeSortOpen && (
                    <div className="drop-in absolute right-0 top-11 z-50 rounded-xl overflow-hidden"
                      style={{ background: "white", border: "1px solid #e2e8f0", boxShadow: "0 10px 40px rgba(0,0,0,0.12)", minWidth: "200px" }}
                    >
                      {SORT_OPTIONS.map((o) => (
                        <div key={o.value} className={`sort-option ${sort === o.value ? "selected" : ""}`}
                          onClick={() => { setSort(o.value); setActiveSortOpen(false); }}
                        >
                          <span>{o.label}</span>
                          {sort === o.value && <FaCheck className="text-[10px] text-cyan-500" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile top bar */}
              <div className="md:hidden flex items-center justify-between mb-4 gap-3">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition"
                  style={{
                    background: activeFiltersCount > 0 ? "rgba(6,182,212,0.1)" : "white",
                    border: activeFiltersCount > 0 ? "1.5px solid #06b6d4" : "1.5px solid #e2e8f0",
                    color: activeFiltersCount > 0 ? "#0891b2" : "#374151",
                  }}
                >
                  <MdTune className="text-base" />
                  <span>Filter & Sort</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-400">{initialLoading ? "Loading..." : `${filtered.length} products`}</p>
                  {!initialLoading && (
                    <button
                      onClick={() => fetchProducts(true)}
                      disabled={refreshing}
                      style={{ background: "white", border: "1.5px solid #e2e8f0", borderRadius: "8px", padding: "6px 8px", cursor: "pointer", color: "#64748b" }}
                    >
                      <FaSync className={refreshing ? "spinning" : ""} style={{ fontSize: "11px" }} />
                    </button>
                  )}
                </div>
              </div>

              {/* ── PRODUCT GRID ── */}
              {initialLoading ? (
                // Initial skeleton grid
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : filtered.length === 0 && products.length > 0 ? (
                // Filters returned no results
                <div className="text-center py-20 text-gray-400">
                  <p className="text-5xl mb-4">🔍</p>
                  <p className="font-semibold text-lg text-slate-600">No products match your filters</p>
                  <p className="text-sm mt-1">Try adjusting or clearing your filters</p>
                  <button onClick={clearAllFilters} className="mt-4 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition" style={{ background: "#06b6d4" }}>
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4 ${refreshing ? "grid-refreshing" : ""}`}>
                  {filtered.map((p, i) => (
                    <div key={p.id} className="grid-item" style={{ animationDelay: `${Math.min(i * 40, 300)}ms` }}>
                      <ProductCardWithFallback product={p} />
                    </div>
                  ))}
                </div>
              )}

              {/* Refreshing indicator strip at bottom of grid */}
              {refreshing && !initialLoading && (
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "8px", marginTop: "16px",
                  padding: "10px", borderRadius: "12px",
                  background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)",
                }}>
                  <FaSync className="spinning" style={{ fontSize: "11px", color: "#0891b2" }} />
                  <span style={{ fontSize: "13px", color: "#0891b2", fontWeight: 600 }}>Updating products...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Why Buy + Subscribe */}
        <OurService />
      </div>

      {/* ── MOBILE FILTER DRAWER ── */}
      {mobileFilterOpen && (
        <>
          <div
            className="backdrop fixed inset-0 z-[9998] md:hidden"
            style={{ background: "rgba(0,0,0,0.45)" }}
            onClick={() => setMobileFilterOpen(false)}
          />
          <div
            className="slide-up fixed bottom-0 left-0 right-0 z-[9999] md:hidden flex flex-col"
            style={{ background: "white", borderRadius: "20px 20px 0 0", maxHeight: "88vh", boxShadow: "0 -10px 50px rgba(0,0,0,0.18)" }}
          >
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>
            <div className="flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Filter & Sort</h2>
                <p className="text-xs text-gray-400">{filtered.length} products match</p>
              </div>
              <button onClick={() => setMobileFilterOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: "#f1f5f9" }}>
                <MdClose className="text-gray-600 text-lg" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5">
              <div className="mob-filter-section">
                <p className="mob-filter-label">Sort By</p>
                <div className="flex flex-wrap gap-2">
                  {SORT_OPTIONS.map((o) => (
                    <button key={o.value} className={`sort-pill ${sort === o.value ? "active" : ""}`} onClick={() => setSort(o.value)}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mob-filter-section">
                <p className="mob-filter-label">Category</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className="text-left px-3 py-2.5 rounded-xl text-sm font-medium transition"
                      style={{
                        border:     selectedCat === cat ? "1.5px solid #06b6d4" : "1.5px solid #e2e8f0",
                        background: selectedCat === cat ? "rgba(6,182,212,0.08)" : "white",
                        color:      selectedCat === cat ? "#0891b2" : "#475569",
                      }}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mob-filter-section">
                <p className="mob-filter-label">Price Range</p>
                <div className="flex flex-col gap-2">
                  {PRICE_RANGES.map((range) => {
                    const isActive = priceRange.min === range.min && priceRange.max === range.max;
                    return (
                      <button
                        key={range.label}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition"
                        style={{
                          border:     isActive ? "1.5px solid #06b6d4" : "1.5px solid #e2e8f0",
                          background: isActive ? "rgba(6,182,212,0.08)" : "white",
                          color:      isActive ? "#0891b2" : "#475569",
                        }}
                        onClick={() => setPriceRange({ min: range.min, max: range.max })}
                      >
                        <span>{range.label}</span>
                        {isActive && <FaCheck className="text-cyan-500 text-xs" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mob-filter-section">
                <p className="mob-filter-label">Availability</p>
                <div
                  className="flex items-center justify-between px-4 py-3 rounded-xl transition cursor-pointer"
                  style={{ border: "1.5px solid #e2e8f0", background: saleOnly ? "rgba(6,182,212,0.06)" : "white" }}
                  onClick={() => setSaleOnly(!saleOnly)}
                >
                  <div className="flex items-center gap-2">
                    <FaTag className="text-cyan-500 text-sm" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Sale Items Only</p>
                      <p className="text-xs text-gray-400">Special discounts & offers</p>
                    </div>
                  </div>
                  <div className={`toggle-track ${saleOnly ? "on" : "off"}`}>
                    <div className="toggle-thumb" />
                  </div>
                </div>
              </div>
              <div className="pb-6" />
            </div>

            <div className="flex-shrink-0 px-5 py-4 flex gap-3" style={{ borderTop: "1px solid #f1f5f9" }}>
              <button
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-slate-600 transition"
                style={{ border: "1.5px solid #e2e8f0", background: "white" }}
                onClick={clearAllFilters}
              >
                Clear All
              </button>
              <button
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition"
                style={{ background: "linear-gradient(135deg,#06b6d4,#0891b2)" }}
                onClick={() => setMobileFilterOpen(false)}
              >
                Show {filtered.length} Products
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CatalogPage;