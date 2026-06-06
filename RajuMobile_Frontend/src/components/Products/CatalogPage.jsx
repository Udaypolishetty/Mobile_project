

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { FaFilter, FaSortAmountDown, FaTimes, FaChevronDown, FaChevronUp, FaCheck, FaSlidersH, FaTag } from "react-icons/fa";
import { MdTune, MdClose } from "react-icons/md";
import ProductCard from "./ProductCard";
import AnimatedSection from "../AnimatedSection";
import OurService from "../HomeFiles/OurService";


const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "A → Z", value: "az" },
  { label: "Z → A", value: "za" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Best Rated", value: "rating" },
];

const PRICE_RANGES = [
  { label: "All Prices", max: 50000, min: 0 },
  { label: "Under ₹500", max: 500, min: 0 },
  { label: "₹500 – ₹1,000", max: 1000, min: 500 },
  { label: "₹1,000 – ₹5,000", max: 5000, min: 1000 },
  { label: "₹5,000 – ₹15,000", max: 15000, min: 5000 },
  { label: "₹15,000 – ₹30,000", max: 30000, min: 15000 },
  { label: "Above ₹30,000", max: 50000, min: 30000 },
];

// Accordion section for desktop sidebar
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-xs font-bold uppercase tracking-[2px] text-slate-600">{title}</span>
        <span className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <FaChevronDown className="text-xs" />
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div className="px-5 pb-4">{children}</div>
      </div>
    </div>
  );
}


function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCat, setSelectedCat] = useState("All");
  const [sort, setSort] = useState("relevance");
  const [saleOnly, setSaleOnly] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeSortOpen, setActiveSortOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const sortRef = useRef(null);

{/*  used to fetch api from backend(Django) */}
useEffect(() => {
  const fetchProducts = async () => {
    
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/products/"
      );

      const data = await response.json();

      const formattedProducts = data.map((item) => ({
        ...item,
        category: item.category,
        inStock: item.stock > 0,
        price: Number(item.price),
        rating: Number(item.rating),
      }));

      setProducts(formattedProducts);
      console.log("Products from API:", formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []);


  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCat(cat);
    else setSelectedCat("All");
  }, [searchParams]);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (selectedCat !== "All") count++;
    if (saleOnly) count++;
    if (priceRange.max !== 50000 || priceRange.min !== 0) count++;
    setActiveFiltersCount(count);
  }, [selectedCat, saleOnly, priceRange]);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setActiveSortOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  

  const filtered = products.filter(
  (p) => selectedCat === "All" || p.category === selectedCat
);

  
    

const categories = [
  "All",
  "Mobiles",
  "Earphones",
  "Chargers",
  "Cases & Covers",
  "Smart Watches",
  "Power Banks",
  "Accessories",
]; 

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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .catalog-root { font-family: 'DM Sans', sans-serif; }

        /* Sidebar category pill */
        .cat-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
          background: transparent;
          border: none;
        }
        .cat-pill:hover { background: rgba(6,182,212,0.07); color: #0891b2; }
        .cat-pill.active {
          background: rgba(6,182,212,0.12);
          color: #0891b2;
          font-weight: 600;
        }
        .cat-pill.active::before { content: ''; }

        /* Price chip */
        .price-chip {
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          border: 1.5px solid #e2e8f0;
          color: #64748b;
          cursor: pointer;
          transition: all 0.15s;
          background: white;
          width: 100%;
          text-align: left;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .price-chip:hover { border-color: #06b6d4; color: #0891b2; background: rgba(6,182,212,0.04); }
        .price-chip.active { border-color: #06b6d4; background: rgba(6,182,212,0.1); color: #0891b2; font-weight: 600; }

        /* Mobile sort pill */
        .sort-pill {
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          border: 1.5px solid #e2e8f0;
          color: #64748b;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
          background: white;
        }
        .sort-pill.active { border-color: #0891b2; background: rgba(6,182,212,0.1); color: #0891b2; font-weight: 600; }
        .sort-pill:hover { border-color: #06b6d4; }

        /* Active filter tag */
        .filter-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          background: rgba(6,182,212,0.1);
          border: 1px solid rgba(6,182,212,0.3);
          color: #0891b2;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        /* Mobile drawer slide up */
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .slide-up { animation: slideUp 0.3s cubic-bezier(.4,0,.2,1) forwards; }

        /* Backdrop */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .backdrop { animation: fadeIn 0.2s ease forwards; }

        /* Sort dropdown */
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .drop-in { animation: dropIn 0.18s cubic-bezier(.4,0,.2,1) forwards; }

        /* Sidebar */
        .sidebar-card {
          background: white;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          overflow: hidden;
        }

        /* Product grid fade-in stagger */
        .grid-item {
          animation: fadeInUp 0.35s ease both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Toggle switch */
        .toggle-track {
          width: 38px; height: 22px;
          border-radius: 999px;
          transition: background 0.2s;
          position: relative;
          cursor: pointer;
          flex-shrink: 0;
        }
        .toggle-thumb {
          position: absolute;
          top: 3px; left: 3px;
          width: 16px; height: 16px;
          border-radius: 999px;
          background: white;
          transition: transform 0.2s cubic-bezier(.4,0,.2,1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .toggle-track.on { background: #06b6d4; }
        .toggle-track.off { background: #cbd5e1; }
        .toggle-track.on .toggle-thumb { transform: translateX(16px); }

        /* Desktop sort dropdown */
        .sort-dropdown-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 14px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: white;
          font-size: 13px; font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: border-color 0.15s;
          white-space: nowrap;
        }
        .sort-dropdown-btn:hover, .sort-dropdown-btn.open { border-color: #06b6d4; }

        .sort-option {
          padding: 10px 14px;
          font-size: 13px;
          color: #475569;
          cursor: pointer;
          transition: background 0.12s;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .sort-option:hover { background: #f8fafc; }
        .sort-option.selected { color: #0891b2; font-weight: 600; background: rgba(6,182,212,0.06); }

        /* Mobile filter section */
        .mob-filter-section { border-bottom: 1px solid #f1f5f9; padding: 20px 0; }
        .mob-filter-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; margin-bottom: 12px; }
      `}</style>

      <div className="catalog-root min-h-screen" style={{ background: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* Page heading */}
          <AnimatedSection direction="up">
            <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 leading-none">
                  {saleOnly ? "🔥 Sale Products" : selectedCat === "All" ? "All Products" : selectedCat}
                </h1>
                <p className="text-sm text-gray-400 mt-1">{filtered.length} items found</p>
              </div>
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
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-red-400 hover:text-red-600 font-medium transition underline underline-offset-2"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </AnimatedSection>

          <div className="flex gap-6">

            {/* ═══════════════════════════════
                DESKTOP SIDEBAR
            ═══════════════════════════════ */}
            <aside className="hidden md:flex flex-col gap-4 w-56 flex-shrink-0">

              {/* Categories */}
              {/* <div className="sidebar-card">
                <FilterSection title="Categories">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`cat-pill ${selectedCat === cat ? "active" : ""}`}
                      onClick={() => setCategory(cat)}
                    >
                      <span>{cat}</span>
                      {selectedCat === cat && <FaCheck className="text-[10px] text-cyan-500" />}
                    </button>
                  ))}
                </FilterSection>
              </div> */}

              {/* Price Range */}
              <div className="sidebar-card">
                <FilterSection title="Price Range">
                  {PRICE_RANGES.map((range) => (
                    <button
                      key={range.label}
                      className={`price-chip ${priceRange.min === range.min && priceRange.max === range.max ? "active" : ""}`}
                      onClick={() => setPriceRange({ min: range.min, max: range.max })}
                    >
                      <span>{range.label}</span>
                      {priceRange.min === range.min && priceRange.max === range.max && (
                        <FaCheck className="text-[10px] text-cyan-500" />
                      )}
                    </button>
                  ))}
                </FilterSection>
              </div>

              {/* Availability */}
              <div className="sidebar-card">
                <FilterSection title="Availability">
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <p className="text-sm font-medium text-slate-700">Sale Items Only</p>
                      <p className="text-xs text-gray-400 mt-0.5">Special discounts</p>
                    </div>
                    <div
                      className={`toggle-track ${saleOnly ? "on" : "off"}`}
                      onClick={() => setSaleOnly(!saleOnly)}
                    >
                      <div className="toggle-thumb" />
                    </div>
                  </div>
                </FilterSection>
              </div>

              {/* Clear filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-red-500 transition"
                  style={{ border: "1.5px solid #fecaca", background: "#fff5f5" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#fee2e2"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff5f5"; }}
                >
                  Clear All Filters
                </button>
              )}
            </aside>

            {/* ═══════════════════════════════
                MAIN CONTENT
            ═══════════════════════════════ */}
            <div className="flex-1 min-w-0">

              {/* ── Desktop top bar ── */}
              <div className="hidden md:flex items-center justify-between mb-5">
                <p className="text-sm text-gray-500 font-medium">
                  Showing <span className="text-slate-700 font-semibold">{filtered.length}</span> products
                </p>

                {/* Sort dropdown */}
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
                    <div
                      className="drop-in absolute right-0 top-11 z-50 rounded-xl overflow-hidden"
                      style={{ background: "white", border: "1px solid #e2e8f0", boxShadow: "0 10px 40px rgba(0,0,0,0.12)", minWidth: "200px" }}
                    >
                      {SORT_OPTIONS.map((o) => (
                        <div
                          key={o.value}
                          className={`sort-option ${sort === o.value ? "selected" : ""}`}
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

              {/* ── Mobile top bar ── */}
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
                <p className="text-sm text-gray-400">{filtered.length} products</p>
              </div>

              {/* Product grid */}
              {filtered.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-5xl mb-4">📦</p>
                  <p className="font-semibold text-lg text-slate-600">No products found</p>
                  <p className="text-sm mt-1">Try adjusting your filters</p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition"
                    style={{ background: "#06b6d4" }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4">
                  {filtered.map((p, i) => (
  <div
    key={p.id}
    className="grid-item"
    style={{ animationDelay: `${Math.min(i * 40, 300)}ms` }}
  >
    <ProductCard product={p} />
  </div>
))}
                </div>
              )}
            </div>
          </div>
          {/* <OurService/> */}
          <AnimatedSection direction="up">
            <section className="bg-white py-12">
              <div className="max-w-xl mx-auto px-6 text-center">
                <h2 className="text-2xl font-bold text-black mb-1">
                  Subscribe to Our Emails
                </h2>

                <p className="text-gray-400 text-sm mb-6">
                  Join our email list for exclusive offers and the latest news.
                </p>

                <div className="flex max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Email"
                    className="flex-1 px-4 py-3 rounded-l-xl bg-white border border-gray-300 outline-none text-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                  />

                  <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-r-xl font-bold text-sm transition">
                    →
                  </button>
                </div>
              </div>
            </section>
          </AnimatedSection>

        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MOBILE FILTER DRAWER
      ═══════════════════════════════════════════ */}
      {mobileFilterOpen && (
        <>
          {/* Backdrop */}
          <div
            className="backdrop fixed inset-0 z-[9998] md:hidden"
            style={{ background: "rgba(0,0,0,0.4)" }}
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Drawer */}
          <div
            className="slide-up fixed bottom-0 left-0 right-0 z-[9999] md:hidden flex flex-col"
            style={{
              background: "white",
              borderRadius: "20px 20px 0 0",
              maxHeight: "90vh",
              boxShadow: "0 -10px 50px rgba(0,0,0,0.15)",
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Filter & Sort</h2>
                <p className="text-xs text-gray-400">{filtered.length} products</p>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full"
                style={{ background: "#f1f5f9" }}
              >
                <MdClose className="text-gray-600 text-lg" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5">

              {/* Sort */}
              <div className="mob-filter-section">
                <p className="mob-filter-label">Sort By</p>
                <div className="flex flex-wrap gap-2">
                  {SORT_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      className={`sort-pill ${sort === o.value ? "active" : ""}`}
                      onClick={() => setSort(o.value)}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="mob-filter-section">
                <p className="mob-filter-label">Category</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className="text-left px-3 py-2.5 rounded-xl text-sm font-medium transition"
                      style={{
                        border: selectedCat === cat ? "1.5px solid #06b6d4" : "1.5px solid #e2e8f0",
                        background: selectedCat === cat ? "rgba(6,182,212,0.08)" : "white",
                        color: selectedCat === cat ? "#0891b2" : "#475569",
                      }}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                  
                </div>
              </div>

              {/* Price Range */}
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
                          border: isActive ? "1.5px solid #06b6d4" : "1.5px solid #e2e8f0",
                          background: isActive ? "rgba(6,182,212,0.08)" : "white",
                          color: isActive ? "#0891b2" : "#475569",
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

              {/* Availability */}
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

              {/* bottom padding */}
              <div className="pb-4" />
            </div>

            {/* Footer buttons */}
            <div
              className="px-5 py-4 flex gap-3"
              style={{ borderTop: "1px solid #f1f5f9", background: "white" }}
            >
              <button
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-slate-600 transition"
                style={{ border: "1.5px solid #e2e8f0" }}
                onClick={clearAllFilters}
                onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                onMouseLeave={e => e.currentTarget.style.background = "white"}
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
            <OurService />

          </div>
        </>
      )}
    </>
  );
}

export default CatalogPage;