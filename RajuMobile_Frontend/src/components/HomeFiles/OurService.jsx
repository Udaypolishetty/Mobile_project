import AnimatedSection from "../AnimatedSection";

const whyUs = [
  {
    image: "/star.png",
    title: "Top rated & Lowest prices offered!",
  },
  {
    image: "/deliverytruck.png",
    title: "Enjoy Free & Fast Shipping!",
  },
  {
    image: "/buy.png",
    title: "Cash on Delivery Available",
  },
  {
    image: "/customerservice.png",
    title: "24/7 Customer Support Available",
  },
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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