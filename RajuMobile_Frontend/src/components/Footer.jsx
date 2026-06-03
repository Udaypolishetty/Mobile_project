import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Why buy section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            { icon: "⭐", title: "Top Rated & Lowest Prices", desc: "Guaranteed best prices" },
            { icon: "🚚", title: "Free & Fast Shipping", desc: "All over India!!" },
            { icon: "💵", title: "Cash on Delivery", desc: "Available on all orders" },
            { icon: "🎧", title: "24/7 Customer Support", desc: "Always here to help" },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-gray-900 rounded-xl p-4 text-center hover:bg-gray-800 transition"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="font-semibold text-white text-sm mb-0.5">{item.title}</p>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Subscribe */}
        <div className="bg-gradient-to-r from-cyan-900/30 to-pink-900/20 rounded-2xl p-6 mb-10 text-center">
          <h3 className="text-white font-bold text-xl mb-1">Subscribe to Our Emails</h3>
          <p className="text-gray-400 text-sm mb-4">Join our email list for exclusive offers and the latest news.</p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-4 py-2.5 rounded-l-xl bg-white text-gray-800 outline-none text-sm"
            />
            <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2.5 rounded-r-xl font-semibold text-sm transition">
              →
            </button>
          </div>
        </div>

        {/* Links & Contact */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-3">Raju Mobile</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your one-stop shop for mobile phones and accessories. Best prices, genuine products.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Quick Links</h4>
            <ul className="space-y-1.5">
              {[
                { label: "Home", to: "/" },
                { label: "Catalog", to: "/catalog" },
                { label: "Contact", to: "/contact" },
                { label: "Privacy Policy", to: "/privacy" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-cyan-400 text-sm transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Let's Talk</h4>
            <p className="text-gray-400 text-sm mb-2">Questions or need assistance?</p>
            <a
              href="mailto:raju.mobile@gmail.com"
              className="flex items-center gap-2 text-cyan-400 text-sm hover:underline"
            >
              <FaEnvelope /> raju.mobile@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">© 2026 Raju Mobile Accessories. All rights reserved.</p>
          <div className="flex gap-4">
            {[FaFacebook, FaInstagram, FaYoutube].map((Icon, i) => (
              <Icon
                key={i}
                className="text-gray-500 hover:text-cyan-400 text-lg cursor-pointer transition"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
