

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaHeart, FaStar, FaShoppingCart, FaCheck } from "react-icons/fa";
// import { useCart } from "../../context/CartContext";
// import { useAuth } from "../../context/AuthContext";

// function ProductCard({ product }) {
//    console.log("ProductCard Render:", product);
//   const { addToCart, toggleWishlist, isWishlisted } = useCart();
//   const [added, setAdded] = useState(false);
//   const [wishAnim, setWishAnim] = useState(false);

//   const discount = product.originalPrice
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : null;

//   // ✅ No auth required — anyone can add to cart
//   const handleAddToCart = () => {
//     addToCart(product);
//     setAdded(true);
//     setTimeout(() => setAdded(false), 1800);
//   };

//   // ✅ No auth required — anyone can wishlist
//   const handleWishlist = () => {
//     toggleWishlist(product);
//     setWishAnim(true);
//     setTimeout(() => setWishAnim(false), 400);
//   };

//   const wishlisted = isWishlisted(product.id);

//   return (
//     <>
//       <style>{`
//         .pc-root {
//           background: #fff;
//           border-radius: 16px;
//           overflow: hidden;
//           border: 1px solid #f0f0f0;
//           display: flex;
//           flex-direction: column;
//           transition: box-shadow 0.25s, transform 0.25s;
//           position: relative;
//           font-family: 'DM Sans', sans-serif;
//         }
//         .pc-root:hover {
//           box-shadow: 0 12px 40px rgba(0,0,0,0.11);
//           transform: translateY(-3px);
//         }
//         .pc-img-wrap {
//           position: relative;
//           overflow: hidden;
//           background: #f8f9fb;
//           aspect-ratio: 1 / 1;
//           max-height: 180px;
//         }
//         .pc-img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.5s cubic-bezier(.4,0,.2,1);
//           display: block;
//         }
//         .pc-root:hover .pc-img { transform: scale(1.07); }
//         .pc-badge {
//           position: absolute; top: 10px; left: 10px;
//           font-size: 10px; font-weight: 700; letter-spacing: 0.5px;
//           padding: 3px 9px; border-radius: 20px; text-transform: uppercase;
//           z-index: 2; line-height: 1.5;
//         }
//         .pc-badge-sale { background: #ff3f6c; color: white; }
//         .pc-badge-new  { background: #14b8a6; color: white; }
//         .pc-badge-hot  { background: #f97316; color: white; }
//         .pc-badge-off  { background: #7c3aed; color: white; }
//         .pc-discount {
//           position: absolute; top: 10px; right: 10px;
//           background: rgba(20,184,166,0.13); color: #0d9488;
//           font-size: 10px; font-weight: 700; padding: 3px 8px;
//           border-radius: 20px; z-index: 2; backdrop-filter: blur(4px);
//         }
//         .pc-wish-btn {
//           position: absolute; bottom: 10px; right: 10px;
//           width: 34px; height: 34px; border-radius: 50%;
//           background: white; display: flex; align-items: center;
//           justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.12);
//           border: none; cursor: pointer; z-index: 2; transition: transform 0.15s;
//         }
//         .pc-wish-btn:hover { transform: scale(1.12); }
//         .pc-wish-btn.pop { animation: heartPop 0.4s cubic-bezier(.36,.07,.19,.97); }
//         @keyframes heartPop {
//           0%   { transform: scale(1); }
//           30%  { transform: scale(1.4); }
//           60%  { transform: scale(0.9); }
//           100% { transform: scale(1); }
//         }
//         .pc-oos {
//           position: absolute; inset: 0;
//           background: rgba(255,255,255,0.65);
//           display: flex; align-items: center; justify-content: center;
//           z-index: 3; backdrop-filter: blur(2px);
//         }
//         .pc-oos-label {
//           background: #1e293b; color: white; font-size: 11px;
//           font-weight: 700; padding: 5px 14px; border-radius: 20px;
//           letter-spacing: 0.5px; text-transform: uppercase;
//         }
//         .pc-info {
//           padding: 12px 14px 14px;
//           display: flex; flex-direction: column; flex: 1; gap: 4px;
//         }
//         .pc-cat {
//           font-size: 10px; font-weight: 700; text-transform: uppercase;
//           letter-spacing: 1.5px; color: #06b6d4;
//         }
//         .pc-name {
//           font-size: 13px; font-weight: 600; color: #1e293b; line-height: 1.4;
//           display: -webkit-box; -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical; overflow: hidden; transition: color 0.15s;
//         }
//         .pc-name:hover { color: #0891b2; }
//         .pc-stars-row { display: flex; align-items: center; gap: 5px; margin-top: 1px; }
//         .pc-stars-pill {
//           display: inline-flex; align-items: center; gap: 3px;
//           background: #f0fdf4; border: 1px solid #bbf7d0;
//           padding: 2px 7px; border-radius: 20px;
//           font-size: 11px; font-weight: 700; color: #16a34a;
//         }
//         .pc-price-row {
//           display: flex; align-items: baseline; gap: 6px;
//           margin-top: 4px; flex-wrap: wrap;
//         }
//         .pc-price { font-size: 17px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
//         .pc-orig  { font-size: 12px; color: #94a3b8; text-decoration: line-through; }
//         .pc-save  { font-size: 11px; font-weight: 700; color: #16a34a; }
//         .pc-btn   { margin-top: auto; padding-top: 10px; }
//         .pc-atc {
//           width: 100%; border: none; border-radius: 10px; padding: 9px 0;
//           font-size: 12px; font-weight: 700; letter-spacing: 0.3px; cursor: pointer;
//           display: flex; align-items: center; justify-content: center; gap: 6px;
//           transition: all 0.2s cubic-bezier(.4,0,.2,1); overflow: hidden;
//         }
//         .pc-atc-default { background: #0f172a; color: white; }
//         .pc-atc-default:hover {
//           background: #0891b2;
//           box-shadow: 0 4px 14px rgba(8,145,178,0.4);
//           transform: translateY(-1px);
//         }
//         .pc-atc-added   { background: #16a34a; color: white; pointer-events: none; }
//         .pc-atc-disabled { background: #f1f5f9; color: #94a3b8; cursor: not-allowed; }
//         @keyframes checkIn {
//           from { transform: scale(0) rotate(-10deg); opacity: 0; }
//           to   { transform: scale(1) rotate(0deg); opacity: 1; }
//         }
//         .check-anim { animation: checkIn 0.25s cubic-bezier(.4,0,.2,1) forwards; }
//       `}</style>

//       <div className="pc-root">
//         {/* Image */}
//         <div className="pc-img-wrap">
//           <Link to={`/product/${product.id}`}>
//             <img src={product.image} alt={product.name} className="pc-img" loading="lazy" />
//           </Link>

//           {product.badge && (
//             <span className={`pc-badge ${
//               product.badge.toLowerCase().includes("sale") ? "pc-badge-sale"
//               : product.badge.toLowerCase().includes("new") ? "pc-badge-new"
//               : product.badge.toLowerCase().includes("hot") ? "pc-badge-hot"
//               : "pc-badge-off"
//             }`}>
//               {product.badge}
//             </span>
//           )}

//           {discount && product.inStock && (
//             <span className="pc-discount">{discount}% off</span>
//           )}

//           {!product.inStock && (
//             <div className="pc-oos">
//               <span className="pc-oos-label">Out of Stockdd</span>
//             </div>
//           )}

//           <button
//             className={`pc-wish-btn ${wishAnim ? "pop" : ""}`}
//             onClick={handleWishlist}
//             aria-label="Wishlist"
//           >
//             <FaHeart style={{
//               fontSize: "14px",
//               color: wishlisted ? "#ff3f6c" : "#cbd5e1",
//               transition: "color 0.2s",
//               filter: wishlisted ? "drop-shadow(0 0 3px rgba(255,63,108,0.5))" : "none",
//             }} />
//           </button>
//         </div>

//         {/* Info */}
//         <div className="pc-info">
//           <span className="pc-cat">{product.category}</span>

//           <Link to={`/product/${product.id}`} className="pc-name">
//             {product.name}
//           </Link>

//           <div className="pc-stars-row">
//             <span className="pc-stars-pill">
//               <FaStar style={{ fontSize: "9px" }} />
//               {product.rating ? Number(product.rating).toFixed(1) : '0.0'}
//             </span>
//           </div>

//           <div className="pc-price-row">
//             <span className="pc-price">₹{product.price.toLocaleString()}</span>
//             {product.originalPrice && (
//               <>
//                 <span className="pc-orig">₹{product.originalPrice.toLocaleString()}</span>
//                 <span className="pc-save">Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
//               </>
//             )}
//           </div>

//           <div className="pc-btn">
//             <button
//               onClick={handleAddToCart}
//               disabled={!product.inStock}
//               className={`pc-atc ${
//                 !product.inStock ? "pc-atc-disabled"
//                 : added ? "pc-atc-added"
//                 : "pc-atc-default"
//               }`}
//             >
//               {!product.inStock ? "Out of Stock"
//                 : added ? (
//                   <><FaCheck className="check-anim" style={{ fontSize: "11px" }} /> Added!</>
//                 ) : (
//                   <><FaShoppingCart style={{ fontSize: "11px" }} /> Add to Cart</>
//                 )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductCard;



import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaShoppingCart, FaCheck } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted, getQty, updateQty } = useCart();
  const { requireAuth } = useAuth();
  const qty = getQty(product.id);
  const [added, setAdded] = useState(false);
  const [wishAnim, setWishAnim] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    requireAuth(() => {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    });
  };

  const handleWishlist = () => {
    requireAuth(() => {
      toggleWishlist(product);
      setWishAnim(true);
      setTimeout(() => setWishAnim(false), 400);
    });
  };

  const wishlisted = isWishlisted(product.id);

  return (
    <>
      <style>{`
        .pc-root {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #f0f0f0;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.25s, transform 0.25s;
          position: relative;
          font-family: 'DM Sans', sans-serif;
        }
        .pc-root:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.11);
          transform: translateY(-3px);
        }

        /* Image area */
        .pc-img-wrap {
          position: relative;
          overflow: hidden;
          background: #f8f9fb;
          aspect-ratio: 1 / 0.7;
        }
        .pc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(.4,0,.2,1);
          display: block;
        }
        .pc-root:hover .pc-img {
          transform: scale(1.07);
        }

        /* Badges */
        .pc-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 3px 9px;
          border-radius: 20px;
          text-transform: uppercase;
          z-index: 2;
          line-height: 1.5;
        }
        .pc-badge-sale { background: #ff3f6c; color: white; }
        .pc-badge-new { background: #14b8a6; color: white; }
        .pc-badge-hot { background: #f97316; color: white; }
        .pc-badge-off { background: #7c3aed; color: white; }

        /* Discount pill */
        .pc-discount {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(20,184,166,0.13);
          color: #0d9488;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 20px;
          z-index: 2;
          backdrop-filter: blur(4px);
        }

        /* Wishlist btn */
        .pc-wish-btn {
          position: absolute;
          bottom: 10px;
          right: 10px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.12);
          border: none;
          cursor: pointer;
          z-index: 2;
          transition: transform 0.15s;
        }
        .pc-wish-btn:hover { transform: scale(1.12); }
        .pc-wish-btn.pop { animation: heartPop 0.4s cubic-bezier(.36,.07,.19,.97); }
        @keyframes heartPop {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.4); }
          60%  { transform: scale(0.9); }
          100% { transform: scale(1); }
        }

        /* Out of stock overlay */
        .pc-oos {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          backdrop-filter: blur(2px);
        }
        .pc-oos-label {
          background: #1e293b;
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 20px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* Info section */
        .pc-info {
          padding: 12px 14px 14px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 4px;
        }

        .pc-cat {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #06b6d4;
        }

        .pc-name {
          font-size: 13px;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.15s;
        }
        .pc-name:hover { color: #0891b2; }

        /* Stars */
        .pc-stars-row {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 1px;
        }
        .pc-stars-pill {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 2px 7px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          color: #16a34a;
        }
        .pc-reviews {
          font-size: 11px;
          color: #94a3b8;
        }

        /* Price row */
        .pc-price-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-top: 4px;
          flex-wrap: wrap;
        }
        .pc-price {
          font-size: 17px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.5px;
        }
        .pc-orig {
          font-size: 12px;
          color: #94a3b8;
          text-decoration: line-through;
        }
        .pc-save {
          font-size: 11px;
          font-weight: 700;
          color: #16a34a;
        }

        /* Add to cart button */
        .pc-btn {
          margin-top: auto;
          padding-top: 10px;
        }
        .pc-atc {
          width: 100%;
          border: none;
          border-radius: 10px;
          padding: 9px 0;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s cubic-bezier(.4,0,.2,1);
          position: relative;
          overflow: hidden;
        }
        .pc-atc-default {
          background: #0f172a;
          color: white;
        }
        .pc-atc-default:hover {
          background: #0891b2;
          box-shadow: 0 4px 14px rgba(8,145,178,0.4);
          transform: translateY(-1px);
        }
        .pc-atc-added {
          background: #16a34a;
          color: white;
          pointer-events: none;
        }
        .pc-atc-disabled {
          background: #f1f5f9;
          color: #94a3b8;
          cursor: not-allowed;
        }

        @keyframes checkIn {
          from { transform: scale(0) rotate(-10deg); opacity: 0; }
          to   { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .check-anim { animation: checkIn 0.25s cubic-bezier(.4,0,.2,1) forwards; }

        /* Qty control */
        .pc-qty-row {
          display: flex; align-items: center; border-radius: 10px; overflow: hidden;
          border: 1.5px solid #06b6d4; background: white; height: 36px;
        }
        .pc-qty-btn {
          width: 36px; height: 100%; border: none; background: transparent;
          font-size: 16px; font-weight: 700; color: #0891b2; cursor: pointer;
          transition: background 0.15s; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .pc-qty-btn:hover { background: rgba(6,182,212,0.1); }
        .pc-qty-plus { background: #06b6d4; color: white; }
        .pc-qty-plus:hover { background: #0891b2; }
        .pc-qty-num {
          flex: 1; text-align: center; font-size: 14px; font-weight: 700; color: #0891b2;
        }
      `}</style>

      <div className="pc-root">
        {/* ── Image ── */}
        <div className="pc-img-wrap">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="pc-img"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/400x400/f1f5f9/94a3b8?text=${encodeURIComponent((product.name || "Product").split(" ").slice(0, 2).join(" "))}`;
              }}
            />
          </Link>

          {/* Badge */}
          {product.badge && (
            <span className={`pc-badge ${
              product.badge.toLowerCase().includes("sale") ? "pc-badge-sale"
              : product.badge.toLowerCase().includes("new") ? "pc-badge-new"
              : product.badge.toLowerCase().includes("hot") ? "pc-badge-hot"
              : "pc-badge-off"
            }`}>
              {product.badge}
            </span>
          )}

          {/* Discount pill top-right */}
          {discount && product.inStock && (
            <span className="pc-discount">{discount}% off</span>
          )}

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="pc-oos">
              <span className="pc-oos-label">Out of Stock</span>
            </div>
          )}

          {/* Wishlist */}
          <button
            className={`pc-wish-btn ${wishAnim ? "pop" : ""}`}
            onClick={handleWishlist}
            aria-label="Wishlist"
          >
            <FaHeart
              style={{
                fontSize: "14px",
                color: wishlisted ? "#ff3f6c" : "#cbd5e1",
                transition: "color 0.2s",
                filter: wishlisted ? "drop-shadow(0 0 3px rgba(255,63,108,0.5))" : "none",
              }}
            />
          </button>
        </div>

        {/* ── Info ── */}
        <div className="pc-info">
          <span className="pc-cat">{product.category}</span>

          <Link to={`/product/${product.id}`} className="pc-name">
            {product.name}
          </Link>

          {/* Stars pill */}
          <div className="pc-stars-row">
            <span className="pc-stars-pill">
              <FaStar style={{ fontSize: "9px" }} />
              {product.rating ? Number(product.rating).toFixed(1) : '0.0'}
            </span>
            {/* <span className="pc-reviews">{product.reviews} reviews</span> */}
          </div>

          {/* Price */}
          <div className="pc-price-row">
            <span className="pc-price">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="pc-orig">₹{product.originalPrice.toLocaleString()}</span>
                <span className="pc-save">Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
              </>
            )}
          </div>

          {/* Add to Cart / Qty control */}
          <div className="pc-btn">
            {!product.inStock ? (
              <button className="pc-atc pc-atc-disabled" disabled>Out of Stock</button>
            ) : qty > 0 ? (
              <div className="pc-qty-row">
                <button className="pc-qty-btn" onClick={() => { requireAuth(() => updateQty(product.id, qty - 1)); }}>−</button>
                <span className="pc-qty-num">{qty}</span>
                <button className="pc-qty-btn pc-qty-plus" onClick={() => { requireAuth(() => addToCart(product)); }}>+</button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className={`pc-atc ${added ? "pc-atc-added" : "pc-atc-default"}`}
              >
                {added ? (
                  <><FaCheck className="check-anim" style={{ fontSize: "11px" }} />Added!</>
                ) : (
                  <><FaShoppingCart style={{ fontSize: "11px" }} />Add to Cart</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;