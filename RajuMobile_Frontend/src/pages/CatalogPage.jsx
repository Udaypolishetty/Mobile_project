import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaFilter, FaTimes, FaSortAmountDown } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";

const SORT_OPTIONS = [
  { label: "Alphabetically, A-Z", value: "az" },
  { label: "Alphabetically, Z-A", value: "za" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Best Rated", value: "rating" },
];

function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCat, setSelectedCat] = useState("All");
  const [sort, setSort] = useState("az");
  const [saleOnly, setSaleOnly] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [maxPrice, setMaxPrice] = useState(50000);

  useEffect(() => {
    const cat = searchParams.get("category");
    const sale = searchParams.get("sale");
    if (cat) setSelectedCat(cat);
    if (sale) setSaleOnly(true);
  }, [searchParams]);

  const filtered = products
    .filter((p) => selectedCat === "All" || p.category === selectedCat)
    .filter((p) => !saleOnly || (p.badge === "Sale" || p.badge === "40% Off"))
    .filter((p) => p.price <= maxPrice)
    .sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "za") return b.name.localeCompare(a.name);
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  const setCategory = (cat) => {
    setSelectedCat(cat);
    setSearchParams(cat !== "All" ? { category: cat } : {});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {saleOnly ? "🔥 Sale Products" : selectedCat === "All" ? "All Products" : selectedCat}
        </h1>

        {/* Mobile filter toggle */}
        <button
          className="md:hidden flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl mb-4 text-sm font-semibold"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaFilter /> Filters
        </button>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside
            className={`${
              showFilter ? "flex" : "hidden"
            } md:flex flex-col gap-5 w-56 flex-shrink-0`}
          >
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">Categories</h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`cursor-pointer text-sm px-3 py-2 rounded-lg transition ${
                      selectedCat === cat
                        ? "bg-cyan-500 text-white font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">Price Range</h3>
              <p className="text-xs text-gray-500 mb-2">Up to ₹{maxPrice.toLocaleString()}</p>
              <input
                type="range"
                min={500}
                max={50000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>₹500</span>
                <span>₹50,000</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">Availability</h3>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={saleOnly}
                  onChange={(e) => setSaleOnly(e.target.checked)}
                  className="accent-cyan-500"
                />
                Sale Items Only
              </label>
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <p className="text-sm text-gray-500">{filtered.length} products</p>
              <div className="flex items-center gap-2">
                <FaSortAmountDown className="text-gray-400 text-sm" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none bg-white"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-4xl mb-3">📦</p>
                <p className="font-semibold">No products found</p>
                <p className="text-sm mt-1">Try changing your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
