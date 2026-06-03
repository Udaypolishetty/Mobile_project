import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const HERO_BG =
  // "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=1200&q=80";
  "https://www.magnific.com/free-photos-vectors/mobile-accessories-banner";

const categories = [
  { label: "Mobiles", emoji: "📱", color: "from-blue-600 to-cyan-500" },
  { label: "Earphones", emoji: "🎧", color: "from-purple-600 to-pink-500" },
  { label: "Chargers", emoji: "⚡", color: "from-yellow-500 to-orange-500" },
  { label: "Cases & Covers", emoji: "🛡️", color: "from-green-600 to-teal-500" },
  { label: "Smart Watches", emoji: "⌚", color: "from-gray-700 to-gray-900" },
  { label: "Power Banks", emoji: "🔋", color: "from-red-600 to-pink-600" },
  { label: "Accessories", emoji: "🎮", color: "from-indigo-600 to-blue-500" },
];

const testimonials = [
  {
    name: "Shreya, Vizag",
    text: "Every purchase has been top quality. The buying experience is smooth and hassle-free",
    rating: 5,
  },
  {
    name: "Samir, Hyderabad",
    text: "I've been shopping here for 6 months and the products are great. Customer support is excellent too",
    rating: 5,
  },
  {
    name: "Riya, Delhi",
    text: "I was hesitant to buy from a new website, but the customer service manager helped me through it!",
    rating: 5,
  },
];

function HomePage() {
  const navigate = useNavigate();
  const saleProducts = products.filter((p) => p.badge === "Sale" || p.badge === "40% Off").slice(0, 4);
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-[oklch(0.987_0.022_95.277)] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-black max-w-lg">
            <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-2">
              🔥 Hot Summer Super Sale
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Smart Tools<br />
              <span className="text-cyan-400">Makes Your Life</span><br />
              Better
            </h1>
            <p className="text-black-300 text-base mb-6">
              Best prices on mobiles & accessories. Free shipping all over India.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => navigate("/catalog")}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition"
              >
                Shop Now <FaArrowRight />
              </button>
              <button
                onClick={() => navigate("/catalog?sale=true")}
                className="bg-transparent border-2 border-pink-500 hover:bg-pink-500 text-red font-bold px-6 py-3 rounded-xl transition"
              >
                View Offers 🔥
              </button>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-3 max-w-xs">
            {[
              { label: "48+ Products", sub: "Available" },
              { label: "Free Shipping", sub: "All Over India" },
              { label: "Cash on Delivery", sub: "Available" },
              { label: "24/7 Support", sub: "Always Online" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-black/10 backdrop-blur border border-black/20 rounded-xl p-3 text-center"
              >
                <p className="text-black font-bold text-sm">{s.label}</p>
                <p className="text--[oklch(0.987_0.022_95.277)]-400 text-xs">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => navigate(`/catalog?category=${encodeURIComponent(cat.label)}`)}
              className={`bg-gradient-to-br ${cat.color} rounded-2xl p-4 flex flex-col items-center gap-1.5 hover:scale-105 transition-transform duration-200 shadow-sm`}
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-white text-[10px] font-semibold text-center leading-tight">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Sale products */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🔥 Sale Products</h2>
          <button
            onClick={() => navigate("/catalog?sale=true")}
            className="text-cyan-600 text-sm font-semibold hover:underline flex items-center gap-1"
          >
            View All <FaArrowRight className="text-xs" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {saleProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <button
            onClick={() => navigate("/catalog")}
            className="text-cyan-600 text-sm font-semibold hover:underline flex items-center gap-1"
          >
            View All <FaArrowRight className="text-xs" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition"
              >
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <p className="font-bold text-gray-800 text-sm">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
