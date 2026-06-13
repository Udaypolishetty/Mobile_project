import { useEffect, useState } from "react";
import { getProducts, deleteProduct, updateStock } from "../adminApi";
import ProductModal from "../ProductModal";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaBoxOpen, FaSort, FaTimes } from "react-icons/fa";
import { MdInventory, MdCloudUpload } from "react-icons/md";

const API = "http://127.0.0.1:8000";

function resolveImage(product) {
    const img = product?.images?.[0]?.image;
    if (!img) return null;
    return img.startsWith("http") ? img : `${API}${img}`;
}

function StockBadge({ stock }) {
    if (stock === 0) return (
        <span style={{ background: "#fef2f2", color: "#dc2626", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", whiteSpace: "nowrap" }}>
            Out of Stock
        </span>
    );
    if (stock <= 5) return (
        <span style={{ background: "#fffbeb", color: "#d97706", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", whiteSpace: "nowrap" }}>
            Low: {stock}
        </span>
    );
    return (
        <span style={{ background: "#f0fdf4", color: "#16a34a", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", whiteSpace: "nowrap" }}>
            {stock} in stock
        </span>
    );
}

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [sortBy, setSortBy] = useState("newest");

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
            if (sortBy === "newest") return b.id - a.id;
            if (sortBy === "price_asc") return Number(a.price) - Number(b.price);
            if (sortBy === "price_desc") return Number(b.price) - Number(a.price);
            if (sortBy === "stock") return a.stock - b.stock;
            return 0;
        });

    const handleAdd = () => { setSelected(null); setShowModal(true); };
    const handleEdit = (p) => { setSelected(p); setShowModal(true); };

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
        
        .ap-root { font-family: 'DM Sans', sans-serif; max-width: 1200px; margin: 0 auto; padding: 16px; }

        .ap-card {
          background: white; border-radius: 20px; border: 1px solid #f0f0f0; padding: 16px;
          display: flex; align-items: center; gap: 16px; transition: box-shadow 0.2s, transform 0.2s;
          animation: apFadeUp 0.3s ease both;
        }
        .ap-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.08); transform: translateY(-1px); }
        
        @keyframes apFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ap-img { width: 80px; height: 80px; border-radius: 14px; object-fit: cover; border: 1px solid #f1f5f9; flex-shrink: 0; background: #f8fafc; }
        .ap-img-placeholder { width: 80px; height: 80px; border-radius: 14px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #94a3b8; }

        .ap-action-btn { width: 38px; height: 38px; border-radius: 12px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; transition: all 0.15s; flex-shrink: 0; }
        .ap-action-btn:hover { transform: scale(1.08); }
        .ap-action-btn:active { transform: scale(0.95); }

        .ap-stock-btn { width: 34px; height: 34px; border-radius: 10px; border: none; cursor: pointer; font-size: 18px; font-weight: 800; display: flex; align-items: center; justify-content: center; transition: all 0.15s; flex-shrink: 0; }
        .ap-stock-btn:hover { transform: scale(1.1); }

        .ap-search { background: white; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 10px 16px 10px 42px; font-size: 14px; color: #1e293b; outline: none; transition: border-color 0.15s, box-shadow 0.15s; font-family: 'DM Sans', sans-serif; width: 100%; box-sizing: border-box; }
        .ap-search:focus { border-color: #06b6d4; box-shadow: 0 0 0 3px rgba(6,182,212,0.1); }

        .ap-sort { background: white; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 10px 14px; font-size: 13px; color: #374151; outline: none; cursor: pointer; font-family: 'DM Sans', sans-serif; height: 43px; }

        .ap-skeleton { background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 12px; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        .ap-deleting { opacity: 0.4; pointer-events: none; }

        /* ── Minimalist Modal & Fluid Sheet Interface System ── */
        .pm-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(10, 15, 30, 0.4); backdrop-filter: blur(4px);
          display: flex; justify-content: center; align-items: flex-end;
          z-index: 9999; animation: pmFadeIn 0.2s ease-out;
        }
        
        .pm-container {
          background: white; width: 100%; max-width: 500px;
          border-top-left-radius: 24px; border-top-right-radius: 24px;
          display: flex; flex-direction: column; max-height: 92vh;
          box-shadow: 0 -10px 40px rgba(0,0,0,0.12);
          animation: pmSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .pm-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px; border-bottom: 1px solid #f1f5f9;
        }
        .pm-title { margin: 0; fontSize: 20px; font-weight: 800; color: #0a0f1e; font-size: 18px; }
        .pm-subtitle { margin: 4px 0 0; fontSize: 12px; color: #64748b; font-size: 12px; }

        .pm-close-btn {
          width: 32px; height: 32px; border-radius: 50%; border: none;
          background: #f1f5f9; color: #64748b; cursor: pointer;
          display: flex; align-items: center; justify-content: center; font-size: 12px;
        }
        .pm-close-btn:hover { background: #e2e8f0; color: #1e293b; }

        .pm-form { display: flex; flex-direction: column; overflow: hidden; flex: 1; }
        .pm-body { padding: 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
        
        .pm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .pm-label { display: block; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
        
        .pm-input {
          width: 100%; background: white; border: 1.5px solid #e2e8f0;
          border-radius: 12px; padding: 10px 14px; font-size: 14px;
          color: #1e293b; outline: none; transition: all 0.15s;
          font-family: 'DM Sans', sans-serif; box-sizing: border-box;
        }
        .pm-input:focus { border-color: #06b6d4; box-shadow: 0 0 0 3px rgba(6,182,212,0.08); }

        .pm-img-wrapper {
          width: 80px; height: 80px; border-radius: 16px;
          border: 1.5px dashed #cbd5e1; background: #f8fafc;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
        }
        .pm-img-preview { width: 100%; height: 100%; object-fit: cover; }
        .pm-img-fallback { display: flex; flex-direction: column; align-items: center; gap: 2px; }

        .pm-upload-btn {
          background: #f0f9ff; color: #0891b2; border: 1px solid #bae6fd;
          padding: 8px 14px; border-radius: 10px; font-size: 12px;
          font-weight: 700; cursor: pointer; display: inline-flex;
          align-items: center; gap: 6px; transition: all 0.15s;
        }
        .pm-upload-btn:hover { background: #e0f2fe; }

        .pm-footer {
          padding: 16px 24px; background: #f8fafc; border-top: 1px solid #f1f5f9;
          display: flex; justify-content: flex-end; gap: 12px;
        }
        .pm-footer-cancel {
          background: transparent; border: none; color: #64748b;
          font-size: 14px; font-weight: 700; padding: 10px 16px; cursor: pointer;
        }
        .pm-footer-submit {
          background: #0f172a; color: white; border: none; padding: 10px 20px;
          border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer;
          box-shadow: 0 4px 12px rgba(15,23,42,0.1); transition: all 0.15s;
        }
        .pm-footer-submit:hover { background: #06b6d4; box-shadow: 0 4px 14px rgba(6,182,212,0.2); }
        .pm-footer-submit:disabled { opacity: 0.6; }

        .pm-spinner {
          width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%; border-top-color: white; animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        @keyframes pmFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pmSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes pmScaleUp { from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        /* Media Queries for True Desktop Centered Viewport Contexts */
        @media(max-width: 680px) {
          .ap-card { flex-direction: column; align-items: stretch; gap: 12px; }
          .ap-card-actions { justify-content: flex-end; width: 100%; border-top: 1px solid #f8fafc; padding-top: 10px; }
        }

        @media(min-width: 541px) {
          .pm-overlay { align-items: center; padding: 24px; }
          .pm-container {
            border-radius: 20px; height: auto; max-height: 85vh;
            animation: pmScaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
        }
      `}</style>

            <div className="ap-root">
                {/* ── Header ── */}
                <div style={{ display: "flex", alignItems: "center", justifyExtreme: "space-between", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
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

                    <button onClick={handleAdd} style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)", color: "white", border: "none", borderRadius: "14px", padding: "11px 20px", fontSize: "14px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "7px", boxShadow: "0 4px 14px rgba(15,23,42,0.25)" }}>
                        <FaPlus style={{ fontSize: "11px" }} /> Add Product
                    </button>
                </div>

                {/* ── Search + Sort bar ── */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
                    <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
                        <FaSearch style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "13px" }} />
                        <input className="ap-search" placeholder="Search by name, brand or category..." value={search} onChange={(e) => setSearch(e.target.value)} />
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
                        {[1, 2, 3].map((i) => (
                            <div key={i} style={{ background: "white", borderRadius: "20px", border: "1px solid #f0f0f0", padding: "16px", display: "flex", gap: "16px", alignItems: "center" }}>
                                <div className="ap-skeleton" style={{ width: 80, height: 80, borderRadius: 14, flexShrink: 0 }} />
                                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <div className="ap-skeleton" style={{ height: 16, width: "40%", borderRadius: 8 }} />
                                    <div className="ap-skeleton" style={{ height: 12, width: "25%", borderRadius: 8 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : sorted.length === 0 ? (
                    <div className="ap-empty">
                        <MdInventory style={{ fontSize: "52px", color: "#e2e8f0", marginBottom: "12px" }} />
                        <p style={{ fontSize: "16px", fontWeight: 700, color: "#64748b", margin: "0 0 4px" }}>No products found</p>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {sorted.map((product, idx) => {
                            const imgSrc = resolveImage(product);
                            return (
                                <div key={product.id} className={`ap-card ${deletingId === product.id ? "ap-deleting" : ""}`} style={{ animationDelay: `${idx * 40}ms` }}>
                                    {imgSrc ? (
                                        <img src={imgSrc} alt={product.name} className="ap-img" />
                                    ) : (
                                        <div className="ap-img-placeholder"><MdInventory style={{ fontSize: "28px" }} /></div>
                                    )}

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", flexWrap: "wrap" }}>
                                            <div style={{ minWidth: 0 }}>
                                                <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "14px", margin: "0 0 2px" }}>{product.name}</h3>
                                                <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 4px" }}>{product.brand} · {product.category}</p>
                                                <span style={{ fontSize: "16px", fontWeight: 800, color: "#c8102e" }}>₹{Number(product.price).toLocaleString()}</span>
                                            </div>
                                            <StockBadge stock={product.stock} />
                                        </div>
                                    </div>

                                    <div className="ap-card-actions" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "#f8fafc", borderRadius: "12px", padding: "4px 8px", border: "1px solid #e2e8f0" }}>
                                            <button className="ap-stock-btn" style={{ background: "#fef3c7", color: "#d97706" }} onClick={() => handleStock(product, -1)} disabled={product.stock === 0}>−</button>
                                            <span style={{ fontSize: "13px", fontWeight: 700, color: "#374151", minWidth: "28px", textAlign: "center" }}>{product.stock}</span>
                                            <button className="ap-stock-btn" style={{ background: "#dcfce7", color: "#16a34a" }} onClick={() => handleStock(product, 1)}>+</button>
                                        </div>
                                        <button className="ap-action-btn" style={{ background: "#e0f9ff", color: "#0891b2" }} onClick={() => handleEdit(product)}><FaEdit /></button>
                                        <button className="ap-action-btn" style={{ background: "#fef2f2", color: "#dc2626" }} onClick={() => handleDelete(product.id)}><FaTrash /></button>
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