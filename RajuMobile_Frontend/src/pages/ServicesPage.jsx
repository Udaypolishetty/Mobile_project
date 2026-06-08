import { useEffect, useRef, useState } from "react";
import {
  FaApple, FaAndroid, FaMobileAlt, FaSimCard, FaCrown,
  FaTruck, FaPhone, FaInstagram, FaWhatsapp,
} from "react-icons/fa";
import { MdSignalCellularAlt } from "react-icons/md";

/* ── scroll-reveal ─────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, v };
}

function Reveal({ children, delay = 0 }) {
  const { ref, v } = useReveal();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ── data ───────────────────────────────────────────────────── */
const SERVICES = [
  {
    Icon: FaApple,
    iconColor: "#1d1d1f",
    iconBg:  "#f5f5f7",
    title: "iPhone Fix",
    sub:   "We Care, We Repair",
    tag:   "Same Day",
    tagBg: "#dcfce7",
    tagText: "#16a34a",
    points: ["Screen Replacement", "Battery Swap", "Charging Port", "Water Damage"],
  },
  {
    Icon: FaAndroid,
    iconColor: "#3ddc84",
    iconBg:  "#f0fdf4",
    title: "Android Repair",
    sub:   "All Brands, All Models",
    tag:   "All Brands",
    tagBg: "#eff6ff",
    tagText: "#1d4ed8",
    points: ["Samsung", "OnePlus", "Redmi / Mi", "Realme & Vivo"],
  },
  {
    Icon: FaMobileAlt,
    iconColor: "#f59e0b",
    iconBg:  "#fffbeb",
    title: "2nd Hand Phones",
    sub:   "Sales & Purchase",
    tag:   "Buy & Sell",
    tagBg: "#fff7ed",
    tagText: "#c2410c",
    points: ["Quality Checked", "All Brands", "Best Resale Value", "Instant Buy Price"],
  },
  {
    Icon: MdSignalCellularAlt,
    iconColor: "#e11d48",
    iconBg:  "#fff1f2",
    title: "SIM Cards",
    sub:   "All Networks Available",
    tag:   "Instant",
    tagBg: "#fdf4ff",
    tagText: "#7e22ce",
    points: ["Jio", "Airtel", "Vi (Vodafone)", "BSNL"],
    networks: [
      { name: "Jio",    color: "#0047ab" },
      { name: "Airtel", color: "#e00"    },
      { name: "Vi",     color: "#6f00c8" },
      { name: "BSNL",   color: "#006400" },
    ],
  },
  {
    Icon: FaCrown,
    iconColor: "#d97706",
    iconBg:  "#fffbeb",
    title: "VIP Numbers",
    sub:   "Stand Out from the Crowd",
    tag:   "Premium",
    tagBg: "#fef9c3",
    tagText: "#854d0e",
    points: ["Easy to Remember", "All Networks", "Fancy Patterns", "Business Numbers"],
  },
  {
    Icon: FaTruck,
    iconColor: "#0891b2",
    iconBg:  "#ecfeff",
    title: "Free Pickup & Delivery",
    sub:   "Upto 12 KM",
    tag:   "Free",
    tagBg: "#dcfce7",
    tagText: "#16a34a",
    points: ["Free of Cost", "Within 12 KM", "Same Day Return", "Doorstep Service"],
  },
];

const CONTACT = {
  phone1: "9000112262",
  phone2: "9652407756",
  ig:     "Raju_mobiles_Knr",
  igLink: "https://www.instagram.com/raju_mobiles_knr/",
};

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f0eb", fontFamily: "'DM Sans',sans-serif" }}>

      {/* ── Hero ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-5 pt-12 pb-8 text-center">
        <Reveal delay={0}>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-cyan-600 mb-3">
            Our Services
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-3"
            style={{ fontFamily: "'Syne',sans-serif" }}>
            We Care,{" "}
            <span className="text-cyan-600">We Repair</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            One-stop solution for all your mobile needs in Karimnagar — repairs, SIMs, second-hand phones and more.
          </p>
        </Reveal>
      </div>

      {/* ── Cards grid ────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 70}>
              <div
                className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3 h-full"
                style={{ transition: "box-shadow 0.25s ease, transform 0.25s ease" }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.10)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Icon + tag row */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: svc.iconBg }}>
                    <svc.Icon style={{ color: svc.iconColor, fontSize: "18px" }} />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: svc.tagBg, color: svc.tagText }}>
                    {svc.tag}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-bold text-gray-900 text-base leading-tight">{svc.title}</h3>
                  <p className="text-gray-400 text-xs mt-0.5">{svc.sub}</p>
                </div>

                {/* Network chips (SIM only) */}
                {svc.networks && (
                  <div className="flex gap-1.5 flex-wrap">
                    {svc.networks.map(n => (
                      <span key={n.name} className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                        style={{ background: `${n.color}15`, color: n.color, border: `1px solid ${n.color}30` }}>
                        {n.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Points */}
                <ul className="space-y-1.5 mt-auto">
                  {svc.points.map(p => (
                    <li key={p} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Contact strip ─────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 pb-12">
        <Reveal delay={0}>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[3px] text-cyan-600 mb-1">Get in Touch</p>
            <h2 className="font-extrabold text-gray-900 text-xl mb-1"
              style={{ fontFamily: "'Syne',sans-serif" }}>
              Raju Mobiles, Karimnagar
            </h2>
            <p className="text-gray-400 text-sm mb-5">
              Call, WhatsApp or DM us on Instagram — we're always available
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                {
                  label: `📞 ${CONTACT.phone1}`,
                  href: `tel:${CONTACT.phone1}`,
                  style: { background: "#0f172a", color: "white" },
                },
                {
                  label: `📞 ${CONTACT.phone2}`,
                  href: `tel:${CONTACT.phone2}`,
                  style: { background: "#0f172a", color: "white" },
                },
                {
                  label: "💬 WhatsApp",
                  href: `https://wa.me/91${CONTACT.phone1}`,
                  style: { background: "#25D366", color: "white" },
                },
                {
                  label: `📸 ${CONTACT.ig}`,
                  href: CONTACT.igLink,
                  style: { background: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)", color: "white" },
                },
              ].map(btn => (
                <a key={btn.href} href={btn.href} target="_blank" rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
                  style={btn.style}>
                  {btn.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

    </div>
  );
}
