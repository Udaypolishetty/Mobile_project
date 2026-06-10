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
    description: "Careful diagnostics and precision repairs using quality-tested replacement parts.",
    images: [
      "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592286927505-1def25115558?auto=format&fit=crop&w=700&q=80",
    ],
    details: [{ value: "30-90 min", label: "Typical repair" }, { value: "Tested", label: "Before return" }],
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
    description: "Reliable repairs for popular Android phones, from everyday fixes to deeper hardware issues.",
    images: [
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80",
    ],
    details: [{ value: "Multi-brand", label: "Repair support" }, { value: "Full", label: "Device check" }],
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
    description: "Buy or sell with confidence. Every phone is inspected for performance, battery and condition.",
    images: [
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80",
    ],
    details: [{ value: "40+ point", label: "Quality check" }, { value: "Instant", label: "Price quote" }],
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
    description: "New connections, porting and recharge assistance for every major mobile network.",
    images: [
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=700&q=80",
    ],
    details: [{ value: "4 networks", label: "Available here" }, { value: "Quick", label: "Activation help" }],
    points: ["Jio", "Airtel", "Vi (Vodafone)", "BSNL","RECHARGE","DTH"],
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
    description: "Memorable number patterns selected for personal identity, business and premium use.",
    images: [
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520923642038-b4259acecbd7?auto=format&fit=crop&w=700&q=80",
    ],
    details: [{ value: "Curated", label: "Number patterns" }, { value: "All", label: "Major networks" }],
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
    description: "A convenient doorstep repair experience with careful pickup and timely return.",
    images: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=700&q=80",
    ],
    details: [{ value: "12 KM", label: "Service radius" }, { value: "Same day", label: "Fast return" }],
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
      <style>{`
        .service-card {
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px -10px rgba(139, 92, 26, 0.05);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .service-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background: linear-gradient(125deg, transparent 20%, rgba(8,145,178,.045), transparent 65%);
          transform: translateX(-110%);
          transition: transform .9s cubic-bezier(.16, 1, .3, 1);
        }
        .service-content { position: relative; z-index: 2; }
        .service-carousel {
          scrollbar-width: none;
          -ms-overflow-style: none;
          overscroll-behavior-inline: contain;
        }
        .service-carousel::-webkit-scrollbar { display: none; }
        .service-photo {
          transition: transform .7s cubic-bezier(.16, 1, .3, 1), filter .5s ease;
        }
        .image-badge {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity .35s ease .12s, transform .45s cubic-bezier(.16, 1, .3, 1) .12s;
        }
        .service-icon {
          border-radius: 30%;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.8), 0 8px 20px -12px rgba(0,0,0,.35);
          transition: transform .35s cubic-bezier(.16, 1, .3, 1);
        }
        .point-dot { transition: transform .35s cubic-bezier(.16, 1, .3, 1), box-shadow .35s ease; }
        @media (hover: hover) and (pointer: fine) {
          .service-card:hover {
            transform: translateY(-6px);
            border-color: rgba(8,145,178,.18);
            box-shadow: 0 30px 70px -20px rgba(50,38,28,.24);
          }
          .service-card:hover::before { transform: translateX(110%); }
          .service-card:hover .service-photo { transform: scale(1.05); }
          .image-link:hover .image-badge { opacity: 1; transform: translateY(0); }
          .service-card:hover .service-icon { transform: scale(1.1); }
          .service-card:hover .point-dot {
            transform: translateX(2px) scale(1.15);
            box-shadow: 0 0 0 4px rgba(34,211,238,.12);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .service-card, .service-photo, .service-icon, .service-card::before, .image-badge, .point-dot {
            transition: none !important;
          }
        }
      `}</style>

      {/* ── Hero ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-5 pt-16 md:pt-24 pb-10 md:pb-14 text-center">
        <Reveal delay={0}>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-cyan-600 mb-3">
            Our Services
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-950 tracking-[-0.045em] leading-[1.04] mb-5"
            style={{ fontFamily: "'Syne',sans-serif" }}>
            We Care,{" "}
            <span className="text-cyan-600">We Repair</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            One-stop solution for all your mobile needs in Karimnagar - repairs, SIMs, second-hand phones and more.
          </p>
        </Reveal>
      </div>

      {/* ── Cards grid ────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 70}>
              <div
                className="service-card group bg-white rounded-[28px] border border-white/80 p-3 sm:p-4 flex flex-col h-full"
              >
                {/* Swipeable service gallery */}
                <div className="service-carousel flex overflow-x-auto snap-x snap-mandatory scrollbar-none rounded-[22px] bg-gray-100">
                  {svc.images.map((image, imageIndex) => (
                    <a
                      key={image}
                      href={image.split("?")[0]}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${svc.title} image ${imageIndex + 1}`}
                      className="image-link relative min-w-full h-56 md:h-[16.5rem] snap-center overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`${svc.title} ${imageIndex + 1}`}
                        className="service-photo h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
                      <span className="image-badge absolute right-4 bottom-4 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-[10px] font-bold tracking-wide text-white shadow-lg backdrop-blur-xl">
                        {"View Image \u2197"}
                      </span>
                      <span className="absolute left-4 bottom-4 text-[10px] font-semibold text-white/80">
                        {String(imageIndex + 1).padStart(2, "0")} / {String(svc.images.length).padStart(2, "0")}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="service-content flex flex-1 flex-col gap-5 px-2 sm:px-3 pt-5 pb-3">
                  {/* Icon + tag row */}
                  <div className="flex items-center justify-between">
                    <div className="service-icon w-12 h-12 flex items-center justify-center flex-shrink-0 group-hover:scale-110"
                      style={{ background: svc.iconBg }}>
                      <svc.Icon style={{ color: svc.iconColor, fontSize: "20px" }} />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full"
                      style={{ background: svc.tagBg, color: svc.tagText }}>
                      {svc.tag}
                    </span>
                  </div>

                  {/* Editorial content */}
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-600 mb-2">{svc.sub}</p>
                    <h3 className="font-extrabold text-gray-950 text-2xl tracking-[-0.03em] leading-tight">{svc.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mt-3">{svc.description}</p>
                  </div>

                  {/* Network chips (SIM only) */}
                  {svc.networks && (
                    <div className="flex gap-2 flex-wrap">
                      {svc.networks.map(n => (
                        <span key={n.name} className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                          style={{ background: `${n.color}15`, color: n.color, border: `1px solid ${n.color}30` }}>
                          {n.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quick details */}
                  <div className="grid grid-cols-2 gap-3">
                    {svc.details.map(detail => (
                      <div key={detail.label} className="rounded-2xl px-4 py-3 border border-gray-100"
                        style={{ background: `${svc.iconBg}90` }}>
                        <p className="text-sm font-extrabold text-gray-950">{detail.value}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{detail.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Service points */}
                  <ul className="grid grid-cols-2 gap-3 mt-auto pt-1">
                    {svc.points.map(p => (
                      <li key={p} className="flex items-start gap-2.5 text-xs leading-snug text-gray-600">
                        <span className="point-dot w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-1" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>


    </div>
  );
}
