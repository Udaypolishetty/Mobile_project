// import { useEffect, useRef, useState } from "react";
// import {
//   FaApple, FaAndroid, FaMobileAlt, FaSimCard, FaCrown,
//   FaTruck, FaPhone, FaInstagram, FaWhatsapp, FaChevronLeft, FaChevronRight,
// } from "react-icons/fa";
// import { MdSignalCellularAlt } from "react-icons/md";

// /* ── scroll-reveal ─────────────────────────────────────────── */
// function useReveal() {
//   const ref = useRef(null);
//   const [v, setV] = useState(false);
//   useEffect(() => {
//     const el = ref.current; if (!el) return;
//     const obs = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
//       { threshold: 0.08 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);
//   return { ref, v };
// }

// function Reveal({ children, delay = 0 }) {
//   const { ref, v } = useReveal();
//   return (
//     <div ref={ref} style={{
//       opacity: v ? 1 : 0,
//       transform: v ? "translateY(0)" : "translateY(24px)",
//       transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
//     }}>
//       {children}
//     </div>
//   );
// }

// /* ── Carousel component ──────────────────────────────────── */
// function ImageCarousel({ images, title }) {
//   const [idx, setIdx] = useState(0);
//   const [hovering, setHovering] = useState(false);
//   const total = images.length;

//   const prev = (e) => { e.stopPropagation(); setIdx((i) => (i - 1 + total) % total); };
//   const next = (e) => { e.stopPropagation(); setIdx((i) => (i + 1) % total); };

//   return (
//     <div
//       className="carousel-wrap"
//       onMouseEnter={() => setHovering(true)}
//       onMouseLeave={() => setHovering(false)}
//     >
//       <div className="carousel-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
//         {images.map((src, i) => (
//           <a
//             key={src}
//             href={src.split("?")[0]}
//             target="_blank"
//             rel="noreferrer"
//             className="carousel-slide"
//             tabIndex={i === idx ? 0 : -1}
//           >
//             <img
//               src={src}
//               alt={`${title} ${i + 1}`}
//               className={`carousel-img ${hovering ? "zoomed" : ""}`}
//               loading="lazy"
//             />
//             <span className="carousel-gradient" />
//             <span className={`view-badge ${hovering && i === idx ? "visible" : ""}`}>
//               View Image ↗
//             </span>
//             <span className="slide-counter">{i + 1} / {total}</span>
//           </a>
//         ))}
//       </div>

//       {total > 1 && (
//         <>
//           <button className={`carousel-btn left ${hovering ? "show" : ""}`} onClick={prev} aria-label="Previous image">
//             <FaChevronLeft />
//           </button>
//           <button className={`carousel-btn right ${hovering ? "show" : ""}`} onClick={next} aria-label="Next image">
//             <FaChevronRight />
//           </button>
//           <div className="carousel-dots">
//             {images.map((_, i) => (
//               <button
//                 key={i}
//                 className={`dot ${i === idx ? "active" : ""}`}
//                 onClick={(e) => { e.stopPropagation(); setIdx(i); }}
//                 aria-label={`Go to image ${i + 1}`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// /* ── data ───────────────────────────────────────────────────── */
// const SERVICES = [
//   {
//     Icon: FaApple,
//     iconColor: "#1d1d1f",
//     iconBg: "#f5f5f7",
//     accentColor: "#0891b2",
//     title: "iPhone Fix",
//     sub: "We Care, We Repair",
//     tag: "Same Day",
//     tagBg: "#dcfce7",
//     tagColor: "#15803d",
//     description: "Careful diagnostics and precision repairs using quality-tested replacement parts — done right the first time.",
//     images: [
//       "/iphone2.jpg" ,
//       "/iphone1.jpg",
//    ],
//     details: [{ value: "30–90 min", label: "Typical repair" }, { value: "Tested", label: "Before return" }],
//     points: ["Screen Replacement", "Battery Swap", "Charging Port", "Water Damage"],
//   },
//   {
//     Icon: FaAndroid,
//     iconColor: "#3ddc84",
//     iconBg: "#f0fdf4",
//     accentColor: "#1d4ed8",
//     title: "Android Repair",
//     sub: "All Brands, All Models",
//     tag: "All Brands",
//     tagBg: "#eff6ff",
//     tagColor: "#1d4ed8",
//     description: "Reliable repairs for popular Android phones, from everyday fixes to deeper hardware issues.",
//     images: [
//       "/android1.png",
//       "/android2.webp",
//     ],
//     details: [{ value: "Multi-brand", label: "Repair support" }, { value: "Full", label: "Device check" }],
//     points: ["Samsung", "OnePlus", "Redmi / Mi", "Realme & Vivo"],
//   },
//   {
//     Icon: FaMobileAlt,
//     iconColor: "#f59e0b",
//     iconBg: "#fffbeb",
//     accentColor: "#c2410c",
//     title: "2nd Hand Phones",
//     sub: "Sales & Purchase",
//     tag: "Buy & Sell",
//     tagBg: "#fff7ed",
//     tagColor: "#c2410c",
//     description: "Buy or sell with confidence. Every phone is inspected for performance, battery health and overall condition.",
//     images: [
//       "/secondhand1.jpg",
//       "/secondhand2.jpg",
//     ],
//     details: [{ value: "40+ point", label: "Quality check" }, { value: "Instant", label: "Price quote" }],
//     points: ["Quality Checked", "All Brands", "Best Resale Value", "Instant Buy Price"],
//   },
//   {
//     Icon: MdSignalCellularAlt,
//     iconColor: "#e11d48",
//     iconBg: "#fff1f2",
//     accentColor: "#7e22ce",
//     title: "SIM Cards",
//     sub: "All Networks Available",
//     tag: "Instant",
//     tagBg: "#fdf4ff",
//     tagColor: "#7e22ce",
//     description: "New connections, porting and recharge assistance for every major mobile network in India.",
//     images: [
//       "/simcards1.png",
//       "/simcards2.jpg",
//     ],
//     details: [{ value: "4 networks", label: "Available here" }, { value: "Quick", label: "Activation help" }],
//     points: ["Jio", "Airtel", "Vi (Vodafone)", "BSNL", "Recharge", "DTH"],
//     networks: [
//       { name: "Jio",    color: "#0047ab" },
//       { name: "Airtel", color: "#e00"    },
//       { name: "Vi",     color: "#6f00c8" },
//       { name: "BSNL",   color: "#006400" },
//     ],
//   },
//   {
//     Icon: FaCrown,
//     iconColor: "#d97706",
//     iconBg: "#fffbeb",
//     accentColor: "#854d0e",
//     title: "VIP Numbers",
//     sub: "Stand Out from the Crowd",
//     tag: "Premium",
//     tagBg: "#fef9c3",
//     tagColor: "#854d0e",
//     description: "Memorable number patterns for personal identity, business presence and premium recognition.",
//     images: [
//       "/vipsim2.webp",
//       "vipsim1.avif",
//     ],
//     details: [{ value: "Curated", label: "Number patterns" }, { value: "All", label: "Major networks" }],
//     points: ["Easy to Remember", "All Networks", "Fancy Patterns", "Business Numbers"],
//   },
//   {
//     Icon: FaTruck,
//     iconColor: "#0891b2",
//     iconBg: "#ecfeff",
//     accentColor: "#0e7490",
//     title: "Free Pickup & Delivery",
//     sub: "Upto 12 KM",
//     tag: "Free",
//     tagBg: "#dcfce7",
//     tagColor: "#15803d",
//     description: "A convenient doorstep repair experience with careful pickup, real-time updates and timely return.",
//     images: [
//       "/delivery.jpg",
//       "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=700&q=80",
//     ],
//     details: [{ value: "12 KM", label: "Service radius" }, { value: "Same day", label: "Delivery" }],
//     points: ["Free of Cost", "Within 12 KM", "Same Day Delivery", "Doorstep Service"],
//   },
// ];

// const CONTACT = {
//   phone1: "9652407756",
//     phone2: "9000112262",

//   ig: "Raju_mobiles_Knr",
//   igLink: "https://www.instagram.com/raju_mobiles_knr/",
// };

// /* ═══════════════════════════════════════════════════════════════
//    PAGE
// ═══════════════════════════════════════════════════════════════ */
// export default function ServicesPage() {
//   return (
//     <div style={{ minHeight: "100vh", background: "#f5f0eb", fontFamily: "'DM Sans', sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');

//         /* ── carousel ── */
//         .carousel-wrap {
//           position: relative;
//           border-radius: 20px;
//           overflow: hidden;
//           background: #e8e8e8;
//           aspect-ratio: 16/9;
//           flex-shrink: 0;
//         }
//         .carousel-track {
//           display: flex;
//           width: 100%;
//           height: 100%;
//           transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
//         }
//         .carousel-slide {
//           min-width: 100%;
//           height: 100%;
//           position: relative;
//           display: block;
//           overflow: hidden;
//           cursor: pointer;
//           text-decoration: none;
//         }
//         .carousel-img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
//           display: block;
//         }
//         .carousel-img.zoomed { transform: scale(1.05); }
//         .carousel-gradient {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%);
//           pointer-events: none;
//         }
//         .view-badge {
//           position: absolute;
//           right: 14px;
//           bottom: 14px;
//           background: rgba(255,255,255,0.18);
//           backdrop-filter: blur(12px);
//           -webkit-backdrop-filter: blur(12px);
//           border: 1px solid rgba(255,255,255,0.3);
//           color: white;
//           font-size: 10px;
//           font-weight: 700;
//           letter-spacing: 0.5px;
//           padding: 5px 10px;
//           border-radius: 20px;
//           opacity: 0;
//           transform: translateY(6px);
//           transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1);
//           pointer-events: none;
//         }
//         .view-badge.visible { opacity: 1; transform: translateY(0); }
//         .slide-counter {
//           position: absolute;
//           left: 14px;
//           bottom: 14px;
//           color: rgba(255,255,255,0.75);
//           font-size: 10px;
//           font-weight: 600;
//           pointer-events: none;
//         }
//         .carousel-btn {
//           position: absolute;
//           top: 50%;
//           transform: translateY(-50%);
//           width: 36px; height: 36px;
//           border-radius: 50%;
//           background: rgba(255,255,255,0.18);
//           backdrop-filter: blur(10px);
//           -webkit-backdrop-filter: blur(10px);
//           border: 1px solid rgba(255,255,255,0.3);
//           color: white;
//           cursor: pointer;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 12px;
//           opacity: 0;
//           transition: opacity 0.25s ease, background 0.2s ease, transform 0.2s ease;
//           z-index: 2;
//         }
//         .carousel-btn:hover { background: rgba(255,255,255,0.3); transform: translateY(-50%) scale(1.1); }
//         .carousel-btn.show { opacity: 1; }
//         .carousel-btn.left  { left: 12px; }
//         .carousel-btn.right { right: 12px; }
//         .carousel-dots {
//           position: absolute;
//           bottom: 10px;
//           left: 50%;
//           transform: translateX(-50%);
//           display: flex;
//           gap: 5px;
//           z-index: 2;
//         }
//         .dot {
//           width: 5px; height: 5px;
//           border-radius: 50%;
//           background: rgba(255,255,255,0.45);
//           border: none; cursor: pointer;
//           padding: 0;
//           transition: background 0.2s ease, transform 0.2s ease;
//         }
//         .dot.active { background: white; transform: scale(1.35); }

//         /* ── service card ── */
//         .service-card {
//           background: white;
//           border-radius: 28px;
//           border: 1px solid rgba(255,255,255,0.85);
//           padding: 14px;
//           display: flex;
//           flex-direction: column;
//           height: 100%;
//           box-shadow: 0 4px 24px -8px rgba(139,92,26,0.08);
//           transition: transform 0.5s cubic-bezier(0.16,1,0.3,1),
//                       box-shadow 0.5s cubic-bezier(0.16,1,0.3,1),
//                       border-color 0.3s ease;
//           position: relative;
//           overflow: hidden;
//         }
//         .service-card::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           pointer-events: none;
//           z-index: 1;
//           background: linear-gradient(125deg, transparent 20%, rgba(8,145,178,0.04), transparent 65%);
//           transform: translateX(-110%);
//           transition: transform 0.9s cubic-bezier(0.16,1,0.3,1);
//         }
//         @media (hover: hover) and (pointer: fine) {
//           .service-card:hover {
//             transform: translateY(-7px);
//             box-shadow: 0 32px 72px -20px rgba(50,38,28,0.22);
//             border-color: rgba(8,145,178,0.2);
//           }
//           .service-card:hover::before { transform: translateX(110%); }
//           .service-card:hover .svc-icon { transform: scale(1.12); }
//           .service-card:hover .point-dot { transform: translateX(2px) scale(1.2); }
//         }
//         .card-body { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 18px; padding: 6px 6px 4px; margin-top: 14px; flex: 1; }
//         .svc-icon {
//           width: 48px; height: 48px;
//           border-radius: 30%;
//           display: flex; align-items: center; justify-content: center;
//           flex-shrink: 0;
//           box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), 0 6px 18px -10px rgba(0,0,0,0.3);
//           transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
//         }
//         .tag-pill {
//           font-size: 10px;
//           font-weight: 800;
//           text-transform: uppercase;
//           letter-spacing: 0.12em;
//           padding: 5px 12px;
//           border-radius: 20px;
//         }
//         .detail-box {
//           border-radius: 16px;
//           padding: 12px 14px;
//           border: 1px solid rgba(0,0,0,0.05);
//         }
//         .point-dot {
//           width: 6px; height: 6px;
//           border-radius: 50%;
//           background: #22d3ee;
//           flex-shrink: 0;
//           margin-top: 5px;
//           transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease;
//         }
//         .network-chip {
//           font-size: 10px;
//           font-weight: 700;
//           padding: 4px 10px;
//           border-radius: 20px;
//         }

//         /* ── contact strip ── */
//         .contact-link {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           background: white;
//           border-radius: 18px;
//           padding: 14px 18px;
//           text-decoration: none;
//           color: #1e293b;
//           border: 1px solid rgba(0,0,0,0.06);
//           font-weight: 600;
//           font-size: 14px;
//           transition: all 0.2s ease;
//           box-shadow: 0 2px 12px -4px rgba(0,0,0,0.06);
//         }
//         .contact-link:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 24px -8px rgba(0,0,0,0.12);
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .service-card, .carousel-img, .svc-icon, .service-card::before,
//           .view-badge, .point-dot, .carousel-track, .carousel-btn { transition: none !important; }
//         }
//       `}</style>

//       {/* ── Hero ──────────────────────────────────────── */}
// {/* ── Hero ──────────────────────────────────────── */}
//       <div style={{ maxWidth: "840px", margin: "0 auto", padding: "72px 24px 48px", textAlign: "center" }}>
//         <Reveal delay={0}>
//           <span style={{
//             display: "inline-block",
//             fontSize: "11px",
//             fontWeight: 700,
//             textTransform: "uppercase",
//             letterSpacing: "3px",
//             color: "#0891b2",
//             marginBottom: "16px",
//           }}>
//             Our Services
//           </span>
//           <h1 style={{
//             fontFamily: "'Syne', sans-serif",
//             // Decreased size from clamp(30px, 6vw, 60px) to clamp(24px, 5vw, 40px)
//             fontSize: "clamp(24px, 5vw, 40px)", 
//             fontWeight: 800,
//             color: "#0a0a0a",
//             letterSpacing: "-0.045em",
//             lineHeight: 1.1, // Slightly increased line height for better spacing at a smaller size
//             margin: "0 0 18px",
//           }}>
//             We Care,{" "}
//             <span style={{ color: "#0891b2" }}>We Repair</span>
//           </h1>
//           <p style={{
//             fontSize: "16px",
//             color: "#64748b",
//             lineHeight: 1.7,
//             maxWidth: "520px",
//             margin: "0 auto 32px",
//           }}>
//             One-stop solution for all your mobile needs in Karimnagar — repairs, SIMs, second-hand phones and more.
//           </p>

//           {/* Contact quick-links */}
//           <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
//             <a href={`tel:${CONTACT.phone1}`} className="contact-link">
//               <span style={{ width: 34, height: 34, borderRadius: "50%", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <FaPhone style={{ color: "#16a34a", fontSize: "14px" }} />
//               </span>
//               {CONTACT.phone1}
//             </a>
//             <a href={`https://wa.me/91${CONTACT.phone1}`} target="_blank" rel="noreferrer" className="contact-link">
//               <span style={{ width: 34, height: 34, borderRadius: "50%", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <FaWhatsapp style={{ color: "#16a34a", fontSize: "16px" }} />
//               </span>
//               WhatsApp
//             </a>
//             <a href={CONTACT.igLink} target="_blank" rel="noreferrer" className="contact-link">
//               <span style={{ width: 34, height: 34, borderRadius: "50%", background: "#fdf2f8", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <FaInstagram style={{ color: "#db2777", fontSize: "15px" }} />
//               </span>
//               @{CONTACT.ig}
//             </a>
//           </div>
//         </Reveal>
//       </div>

//       {/* ── Cards grid ────────────────────────────────── */}
//       <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 20px 80px" }}>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "24px" }}>
//           {SERVICES.map((svc, i) => (
//             <Reveal key={svc.title} delay={i * 65}>
//               <div className="service-card">

//                 {/* Carousel */}
//                 <ImageCarousel images={svc.images} title={svc.title} />

//                 {/* Card body */}
//                 <div className="card-body">

//                   {/* Icon + tag row */}
//                   <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                     <div className="svc-icon" style={{ background: svc.iconBg }}>
//                       <svc.Icon style={{ color: svc.iconColor, fontSize: "20px" }} />
//                     </div>
//                     <span className="tag-pill" style={{ background: svc.tagBg, color: svc.tagColor }}>
//                       {svc.tag}
//                     </span>
//                   </div>

//                   {/* Text */}
//                   <div>
//                     <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#0891b2", marginBottom: "6px" }}>
//                       {svc.sub}
//                     </p>
//                     <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#0a0a0a", fontSize: "24px", letterSpacing: "-0.03em", lineHeight: 1.15, margin: "0 0 10px" }}>
//                       {svc.title}
//                     </h3>
//                     <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.65, margin: 0 }}>
//                       {svc.description}
//                     </p>
//                   </div>

//                   {/* Network chips */}
//                   {svc.networks && (
//                     <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
//                       {svc.networks.map((n) => (
//                         <span
//                           key={n.name}
//                           className="network-chip"
//                           style={{
//                             background: `${n.color}15`,
//                             color: n.color,
//                             border: `1px solid ${n.color}30`,
//                           }}
//                         >
//                           {n.name}
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   {/* Detail boxes */}
//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
//                     {svc.details.map((d) => (
//                       <div
//                         key={d.label}
//                         className="detail-box"
//                         style={{ background: `${svc.iconBg}90` }}
//                       >
//                         <p style={{ fontSize: "14px", fontWeight: 800, color: "#0a0a0a", margin: "0 0 3px" }}>
//                           {d.value}
//                         </p>
//                         <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>
//                           {d.label}
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Points grid */}
//                   <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "auto 0 0", padding: 0, listStyle: "none" }}>
//                     {svc.points.map((p) => (
//                       <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#475569", lineHeight: 1.45 }}>
//                         <span className="point-dot" />
//                         {p}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import {
  FaApple, FaAndroid, FaMobileAlt, FaSimCard, FaCrown,
  FaTruck, FaPhone, FaInstagram, FaWhatsapp, FaChevronLeft, FaChevronRight,
} from "react-icons/fa";
import { MdSignalCellularAlt } from "react-icons/md";

/* ── scroll-reveal (Optimized for ultra-smooth scroll) ─────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  
  useEffect(() => {
    const el = ref.current; 
    if (!el) return;
    
    const obs = new IntersectionObserver(
      ([e]) => { 
        if (e.isIntersecting) { 
          setV(true); 
          obs.disconnect(); 
        } 
      },
      { 
        threshold: 0.05,
        // Delays the trigger slightly so elements glide up dynamically as they pass the bottom viewport edge
        rootMargin: "0px 0px -40px 0px" 
      }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  
  return { ref, v };
}

function Reveal({ children, delay = 0 }) {
  const { ref, v } = useReveal();
  return (
    <div 
      ref={ref} 
      style={{
        opacity: v ? 1 : 0,
        // Increased distance slightly (32px) for a more noticeable, elegant float-up effect
        transform: v ? "translateY(0)" : "translateY(32px)",
        // Swapped to a premium, progressive cubic-bezier curve and slightly extended duration (750ms)
        transition: `opacity 750ms cubic-bezier(0.21, 1.02, 0.43, 1.01) ${delay}ms, transform 750ms cubic-bezier(0.21, 1.02, 0.43, 1.01) ${delay}ms`,
        willChange: "transform, opacity" // Informs the browser to use GPU hardware acceleration
      }}
    >
      {children}
    </div>
  );
}

/* ── Carousel component ──────────────────────────────────── */
function ImageCarousel({ images, title }) {
  const [idx, setIdx] = useState(0);
  const [hovering, setHovering] = useState(false);
  const total = images.length;

  const prev = (e) => { e.stopPropagation(); setIdx((i) => (i - 1 + total) % total); };
  const next = (e) => { e.stopPropagation(); setIdx((i) => (i + 1) % total); };

  return (
    <div
      className="carousel-wrap"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {images.map((src, i) => (
          <a
            key={src}
            href={src.split("?")[0]}
            target="_blank"
            rel="noreferrer"
            className="carousel-slide"
            tabIndex={i === idx ? 0 : -1}
          >
            <img
              src={src}
              alt={`${title} ${i + 1}`}
              className={`carousel-img ${hovering ? "zoomed" : ""}`}
              loading="lazy"
            />
            <span className="carousel-gradient" />
            <span className={`view-badge ${hovering && i === idx ? "visible" : ""}`}>
              View Image ↗
            </span>
            <span className="slide-counter">{i + 1} / {total}</span>
          </a>
        ))}
      </div>

      {total > 1 && (
        <>
          <button className={`carousel-btn left ${hovering ? "show" : ""}`} onClick={prev} aria-label="Previous image">
            <FaChevronLeft />
          </button>
          <button className={`carousel-btn right ${hovering ? "show" : ""}`} onClick={next} aria-label="Next image">
            <FaChevronRight />
          </button>
          <div className="carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === idx ? "active" : ""}`}
                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ── data ───────────────────────────────────────────────────── */
const SERVICES = [
  {
    Icon: FaApple,
    iconColor: "#1d1d1f",
    iconBg: "#f5f5f7",
    accentColor: "#0891b2",
    title: "iPhone Fix",
    sub: "We Care, We Repair",
    tag: "Same Day",
    tagBg: "#dcfce7",
    tagColor: "#15803d",
    description: "Careful diagnostics and precision repairs using quality-tested replacement parts — done right the first time.",
    images: ["/iphone2.jpg" , "/iphone1.jpg"],
    details: [{ value: "30–90 min", label: "Typical repair" }, { value: "Tested", label: "Before return" }],
    points: ["Screen Replacement", "Battery Swap", "Charging Port", "Water Damage"],
  },
  {
    Icon: FaAndroid,
    iconColor: "#3ddc84",
    iconBg: "#f0fdf4",
    accentColor: "#1d4ed8",
    title: "Android Repair",
    sub: "All Brands, All Models",
    tag: "All Brands",
    tagBg: "#eff6ff",
    tagColor: "#1d4ed8",
    description: "Reliable repairs for popular Android phones, from everyday fixes to deeper hardware issues.",
    images: ["/android1.png", "/android2.webp"],
    details: [{ value: "Multi-brand", label: "Repair support" }, { value: "Full", label: "Device check" }],
    points: ["Samsung", "OnePlus", "Redmi / Mi", "Realme & Vivo"],
  },
  {
    Icon: FaMobileAlt,
    iconColor: "#f59e0b",
    iconBg: "#fffbeb",
    accentColor: "#c2410c",
    title: "2nd Hand Phones",
    sub: "Sales & Purchase",
    tag: "Buy & Sell",
    tagBg: "#fff7ed",
    tagColor: "#c2410c",
    description: "Buy or sell with confidence. Every phone is inspected for performance, battery health and overall condition.",
    images: ["/secondhand1.jpg", "/secondhand2.jpg"],
    details: [{ value: "40+ point", label: "Quality check" }, { value: "Instant", label: "Price quote" }],
    points: ["Quality Checked", "All Brands", "Best Resale Value", "Instant Buy Price"],
  },
  {
    Icon: MdSignalCellularAlt,
    iconColor: "#e11d48",
    iconBg: "#fff1f2",
    accentColor: "#7e22ce",
    title: "SIM Cards",
    sub: "All Networks Available",
    tag: "Instant",
    tagBg: "#fdf4ff",
    tagColor: "#7e22ce",
    description: "New connections, porting and recharge assistance for every major mobile network in India.",
    images: ["/simcards1.png", "/simcards2.jpg"],
    details: [{ value: "4 networks", label: "Available here" }, { value: "Quick", label: "Activation help" }],
    points: ["Jio", "Airtel", "Vi (Vodafone)", "BSNL", "Recharge", "DTH"],
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
    iconBg: "#fffbeb",
    accentColor: "#854d0e",
    title: "VIP Numbers",
    sub: "Stand Out from the Crowd",
    tag: "Premium",
    tagBg: "#fef9c3",
    tagColor: "#854d0e",
    description: "Memorable number patterns for personal identity, business presence and premium recognition.",
    images: ["/vipsim2.webp", "vipsim1.avif"],
    details: [{ value: "Curated", label: "Number patterns" }, { value: "All", label: "Major networks" }],
    points: ["Easy to Remember", "All Networks", "Fancy Patterns", "Business Numbers"],
  },
  {
    Icon: FaTruck,
    iconColor: "#0891b2",
    iconBg: "#ecfeff",
    accentColor: "#0e7490",
    title: "Free Pickup & Delivery",
    sub: "Upto 12 KM",
    tag: "Free",
    tagBg: "#dcfce7",
    tagColor: "#15803d",
    description: "A convenient doorstep repair experience with careful pickup, real-time updates and timely return.",
    images: ["/delivery.jpg", "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=700&q=80"],
    details: [{ value: "12 KM", label: "Service radius" }, { value: "Same day", label: "Delivery" }],
    points: ["Free of Cost", "Within 12 KM", "Same Day Delivery", "Doorstep Service"],
  },
];

const CONTACT = {
  phone1: "9652407756",
  phone2: "9000112262",
  ig: "Raju_mobiles_Knr",
  igLink: "https://www.instagram.com/raju_mobiles_knr/",
};

export default function ServicesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f0eb", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');

        /* ── carousel ── */
        .carousel-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #e8e8e8;
          aspect-ratio: 16/9;
          flex-shrink: 0;
        }
        .carousel-track {
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .carousel-slide {
          min-width: 100%;
          height: 100%;
          position: relative;
          display: block;
          overflow: hidden;
          cursor: pointer;
          text-decoration: none;
        }
        .carousel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
          display: block;
        }
        .carousel-img.zoomed { transform: scale(1.05); }
        .carousel-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%);
          pointer-events: none;
        }
        .view-badge {
          position: absolute;
          right: 14px;
          bottom: 14px;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 5px 10px;
          border-radius: 20px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
        }
        .view-badge.visible { opacity: 1; transform: translateY(0); }
        .slide-counter {
          position: absolute;
          left: 14px;
          bottom: 14px;
          color: rgba(255,255,255,0.75);
          font-size: 10px;
          font-weight: 600;
          pointer-events: none;
        }
        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px;
          opacity: 0;
          transition: opacity 0.25s ease, background 0.2s ease, transform 0.2s ease;
          z-index: 2;
        }
        .carousel-btn:hover { background: rgba(255,255,255,0.3); transform: translateY(-50%) scale(1.1); }
        .carousel-btn.show { opacity: 1; }
        .carousel-btn.left  { left: 12px; }
        .carousel-btn.right { right: 12px; }
        .carousel-dots {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 5px;
          z-index: 2;
        }
        .dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.45);
          border: none; cursor: pointer;
          padding: 0;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .dot.active { background: white; transform: scale(1.35); }

        /* ── service card ── */
        .service-card {
          background: white;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.85);
          padding: 14px;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 4px 24px -8px rgba(139,92,26,0.08);
          /* Swapped individual ease timings here for smooth interactive hover effects as well */
          transition: transform 600ms cubic-bezier(0.21, 1.02, 0.43, 1.01),
                      box-shadow 600ms cubic-bezier(0.21, 1.02, 0.43, 1.01),
                      border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background: linear-gradient(125deg, transparent 20%, rgba(8,145,178,0.04), transparent 65%);
          transform: translateX(-110%);
          transition: transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        @media (hover: hover) and (pointer: fine) {
          .service-card:hover {
            transform: translateY(-7px);
            box-shadow: 0 32px 72px -20px rgba(50,38,28,0.22);
            border-color: rgba(8,145,178,0.2);
          }
          .service-card:hover::before { transform: translateX(110%); }
          .service-card:hover .svc-icon { transform: scale(1.12); }
          .service-card:hover .point-dot { transform: translateX(2px) scale(1.2); }
        }
        .card-body { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 18px; padding: 6px 6px 4px; margin-top: 14px; flex: 1; }
        .svc-icon {
          width: 48px; height: 48px;
          border-radius: 30%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), 0 6px 18px -10px rgba(0,0,0,0.3);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .tag-pill {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 5px 12px;
          border-radius: 20px;
        }
        .detail-box {
          border-radius: 16px;
          padding: 12px 14px;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .point-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22d3ee;
          flex-shrink: 0;
          margin-top: 5px;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease;
        }
        .network-chip {
          font-size: 10px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
        }

        /* ── contact strip ── */
        .contact-link {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          border-radius: 18px;
          padding: 14px 18px;
          text-decoration: none;
          color: #1e293b;
          border: 1px solid rgba(0,0,0,0.06);
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 12px -4px rgba(0,0,0,0.06);
        }
        .contact-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px -8px rgba(0,0,0,0.12);
        }

        @media (prefers-reduced-motion: reduce) {
          .service-card, .carousel-img, .svc-icon, .service-card::before,
          .view-badge, .point-dot, .carousel-track, .carousel-btn { transition: none !important; }
        }
      `}</style>

      {/* ── Hero ──────────────────────────────────────── */}
      <div style={{ maxWidth: "840px", margin: "0 auto", padding: "72px 24px 48px", textAlign: "center" }}>
        <Reveal delay={0}>
          <span style={{
            display: "inline-block",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "3px",
            color: "#0891b2",
            marginBottom: "16px",
          }}>
            Our Services
          </span>
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(24px, 5vw, 40px)", 
            fontWeight: 800,
            color: "#0a0a0a",
            letterSpacing: "-0.045em",
            lineHeight: 1.1,
            margin: "0 0 18px",
          }}>
            We Care. <span style={{ color: "#0891b2" }}>We Repair</span>
          </h1>
          <p style={{
            fontSize: "16px",
            color: "#64748b",
            lineHeight: 1.7,
            maxWidth: "520px",
            margin: "0 auto 32px",
          }}>
            One-stop solution for all your mobile needs in Karimnagar — repairs, SIMs, second-hand phones and more.
          </p>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`tel:${CONTACT.phone1}`} className="contact-link">
              <span style={{ width: 34, height: 34, borderRadius: "50%", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaPhone style={{ color: "#16a34a", fontSize: "14px" }} />
              </span>
              {CONTACT.phone1}
            </a>
            <a href={`https://wa.me/91${CONTACT.phone1}`} target="_blank" rel="noreferrer" className="contact-link">
              <span style={{ width: 34, height: 34, borderRadius: "50%", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaWhatsapp style={{ color: "#16a34a", fontSize: "16px" }} />
              </span>
              WhatsApp
            </a>
            <a href={CONTACT.igLink} target="_blank" rel="noreferrer" className="contact-link">
              <span style={{ width: 34, height: 34, borderRadius: "50%", background: "#fdf2f8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaInstagram style={{ color: "#db2777", fontSize: "15px" }} />
              </span>
              @{CONTACT.ig}
            </a>
          </div>
        </Reveal>
      </div>

      {/* ── Cards grid ────────────────────────────────── */}
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 20px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "24px" }}>
          {SERVICES.map((svc, i) => (
            /* Adjusted dynamic multi-card layout delay structure (i * 90) so grid patterns cascade fluidly */
            <Reveal key={svc.title} delay={i * 90}>
              <div className="service-card">
                <ImageCarousel images={svc.images} title={svc.title} />

                <div className="card-body">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div className="svc-icon" style={{ background: svc.iconBg }}>
                      <svc.Icon style={{ color: svc.iconColor, fontSize: "20px" }} />
                    </div>
                    <span className="tag-pill" style={{ background: svc.tagBg, color: svc.tagColor }}>
                      {svc.tag}
                    </span>
                  </div>

                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#0891b2", marginBottom: "6px" }}>
                      {svc.sub}
                    </p>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#0a0a0a", fontSize: "24px", letterSpacing: "-0.03em", lineHeight: 1.15, margin: "0 0 10px" }}>
                      {svc.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.65, margin: 0 }}>
                      {svc.description}
                    </p>
                  </div>

                  {svc.networks && (
                    <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                      {svc.networks.map((n) => (
                        <span
                          key={n.name}
                          className="network-chip"
                          style={{
                            background: `${n.color}15`,
                            color: n.color,
                            border: `1px solid ${n.color}30`,
                          }}
                        >
                          {n.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    {svc.details.map((d) => (
                      <div
                        key={d.label}
                        className="detail-box"
                        style={{ background: `${svc.iconBg}90` }}
                      >
                        <p style={{ fontSize: "14px", fontWeight: 800, color: "#0a0a0a", margin: "0 0 3px" }}>
                          {d.value}
                        </p>
                        <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>
                          {d.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "auto 0 0", padding: 0, listStyle: "none" }}>
                    {svc.points.map((p) => (
                      <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#475569", lineHeight: 1.45 }}>
                        <span className="point-dot" />
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