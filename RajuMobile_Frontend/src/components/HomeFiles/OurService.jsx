import AnimatedSection from "../AnimatedSection";
const whyUs = [
  {
    image: "/star.png",
    title: "Top Rated Products",
  },
  {
    image: "/deliverytruck.png",
    title: "Free & Fast Delivery",
  },
  {
    image: "/buy.png",
    title: "Cash On Delivery",
  },
  {
    image: "/customerservice.png",
    title: "24/7 Customer Support",
  },
  {
    image: "/verified.png",
    title: "100% Genuine Products",
  },
  {
    image: "/repair.png",
    title: "All Types Repair Available",
  },
];
const testimonials = [
  { name: "Shreya, Vizag", text: "Every purchase has been top quality. The buying experience is smooth and hassle-free", rating: 5 },
  { name: "Samir, Hyderabad", text: "I've been shopping here for 6 months and the products are great. Customer support is excellent too", rating: 5 },
  { name: "Riya, Delhi", text: "I was hesitant to buy from a new website, but the customer service manager helped me through it!", rating: 5 },
];

function OurService() {
  return (
    <>
      {/* WHY BUY FROM US */}
      <section className="py-14 bg-[#f5f0eb]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection direction="up">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Why Buy from Us?
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              We make sure every shopping experience is worth it
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {whyUs.map((item, i) => (
              <AnimatedSection
                key={item.title}
                direction="up"
                delay={i * 100}
              >
                <div className="bg-white rounded-[28px] px-5 py-7 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center">

                  <img
                    src={item.image}
                    alt={item.title}
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
      </section>



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
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} direction="up" delay={i * 100}>
                <div className="h-full rounded-2xl bg-[#fafafa] p-6 ring-1 ring-gray-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <span key={j} className="text-[13px] text-amber-400">★</span>
                    ))}
                  </div>

                  <p className="text-sm leading-7 text-gray-600 mb-5">
                    “{t.text}”
                  </p>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400 mt-1">Verified customer</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <AnimatedSection direction="up">
        <section className="bg-[#f5f0eb] py-12">
          <div className="max-w-xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-black mb-1">
              Subscribe to Our Emails
            </h2>

            <p className="text-gray-400 text-sm mb-6">
              Join our email list for exclusive offers and the latest news.
            </p>

            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-3 rounded-l-xl bg-white border border-gray-300 outline-none text-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
              />

              <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-r-xl font-bold text-sm transition">
                →
              </button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
}

export default OurService;