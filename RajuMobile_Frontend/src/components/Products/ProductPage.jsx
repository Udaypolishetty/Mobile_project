// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { FaStar, FaHeart, FaShoppingCart, FaArrowLeft, FaShieldAlt, FaTruck, FaUndo } from "react-icons/fa";
// import { products } from "../data/products";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import ProductCard from "../components/ProductCard";
// import AnimatedSection from "../components/AnimatedSection";

// function ProductPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const product = products.find((p) => p.id === Number(id));
//   const { addToCart, toggleWishlist, isWishlisted } = useCart();
//   const { requireAuth } = useAuth();
//   const [qty, setQty] = useState(1);
//   const [added, setAdded] = useState(false);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-400">
//         <div className="text-center">
//           <p className="text-5xl mb-4">🔍</p>
//           <p className="font-semibold">Product not found</p>
//           <button onClick={() => navigate("/catalog")} className="mt-4 text-cyan-600 underline text-sm">Back to Catalog</button>
//         </div>
//       </div>
//     );
//   }

//   const discount = product.originalPrice
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : null;

//   const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

//   const handleAddToCart = () => {
//     requireAuth(() => {
//       addToCart(product, qty);
//       setAdded(true);
//       setTimeout(() => setAdded(false), 2000);
//     });
//   };

//   const handleWishlist = () => requireAuth(() => toggleWishlist(product));

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm mb-6 transition">
//           <FaArrowLeft /> Back
//         </button>

//         <AnimatedSection direction="up">
//           <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
//             <div className="relative bg-gray-50 rounded-xl overflow-hidden h-80 md:h-96">
//               <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
//               {product.badge && (
//                 <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">{product.badge}</span>
//               )}
//               <button onClick={handleWishlist} className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition">
//                 <FaHeart className={isWishlisted(product.id) ? "text-pink-500 text-lg" : "text-gray-300 text-lg"} />
//               </button>
//             </div>

//             <div className="flex flex-col">
//               <p className="text-cyan-600 text-xs font-semibold uppercase tracking-widest mb-1">{product.category}</p>
//               <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>

//               <div className="flex items-center gap-2 mb-3">
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <FaStar key={i} className={`text-sm ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}`} />
//                   ))}
//                 </div>
//                 <span className="text-gray-500 text-sm">{product.rating} ({product.reviews} reviews)</span>
//               </div>

//               <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>

//               <div className="flex items-end gap-3 mb-4">
//                 <span className="text-3xl font-extrabold text-gray-900">₹{product.price.toLocaleString()}</span>
//                 {product.originalPrice && (
//                   <>
//                     <span className="text-gray-400 line-through text-lg">₹{product.originalPrice.toLocaleString()}</span>
//                     <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-0.5 rounded-full">{discount}% OFF</span>
//                   </>
//                 )}
//               </div>

//               {product.inStock
//                 ? <span className="text-green-600 text-sm font-semibold mb-4">✓ In Stock</span>
//                 : <span className="text-red-500 text-sm font-semibold mb-4">✗ Out of Stock</span>
//               }

//               <div className="flex items-center gap-3 mb-5">
//                 <span className="text-sm text-gray-600 font-medium">Qty:</span>
//                 <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
//                   <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 text-lg font-bold text-gray-600 transition">−</button>
//                   <span className="w-10 text-center text-sm font-semibold">{qty}</span>
//                   <button onClick={() => setQty(qty + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 text-lg font-bold text-gray-600 transition">+</button>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   disabled={!product.inStock}
//                   onClick={handleAddToCart}
//                   className={`flex-1 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition ${
//                     added ? "bg-green-500 text-white" : "bg-black hover:bg-cyan-600 text-white disabled:bg-gray-200 disabled:text-gray-400"
//                   }`}
//                 >
//                   <FaShoppingCart />
//                   {added ? "Added! ✓" : "Add to Cart"}
//                 </button>
//                 <button
//                   onClick={handleWishlist}
//                   className={`px-4 py-3 rounded-xl border-2 transition ${
//                     isWishlisted(product.id) ? "border-pink-500 text-pink-500 bg-pink-50" : "border-gray-200 text-gray-400 hover:border-pink-400 hover:text-pink-400"
//                   }`}
//                 >
//                   <FaHeart />
//                 </button>
//               </div>

//               <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-gray-100">
//                 {[
//                   { icon: FaTruck, text: "Free Shipping" },
//                   { icon: FaShieldAlt, text: "Genuine Product" },
//                   { icon: FaUndo, text: "Easy Returns" },
//                 ].map(({ icon: Icon, text }) => (
//                   <div key={text} className="flex flex-col items-center gap-1 text-center">
//                     <Icon className="text-cyan-500 text-lg" />
//                     <span className="text-xs text-gray-500 font-medium">{text}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </AnimatedSection>

//         {related.length > 0 && (
//           <div>
//             <AnimatedSection direction="up">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">Related Products</h2>
//             </AnimatedSection>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//               {related.map((p, i) => (
//                 <AnimatedSection key={p.id} direction="up" delay={i * 80}>
//                   <ProductCard product={p} />
//                 </AnimatedSection>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductPage;


import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FaStar, FaHeart, FaShoppingCart, FaArrowLeft, FaShieldAlt,
  FaTruck, FaUndo, FaSearchPlus, FaTimes, FaChevronDown,
  FaChevronUp, FaCheck, FaLock, FaHeadset, FaBolt,
  FaEnvelope, FaFacebook, FaInstagram, FaYoutube,
  FaMapMarkerAlt, FaPhone, FaBoxOpen, FaAward, FaThumbsUp
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import ProductCard from "./ProductCard";
import AnimatedSection from "../AnimatedSection";
import OurService from "../HomeFiles/OurService";


/* ─── helpers ─────────────────────────────────────────────── */
function StarRow({ rating, size = "text-sm" }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar
          key={s}
          className={`${size} ${s <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

function DeliveryTimer() {
  const calcSecs = () => {
    const now = new Date();
    const cutoff = new Date();
    cutoff.setHours(23, 59, 59, 0);
    return Math.max(0, Math.floor((cutoff - now) / 1000));
  };
  const [secs, setSecs] = useState(calcSecs);
  useEffect(() => {
    const t = setInterval(() => setSecs(calcSecs()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");

  const today = new Date();
  const fmt = (d) => d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  const d1 = new Date(today); d1.setDate(d1.getDate() + 5);
  const d2 = new Date(today); d2.setDate(d2.getDate() + 6);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-gray-100 border border-gray-200 p-4 mb-5">
      <p className="text-xs text-gray-500 mb-2 font-medium">
        ⏱ Order within{" "}
        <span className="font-bold text-rose-500 tabular-nums bg-rose-50 px-1.5 py-0.5 rounded-md">
          {h}:{m}:{s}
        </span>{" "}
        for guaranteed delivery
      </p>
      <div className="flex items-center gap-0 text-[11px] text-gray-500">
        {[
          { icon: FaBoxOpen, label: "Purchased", sub: fmt(today) },
          null,
          { icon: FaTruck, label: "Processing", sub: `${fmt(today)} – ${fmt(d1)}` },
          null,
          { icon: FaMapMarkerAlt, label: "Delivered", sub: `${fmt(d1)} – ${fmt(d2)}` },
        ].map((item, i) =>
          item === null ? (
            <div key={i} className="flex-1 h-px bg-gray-300 mx-1" />
          ) : (
            <div key={i} className="flex flex-col items-center gap-1 min-w-[60px]">
              <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center">
                <item.icon className="text-cyan-500 text-sm" />
              </div>
              <span className="font-semibold text-gray-700">{item.label}</span>
              <span className="text-gray-400">{item.sub}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function ImageZoom({ src, alt, badge }) {
  const [zoomed, setZoomed] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef(null);

  const handleMove = (e) => {
    if (!zoomed) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setPos({ x, y });
  };

  return (
    <>
      <div
        ref={ref}
        className="relative bg-gray-50 rounded-2xl overflow-hidden h-80 md:h-[420px] cursor-crosshair select-none"
        onMouseMove={handleMove}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300"
          style={zoomed ? { transform: "scale(2.2)", transformOrigin: `${pos.x}% ${pos.y}%` } : {}}
        />
        {badge && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow">
            {badge}
          </span>
        )}
        <button
          onClick={() => setZoomed((z) => !z)}
          className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${zoomed ? "bg-cyan-600 text-white" : "bg-white text-gray-500 hover:bg-cyan-50 hover:text-cyan-600"
            }`}
          title={zoomed ? "Zoom Out" : "Zoom In"}
        >
          {zoomed ? <FaTimes className="text-xs" /> : <FaSearchPlus className="text-xs" />}
        </button>
      </div>
      {zoomed && (
        <p className="text-center text-xs text-cyan-500 mt-1 animate-pulse">Move cursor to explore · Click × to exit</p>
      )}
    </>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 ${open ? "shadow-sm" : ""}`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
      >
        <span className="font-semibold text-gray-800 text-sm">{q}</span>
        {open ? (
          <FaChevronUp className="text-cyan-500 text-xs flex-shrink-0 ml-2" />
        ) : (
          <FaChevronDown className="text-gray-400 text-xs flex-shrink-0 ml-2" />
        )}
      </button>
      <div
        className={`px-5 text-sm text-gray-500 leading-relaxed transition-all duration-300 ${open ? "max-h-40 pb-4 opacity-100" : "max-h-0 pb-0 opacity-0"
          } overflow-hidden`}
      >
        {a}
      </div>
    </div>
  );
}

const FAQS = [
  {
    q: "What is your quality assurance policy?",
    a: "Every product we sell is 100% genuine and sourced directly from authorised distributors. We perform quality checks before dispatch.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard delivery takes 5–6 business days. Express delivery (1–2 days) is available at checkout for select pin codes.",
  },
  {
    q: "How can I track my order?",
    a: "Once your order ships, you'll receive a tracking link via SMS and email. You can also track it live from your account dashboard.",
  },
  {
    q: "What is the return & exchange policy?",
    a: "We offer hassle-free 7-day returns. Items must be unused and in original packaging. Initiate a return from your orders page.",
  },
];



const MOCK_REVIEWS = [
  { name: "Arjun K.", rating: 5, date: "2 days ago", text: "Excellent product, exactly as described. Fast shipping too!", verified: true },
  { name: "Priya M.", rating: 4, date: "1 week ago", text: "Good quality, packed well. Works perfectly with my iPhone.", verified: true },
  { name: "Rahul S.", rating: 5, date: "2 weeks ago", text: "Best price online. Highly recommend this seller.", verified: false },
];

/* ─── main component ─────────────────────────────────────── */
function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const { requireAuth } = useAuth();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviews, setReviews] = useState(MOCK_REVIEWS);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <div className="text-center">
          <p className="text-5xl mb-4">🔍</p>
          <p className="font-semibold">Product not found</p>
          <button onClick={() => navigate("/catalog")} className="mt-4 text-cyan-600 underline text-sm">
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    requireAuth(() => {
      addToCart(product, qty);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    });
  };

  const handleWishlist = () => requireAuth(() => toggleWishlist(product));

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText || !reviewRating) return;
    setReviews([
      { name: "You", rating: reviewRating, date: "Just now", text: reviewText, verified: false },
      ...reviews,
    ]);
    setReviewText("");
    setReviewRating(0);
  };

  const avgRating = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen bg-[#f8f7f5]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');`}</style>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm mb-7 transition group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        {/* ── SECTION 1 — Product Hero ───────────────────────── */}
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-sm p-6 md:p-8 mb-6 border border-gray-100">
          {/* Image */}
          <div>
            <ImageZoom src={product.image} alt={product.name} badge={product.badge} />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-cyan-600 text-[10px] font-bold uppercase tracking-widest mb-1">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <StarRow rating={product.rating} size="text-base" />
              <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-3">
              <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-400 line-through text-lg mb-1">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full mb-1">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Stock */}
            {product.inStock ? (
              <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-semibold mb-4">
                <FaCheck className="text-xs" /> In Stock — Ready to Ship
              </span>
            ) : (
              <span className="text-rose-500 text-sm font-semibold mb-4">✗ Out of Stock</span>
            )}

            <p className="text-gray-500 text-sm leading-relaxed mb-5">{product.description}</p>

            {/* Delivery Timer */}
            <DeliveryTimer />

            {/* Qty */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sm text-gray-600 font-medium">Quantity</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 flex items-center justify-center hover:bg-gray-200 font-bold text-gray-600 transition text-lg"
                >−</button>
                <span className="w-10 text-center text-sm font-bold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-9 h-9 flex items-center justify-center hover:bg-gray-200 font-bold text-gray-600 transition text-lg"
                >+</button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                disabled={!product.inStock}
                onClick={handleAddToCart}
                className={`flex-1 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm transition-all duration-300 ${added
                  ? "bg-emerald-500 text-white scale-95"
                  : "bg-gray-900 hover:bg-cyan-600 text-white disabled:bg-gray-200 disabled:text-gray-400"
                  }`}
              >
                <FaShoppingCart />
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
              <button
                onClick={handleWishlist}
                className={`px-5 py-3.5 rounded-2xl border-2 transition-all duration-200 ${isWishlisted(product.id)
                  ? "border-rose-400 text-rose-500 bg-rose-50 scale-95"
                  : "border-gray-200 text-gray-400 hover:border-rose-300 hover:text-rose-400"
                  }`}
              >
                <FaHeart />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2 pt-5 border-t border-gray-100">
              {[
                { icon: FaTruck, label: "Free Shipping", sub: "On orders ₹499+" },
                { icon: FaShieldAlt, label: "Genuine", sub: "100% original" }
                // { icon: FaUndo, label: "Returns", sub: "7-day policy" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center p-2 rounded-xl hover:bg-gray-50 transition">
                  <div className="w-9 h-9 bg-cyan-50 rounded-full flex items-center justify-center">
                    <Icon className="text-cyan-500" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{label}</span>
                  <span className="text-[10px] text-gray-400">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 2 — Why Buy From Us ───────────────────── */}


        {/* ── SECTION 3 — FAQs ──────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 mb-6">
          <h2 className="text-xl font-extrabold text-gray-900 mb-1">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-sm mb-5">Everything you need to know before buying.</p>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </div>
        </div>

        {/* ── SECTION 4 — Customer Reviews ──────────────────── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 mb-6">
          {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-1">Customer Reviews</h2>
              <div className="flex items-center gap-2">
                <StarRow rating={avgRating} size="text-lg" />
                <span className="font-bold text-gray-800">{avgRating.toFixed(1)}</span>
                <span className="text-gray-400 text-sm">({reviews.length} reviews)</span>
              </div>
            </div>
          </div> */}

          {/* Review list */}
          {/* <div className="space-y-4 mb-7">
            {reviews.map((r, i) => (
              <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition">
                <div className="w-9 h-9 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 font-bold text-cyan-600 text-sm">
                  {r.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800 text-sm">{r.name}</span>
                    {r.verified && (
                      <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        <FaCheck className="text-[8px]" /> Verified
                      </span>
                    )}
                    <span className="text-gray-400 text-xs ml-auto">{r.date}</span>
                  </div>
                  <StarRow rating={r.rating} size="text-xs" />
                  <p className="text-gray-600 text-sm mt-1.5 leading-relaxed">{r.text}</p>
                </div>
              </div>
            ))}
          </div> */}

          {/* Write review */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">Write a Review</h3>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => setReviewRating(s)}>
                  <FaStar className={`text-xl transition-colors ${s <= reviewRating ? "text-amber-400" : "text-gray-200 hover:text-amber-300"}`} />
                </button>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={3}
              placeholder="Share your experience with this product..."
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-300 transition mb-3"
            />
            <button
              onClick={handleReviewSubmit}
              disabled={!reviewText || !reviewRating}
              className="bg-gray-900 hover:bg-cyan-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all"
            >
              Submit Review
            </button>
          </div>
        </div>

        {/* ── SECTION 5 — Related Products ──────────────────── */}
        {related.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <AnimatedSection key={p.id} direction="up" delay={i * 80}>
                  <ProductCard product={p} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        )}
        <OurService />

      </div>
    </div>
  );
}

export default ProductDetailPage;