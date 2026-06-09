import { useEffect, useState } from "react";
import { getProducts, deleteProduct, updateStock } from "../adminApi";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaBoxOpen, FaSort } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import ProductModal from "../ProductModal";

const API = "http://127.0.0.1:8000";

function resolveImage(product) {
  const img = product?.images?.[0]?.image;
  if (!img) return null;
  return img.startsWith("http") ? img : `${API}${img}`;
}

function StockBadge({ stock }) {
  if (stock === 0) return (
    <span style={{ background: "#fef2f2", color: "#dc2626", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" }}>
      Out of Stock
    </span>
  );
  if (stock <= 5) return (
    <span style={{ background: "#fffbeb", color: "#d97706", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" }}>
      Low: {stock}
    </span>
  );
  return (
    <span style={{ background: "#f0fdf4", color: "#16a34a", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" }}>
      {stock} in stock
    </span>
  );
}

export default function AdminProducts() {
  const [products, setProducts]         = useState([]);
  const [search, setSearch]             = useState("");
  const [showModal, setShowModal]       = useState(false);
  const [selectedProduct, setSelected] = useState(null);
  const [loading, setLoading]           = useState(true);
  const [deletingId, setDeletingId]     = useState(null);
  const [sortBy, setSortBy]             = useState("newest");

  const loadProducts = () => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadProducts(); }, []);

  const sorted = [...products]
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand?.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "newest")    return b.id - a.id;
      if (sortBy === "price_asc") return Number(a.price) - Number(b.price);
      if (sortBy === "price_desc")return Number(b.price) - Number(a.price);
      if (sortBy === "stock")     return a.stock - b.stock;
      return 0;
    });

  const handleAdd  = () => { setSelected(null); setShowModal(true); };
  const handleEdit = (p) => { setSelected(p);    setShowModal(true); };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    setDeletingId(id);
    await deleteProduct(id);
    setDeletingId(null);
    loadProducts();
  };

  const handleStock = async (product, delta) => {
    const next = Math.max(0, product.stock + delta);
    await updateStock(product.id, next);
    loadProducts();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        .ap-root { font-family: 'DM Sans', sans-serif; }

        .ap-card {
          background: white;
          border-radius: 20px;
          border: 1px solid #f0f0f0;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: box-shadow 0.2s, transform 0.2s;
          animation: apFadeUp 0.3s ease both;
        }
        .ap-card:hover {
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          transform: translateY(-1px);
        }
        @keyframes apFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ap-img {
          width: 80px; height: 80px;
          border-radius: 14px;
          object-fit: cover;
          border: 1px solid #f1f5f9;
          flex-shrink: 0;
          background: #f8fafc;
        }
        .ap-img-placeholder {
          width: 80px; height: 80px;
          border-radius: 14px;
          background: #f1f5f9;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: #94a3b8;
        }

        .ap-action-btn {
          width: 38px; height: 38px;
          border-radius: 12px;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .ap-action-btn:hover { transform: scale(1.1); }
        .ap-action-btn:active { transform: scale(0.95); }

        .ap-stock-btn {
          width: 34px; height: 34px;
          border-radius: 10px;
          border: none; cursor: pointer;
          font-size: 18px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .ap-stock-btn:hover { transform: scale(1.12); }
        .ap-stock-btn:active { transform: scale(0.92); }

        .ap-search {
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 10px 16px 10px 42px;
          font-size: 14px; color: #1e293b;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
          font-family: 'DM Sans', sans-serif;
          width: 100%;
        }
        .ap-search:focus {
          border-color: #06b6d4;
          box-shadow: 0 0 0 3px rgba(6,182,212,0.1);
        }
        .ap-search::placeholder { color: #94a3b8; }

        .ap-sort {
          background: white; border: 1.5px solid #e2e8f0;
          border-radius: 14px; padding: 10px 14px;
          font-size: 13px; color: #374151;
          outline: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.15s;
        }
        .ap-sort:focus { border-color: #06b6d4; }

        .ap-empty {
          text-align: center;
          padding: 60px 20px;
          color: #94a3b8;
          animation: apFadeUp 0.3s ease;
        }

        .ap-skeleton {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 12px;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .ap-deleting { opacity: 0.4; pointer-events: none; transition: opacity 0.2s; }
      `}</style>

      <div className="ap-root">

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#06b6d4", marginBottom: "2px" }}>
              Inventory
            </p>
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#0a0f1e", margin: 0, lineHeight: 1.1 }}>
              Products
            </h1>
            <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "3px" }}>
              {products.length} total products
            </p>
          </div>

          <button
            onClick={handleAdd}
            style={{
              background: "linear-gradient(135deg, #0f172a, #1e293b)",
              color: "white", border: "none",
              borderRadius: "14px", padding: "11px 20px",
              fontSize: "14px", fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", gap: "7px",
              transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 4px 14px rgba(15,23,42,0.25)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg,#0891b2,#06b6d4)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(6,182,212,0.35)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg,#0f172a,#1e293b)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(15,23,42,0.25)"; e.currentTarget.style.transform = "none"; }}
          >
            <FaPlus style={{ fontSize: "11px" }} /> Add Product
          </button>
        </div>

        {/* ── Search + Sort bar ── */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
            <FaSearch style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "13px" }} />
            <input
              className="ap-search"
              placeholder="Search by name, brand or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaSort style={{ color: "#94a3b8", fontSize: "13px" }} />
            <select className="ap-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest first</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="stock">Stock: Low first</option>
            </select>
          </div>
        </div>

        {/* ── Product list ── */}
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[1,2,3].map((i) => (
              <div key={i} style={{ background: "white", borderRadius: "20px", border: "1px solid #f0f0f0", padding: "16px", display: "flex", gap: "16px", alignItems: "center" }}>
                <div className="ap-skeleton" style={{ width: 80, height: 80, borderRadius: 14, flexShrink: 0 }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div className="ap-skeleton" style={{ height: 16, width: "40%", borderRadius: 8 }} />
                  <div className="ap-skeleton" style={{ height: 12, width: "25%", borderRadius: 8 }} />
                  <div className="ap-skeleton" style={{ height: 12, width: "20%", borderRadius: 8 }} />
                </div>
              </div>
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="ap-empty">
            <MdInventory style={{ fontSize: "52px", color: "#e2e8f0", marginBottom: "12px" }} />
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#64748b", margin: "0 0 4px" }}>
              {search ? "No products match your search" : "No products yet"}
            </p>
            <p style={{ fontSize: "13px", margin: "0 0 20px" }}>
              {search ? "Try a different keyword" : "Add your first product to get started"}
            </p>
            {!search && (
              <button
                onClick={handleAdd}
                style={{ background: "#0f172a", color: "white", border: "none", borderRadius: "12px", padding: "10px 20px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
              >
                + Add Product
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {sorted.map((product, idx) => {
              const imgSrc = resolveImage(product);
              return (
                <div
                  key={product.id}
                  className={`ap-card ${deletingId === product.id ? "ap-deleting" : ""}`}
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {/* Image */}
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={product.name}
                      className="ap-img"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <div className="ap-img-placeholder">
                      <MdInventory style={{ fontSize: "28px" }} />
                    </div>
                  )}

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", flexWrap: "wrap" }}>
                      <div style={{ minWidth: 0 }}>
                        <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "14px", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {product.name}
                        </h3>
                        <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 4px" }}>
                          {product.brand} · {product.category}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "16px", fontWeight: 800, color: "#c8102e" }}>
                            ₹{Number(product.price).toLocaleString()}
                          </span>
                          {product.original_price && (
                            <span style={{ fontSize: "12px", color: "#94a3b8", textDecoration: "line-through" }}>
                              ₹{Number(product.original_price).toLocaleString()}
                            </span>
                          )}
                          {product.badge && (
                            <span style={{ background: "#fdf2f8", color: "#9333ea", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", textTransform: "uppercase" }}>
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <StockBadge stock={product.stock} />
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                    {/* Stock controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "#f8fafc", borderRadius: "12px", padding: "4px 8px", border: "1px solid #e2e8f0" }}>
                      <button
                        className="ap-stock-btn"
                        style={{ background: "#fef3c7", color: "#d97706" }}
                        onClick={() => handleStock(product, -1)}
                        disabled={product.stock === 0}
                        title="Remove stock"
                      >−</button>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#374151", minWidth: "28px", textAlign: "center" }}>
                        {product.stock}
                      </span>
                      <button
                        className="ap-stock-btn"
                        style={{ background: "#dcfce7", color: "#16a34a" }}
                        onClick={() => handleStock(product, 1)}
                        title="Add stock"
                      >+</button>
                    </div>

                    {/* Edit */}
                    <button
                      className="ap-action-btn"
                      style={{ background: "#e0f9ff", color: "#0891b2" }}
                      onClick={() => handleEdit(product)}
                      title="Edit product"
                    >
                      <FaEdit />
                    </button>

                    {/* Delete */}
                    <button
                      className="ap-action-btn"
                      style={{ background: "#fef2f2", color: "#dc2626" }}
                      onClick={() => handleDelete(product.id)}
                      title="Delete product"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ProductModal
        show={showModal}
        product={selectedProduct}
        onClose={() => setShowModal(false)}
        onSuccess={loadProducts}
      />
    </>
  );
}