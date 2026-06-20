

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FaStar, FaHeart, FaShoppingCart, FaArrowLeft, FaShieldAlt,
  FaTruck, FaUndo, FaSearchPlus, FaTimes, FaChevronDown,
  FaChevronUp, FaCheck, FaLock, FaHeadset, FaBolt,
  FaMapMarkerAlt, FaBoxOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import ProductCard from "./ProductCard";
import AnimatedSection from "../AnimatedSection";
import OurService from "../HomeFiles/OurService";
import { getAllImages } from "../../utils/imageHelper";

const API = "VITE_API_URL";

/* ─── helpers ─────────────────────────────────────────────── */
function StarRow({ rating, size = "text-sm" }) {
  const r = Number(rating) || 0;
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <FaStar key={s} className={`${size} ${s <= Math.round(r) ? "text-amber-400" : "text-gray-200"}`} />
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
  const h = String(Math.floor(secs / 3600)).padStart(2,"0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2,"0");
  const s = String(secs % 60).padStart(2,"0");
  const today = new Date();
  const fmt = (d) => d.toLocaleDateString("en-IN", { day:"2-digit", month:"short" });
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
          { icon: FaBoxOpen,      label: "Purchased", sub: fmt(today) },
          null,
          { icon: FaTruck,        label: "Processing", sub: `${fmt(today)}–${fmt(d1)}` },
          null,
          { icon: FaMapMarkerAlt, label: "Delivered",  sub: `${fmt(d1)}–${fmt(d2)}` },
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
  const [pos, setPos]       = useState({ x: 50, y: 50 });
  const ref = useRef(null);

  useEffect(() => { setZoomed(false); }, [src]);

  const handleMove = (e) => {
    if (!zoomed || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width)  * 100,
      y: ((e.clientY - r.top)  / r.height) * 100,
    });
  };

  const imgSrc = src
    ? src.startsWith("http") ? src : `${API}${src}`
    : null;

  return (
    <>
      <div
        ref={ref}
        className="relative bg-gray-50 rounded-2xl overflow-hidden cursor-crosshair select-none"
        style={{ height: "clamp(260px, 42vw, 420px)" }}
        onMouseMove={handleMove}
        onMouseLeave={() => setZoomed(false)}
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={alt}
            className="w-full h-full object-contain transition-transform duration-200"
            style={zoomed ? { transform: `scale(2.4)`, transformOrigin: `${pos.x}% ${pos.y}%` } : {}}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/600x600/f1f5f9/94a3b8?text=${encodeURIComponent(alt?.split(" ").slice(0,2).join(" ") || "Product")}`;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            No image
          </div>
        )}

        {badge && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow">
            {badge}
          </span>
        )}

        <button
          onClick={() => setZoomed((z) => !z)}
          className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
            zoomed ? "bg-cyan-600 text-white" : "bg-white text-gray-500 hover:bg-cyan-50 hover:text-cyan-600"
          }`}
          title={zoomed ? "Zoom Out" : "Zoom In"}
        >
          {zoomed ? <FaTimes className="text-xs" /> : <FaSearchPlus className="text-xs" />}
        </button>
      </div>
      {zoomed && (
        <p className="text-center text-xs text-cyan-500 mt-1 animate-pulse">
          Move cursor to explore · Leave image to exit
        </p>
      )}
    </>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 ${open ? "shadow-sm" : ""}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
      >
        <span className="font-semibold text-gray-800 text-sm">{q}</span>
        {open
          ? <FaChevronUp    className="text-cyan-500 text-xs flex-shrink-0 ml-2" />
          : <FaChevronDown className="text-gray-400 text-xs flex-shrink-0 ml-2" />}
      </button>
      <div className={`px-5 text-sm text-gray-500 leading-relaxed transition-all duration-300 overflow-hidden ${open ? "max-h-40 pb-4 opacity-100" : "max-h-0 pb-0 opacity-0"}`}>
        {a}
      </div>
    </div>
  );
}

/* ─── Skeleton Loading UI Component ─── */
function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#f8f7f5] animate-pulse max-w-5xl mx-auto px-4 py-6">
      {/* Back button link shape */}
      <div className="w-16 h-4 bg-gray-200 rounded-md mb-7"></div>
      
      {/* Hero container */}
      <div className="grid md:grid-cols-2 gap-6 bg-white rounded-2xl p-4 md:p-6 mb-4 border border-gray-100">
        {/* Left Column (Image Block) */}
        <div>
          <div className="w-full bg-gray-200 rounded-2xl" style={{ height: "clamp(260px, 42vw, 420px)" }}></div>
          <div className="flex gap-2 mt-3">
            <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
            <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
            <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
        
        {/* Right Column (Text Fields) */}
        <div className="flex flex-col gap-3">
          <div className="w-24 h-3 bg-gray-200 rounded-md"></div>
          <div className="w-3/4 h-7 bg-gray-200 rounded-md mb-1"></div>
          <div className="w-32 h-4 bg-gray-200 rounded-md mb-2"></div>
          <div className="w-40 h-8 bg-gray-200 rounded-md mb-2"></div>
          <div className="w-full h-20 bg-gray-100 rounded-xl mb-2"></div>
          <div className="w-full h-24 bg-gray-100 rounded-xl mb-2"></div>
          <div className="w-full h-12 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

const FAQS = [
  { q: "What is your quality assurance policy?",  a: "Every product is 100% genuine and sourced directly from authorised distributors. We perform quality checks before dispatch." },
  { q: "How long does shipping take?",            a: "Standard delivery takes 5–6 business days. Express delivery (1–2 days) is available at checkout for select pin codes." },
  { q: "How can I track my order?",               a: "Once your order ships, you'll receive a tracking link via SMS and email. You can also track it live from your account dashboard." },
];

const MOCK_REVIEWS = [
  { name: "Arjun K.",  rating: 5, date: "2 days ago",  text: "Excellent product, exactly as described. Fast shipping too!", verified: true  },
  { name: "Priya M.",  rating: 4, date: "1 week ago",  text: "Good quality, packed well. Works perfectly with my iPhone.",  verified: true  },
  { name: "Rahul S.",  rating: 5, date: "2 weeks ago", text: "Best price online. Highly recommend this seller.",            verified: false },
];

const resolveImg = (img) => {
  if (!img) return null;
  if (typeof img === "string") return img.startsWith("http") ? img : `${API}${img}`;
  if (img.image) return img.image.startsWith("http") ? img.image : `${API}${img.image}`;
  return null;
};

/* ─── main component ─────────────────────────────────────── */
function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted, getQty, updateQty } = useCart();

  const [product,       setProduct]       = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [allProducts,   setAllProducts]   = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewText,    setReviewText]    = useState("");
  const [reviewRating,  setReviewRating]  = useState(0);
  const [reviews,       setReviews]       = useState(MOCK_REVIEWS);

  /* ── fetch data when id alters ── */
  useEffect(() => {
    setLoading(true); // reset loading layout during direct transitions
    fetch(`${API}/api/products/`)
      .then((r) => r.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          ...item,
          inStock:       item.stock > 0,
          price:         Number(item.price),
          rating:        Number(item.rating),
          originalPrice: item.original_price ? Number(item.original_price) : null,
          badge:         item.badge || "",
        }));
        const found = formatted.find((p) => String(p.id) === String(id));
        setProduct(found || null);
        setAllProducts(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  /* ── auto-advance images ── */
  useEffect(() => {
    if (!product?.images?.length || product.images.length < 2) return;
    const total = product.images.length;
    const t = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(t);
  }, [product?.images?.length]);

  /* ── reset image index when product changes ── */
  useEffect(() => { setSelectedImage(0); }, [id]);

  // Use the new skeleton component instead of raw text layout
  if (loading) return <DetailSkeleton />;

  if (!product) return (
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

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const images = product.images?.length
    ? product.images.map(resolveImg).filter(Boolean)
    : product.image
      ? [resolveImg(product.image)]
      : [];

  const currentImgSrc = images[selectedImage] || null;

  const related = allProducts
    .filter((p) => p.category === product.category && String(p.id) !== String(id))
    .slice(0, 4);

  const handleWishlist = () => toggleWishlist(product);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText || !reviewRating) return;
    setReviews([{ name: "You", rating: reviewRating, date: "Just now", text: reviewText, verified: false }, ...reviews]);
    setReviewText(""); setReviewRating(0);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f5]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');`}</style>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm mb-7 transition group">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        {/* ── SECTION 1 — Hero ── */}
        <div className="grid md:grid-cols-2 gap-4 bg-white rounded-2xl shadow-sm p-3 md:p-6 mb-4 border border-gray-100">

          {/* Left: image + thumbnails */}
          <div>
            <ImageZoom src={currentImgSrc} alt={product.name} badge={product.badge} />

            {images.length > 1 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === idx ? "border-cyan-500 shadow-md" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.onerror=null; e.currentTarget.src="https://placehold.co/80x80/f1f5f9/94a3b8?text=img"; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: details */}
          <div className="flex flex-col">
            <span className="text-cyan-600 text-[10px] font-bold uppercase tracking-widest mb-1">{product.category}</span>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <StarRow rating={product.rating} size="text-base" />
              <span className="text-sm font-semibold text-gray-700">{Number(product.rating).toFixed(1)}</span>
            </div>

            <div className="flex items-end gap-3 mb-3">
              <span className="text-4xl font-extrabold text-gray-900 tracking-tight">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-400 line-through text-base mb-1">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full mb-1">{discount}% OFF</span>
                </>
              )}
            </div>

            {product.inStock
              ? <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-semibold mb-4"><FaCheck className="text-xs" /> In Stock — Ready to Ship</span>
              : <span className="text-rose-500 text-sm font-semibold mb-4">✗ Out of Stock</span>
            }

            {product.description && (
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{product.description}</p>
            )}

            <DeliveryTimer />

            {/* CTA */}
            <div className="flex gap-3 mb-6">
              {!product.inStock ? (
                <button disabled className="flex-1 font-bold py-3.5 rounded-2xl bg-gray-200 text-gray-400 text-sm cursor-not-allowed">
                  Out of Stock
                </button>
              ) : getQty(product.id) === 0 ? (
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm bg-gray-900 hover:bg-cyan-600 text-white transition-all duration-300"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              ) : (
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex items-center border-2 border-cyan-500 rounded-2xl overflow-hidden bg-white flex-1">
                    <button onClick={() => updateQty(product.id, getQty(product.id) - 1)} className="w-11 h-11 flex items-center justify-center hover:bg-cyan-50 font-bold text-cyan-600 transition text-xl">−</button>
                    <span className="flex-1 text-center text-sm font-extrabold text-gray-900">{getQty(product.id)}</span>
                    <button onClick={() => updateQty(product.id, getQty(product.id) + 1)} className="w-11 h-11 flex items-center justify-center hover:bg-cyan-50 font-bold text-cyan-600 transition text-xl">+</button>
                  </div>
                  <button onClick={() => navigate("/cart")} className="px-5 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm transition whitespace-nowrap">
                    Go to Cart →
                  </button>
                </div>
              )}

              <button
                onClick={handleWishlist}
                className={`px-5 py-3.5 rounded-2xl border-2 transition-all duration-200 ${
                  isWishlisted(product.id) ? "border-rose-400 text-rose-500 bg-rose-50" : "border-gray-200 text-gray-400 hover:border-rose-300 hover:text-rose-400"
                }`}
              >
                <FaHeart />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 pt-5 border-t border-gray-100">
              {[
                { icon: FaTruck,     label: "Free Shipping", sub: "About 12KM range" },
                { icon: FaShieldAlt, label: "Genuine",       sub: "100% original"   },
                { icon: FaLock,      label: "Secure Pay",    sub: "100% safe"        },
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

        {/* ── SECTION 3 — FAQs ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 mb-4">
          <h2 className="text-xl font-extrabold text-gray-900 mb-1">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-sm mb-5">Everything you need to know before buying.</p>
          <div className="space-y-3">
            {FAQS.map((f) => <FaqItem key={f.q} {...f} />)}
          </div>
        </div>

        {/* ── SECTION 4 — Reviews ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 mb-4">
          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">Write a Review</h3>
            <div className="flex gap-1 mb-3">
              {[1,2,3,4,5].map((s) => (
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

        {/* ── SECTION 5 — Related Products ── */}
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