import { useParams, Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaFileContract,
  FaTruck,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";

function FooterInfo() {
  const { type } = useParams();

  const content = {
    privacy: {
      icon: FaShieldAlt,
      eyebrow: "Customer Privacy",
      title: "Privacy Policy",
      subtitle:
        "Your personal information is handled with care, transparency, and only for legitimate order-related purposes.",
      highlights: [
        "Secure customer data handling",
        "No unauthorized selling of data",
        "Used only for support, billing, and delivery",
      ],
      sections: [
        {
          heading: "Information we collect",
          points: [
            "We may collect your name, phone number, email address, shipping address, and order details when you shop with us.",
            "Payment-related information may be processed through trusted payment partners for secure transactions.",
            "Basic browsing or device information may be used to improve website performance and user experience.",
          ],
        },
        {
          heading: "How we use your data",
          points: [
            "Customer information is used for order confirmation, shipping, delivery updates, and customer support.",
            "We may use your contact details to notify you about order status, return requests, or service-related communication.",
            "Promotional messages are only sent when applicable and can be limited or stopped based on user preference.",
          ],
        },
        {
          heading: "Data sharing and protection",
          points: [
            "We do not sell or rent your personal information to third parties.",
            "Limited data may be shared only with logistics, payment, or service partners when needed to complete your order.",
            "Reasonable technical and administrative safeguards are used to protect your information from misuse or unauthorized access.",
          ],
        },
      ],
    },

    terms: {
      icon: FaFileContract,
      eyebrow: "Store Policies",
      title: "Terms of Service",
      subtitle:
        "These terms explain how purchases, pricing, usage, and customer responsibilities are handled on Raju Mobile.",
      highlights: [
        "Fair usage of platform",
        "Order review and cancellation rights",
        "Product details subject to availability",
      ],
      sections: [
        {
          heading: "General usage",
          points: [
            "By using Raju Mobile, you agree to our store policies, terms, and applicable conditions of purchase.",
            "You are responsible for providing accurate account, contact, and delivery information while placing orders.",
            "Improper use of the website, fraudulent orders, or misuse of offers may lead to cancellation or account restrictions.",
          ],
        },
        {
          heading: "Pricing and products",
          points: [
            "Product prices, specifications, offers, and availability may change without prior notice.",
            "We try to keep product information accurate, but occasional errors in pricing, stock, or descriptions may occur.",
            "In such cases, we reserve the right to correct the issue and cancel or refuse the affected order if required.",
          ],
        },
        {
          heading: "Orders and liability",
          points: [
            "Orders may be canceled in cases of payment issues, stock shortages, duplicate transactions, or suspicious activity.",
            "Delivery timelines are estimates and may vary due to courier, location, weather, or operational conditions.",
            "Raju Mobile is not responsible for indirect losses arising from delays, temporary unavailability, or third-party service interruptions.",
          ],
        },
      ],
    },

    shipping: {
      icon: FaTruck,
      eyebrow: "Delivery Support",
      title: "Shipping Information",
      subtitle:
        "We aim to deliver orders quickly, safely, and with clear communication throughout the shipping process.",
      highlights: [
        "Pan-India shipping support",
        "Fast order processing",
        "Tracking updates after dispatch",
      ],
      sections: [
        {
          heading: "Processing time",
          points: [
            "Most orders are processed within 1 to 2 business days after confirmation.",
            "Processing may take longer during peak sale periods, holidays, or high-demand product launches.",
            "Orders placed with incomplete information may be delayed until verification is complete.",
          ],
        },
        {
          heading: "Delivery timelines",
          points: [
            "Delivery times vary based on your city, serviceable area, and courier partner availability.",
            "Metro cities are usually delivered faster, while remote locations may require additional transit time.",
            "Customers receive dispatch updates and shipment progress when tracking information becomes available.",
          ],
        },
        {
          heading: "Shipping conditions",
          points: [
            "Shipping charges, if applicable, are shown during checkout before payment confirmation.",
            "Customers should inspect the package at delivery and report visible damage or missing items as early as possible.",
            "Unexpected delays may happen due to weather, logistics disruptions, or regional service limitations beyond our direct control.",
          ],
        },
      ],
    },
  };

  const page = content[type];

  if (!page) {
    return (
      <div className="min-h-screen bg-[#f7f4ef] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 md:p-12 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Page Not Found
            </h1>
            <p className="text-gray-500 text-sm md:text-base mb-6">
              The information page you are looking for does not exist.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-2xl font-semibold hover:bg-cyan-600 transition"
            >
              <FaArrowLeft className="text-sm" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = page.icon;

  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-6"
        >
          <FaArrowLeft className="text-xs" />
          Back
        </Link>

        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 md:px-10 py-8 md:py-12 bg-gradient-to-br from-white via-[#fcfbf8] to-cyan-50/40 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <Icon className="text-[11px]" />
                  {page.eyebrow}
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                  {page.title}
                </h1>

                <p className="text-gray-500 leading-7 text-sm md:text-base max-w-2xl">
                  {page.subtitle}
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 p-5 min-w-[220px] shadow-sm">
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-3">
                  Quick Notes
                </p>
                <div className="space-y-3">
                  {page.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <FaCheckCircle className="text-emerald-500 text-sm mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-700 leading-6">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">Last updated</p>
                  <p className="text-sm font-semibold text-gray-700">June 2026</p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 md:px-10 py-8 md:py-10">
            <div className="grid gap-5">
              {page.sections.map((section, index) => (
                <div
                  key={section.heading}
                  className="bg-[#fcfbf8] border border-gray-100 rounded-[28px] p-6 md:p-7"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-cyan-50 flex items-center justify-center">
                      <span className="text-cyan-600 font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900">
                      {section.heading}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {section.points.map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <span className="w-2 h-2 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
                        <p className="text-gray-600 leading-7 text-sm md:text-[15px]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] bg-black text-white p-6 md:p-8">
              <h3 className="text-xl font-bold mb-2">Need more help?</h3>
              <p className="text-white/70 text-sm leading-7 max-w-2xl mb-5">
                For questions about policies, shipping, orders, privacy, or account-related
                concerns, contact our support team and we will guide you with the right details.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-2xl font-semibold hover:bg-cyan-100 transition"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterInfo;