
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft, FaMapMarkerAlt, FaPlus, FaGift,
  FaCheckCircle, FaShoppingBag, FaLock, FaWhatsapp,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import AnimatedSection from "../AnimatedSection";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { getProductImage } from "../../utils/imageHelper";
import { createOrder } from "../../api/orderApi";

const API_URL = import.meta.env.VITE_API_URL;
const SHOP_WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER;

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, setShowAuthModal } = useAuth();
  const navigate = useNavigate();

  const [addressMode, setAddressMode] = useState(user?.address ? "saved" : "new");
  const [isGift, setIsGift] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [whatsappLoading, setWhatsappLoading] = useState(false);

  const [newAddr, setNewAddr] = useState({
    name: "", phone: "", address: "", city: "", state: "", pincode: "",
  });
  const [giftDetails, setGiftDetails] = useState({
    recipientName: "", recipientPhone: "", message: "",
  });

  const shipping = 0;  // Always free shipping
  const total = cartTotal + shipping;

  const setN = (f) => (e) => setNewAddr((p) => ({ ...p, [f]: e.target.value }));
  const setG = (f) => (e) => setGiftDetails((p) => ({ ...p, [f]: e.target.value }));

  // Redirect if cart empty (only on mount)
  useEffect(() => {
    if (cartItems.length === 0) navigate("/cart");
  }, []);

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
          const data = await res.json();
          setNewAddr((p) => ({
            ...p,
            address: data.display_name || "",
            city: data.address?.city || data.address?.town || "",
            state: data.address?.state || "",
            pincode: data.address?.postcode || "",
          }));
        } catch (e) { console.log(e); }
        setLocLoading(false);
      },
      () => setLocLoading(false)
    );
  };


  const handleWhatsAppOrder = async () => {

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (
      addressMode === "new" &&
      (!newAddr.name ||
        !newAddr.phone ||
        !newAddr.address ||
        !newAddr.pincode)
    ) {
      alert("Please fill all address fields.");
      return;
    }
    if (whatsappLoading) return;

    // ── Resolve address fields ──
    const useSaved = user?.address && addressMode === "saved";
    const name = useSaved ? (user?.name || "") : newAddr.name;
    const phone = useSaved ? (user?.phone || "") : newAddr.phone;
    const address = useSaved ? (user?.address || "") : newAddr.address;
    const city = useSaved ? (user?.city || "") : newAddr.city;
    const state = useSaved ? (user?.state || "") : newAddr.state;
    const pincode = useSaved ? (user?.pincode || "") : newAddr.pincode;

    // ── Validation ──
    if (!name || !phone || !address || !pincode) {
      alert("Please fill in all delivery address fields.");
      return;
    }

    // ── Build WhatsApp message ──
    const productLines = cartItems
      .map((item) => `• ${item.name}\n  Qty: ${item.qty}  |  ₹${(item.price * item.qty).toLocaleString()}`)
      .join("\n\n");

    const locationLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address} ${city} ${state} ${pincode}`)}`;

    const giftSection = isGift
      ? `\n\n🎁 *Gift Order*\nRecipient: ${giftDetails.recipientName}\nRecipient Phone: ${giftDetails.recipientPhone}${giftDetails.message ? `\nMessage: ${giftDetails.message}` : ""}`
      : "";

    const message =
      `🛒 *NEW ORDER REQUEST*

👤 *Customer Details*
Name: ${name}
Phone: ${phone}

📍 *Delivery Address*
${address}
City: ${city}, ${state} — ${pincode}
📌 Map: ${locationLink}${giftSection}

📦 *Products*
${productLines}

💰 *Total: ₹${total.toLocaleString()}*
✅ *Free Delivery*
(COD available if applicable)

_Sent via Raju Mobile Website_`;

    const whatsappUrl = `https://wa.me/${SHOP_WHATSAPP}?text=${encodeURIComponent(message)}`;

    // ── STEP 1: Open WhatsApp FIRST (must be sync from click) ──
    window.open(whatsappUrl, "_blank");

    // ── STEP 2: Show popup immediately ──
    setOrderPlaced(true);
    setShowConfirm(true);

    // ── STEP 3: Save order to Django in background ──
    setSubmitting(true);
    const token = localStorage.getItem("access_token");

    fetch(`${API_URL}/api/orders/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        customer_name: name,
        phone,
        address,
        city,
        state,
        pincode,
        total_amount: total,
        is_gift: isGift,
        gift_details: isGift ? giftDetails : null,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.qty,
        })),
      }),
    })
      .then((r) => r.json())
      .then((data) => { console.log("Order saved:", data); })
      .catch((err) => { console.error("Order save failed (WhatsApp already opened):", err); })
      .finally(() => setSubmitting(false));

    // ── STEP 4: Re-enable after 5s, clear cart ──
    setTimeout(() => {
      setShowConfirm(false);
      setOrderPlaced(false);
      clearCart();
      navigate("/OrderDetailsPage");
    }, 10000);
  };

  /* ─── Auth gate ── */
  if (!user) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-5xl mb-4">🔐</p>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Sign in to Checkout</h2>
        <p className="text-gray-400 text-sm mb-4">You need to be signed in to place an order</p>
        <button onClick={() => setShowAuthModal(true)} className="bg-black hover:bg-cyan-600 text-white font-bold px-6 py-3 rounded-xl transition">
          Sign In / Register
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .checkout-root { font-family: 'DM Sans', sans-serif; background: #f8fafc; min-height: 100vh; }
        .co-card { background: white; border-radius: 18px; border: 1px solid #f0f0f0; padding: 22px; margin-bottom: 16px; box-shadow: 0 1px 8px rgba(0,0,0,0.04); }
        .co-section-title { font-size: 15px; font-weight: 700; color: #1e293b; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
        .co-field { margin-bottom: 12px; }
        .co-field label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; display: block; margin-bottom: 5px; }
        .co-input {
          width: 100%; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 10px 14px;
          font-size: 14px; color: #1e293b; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          font-family: 'DM Sans', sans-serif; background: white;
        }
        .co-input:focus { border-color: #06b6d4; box-shadow: 0 0 0 3px rgba(6,182,212,0.1); }
        .co-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .addr-option {
          border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 14px 16px; cursor: pointer;
          transition: all 0.15s; display: flex; align-items: flex-start; gap: 12px;
        }
        .addr-option.selected { border-color: #06b6d4; background: rgba(6,182,212,0.05); }
        .addr-option:hover { border-color: #06b6d4; }
        .radio-dot {
          width: 18px; height: 18px; border-radius: 50%; border: 2px solid #cbd5e1;
          flex-shrink: 0; transition: all 0.15s;
          display: flex; align-items: center; justify-content: center;
        }
        .radio-dot.on { border-color: #06b6d4; background: #06b6d4; }
        .radio-dot.on::after { content:''; width:6px; height:6px; border-radius:50%; background:white; }
        .gift-toggle {
          display: flex; align-items: center; justify-content: space-between;
          border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 14px 16px;
          cursor: pointer; transition: all 0.15s;
        }
        .gift-toggle.on { border-color: #ec4899; background: rgba(236,72,153,0.04); }
        .toggle-sw { width: 40px; height: 22px; border-radius:999px; background:#cbd5e1; position:relative; transition:background 0.2s; flex-shrink:0; }
        .toggle-sw.on { background: #ec4899; }
        .toggle-sw .knob { position:absolute; top:3px; left:3px; width:16px; height:16px; border-radius:50%; background:white; transition:transform 0.2s; box-shadow:0 1px 3px rgba(0,0,0,0.2); }
        .toggle-sw.on .knob { transform: translateX(18px); }
        .loc-btn {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px; border-radius: 10px; border: 1.5px dashed #06b6d4; color: #0891b2;
          font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s;
          background: rgba(6,182,212,0.04); margin-bottom: 12px;
        }
        .loc-btn:hover { background: rgba(6,182,212,0.09); }
        .place-btn {
          width: 100%; padding: 15px; border-radius: 14px; border: none;
          background: #25D366; color: white;
          font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 16px rgba(37,211,102,0.35);
        }
        .place-btn:hover:not(:disabled) { background: #1ead57; box-shadow: 0 6px 24px rgba(37,211,102,0.5); transform: translateY(-1px); }
        .place-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
        .order-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f8fafc; }
        .free-ship { background: #f0fdf4; border: 1px solid #bbf7d0; color: #16a34a; font-size: 11px; font-weight: 600; padding: 6px 12px; border-radius: 8px; margin-bottom: 12px; }
        @keyframes slideUpPop {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes confirmBackdrop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <div className="checkout-root">
        <div className="max-w-5xl mx-auto px-4 py-8">

          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm mb-6 transition">
            <FaArrowLeft /> Back to Cart
          </button>

          <AnimatedSection direction="up">
            <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 24, fontWeight: 800, color: "#1e293b", marginBottom: 24 }}>
              Checkout
            </h1>
          </AnimatedSection>

          <div className="grid md:grid-cols-5 gap-6">

            {/* ── LEFT ── */}
            <div className="md:col-span-3">

              {/* ADDRESS */}
              <AnimatedSection direction="left">
                <div className="co-card">
                  <p className="co-section-title"><FaMapMarkerAlt className="text-cyan-500" /> Delivery Address</p>

                  {user.address && (
                    <div
                      className={`addr-option ${addressMode === "saved" ? "selected" : ""}`}
                      onClick={() => setAddressMode("saved")}
                      style={{ marginBottom: 10 }}
                    >
                      <div className={`radio-dot ${addressMode === "saved" ? "on" : ""}`} />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{user.name}</p>
                        <p style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{user.address}</p>
                        {user.pincode && <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Pincode: {user.pincode}</p>}
                        <span style={{ fontSize: 10, fontWeight: 700, background: "#e0f2fe", color: "#0369a1", padding: "2px 8px", borderRadius: 20, marginTop: 4, display: "inline-block" }}>
                          SAVED ADDRESS
                        </span>
                      </div>
                    </div>
                  )}

                  <div
                    className={`addr-option ${addressMode === "new" ? "selected" : ""}`}
                    onClick={() => setAddressMode("new")}
                  >
                    <div className={`radio-dot ${addressMode === "new" ? "on" : ""}`} />
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: 6 }}>
                      <FaPlus style={{ fontSize: 10 }} /> Add New Address
                    </p>
                  </div>

                  {addressMode === "new" && (
                    <div style={{ marginTop: 16 }}>
                      <button className="loc-btn" onClick={detectLocation} disabled={locLoading}>
                        <MdLocationOn style={{ fontSize: 16 }} />
                        {locLoading ? "Detecting…" : "Use current location"}
                      </button>
                      <div className="co-grid2">
                        <div className="co-field"><label>Full Name</label><input className="co-input" value={newAddr.name} onChange={setN("name")} placeholder="Your name" /></div>
                        <div className="co-field"><label>Phone</label><input className="co-input" value={newAddr.phone} onChange={setN("phone")} placeholder="10-digit mobile" /></div>
                      </div>
                      <div className="co-field">
                        <label>Address</label>
                        <textarea className="co-input" value={newAddr.address} onChange={setN("address")} placeholder="House No, Street, Area, Landmark" rows={2} style={{ resize: "none" }} />
                      </div>
                      <div className="co-grid2">
                        <div className="co-field"><label>City</label><input className="co-input" value={newAddr.city} onChange={setN("city")} placeholder="City" /></div>
                        <div className="co-field"><label>State</label><input className="co-input" value={newAddr.state} onChange={setN("state")} placeholder="State" /></div>
                      </div>
                      <div className="co-field"><label>Pincode</label><input className="co-input" value={newAddr.pincode} onChange={setN("pincode")} placeholder="6-digit pincode" /></div>
                    </div>
                  )}
                </div>
              </AnimatedSection>

              {/* GIFT */}
              <AnimatedSection direction="left" delay={80}>
                <div className="co-card">
                  <div className={`gift-toggle ${isGift ? "on" : ""}`} onClick={() => setIsGift(!isGift)}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <FaGift style={{ color: isGift ? "#ec4899" : "#94a3b8", fontSize: 16 }} />
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>Send as a Gift 🎁</p>
                        <p style={{ fontSize: 12, color: "#64748b" }}>Deliver to someone special with a message</p>
                      </div>
                    </div>
                    <div className={`toggle-sw ${isGift ? "on" : ""}`}><div className="knob" /></div>
                  </div>

                  {isGift && (
                    <div style={{ marginTop: 16 }}>
                      <div className="co-grid2">
                        <div className="co-field"><label>Recipient Name</label><input className="co-input" value={giftDetails.recipientName} onChange={setG("recipientName")} placeholder="Who is it for?" /></div>
                        <div className="co-field"><label>Recipient Phone</label><input className="co-input" value={giftDetails.recipientPhone} onChange={setG("recipientPhone")} placeholder="Their mobile number" /></div>
                      </div>
                      <div className="co-field">
                        <label>Gift Message</label>
                        <textarea className="co-input" value={giftDetails.message} onChange={setG("message")} placeholder="Write a heartfelt message (optional)" rows={3} style={{ resize: "none" }} />
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div className="md:col-span-2">
              <AnimatedSection direction="right">
                <div className="co-card" style={{ position: "sticky", top: 96 }}>
                  <p className="co-section-title"><FaShoppingBag className="text-cyan-500" /> Order Summary</p>

                  <div className="free-ship">🎉 You qualify for FREE delivery!</div>
                  <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", color: "#0369a1", fontSize: 12, fontWeight: 500, padding: "10px 12px", borderRadius: 10, marginBottom: 16, lineHeight: 1.5 }}>
                    ℹ️ <strong>COD Available:</strong> If any delivery charges apply based on your location, the shop owner will update you. You can also pay Cash on Delivery after delivery.
                  </div>

                  <div style={{ maxHeight: 200, overflowY: "auto", marginBottom: 16 }}>
                    {cartItems.map((item) => (
                      <div key={item.id} className="order-item">
                        <img
                          src={getProductImage(item)}
                          alt={item.name}
                          style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 10, background: "#f8fafc", flexShrink: 0 }}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/44x44/f1f5f9/94a3b8?text=img"; }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 12, fontWeight: 600, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                          <p style={{ fontSize: 11, color: "#94a3b8" }}>Qty: {item.qty}</p>
                        </div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", flexShrink: 0 }}>₹{(item.price * item.qty).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
                    {[
                      { label: `Subtotal (${cartItems.reduce((s, i) => s + i.qty, 0)} items)`, val: `₹${cartTotal.toLocaleString()}` },
                      { label: "Delivery", val: "FREE", green: true },
                      ...(isGift ? [{ label: "Gift Wrapping", val: "Free", green: true }] : []),
                    ].map((row) => (
                      <div key={row.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#64748b", marginBottom: 8 }}>
                        <span>{row.label}</span>
                        <span style={{ color: row.green ? "#16a34a" : "#1e293b", fontWeight: row.green ? 700 : 400 }}>{row.val}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 800, color: "#1e293b", borderTop: "1px solid #f1f5f9", paddingTop: 10, marginTop: 4 }}>
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* WhatsApp order button */}
                  <button
                    className="place-btn"
                    style={{ marginTop: 16 }}
                    onClick={handleWhatsAppOrder}
                    disabled={orderPlaced || submitting}
                  >
                    {orderPlaced ? (
                      <><FaCheckCircle style={{ fontSize: 14 }} /> Order Submitted ✓</>
                    ) : (
                      <><FaWhatsapp style={{ fontSize: 16 }} /> Continue on WhatsApp · ₹{total.toLocaleString()}</>
                    )}
                  </button>

                  <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                    <FaLock style={{ fontSize: 9 }} /> Order details sent directly to shop owner
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>

      {/* ── Order Confirmed Popup ── */}
      {showConfirm && (
        <div
          onClick={() => setShowConfirm(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(4px)",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
            padding: "0 16px 40px",
            animation: "confirmBackdrop 0.25s ease forwards",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white", borderRadius: 24, padding: "28px 28px 24px",
              maxWidth: 400, width: "100%",
              boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
              border: "1px solid #f0f0f0",
              animation: "slideUpPop 0.4s cubic-bezier(0.16,1,0.3,1)",
              textAlign: "center",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {/* Green check */}
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 0 0 8px rgba(22,163,74,0.08)" }}>
              <FaCheckCircle style={{ fontSize: 30, color: "#16a34a" }} />
            </div>

            <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
              Order Submitted! 🎉
            </h3>
            <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 6px", lineHeight: 1.65 }}>
              Your order details have been sent to the shop owner on WhatsApp. Complete the payment arrangement directly with them.
            </p>
            <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 20px" }}>
              This popup will close automatically in 5 seconds.
            </p>

            {/* WhatsApp badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 20 }}>
              <FaWhatsapp style={{ fontSize: 14 }} />
              WhatsApp opened with order details
            </div>

            <button
              onClick={() => { setShowConfirm(false); navigate("/AccountPage"); }}
              style={{ display: "block", width: "100%", marginTop: 18, padding: "12px", borderRadius: 12, border: "none", background: "#0f172a", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#0891b2"}
              onMouseLeave={e => e.currentTarget.style.background = "#0f172a"}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </>
  );
}
