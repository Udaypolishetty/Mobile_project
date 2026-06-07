import { useParams, Link } from "react-router-dom";
import { FaShieldAlt, FaFileContract, FaTruck, FaArrowLeft, FaCheck } from "react-icons/fa";

// ── Exported so AuthModal can import and reuse ──────────────────
export const policyContent = {
  privacy: {
    icon: FaShieldAlt,
    eyebrow: "Privacy",
    title: "Privacy Policy",
    subtitle: "Your data is handled with care — only used to process orders and support you.",
    sections: [
      {
        heading: "What we collect",
        points: [
          "Name, phone, email, and address when you place an order.",
          "Payment info processed securely via trusted payment partners.",
          "Basic device/browsing data to improve site performance.",
        ],
      },
      {
        heading: "How we use it",
        points: [
          "To confirm orders, arrange delivery, and send updates.",
          "To contact you about your order or support requests.",
          "Promotional messages only when relevant — easily opted out.",
        ],
      },
      {
        heading: "Who we share it with",
        points: [
          "We never sell or rent your data to anyone.",
          "Only shared with delivery or payment partners to fulfill your order.",
          "All data is protected with standard security practices.",
        ],
      },
    ],
  },

  terms: {
    icon: FaFileContract,
    eyebrow: "Terms",
    title: "Terms of Service",
    subtitle: "Simple rules that keep shopping fair and transparent for everyone.",
    sections: [
      {
        heading: "Using our store",
        points: [
          "By shopping here you agree to provide accurate information.",
          "Fraudulent orders or misuse of offers may lead to cancellation.",
          "We reserve the right to refuse service in cases of abuse.",
        ],
      },
      {
        heading: "Prices & products",
        points: [
          "Prices and availability can change without prior notice.",
          "Product images and descriptions are as accurate as possible.",
          "We may cancel orders affected by pricing or stock errors.",
        ],
      },
      {
        heading: "Orders & delivery",
        points: [
          "Orders can be canceled due to payment issues or stock shortage.",
          "Delivery timelines are estimates — delays may occur occasionally.",
          "We are not liable for losses caused by third-party service issues.",
        ],
      },
    ],
  },

  shipping: {
    icon: FaTruck,
    eyebrow: "Shipping",
    title: "Shipping Info",
    subtitle: "Fast dispatch, pan-India delivery, with tracking once your order ships.",
    sections: [
      {
        heading: "Processing",
        points: [
          "Most orders are dispatched within 1–2 business days.",
          "Peak periods or incomplete info may cause slight delays.",
        ],
      },
      {
        heading: "Delivery time",
        points: [
          "Metro cities typically receive orders faster.",
          "Remote areas may need extra transit days.",
          "Tracking details are shared after dispatch.",
        ],
      },
      {
        heading: "Charges & inspection",
        points: [
          "Shipping charges (if any) are shown before payment.",
          "Inspect your package on arrival and report damage immediately.",
        ],
      },
    ],
  },
};

// ── Page component ──────────────────────────────────────────────
function FooterInfo() {
  const { type } = useParams();
  const page = policyContent[type];

  if (!page) {
    return (
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center max-w-sm w-full">
          <p className="text-5xl mb-4">🔍</p>
          <h1 className="text-xl font-extrabold text-gray-900 mb-2">Page not found</h1>
          <p className="text-gray-400 text-sm mb-6">This info page doesn't exist.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-2xl font-semibold hover:bg-cyan-600 transition text-sm">
            <FaArrowLeft className="text-xs" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = page.icon;

  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">

        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-800 transition mb-6 group">
          <FaArrowLeft className="text-xs group-hover:-translate-x-0.5 transition-transform" /> Back
        </Link>

        {/* Hero */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-cyan-50 rounded-2xl flex items-center justify-center">
              <Icon className="text-cyan-600 text-base" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600">{page.eyebrow}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">{page.title}</h1>
          <p className="text-gray-500 text-sm leading-relaxed">{page.subtitle}</p>
          <p className="text-[11px] text-gray-300 mt-3">Last updated · June 2026</p>
        </div>

        {/* Sections */}
        <div className="space-y-3 mb-4">
          {page.sections.map((section, i) => (
            <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-cyan-600">{i + 1}</span>
                </div>
                <h2 className="font-bold text-gray-800 text-sm md:text-base">{section.heading}</h2>
              </div>
              <div className="space-y-2.5">
                {section.points.map((point, j) => (
                  <div key={j} className="flex gap-3">
                    <FaCheck className="text-cyan-500 text-[10px] mt-1.5 flex-shrink-0" />
                    <p className="text-gray-500 text-sm leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Help strip */}
        <div className="bg-gray-900 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white text-sm">Have a question?</p>
            <p className="text-gray-400 text-xs mt-0.5">Our support team is happy to help.</p>
          </div>
          <Link to="/contact" className="flex-shrink-0 bg-white text-black text-sm font-bold px-5 py-2.5 rounded-2xl hover:bg-cyan-100 transition">
            Contact Us
          </Link>
        </div>

      </div>
    </div>
  );
}

export default FooterInfo;