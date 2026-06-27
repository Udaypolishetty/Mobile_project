import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import ProductCard from "../Products/ProductCard";
import AnimatedSection from "../AnimatedSection";
import { products } from "../../data/products";
import { FaTruck, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import buy from "/buy.png";
import deliverytruck from "/deliverytruck.png";
import star from "/star.png"
import customerservice from "/customerservice.png"
import OurService from "./OurService";
import { getReviews } from "../../api/reviewApi";

const categories = [
  { label: "Mobiles", emoji: "📱", color: "from-blue-600 to-cyan-500" },
  { label: "Earphones", emoji: "🎧", color: "from-purple-600 to-pink-500" },
  { label: "Chargers", emoji: "⚡", color: "from-yellow-500 to-orange-500" },
  { label: "Cases & Covers", emoji: "🛡️", color: "from-green-600 to-teal-500" },
  { label: "Smart Watches", emoji: "⌚", color: "from-gray-700 to-gray-900" },
  { label: "Power Banks", emoji: "🔋", color: "from-red-600 to-pink-600" },
  { label: "Accessories", emoji: "🎮", color: "from-indigo-600 to-blue-500" },
];
// const testimonials = [
//   {
//     name: "Suresh Kumar, Karimnagar",
//     text: "Got my iPhone screen fixed here. Very professional work and used genuine parts. The display looks brand new now!",
//     rating: 5
//   },
//   {
//     name: "Anjali Rao, Karimnagar",
//     text: "Best place for premium mobile accessories. I bought a heavy-duty back case and tempered glass. Prices are very competitive compared to other shops.",
//     rating: 5
//   },
//   {
//     name: "Mohammad Ali, Karimnagar",
//     text: "Excellent service! They picked up my phone and delivered it back after repair within the same day. The 12km free pickup service is a lifesaver.",
//     rating: 5
//   },
// ];

// const whyUs = [
//   {
//     image: "/star.png",
//     title: "Top rated & Lowest prices offered!",
//   },
//   {
//     image: "/deliverytruck.png",
//     title: "Enjoy Free & Fast Shipping!",
//   },
//   {
//     image: "/buy.png",
//     title: "Cash on Delivery Available",
//   },
//   {
//     image: "/customerservice.png",
//     title: "24/7 Customer Support Available",
//   },
// ];

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
const [reviews, setReviews] = useState([]);

  useEffect(() => {
  const fetchReviews = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  fetchReviews();
}, []);
  
  return (
    <div className="min-h-screen bg-[#f5f0eb]">

      {/* ── HERO (matches the image: red bg card + text below) ── */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative rounded-3xl overflow-hidden  shadow-xl min-h-[380px] md:min-h-[440px] flex flex-col md:flex-row items-end md:items-stretch">
          {/* Red bg image side */}
          <div className="w-full md:w-3/5 relative flex-shrink-0 min-h-[200px] md:min-h-0">
            <img
              src="./homepageimg.png"
              alt="Mobile Accessories"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            {/* Accessories flat lay overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c8102e]/20 to-[#8b0000]/10" />
            {/* Store Logo */}
            {/* <div className="absolute top-5 right-5 md:top-8 md:right-8">
  <img
    src="/mobile_logo.png"
    alt="Raju Mobile"
    className="w-28 md:w-36 h-auto drop-shadow-xl bg-[#f5f0eb]"
  />
</div> */}
            {/* Phone icon */}
            {/* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
              <div className="w-24 h-24 border-4 border-white rounded-3xl" />
            </div> */}
          </div>

          {/* Bottom / Right text panel */}
          <div className="w-full md:w-2/5 bg-white md:rounded-none rounded-b-3xl px-6 py-6 md:py-8 md:px-8 flex flex-col justify-center">
            <AnimatedSection direction="left" delay={100}>
              <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-1">
                SALES • REPAIRS • ACCESSORIES
              </p>

              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
                We Care.<br />
                We <span className="text-[#C70000]">Repair.</span><br />
                We Upgrade.
              </h1>

              <p className="text-gray-500 text-sm mb-5">
                Mobile Accessories, Repairs & SIM Services at Best Prices
              </p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => navigate("/catalog")}
                  className=" bg-gradient-to-br from-violet-800 to-indigo-600 hover:bg-[#7a35961] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition hover:opacity-90 shadow"
                >
                  Shop now
                </button>
                <button
                  onClick={() => navigate("/services")}
                  className="bg-black/5 border border-gray-200 hover:border-red-400 text-gray-700 font-semibold px-5 py-2.5 rounded-xl text-sm transition"
                >
                  View Services
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>






      </section>

      <OurService />


      {/* ── TESTIMONIALS ── */}
       <section className="bg-[#f5f0eb] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection direction="up">
            <div className="mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c8102e] mb-3">
                Testimonials
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Why customers choose us


              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Real feedback from people who shop with us.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((t, i) => (
              <AnimatedSection key={t.id} direction="up" delay={i * 100}>
                <div className="h-full rounded-2xl bg-[#fafafa] p-6 ring-1 ring-gray-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <span key={j} className="text-[13px] text-amber-400">★</span>
                    ))}
                  </div>

                  <p className="text-sm leading-7 text-gray-600 mb-5">
                    “{t.review}”
                  </p>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-semibold text-gray-900">{t.user_name}</p>
                    <p className="text-xs text-gray-400 mt-1">Verified customer</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section> 





      {/* ── WHY BUY FROM US ── */}
      {/* ── WHY BUY FROM US ── */}
      {/* <section className="py-14 bg-[#f5f0eb]">
  <div className="max-w-7xl mx-auto px-6">
    <AnimatedSection direction="up">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Why Buy from Us?</h2>
      <p className="text-gray-400 text-sm mb-8">
        We make sure every shopping experience is worth it
      </p>
    </AnimatedSection>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {whyUs.map((item, i) => (
        <AnimatedSection key={item.title} direction="up" delay={i * 100}>
          <div className="bg-white rounded-[28px] px-5 py-7 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center">
            
            <img
              src={item.image}
              alt={item.title}
              width={72}
              height={72}
              loading="lazy"
              className="w-[72px] h-[72px] object-contain mb-5"
            />

            <p className="font-bold text-gray-800 text-sm leading-6 max-w-[140px]">
              {item.title}
            </p>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </div>
</section> */}




      {/* ── SUBSCRIBE ── */}
      {/* // <AnimatedSection direction="up">
      //   <section className="bg-[#f5f0eb] py-12">
      //     <div className="max-w-xl mx-auto px-6 text-center">
      //       <h2 className="text-2xl font-bold text-black mb-1">Subscribe to Our Emails</h2>
      //       <p className="text-gray-400 text-sm mb-6">Join our email list for exclusive offers and the latest news.</p>
      //       <div className="flex max-w-md mx-auto">
      //         <input type="email" placeholder="Email" className="flex-1 px-4 py-3 rounded-l-xl bg-white text-black-900 outline-none text-sm" />
      //         <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-r-xl font-bold text-sm transition">→</button>
      //       </div>
      //     </div>
      //   </section>
      // </AnimatedSection> */}
    </div>
  );
}

export default HomePage;
