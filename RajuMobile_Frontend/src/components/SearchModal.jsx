import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import { products } from "../data/products";

function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    setResults(
      products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        )
        .slice(0, 6)
    );
  }, [query]);

  const go = (product) => {
    navigate(`/product/${product.id}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center px-4 py-3 border-b border-gray-100">
          <FaSearch className="text-gray-400 mr-3 text-lg flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for mobiles, chargers, earphones..."
            className="flex-1 text-gray-800 text-base outline-none placeholder-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-700">
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="max-h-80 overflow-y-auto">
            {results.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition border-b border-gray-50 last:border-0"
                onClick={() => go(p)}
              >
                <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 text-sm font-medium truncate">{p.name}</p>
                  <p className="text-gray-400 text-xs">{p.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-cyan-600 font-bold text-sm">₹{p.price.toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : query.trim() ? (
          <div className="py-12 text-center text-gray-400">
            <FaSearch className="text-3xl mx-auto mb-2 opacity-30" />
            <p>No results for "{query}"</p>
          </div>
        ) : (
          <div className="px-4 py-4">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {["iPhone", "Samsung", "Charger", "Earphones", "Power Bank", "Smart Watch"].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-cyan-100 hover:text-cyan-700 transition"
                  onClick={() => setQuery(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default SearchModal;
