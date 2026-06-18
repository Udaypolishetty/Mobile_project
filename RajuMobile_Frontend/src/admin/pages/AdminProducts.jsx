

// import { useEffect, useState } from "react";
// import { getProducts, deleteProduct, updateStock } from "../adminApi";
// import ProductModal from "../ProductModal";
// import {
//   FaEdit,
//   FaTrash,
//   FaSearch,
//   FaPlus,
//   FaSort,
// } from "react-icons/fa";
// import { MdInventory, MdOutlinePhoto } from "react-icons/md";
// import Swal from "sweetalert2";
// const API = "http://127.0.0.1:8000";

// function resolveImage(product) {
//   const img = product?.images?.[0]?.image;
//   if (!img) return null;
//   return img.startsWith("http") ? img : `${API}${img}`;
// }

// function StockBadge({ stock }) {
//   if (stock === 0) {
//     return (
//       <span className="ap-stock-badge ap-stock-out">
//         Out of Stock
//       </span>
//     );
//   }
//   if (stock <= 5) {
//     return (
//       <span className="ap-stock-badge ap-stock-low">
//         Low: {stock}
//       </span>
//     );
//   }
//   return (
//     <span className="ap-stock-badge ap-stock-good">
//       {stock} in stock
//     </span>
//   );
// }

// function ProductSkeleton() {
//   return (
//     <div className="ap-list">
//       {Array.from({ length: 4 }).map((_, i) => (
//         <div key={i} className="ap-card ap-card-skeleton">
//           <div className="ap-skeleton ap-skeleton-img" />
//           <div className="ap-card-main">
//             <div className="ap-card-top">
//               <div style={{ flex: 1 }}>
//                 <div className="ap-skeleton" style={{ height: 16, width: "42%", marginBottom: 10 }} />
//                 <div className="ap-skeleton" style={{ height: 12, width: "28%", marginBottom: 12 }} />
//                 <div className="ap-skeleton" style={{ height: 18, width: "20%" }} />
//               </div>
//               <div className="ap-skeleton" style={{ height: 24, width: 90, borderRadius: 999 }} />
//             </div>

//             <div className="ap-card-actions ap-card-actions-skeleton">
//               <div className="ap-skeleton" style={{ width: 120, height: 44, borderRadius: 14 }} />
//               <div className="ap-skeleton" style={{ width: 40, height: 40, borderRadius: 12 }} />
//               <div className="ap-skeleton" style={{ width: 40, height: 40, borderRadius: 12 }} />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default function AdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelected] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);
//   const [sortBy, setSortBy] = useState("newest");
//   const [stockUpdating, setStockUpdating] = useState({});

//   const loadProducts = () => {
//     setLoading(true);
//     getProducts()
//       .then(setProducts)
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const sorted = [...products]
//     .filter((p) => {
//       const q = search.toLowerCase();
//       return (
//         (p.name || "").toLowerCase().includes(q) ||
//         (p.brand || "").toLowerCase().includes(q) ||
//         (p.category || "").toLowerCase().includes(q)
//       );
//     })
//     .sort((a, b) => {
//       if (sortBy === "newest") return b.id - a.id;
//       if (sortBy === "price_asc") return Number(a.price) - Number(b.price);
//       if (sortBy === "price_desc") return Number(b.price) - Number(a.price);
//       if (sortBy === "stock") return a.stock - b.stock;
//       return 0;
//     });

//   const handleAdd = () => {
//     setSelected(null);
//     setShowModal(true);
//   };

//   const handleEdit = (p) => {
//     setSelected(p);
//     setShowModal(true);
//   };

// const handleDelete = async (id) => {
//   const result = await Swal.fire({
//     title: "Delete Product?",
//     text: "This action is permanent and cannot be undone.",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#dc2626",
//     cancelButtonColor: "#64748b",
//     confirmButtonText: "Yes, Delete",
//     cancelButtonText: "Cancel",
//     reverseButtons: true,
//     background: "#fff",
//     borderRadius: "20px",
//   });

//   if (!result.isConfirmed) return;

//   setDeletingId(id);

//   try {
//     await deleteProduct(id);

//     setProducts((prev) =>
//       prev.filter((p) => p.id !== id)
//     );

//     Swal.fire({
//       icon: "success",
//       title: "Deleted",
//       text: "Product deleted permanently.",
//       timer: 1800,
//       showConfirmButton: false,
//       borderRadius: "20px",
//     });
//   } catch {
//     Swal.fire({
//       icon: "error",
//       title: "Delete Failed",
//       text: "Unable to delete the product.",
//       borderRadius: "20px",
//     });
//   } finally {
//     setDeletingId(null);
//   }
// };

//   const handleStock = async (product, delta) => {
//     const next = Math.max(0, product.stock + delta);
//     if (next === product.stock) return;

//     const prevStock = product.stock;

//     setStockUpdating((prev) => ({ ...prev, [product.id]: true }));

//     setProducts((prev) =>
//       prev.map((p) => (p.id === product.id ? { ...p, stock: next } : p))
//     );

//     try {
//       await updateStock(product.id,product, next);
//     } catch (error) {
//       setProducts((prev) =>
//         prev.map((p) =>
//           p.id === product.id ? { ...p, stock: prevStock } : p
//         )
//       );
//       alert("Failed to update stock. Please try again.");
//     } finally {
//       setStockUpdating((prev) => ({ ...prev, [product.id]: false }));
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

//         .ap-root {
//           font-family: 'DM Sans', sans-serif;
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 20px 16px 28px;
//         }

//         .ap-header {
//           display: flex;
//           align-items: flex-end;
//           justify-content: space-between;
//           gap: 16px;
//           flex-wrap: wrap;
//           margin-bottom: 24px;
//         }

//         .ap-eyebrow {
//           font-size: 11px;
//           font-weight: 800;
//           text-transform: uppercase;
//           letter-spacing: 0.18em;
//           color: #06b6d4;
//           margin-bottom: 4px;
//         }

//         .ap-title {
//           font-size: clamp(26px, 4vw, 34px);
//           font-weight: 800;
//           color: #0a0f1e;
//           margin: 0;
//           line-height: 1.05;
//         }

//         .ap-subtitle {
//           font-size: 13px;
//           color: #94a3b8;
//           margin-top: 6px;
//         }

//         .ap-add-btn {
//           background: linear-gradient(135deg, #0f172a, #1e293b);
//           color: white;
//           border: none;
//           border-radius: 16px;
//           padding: 12px 18px;
//           font-size: 14px;
//           font-weight: 700;
//           cursor: pointer;
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           box-shadow: 0 10px 24px rgba(15, 23, 42, 0.18);
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
//         }

//         .ap-add-btn:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 14px 30px rgba(15, 23, 42, 0.22);
//         }

//         .ap-toolbar {
//           display: flex;
//           gap: 12px;
//           margin-bottom: 20px;
//           flex-wrap: wrap;
//         }

//         .ap-search-wrap {
//           position: relative;
//           flex: 1;
//           min-width: 220px;
//         }

//         .ap-search-icon {
//           position: absolute;
//           left: 14px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #94a3b8;
//           font-size: 13px;
//         }

//         .ap-search {
//           background: white;
//           border: 1.5px solid #e2e8f0;
//           border-radius: 16px;
//           padding: 12px 16px 12px 42px;
//           font-size: 14px;
//           color: #1e293b;
//           outline: none;
//           transition: border-color 0.15s, box-shadow 0.15s;
//           font-family: 'DM Sans', sans-serif;
//           width: 100%;
//           box-sizing: border-box;
//         }

//         .ap-search:focus {
//           border-color: #06b6d4;
//           box-shadow: 0 0 0 4px rgba(6,182,212,0.10);
//         }

//         .ap-sort-wrap {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           color: #94a3b8;
//         }

//         .ap-sort {
//           background: white;
//           border: 1.5px solid #e2e8f0;
//           border-radius: 16px;
//           padding: 12px 14px;
//           font-size: 13px;
//           color: #374151;
//           outline: none;
//           cursor: pointer;
//           font-family: 'DM Sans', sans-serif;
//           min-width: 170px;
//         }

//         .ap-list {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//         }
// @media (max-width:640px){

//   .ap-card{
//     padding:12px;
//     gap:10px;
//     border-radius:18px;
//   }

//   .ap-img,
//   .ap-img-placeholder,
//   .ap-skeleton-img{
//     width:100%;
//     height:120px;
//     object-fit:contain;
//     border-radius:14px;
//   }

//   .ap-card-main{
//     flex-direction:column;
//     align-items:stretch;
//     gap:12px;
//   }

//   .ap-card-top{
//     flex-direction:column;
//     gap:6px;
//   }

//   .ap-name{
//     font-size:15px;
//   }

//   .ap-price{
//     font-size:24px;
//   }

//   .ap-card-actions{
//     display:flex;
//     flex-direction:column;
//     gap:10px;
//   }

//   .ap-stock-control{
//     width:100%;
//     padding:8px 12px;
//     border-radius:14px;
//   }

//   .ap-stock-btn{
//     width:34px;
//     height:34px;
//   }

//   .ap-action-btn{
//     flex:1;
//     height:40px;
//     border-radius:12px;
//   }

//   .ap-action-row{
//     display:flex;
//     gap:10px;
//   }
// }
//         .ap-action-btn:hover,
//         .ap-stock-btn:hover {
//           transform: translateY(-1px);
//         }

//         .ap-action-btn:active,
//         .ap-stock-btn:active {
//           transform: scale(0.96);
//         }

//         .ap-skeleton {
//           background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
//           background-size: 200% 100%;
//           animation: shimmer 1.4s infinite;
//           border-radius: 12px;
//         }

//         .ap-skeleton-img {
//           width: 88px;
//           height: 88px;
//           border-radius: 18px;
//           flex-shrink: 0;
//         }

//         .ap-card-skeleton:hover {
//           transform: none;
//           box-shadow:
//             0 4px 10px rgba(15,23,42,0.03),
//             0 14px 36px rgba(15,23,42,0.05);
//           border-color: rgba(226,232,240,0.8);
//         }

//         .ap-card-actions-skeleton {
//           justify-content: flex-end;
//         }

//         @keyframes shimmer {
//           0% { background-position: 200% 0; }
//           100% { background-position: -200% 0; }
//         }

//         .ap-deleting {
//           opacity: 0.45;
//           pointer-events: none;
//           filter: grayscale(0.1);
//         }

//         .ap-empty {
//           background: linear-gradient(180deg, #ffffff, #f8fafc);
//           border: 1px dashed #cbd5e1;
//           border-radius: 24px;
//           padding: 48px 20px;
//           text-align: center;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           color: #64748b;
//         }

//         .ap-empty-title {
//           font-size: 17px;
//           font-weight: 700;
//           color: #475569;
//           margin: 0 0 6px;
//         }

//         .ap-empty-text {
//           font-size: 13px;
//           color: #94a3b8;
//           margin: 0;
//           max-width: 420px;
//         }

//         @media (max-width: 860px) {
//           .ap-card {
//             align-items: flex-start;
//           }

//           .ap-card-main {
//             flex-direction: column;
//             align-items: stretch;
//           }

//           .ap-card-actions {
//             justify-content: space-between;
//             width: 100%;
//             padding-top: 12px;
//             border-top: 1px solid #f1f5f9;
//           }
//         }

//           .ap-spinner{
//   width:18px;
//   height:18px;
//   border:2px solid #e5e7eb;
//   border-top:2px solid #06b6d4;
//   border-radius:50%;
//   display:inline-block;
//   animation:spin .7s linear infinite;
// }

// @keyframes spin{
//   to{
//     transform:rotate(360deg);
//   }
// }
//       `}</style>

//       <div className="ap-root">
//         <div className="ap-header">
//           <div>
//             <p className="ap-eyebrow">Inventory</p>
//             <h1 className="ap-title">Products</h1>
//             <p className="ap-subtitle">{products.length} total products</p>
//           </div>

//           <button onClick={handleAdd} className="ap-add-btn">
//             <FaPlus style={{ fontSize: "11px" }} />
//             Add Product
//           </button>
//         </div>

//         <div className="ap-toolbar">
//           <div className="ap-search-wrap">
//             <FaSearch className="ap-search-icon" />
//             <input
//               className="ap-search"
//               placeholder="Search by name, brand or category..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>

//           <div className="ap-sort-wrap">
//             <FaSort style={{ fontSize: "13px" }} />
//             <select
//               className="ap-sort"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//             >
//               <option value="newest">Newest first</option>
//               <option value="price_asc">Price: Low to High</option>
//               <option value="price_desc">Price: High to Low</option>
//               <option value="stock">Stock: Low first</option>
//             </select>
//           </div>
//         </div>

//         {loading ? (
//           <ProductSkeleton />
//         ) : sorted.length === 0 ? (
//           <div className="ap-empty">
//             <MdInventory style={{ fontSize: "54px", color: "#cbd5e1", marginBottom: "12px" }} />
//             <p className="ap-empty-title">No products found</p>
//             <p className="ap-empty-text">
//               Try a different search term, or add a new product to your inventory.
//             </p>
//           </div>
//         ) : (
//           <div className="ap-list">
//             {sorted.map((product, idx) => {
//               const imgSrc = resolveImage(product);
//               const isStockUpdating = !!stockUpdating[product.id];

//               return (
//                 <div
//                   key={product.id}
//                   className={`ap-card ${deletingId === product.id ? "ap-deleting" : ""}`}
//                   style={{ animationDelay: `${idx * 45}ms` }}
//                 >
//                   {imgSrc ? (
//                     <img src={imgSrc} alt={product.name} className="ap-img" />
//                   ) : (
//                     <div className="ap-img-placeholder">
//                       <MdOutlinePhoto style={{ fontSize: "30px" }} />
//                     </div>
//                   )}

//                   <div className="ap-card-main">
//                     <div className="ap-card-top">
//                       <div style={{ minWidth: 0 }}>
//                         <h3 className="ap-name">{product.name}</h3>
//                         <p className="ap-meta">
//                           {product.brand} · {product.category}
//                         </p>
//                         <div className="ap-price">
//                           ₹{Number(product.price).toLocaleString()}
//                         </div>
//                       </div>

//                       <StockBadge stock={product.stock} />
//                     </div>

//                     <div className="ap-card-actions">
//                       <div
//                         className="ap-stock-control"
//                         style={{ opacity: isStockUpdating ? 0.7 : 1 }}
//                       >
//                         <button
//                           className="ap-stock-btn"
//                           style={{ background: "#fef3c7", color: "#d97706" }}
//                           onClick={() => handleStock(product, -1)}
//                           disabled={product.stock === 0 || isStockUpdating}
//                         >
//                           −
//                         </button>

//                         <span className="ap-stock-value">
//                           {isStockUpdating ? (
//   <span className="ap-spinner"></span>
// ) : (
//   product.stock
// )}
//                         </span>

//                         <button
//                           className="ap-stock-btn"
//                           style={{ background: "#dcfce7", color: "#16a34a" }}
//                           onClick={() => handleStock(product, 1)}
//                           disabled={isStockUpdating}
//                         >
//                           +
//                         </button>
//                       </div>

//                       <button
//                         className="ap-action-btn"
//                         style={{ background: "#e0f9ff", color: "#0891b2" }}
//                         onClick={() => handleEdit(product)}
//                       >
//                         <FaEdit />
//                       </button>

//                       <button
//                         className="ap-action-btn"
//                         style={{ background: "#fef2f2", color: "#dc2626" }}
//                         onClick={() => handleDelete(product.id)}
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

// <ProductModal
//   show={showModal}
//   product={selectedProduct}
//   onClose={() => setShowModal(false)}
//   onSuccess={(updatedProduct) => {
//     setShowModal(false);

//     if (!updatedProduct) {
//       loadProducts();
//       return;
//     }

//     setProducts((prev) => {
//       const exists = prev.some(
//         (p) => p.id === updatedProduct.id
//       );

//       if (exists) {
//         return prev.map((p) =>
//           p.id === updatedProduct.id
//             ? updatedProduct
//             : p
//         );
//       }

//       return [updatedProduct, ...prev];
//     });
//   }}
// />
//     </>
//   );
// }





import { useEffect, useState } from "react";
import { getProducts, deleteProduct, updateStock } from "../adminApi";
import ProductModal from "../ProductModal";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaSort,
} from "react-icons/fa";
import { MdInventory, MdOutlinePhoto } from "react-icons/md";
import Swal from "sweetalert2";
const API = "http://127.0.0.1:8000";

function resolveImage(product) {
  const img = product?.images?.[0]?.image;
  if (!img) return null;
  return img.startsWith("http") ? img : `${API}${img}`;
}

function StockBadge({ stock }) {
  if (stock === 0) {
    return (
      <span className="ap-stock-badge ap-stock-out">
        Out of Stock
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="ap-stock-badge ap-stock-low">
        Low: {stock}
      </span>
    );
  }
  return (
    <span className="ap-stock-badge ap-stock-good">
      {stock} in stock
    </span>
  );
}

function ProductSkeleton() {
  return (
    <div className="ap-grid">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="ap-card ap-card-skeleton">
          <div className="ap-skeleton ap-skeleton-img" />
          <div className="ap-card-main">
            <div className="ap-card-top">
              <div style={{ flex: 1 }}>
                <div className="ap-skeleton" style={{ height: 16, width: "60%", marginBottom: 10 }} />
                <div className="ap-skeleton" style={{ height: 12, width: "40%", marginBottom: 12 }} />
                <div className="ap-skeleton" style={{ height: 18, width: "30%" }} />
              </div>
            </div>
            <div className="ap-card-actions" style={{ marginTop: 'auto', paddingTop: '12px' }}>
              <div className="ap-skeleton" style={{ width: "100%", height: 38, borderRadius: 12 }} />
            </div>
          </div>
        </div>
      ))}
    </div>
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
  const [stockUpdating, setStockUpdating] = useState({});

  const loadProducts = () => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const sorted = [...products]
    .filter((p) => {
      const q = search.toLowerCase();
      return (
        (p.name || "").toLowerCase().includes(q) ||
        (p.brand || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id;
      if (sortBy === "price_asc") return Number(a.price) - Number(b.price);
      if (sortBy === "price_desc") return Number(b.price) - Number(a.price);
      if (sortBy === "stock") return a.stock - b.stock;
      return 0;
    });

  const handleAdd = () => {
    setSelected(null);
    setShowModal(true);
  };

  const handleEdit = (p) => {
    setSelected(p);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This action is permanent and cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: "#fff",
      borderRadius: "20px",
    });

    if (!result.isConfirmed) return;

    setDeletingId(id);

    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((p) => p.id !== id)
      );

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Product deleted permanently.",
        timer: 1800,
        showConfirmButton: false,
        borderRadius: "20px",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Unable to delete the product.",
        borderRadius: "20px",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleStock = async (product, delta) => {
    const next = Math.max(0, product.stock + delta);
    if (next === product.stock) return;

    const prevStock = product.stock;

    setStockUpdating((prev) => ({ ...prev, [product.id]: true }));

    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, stock: next } : p))
    );

    try {
      await updateStock(product.id, product, next);
    } catch (error) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, stock: prevStock } : p
        )
      );
      alert("Failed to update stock. Please try again.");
    } finally {
      setStockUpdating((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

        .ap-root {
          font-family: 'DM Sans', sans-serif;
          max-width: 1280px;
          margin: 0 auto;
          padding: 24px 16px 40px;
          box-sizing: border-box;
        }

        .ap-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }

        .ap-eyebrow {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #06b6d4;
          margin-bottom: 4px;
        }

        .ap-title {
          font-size: clamp(24px, 4vw, 32px);
          font-weight: 800;
          color: #0a0f1e;
          margin: 0;
          line-height: 1.1;
        }

        .ap-subtitle {
          font-size: 13px;
          color: #94a3b8;
          margin-top: 4px;
        }

        .ap-add-btn {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
          border: none;
          border-radius: 14px;
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.15);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .ap-add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(15, 23, 42, 0.2);
        }

        .ap-toolbar {
          display: flex;
          gap: 14px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .ap-search-wrap {
          position: relative;
          flex: 1;
          min-width: 260px;
        }

        .ap-search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 14px;
        }

        .ap-search {
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 12px 16px 12px 44px;
          font-size: 14px;
          color: #1e293b;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          font-family: 'DM Sans', sans-serif;
          width: 100%;
          box-sizing: border-box;
        }

        .ap-search:focus {
          border-color: #06b6d4;
          box-shadow: 0 0 0 4px rgba(6,182,212,0.10);
        }

        .ap-sort-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ap-sort {
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 12px 14px;
          font-size: 14px;
          color: #374151;
          outline: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          min-width: 180px;
        }

        /* Adjusted Grid for cleaner proportions on wide screens */
        .ap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }

        .ap-card {
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          position: relative;
        }

        .ap-card:hover {
          transform: translateY(-4px);
          border-color: #cbd5e1;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
        }

        /* Fixed Image Section to show FULL uncropped image */
        .ap-img-container {
          width: 100%;
          height: 200px;
          background: #f8fafc;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          box-sizing: border-box;
        }

        .ap-img {
          width: 100%;
          height: 100%;
          object-fit: contain; /* Changed from cover to show everything clearly */
          mix-blend-mode: multiply;
        }

        .ap-img-placeholder {
          width: 100%;
          height: 200px;
          background: #f8fafc;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
        }

        .ap-card-main {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 14px;
        }

        .ap-card-top {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .ap-name {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ap-meta {
          font-size: 12px;
          color: #64748b;
          margin: 0;
        }

        .ap-price {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin-top: auto;
        }

        .ap-stock-badge {
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
          padding: 4px 10px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .ap-stock-good { background: #dcfce7; color: #15803d; }
        .ap-stock-low { background: #fef3c7; color: #b45309; }
        .ap-stock-out { background: #fee2e2; color: #b91c1c; }

        .ap-card-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          border-top: 1px solid #f1f5f9;
          padding-top: 14px;
        }

        .ap-stock-control {
          display: flex;
          align-items: center;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 3px;
          gap: 8px;
          flex: 1;
          justify-content: space-between;
        }

        .ap-stock-btn {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: none;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.1s;
        }

        .ap-stock-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .ap-stock-value {
          font-size: 13px;
          font-weight: 700;
          color: #334155;
          min-width: 20px;
          text-align: center;
        }

        .ap-action-btn {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          cursor: pointer;
          transition: transform 0.1s, background-color 0.15s;
        }

        .ap-action-btn:hover, .ap-stock-btn:hover {
          transform: scale(1.04);
        }

        .ap-skeleton-img {
          width: 100%;
          height: 200px;
        }

        .ap-skeleton {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .ap-deleting {
          opacity: 0.45;
          pointer-events: none;
        }

        .ap-empty {
          background: white;
          border: 2px dashed #e2e8f0;
          border-radius: 24px;
          padding: 60px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          grid-column: 1 / -1;
        }

        .ap-empty-title {
          font-size: 18px;
          font-weight: 700;
          color: #334155;
          margin: 12px 0 6px;
        }

        .ap-empty-text {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }

        .ap-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid #cbd5e1;
          border-top: 2px solid #06b6d4;
          border-radius: 50%;
          display: inline-block;
          animation: spin .7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Mobile Layout configurations */
        @media (max-width: 640px) {
          .ap-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .ap-card {
            flex-direction: row;
            height: auto;
          }
          .ap-img-container {
            width: 110px;
            height: auto;
            min-height: 140px;
            border-bottom: none;
            border-right: 1px solid #f1f5f9;
            flex-shrink: 0;
            padding: 8px;
          }
          .ap-img {
            object-fit: contain;
          }
          .ap-img-placeholder, .ap-skeleton-img {
            width: 110px;
            height: 100%;
            min-height: 140px;
            border-bottom: none;
            border-right: 1px solid #f1f5f9;
            flex-shrink: 0;
          }
          .ap-card-main {
            padding: 12px;
            gap: 8px;
            justify-content: space-between;
          }
          .ap-card-top {
            gap: 4px;
          }
          .ap-name {
            font-size: 14px;
            -webkit-line-clamp: 2;
          }
          .ap-meta {
            font-size: 11px;
          }
          .ap-price {
            font-size: 16px;
          }
          .ap-stock-badge {
            padding: 2px 8px;
            font-size: 9px;
          }
          .ap-card-actions {
            padding-top: 8px;
            gap: 6px;
          }
          .ap-stock-control {
            padding: 2px;
            gap: 4px;
          }
          .ap-stock-btn {
            width: 24px;
            height: 24px;
            font-size: 12px;
          }
          .ap-action-btn {
            width: 30px;
            height: 30px;
            font-size: 12px;
            border-radius: 8px;
          }
          .ap-toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .ap-sort-wrap {
            width: 100%;
          }
          .ap-sort {
            flex: 1;
            min-width: unset;
          }
        }
      `}</style>

      <div className="ap-root">
        <div className="ap-header">
          <div>
            <p className="ap-eyebrow">Inventory</p>
            <h1 className="ap-title">Products</h1>
            <p className="ap-subtitle">{products.length} total products</p>
          </div>

          <button onClick={handleAdd} className="ap-add-btn">
            <FaPlus style={{ fontSize: "11px" }} />
            Add Product
          </button>
        </div>

        <div className="ap-toolbar">
          <div className="ap-search-wrap">
            <FaSearch className="ap-search-icon" />
            <input
              className="ap-search"
              placeholder="Search by name, brand or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="ap-sort-wrap">
            <FaSort style={{ fontSize: "13px" }} />
            <select
              className="ap-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest first</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="stock">Stock: Low first</option>
            </select>
          </div>
        </div>

        {loading ? (
          <ProductSkeleton />
        ) : sorted.length === 0 ? (
          <div className="ap-empty">
            <MdInventory style={{ fontSize: "54px", color: "#cbd5e1" }} />
            <p className="ap-empty-title">No products found</p>
            <p className="ap-empty-text">
              Try a different search term, or add a new product to your inventory.
            </p>
          </div>
        ) : (
          <div className="ap-grid">
            {sorted.map((product, idx) => {
              const imgSrc = resolveImage(product);
              const isStockUpdating = !!stockUpdating[product.id];

              return (
                <div
                  key={product.id}
                  className={`ap-card ${deletingId === product.id ? "ap-deleting" : ""}`}
                  style={{ animationDelay: `${idx * 45}ms` }}
                >
                  {imgSrc ? (
                    <div className="ap-img-container">
                      <img src={imgSrc} alt={product.name} className="ap-img" />
                    </div>
                  ) : (
                    <div className="ap-img-placeholder">
                      <MdOutlinePhoto style={{ fontSize: "30px" }} />
                    </div>
                  )}

                  <div className="ap-card-main">
                    <div className="ap-card-top">
                      <StockBadge stock={product.stock} />
                      <div style={{ minWidth: 0 }}>
                        <h3 className="ap-name">{product.name}</h3>
                        <p className="ap-meta">
                          {product.brand} · {product.category}
                        </p>
                      </div>
                      <div className="ap-price">
                        ₹{Number(product.price).toLocaleString()}
                      </div>
                    </div>

                    <div className="ap-card-actions">
                      <div
                        className="ap-stock-control"
                        style={{ opacity: isStockUpdating ? 0.7 : 1 }}
                      >
                        <button
                          className="ap-stock-btn"
                          style={{ background: "#fef3c7", color: "#d97706" }}
                          onClick={() => handleStock(product, -1)}
                          disabled={product.stock === 0 || isStockUpdating}
                        >
                          −
                        </button>

                        <span className="ap-stock-value">
                          {isStockUpdating ? (
                            <span className="ap-spinner"></span>
                          ) : (
                            product.stock
                          )}
                        </span>

                        <button
                          className="ap-stock-btn"
                          style={{ background: "#dcfce7", color: "#16a34a" }}
                          onClick={() => handleStock(product, 1)}
                          disabled={isStockUpdating}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="ap-action-btn"
                        style={{ background: "#e0f9ff", color: "#0891b2" }}
                        onClick={() => handleEdit(product)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="ap-action-btn"
                        style={{ background: "#fef2f2", color: "#dc2626" }}
                        onClick={() => handleDelete(product.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
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
        onSuccess={(updatedProduct) => {
          setShowModal(false);

          if (!updatedProduct) {
            loadProducts();
            return;
          }

          setProducts((prev) => {
            const exists = prev.some(
              (p) => p.id === updatedProduct.id
            );

            if (exists) {
              return prev.map((p) =>
                p.id === updatedProduct.id
                  ? updatedProduct
                  : p
              );
            }

            return [updatedProduct, ...prev];
          });
        }}
      />
    </>
  );
}