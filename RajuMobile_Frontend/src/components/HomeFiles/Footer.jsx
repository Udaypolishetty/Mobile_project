import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import AnimatedSection from "../AnimatedSection";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#f5f0eb]-950 text-gray-300 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection direction="up">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h2 className="text-white font-extrabold text-xl mb-1">
                <span className="text-cyan-400">Raju Mobiles</span> 
              </h2>
              <p className="text-gray-500 text-xs leading-relaxed mt-2">
                The Definitive Destination for Mobile Sales, Service, and Care.
              </p>
<div className="flex gap-4 mt-4">
  {[FaInstagram,FaFacebook,  FaYoutube].map((Icon, i) => {
    // Check if the current icon is the Instagram icon
    if (Icon === FaInstagram) {
      return (
        <a 
          key={i} 
          href="https://www.instagram.com/Raju_mobiles_Knr" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Icon className="text-gray-500 hover:text-cyan-400 text-lg cursor-pointer transition" />
        </a>
      );
    }

    // Return the normal icons for Facebook and YouTube
    return (
      <Icon key={i} className="text-gray-500 hover:text-cyan-400 text-lg cursor-pointer transition" />
    );
  })}
</div>
            </div>

            <div>
              <h4 className="text-cyan-400 font-bold mb-3">Quick Links</h4>
              <ul className="space-y-1.5">
                {[
                  { label: "Home", to: "/" },
                  { label: "Catalog", to: "/catalog" },
                  { label: "My Cart", to: "/cart" },
                  { label: "Wishlist", to: "/wishlist" },
                  { label: "Contact Us", to: "/contact" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-gray-600 hover:text-cyan-400 text-sm transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-cyan-400 font-bold mb-3">Let's Talk</h4>
              <div className="space-y-2.5">
                <a href="mailto:raju.mobile@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 text-sm transition">
                  <FaEnvelope className="text-gray-600 " /> raju.mobile@gmail.com
                </a>
                <p className="flex items-center gap-2 text-gray-400 text-sm">
                  <FaPhone className="text-gray-600 flex-shrink-0" /> +91 9652407756
                </p>
                <p className="flex items-center gap-2 text-gray-400 text-sm">
                  <FaMapMarkerAlt className="text-gray-600 flex-shrink-0" /> Karimnagar, Telangana, India
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

<div className="border-t border-gray-800 pt-4 mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
  <div className="flex items-center gap-4 text-xs flex-wrap">
    <button
      onClick={() => navigate("/info/privacy")}
      className="text-gray-500 hover:text-cyan-400 transition"
    >
      Privacy Policy
    </button>

    <button
      onClick={() => navigate("/info/terms")}
      className="text-gray-500 hover:text-cyan-400 transition"
    >
      Terms
    </button>

    <button
      onClick={() => navigate("/info/shipping")}
      className="text-gray-500 hover:text-cyan-400 transition"
    >
      Shipping
    </button>
  </div>

  <div className="text-xs text-gray-500 md:text-right">
    © 2026 Raju Mobile. All Rights Reserved.
  </div>
</div>
</div>

    </footer>
  );
}

export default Footer;
