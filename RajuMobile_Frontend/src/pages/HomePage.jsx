import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import AnimatedSection from "../components/AnimatedSection";
import { products } from "../data/products";
import { FaTruck, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { MdPayments } from "react-icons/md";

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
  { name: "Shreya, Vizag", text: "Every purchase has been top quality. The buying experience is smooth and hassle-free", rating: 5 },
  { name: "Samir, Hyderabad", text: "I've been shopping here for 6 months and the products are great. Customer support is excellent too", rating: 5 },
  { name: "Riya, Delhi", text: "I was hesitant to buy from a new website, but the customer service manager helped me through it!", rating: 5 },
];

const whyUs = [
  { icon: "⭐", title: "Top Rated & Lowest Prices", desc: "Guaranteed best prices on all products" },
  { icon: "🚚", title: "Free & Fast Shipping", desc: "Free delivery across all of India" },
  { icon: "💵", title: "Cash on Delivery", desc: "Pay when your order arrives" },
  { icon: "🎧", title: "24/7 Customer Support", desc: "We're always here to help you" },
];

function CategoryProducts({ category }) {
  const filtered = products.filter((p) =>
    category === "Sale" ? (p.badge === "Sale" || p.badge === "40% Off") : p.category === category
  );
  if (filtered.length === 0) return <p className="text-gray-400 text-sm py-4">No products in this category yet.</p>;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {filtered.map((p, i) => (
        <AnimatedSection key={p.id} direction="up" delay={i * 60}>
          <ProductCard product={p} />
        </AnimatedSection>
      ))}
    </div>
  );
}

function ProductSection({ title, filterKey, emoji = "" }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-6 pb-10">
      <AnimatedSection direction="up">
        <div
          className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-5 py-4 cursor-pointer hover:shadow-md hover:border-cyan-300 transition-all duration-200 group"
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{emoji}</span>
            <div>
              <h2 className="text-base font-bold text-gray-800">{title}</h2>
              <p className="text-xs text-gray-400">Click to browse products</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(filterKey === "Sale" ? "/catalog?sale=true" : `/catalog?category=${encodeURIComponent(filterKey)}`);
              }}
              className="hidden sm:flex items-center gap-1 text-cyan-600 text-xs font-semibold hover:underline"
            >
              View All <FaArrowRight className="text-[10px]" />
            </button>
            <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${open ? "rotate-180 text-cyan-500" : "group-hover:text-cyan-400"}`} />
          </div>
        </div>

        {open && (
          <div className="mt-1 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm animate-fadeIn">
            <CategoryProducts category={filterKey} />
            <div className="text-center mt-4">
              <button
                onClick={() => navigate(filterKey === "Sale" ? "/catalog?sale=true" : `/catalog?category=${encodeURIComponent(filterKey)}`)}
                className="text-cyan-600 text-sm font-semibold hover:underline inline-flex items-center gap-1"
              >
                See all {title} <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </AnimatedSection>
    </section>
  );
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f0eb]">

      {/* ── HERO (matches the image: red bg card + text below) ── */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative rounded-3xl overflow-hidden  shadow-xl min-h-[320px] md:min-h-[380px] flex flex-col md:flex-row items-end md:items-stretch">
          {/* Red bg image side */}
          <div className="w-full md:w-3/5 relative flex-shrink-0 min-h-[200px] md:min-h-0">
            <img
              src="./background_img2.png"
              alt="Mobile Accessories"
              className="absolute inset-0 w-full h-full object-cover "
            />
            {/* Accessories flat lay overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c8102e]/20 to-[#8b0000]/10" />
            {/* Store logo badge */}
            <div className="absolute top-5 right-5 md:top-8 md:right-8 bg-[#c8102e] border-2 border-white/30 rounded-2xl px-4 py-3 text-center shadow-lg">
              <p className="text-white text-[10px] font-bold tracking-widest uppercase">Raju's</p>
              <p className="text-white text-lg font-black leading-none">MOBILE</p>
              <p className="text-white/80 text-[9px] tracking-widest uppercase">Accessories</p>
            </div>
            {/* Phone icon */}
            {/* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
              <div className="w-24 h-24 border-4 border-white rounded-3xl" />
            </div> */}
          </div>

          {/* Bottom / Right text panel */}
          <div className="w-full md:w-2/5 bg-white md:rounded-none rounded-b-3xl px-6 py-6 md:py-8 md:px-8 flex flex-col justify-center">
            <AnimatedSection direction="left" delay={100}>
              <p className="text-red-600 text-xs font-bold uppercase tracking-widest mb-1">🔥 Summer Sale Live</p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
                Smart Tools<br />Makes your Life<br /><span className="text-[#c8102e]">Easier</span>
              </h1>
              <p className="text-gray-500 text-sm mb-5">Best prices · Free shipping all over India</p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => navigate("/catalog")}
                  className="bg-[#8b3fa8] hover:bg-[#7a35961] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition hover:opacity-90 shadow"
                >
                  Shop now
                </button>
                <button
                  onClick={() => navigate("/catalog?sale=true")}
                  className="bg-black/5 border border-gray-200 hover:border-red-400 text-gray-700 font-semibold px-5 py-2.5 rounded-xl text-sm transition"
                >
                  View Offers
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>



        {/* Trust strip */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
  {[
    {
      icon: <FaTruck />,
      title: "Free Shipping",
      sub: "Across India",
    },
    {
      icon: <MdPayments />,
      title: "Cash on Delivery",
      sub: "Pay at doorstep",
    },
    {
      icon: <FaShieldAlt />,
      title: "100% Genuine",
      sub: "Trusted products",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      sub: "Always available",
    },
  ].map((item) => (
    <div
      key={item.title}
      className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center text-white text-xl shadow-lg">
          {item.icon}
        </div>

        <div>
          <h4 className="font-bold text-gray-900 text-sm">
            {item.title}
          </h4>
          <p className="text-xs text-gray-500">
            {item.sub}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>



      </section>

      {/* ── CATEGORIES quick buttons ── */}
      {/* <AnimatedSection direction="up" className="max-w-7xl mx-auto px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Shop by Category</h2>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.label} direction="up" delay={i * 50}>
              <button
                onClick={() => navigate(`/catalog?category=${encodeURIComponent(cat.label)}`)}
                className={`bg-gradient-to-br ${cat.color} rounded-2xl p-3 flex flex-col items-center gap-1 hover:scale-105 transition-transform duration-200 shadow-sm w-full`}
              >
                <span className="text-xl">{cat.emoji}</span>
                <span className="text-white text-[9px] font-semibold text-center leading-tight">{cat.label}</span>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection> */}

      {/* ── PRODUCT SECTIONS (accordion style — click to reveal) ── */}
      {/* <div className="mt-4">
        <ProductSection title="🔥 Sale & Offers" filterKey="Sale" emoji="🔥" />
        <ProductSection title="Mobiles" filterKey="Mobiles" emoji="📱" />
        <ProductSection title="Earphones & Headphones" filterKey="Earphones" emoji="🎧" />
        <ProductSection title="Chargers" filterKey="Chargers" emoji="⚡" />
        <ProductSection title="Cases & Covers" filterKey="Cases & Covers" emoji="🛡️" />
        <ProductSection title="Smart Watches" filterKey="Smart Watches" emoji="⌚" />
        <ProductSection title="Power Banks" filterKey="Power Banks" emoji="🔋" />
        <ProductSection title="Accessories" filterKey="Accessories" emoji="🎮" />
      </div> */}

      {/* ── TESTIMONIALS ── */}
      <section className="bg-white py-14 mt-4">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection direction="up">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Testimonials</h2>
            <p className="text-gray-400 text-sm mb-8">What our customers say about us</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} direction="up" delay={i * 120}>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition h-full">
                  <div className="flex mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <span key={j} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                  <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BUY FROM US ── */}
      <section className="py-14 bg-[#f5f0eb]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection direction="up">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Why Buy from Us?</h2>
            <p className="text-gray-400 text-sm mb-8">We make sure every shopping experience is worth it</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {whyUs.map((item, i) => (
              <AnimatedSection key={item.title} direction="up" delay={i * 100}>
                <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <p className="font-bold text-gray-800 text-sm mb-1">{item.title}</p>
                  <p className="text-gray-400 text-xs">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIBE ── */}
      <AnimatedSection direction="up">
        <section className="bg-[#f5f0eb] py-12">
          <div className="max-w-xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-black mb-1">Subscribe to Our Emails</h2>
            <p className="text-gray-400 text-sm mb-6">Join our email list for exclusive offers and the latest news.</p>
            <div className="flex max-w-md mx-auto">
              <input type="email" placeholder="Email" className="flex-1 px-4 py-3 rounded-l-xl bg-white text-black-900 outline-none text-sm" />
              <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-r-xl font-bold text-sm transition">→</button>
            </div>
          </div>
        </section>
      </AnimatedSection>

    </div>
  );
}

export default HomePage;
