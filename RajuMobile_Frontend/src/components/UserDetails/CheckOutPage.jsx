


import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaPlus, FaGift, FaCheckCircle, FaShoppingBag, FaLock } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import AnimatedSection from "../AnimatedSection";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { getProductImage } from "../../utils/imageHelper";
import { createOrder } from "../../api/orderApi";


const SHOP_WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER;

export default function CheckoutPage() {
  const { cartItems, cartTotal, placeOrder } = useCart();
  const { user, setShowAuthModal } = useAuth();
  const navigate = useNavigate();

  const [addressMode, setAddressMode] = useState( user?.address ? "saved" : "new"); // "saved" | "new"
  const [isGift, setIsGift] = useState(false);
  const [payment, setPayment] = useState("cod");
  const [placing, setPlacing] = useState(false);
  const [showOnlinePaymentModal, setShowOnlinePaymentModal] = useState(false);
  const [whatsappLoading, setWhatsappLoading] = useState(false);
  

  const [newAddr, setNewAddr] = useState({
    name: "", phone: "", address: "", city: "", state: "", pincode: "",
  });
  const [giftDetails, setGiftDetails] = useState({ recipientName: "", recipientPhone: "", message: "" });
  const [locLoading, setLocLoading] = useState(false);

  const shipping = cartTotal > 499 ? 0 : 49;
  const total = cartTotal + shipping;

  const setN = (f) => (e) => setNewAddr((p) => ({ ...p, [f]: e.target.value }));
  const setG = (f) => (e) => setGiftDetails((p) => ({ ...p, [f]: e.target.value }));

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
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
    }, () => setLocLoading(false));
  };

const handleWhatsAppOrder = async () =>  {

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

  setWhatsappLoading(true);


  const useSavedAddress =
  user?.address &&
  !newAddr.name &&
  !newAddr.phone &&
  !newAddr.address;

const customerName = useSavedAddress
  ? user?.name || ""
  : newAddr?.name || "";

const customerPhone = useSavedAddress
  ? user?.phone || ""
  : newAddr?.phone || "";

const customerAddress = useSavedAddress
  ? user?.address || ""
  : newAddr?.address || "";

const customerCity = useSavedAddress
  ? user?.city || ""
  : newAddr?.city || "";

const customerState = useSavedAddress
  ? user?.state || ""
  : newAddr?.state || "";

const customerPincode = useSavedAddress
  ? user?.pincode || ""
  : newAddr?.pincode || "";
  const products = cartItems
    .map(
      (item) =>
        `• ${item.name}
Qty: ${item.qty}
Price: ₹${item.price}`
    )
    .join("\n\n");

const locationLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${customerAddress} ${customerCity} ${customerState} ${customerPincode}`
)}`;



const message = `
*NEW ORDER REQUEST*

  Customer Details

Name: ${customerName}
Phone: ${customerPhone}

Delivery Address

${customerAddress}

City: ${customerCity}
State: ${customerState}
Pincode: ${customerPincode}
Map Location:
${locationLink}

Products

${products}

Total Amount: ₹${total}
`;



  const whatsappUrl = `https://wa.me/${SHOP_WHATSAPP}?text=${encodeURIComponent(
    message
  )}`;

  const token = localStorage.getItem("access_token");
console.log("TOKEN:", token);
const orderPayload = {
  customer_name: customerName,
  phone: customerPhone,
  address: customerAddress,
  city: customerCity,
  state: customerState,
  pincode: customerPincode,
  total_amount: total,
  items: cartItems.map((item) => ({
    product_id: item.id,
    quantity: item.qty,
  })),
};

try {
  const response = await fetch(
    "VITE_API_URL/api/orders/create/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderPayload),
    }
  );

  const data = await response.json();

  console.log("Order Saved:", data);



  if (!response.ok) {
     setWhatsappLoading(false);
    alert("Order save failed");
    return;
  }
 
  

} catch (error) {
  setWhatsappLoading(false);
  console.error(error);
  alert("Failed to save order");
  return;
}

  window.open(whatsappUrl, "_blank");
  placeOrder();

navigate("/order-success");

  return;
};

const handlePlaceOrder = async () => {
  if (!user) {
    setShowAuthModal(true);
    return;
  }

  if (addressMode === "new") {
    if (!newAddr.name || !newAddr.phone || !newAddr.address || !newAddr.pincode) {
      alert("Please fill in all address fields.");
      return;
    }
  }

  if (addressMode === "saved" && !user.address) {
    alert("Please add a delivery address.");
    return;
  }

  const deliveryAddress =
    addressMode === "saved"
      ? {
          name: user.name,
          phone: user.phone || "",
          address: user.address || "",
          city: user.city || "",
          state: user.state || "",
          pincode: user.pincode || "",
        }
      : newAddr;

  const token = localStorage.getItem("access_token"); // or wherever your JWT is stored

  try {
    setPlacing(true);

    const stockRes = await fetch("VITE_API_URL/api/products/validate-stock/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems.map((i) => ({
          id: i.id,
          qty: i.qty,
          name: i.name,
        })),
      }),
    });

    const stockData = await stockRes.json();

    if (!stockData.valid) {
      const messages = stockData.errors.map((e) => `• ${e.message}`).join("\n");
      alert(`Stock issue:\n\n${messages}\n\nPlease update your cart.`);
      navigate("/cart");
      return;
    }

    const orderPayload = {
      customer_name: deliveryAddress.name,
      phone: deliveryAddress.phone,
      address: deliveryAddress.address,
      city: deliveryAddress.city,
      state: deliveryAddress.state,
      pincode: deliveryAddress.pincode,
      total_amount: total, // make sure total exists in your component
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.qty,
      })),
      is_gift: isGift,
      gift_details: isGift ? giftDetails : null,
      payment_method: payment,
      shipping_cost: shipping,
    };

    const orderRes = await fetch("VITE_API_URL/api/orders/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderPayload),
    });
    console.log(
  "TOKEN:",
  localStorage.getItem("access_token")
);

    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      alert(orderData.detail || orderData.message || "Failed to place order.");
      return;
    }

    console.log("Navigating with order:", orderData);
navigate("/order-success", {
  state: {
    order: orderData,
  },
});  } catch (err) {
    alert("Something went wrong while placing the order.");
  } finally {
    setPlacing(false);
  }
};

useEffect(() => {
  if (cartItems.length === 0 && !placing) {
    navigate("/cart");  // remove the setTimeout wrapper entirely
  }
}, []);

  if (!user) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-5xl mb-4">🔐</p>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Sign in to Checkout</h2>
        <p className="text-gray-400 text-sm mb-4">You need to be signed in to place an order</p>
        <button onClick={() => setShowAuthModal(true)} className="bg-black hover:bg-cyan-600 text-white font-bold px-6 py-3 rounded-xl transition">Sign In / Register</button>
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
          font-size: 14px; color: #1e293b; outline: none; transition: border-color 0.15s, box-shadow 0.15s;
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
        .pay-option {
          border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 14px 16px;
          cursor: pointer; transition: all 0.15s; display: flex; align-items: center; gap: 12px; margin-bottom: 8px;
        }
        .pay-option.selected { border-color: #06b6d4; background: rgba(6,182,212,0.05); }
        .pay-option:hover { border-color: #06b6d4; }
        .radio-dot {
          width: 18px; height: 18px; border-radius: 50%; border: 2px solid #cbd5e1; flex-shrink: 0;
          transition: all 0.15s; display: flex; align-items: center; justify-content: center;
        }
        .radio-dot.on { border-color: #06b6d4; background: #06b6d4; }
        .radio-dot.on::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background: white; }
        .gift-toggle {
          display: flex; align-items: center; justify-content: space-between;
          border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 14px 16px; cursor: pointer;
          transition: all 0.15s;
        }
        .gift-toggle.on { border-color: #ec4899; background: rgba(236,72,153,0.04); }
        .toggle-sw { width: 40px; height: 22px; border-radius: 999px; background: #cbd5e1; position: relative; transition: background 0.2s; flex-shrink: 0; }
        .toggle-sw.on { background: #ec4899; }
        .toggle-sw .knob { position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: white; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
        .toggle-sw.on .knob { transform: translateX(18px); }
        .loc-btn {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px; border-radius: 10px; border: 1.5px dashed #06b6d4; color: #0891b2;
          font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; background: rgba(6,182,212,0.04);
          margin-bottom: 12px;
        }
        .loc-btn:hover { background: rgba(6,182,212,0.09); }
        .place-btn {
          width: 100%; padding: 15px; border-radius: 14px; border: none;
          background: linear-gradient(135deg, #0f172a, #1e3a5f); color: white;
          font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: 'DM Sans', sans-serif;
        }
        .place-btn:hover:not(:disabled) { background: linear-gradient(135deg, #0891b2, #06b6d4); box-shadow: 0 6px 20px rgba(6,182,212,0.35); transform: translateY(-1px); }
        .place-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner-w { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
        .order-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f8fafc; }
        .free-ship { background: #f0fdf4; border: 1px solid #bbf7d0; color: #16a34a; font-size: 11px; font-weight: 600; padding: 6px 12px; border-radius: 8px; margin-bottom: 12px; }
      `}</style>

      <div className="checkout-root">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm mb-6 transition">
            <FaArrowLeft /> Back to Cart
          </button>

          <AnimatedSection direction="up">
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "24px", fontWeight: 800, color: "#1e293b", marginBottom: "24px" }}>
              Checkout
            </h1>
          </AnimatedSection>

          <div className="grid md:grid-cols-5 gap-6">

            {/* ── LEFT: Address + Gift + Payment ── */}
            <div className="md:col-span-3 space-y-0">

              {/* ADDRESS */}
              <AnimatedSection direction="left">
                <div className="co-card">
                  <p className="co-section-title"><FaMapMarkerAlt className="text-cyan-500" /> Delivery Address</p>

                  {/* Saved address option */}
                  {user.address && (
                    <div
                      className={`addr-option ${addressMode === "saved" ? "selected" : ""}`}
                      onClick={() => setAddressMode("saved")}
                      style={{ marginBottom: "10px" }}
                    >
                      <div className={`radio-dot ${addressMode === "saved" ? "on" : ""}`} />
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>{user.name}</p>
                        <p style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{user.address}</p>
                        {user.pincode && <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>Pincode: {user.pincode}</p>}
                        <span style={{ fontSize: "10px", fontWeight: 700, background: "#e0f2fe", color: "#0369a1", padding: "2px 8px", borderRadius: "20px", marginTop: "4px", display: "inline-block" }}>SAVED ADDRESS</span>
                      </div>
                    </div>
                  )}

                  {/* New address option */}
                  <div
                    className={`addr-option ${addressMode === "new" ? "selected" : ""}`}
                    onClick={() => setAddressMode("new")}
                  >
                    <div className={`radio-dot ${addressMode === "new" ? "on" : ""}`} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: "6px" }}>
                        <FaPlus style={{ fontSize: "10px" }} /> Add New Address
                      </p>
                    </div>
                  </div>

                  {/* New address form */}
                  {addressMode === "new" && (
                    <div style={{ marginTop: "16px" }}>
                      <button className="loc-btn" onClick={detectLocation} disabled={locLoading}>
                        <MdLocationOn style={{ fontSize: "16px" }} />
                        {locLoading ? "Detecting…" : "Use current location"}
                      </button>
                      <div className="co-grid2">
                        <div className="co-field"><label>Full Name</label><input className="co-input" value={newAddr.name} onChange={setN("name")} placeholder="Your name" /></div>
                        <div className="co-field"><label>Phone</label><input className="co-input" value={newAddr.phone} onChange={setN("phone")} placeholder="10-digit mobile" /></div>
                      </div>
                      <div className="co-field"><label>Address</label><textarea className="co-input" value={newAddr.address} onChange={setN("address")} placeholder="House No, Street, Area, Landmark" rows={2} style={{ resize: "none" }} /></div>
                      <div className="co-grid2">
                        <div className="co-field"><label>City</label><input className="co-input" value={newAddr.city} onChange={setN("city")} placeholder="City" /></div>
                        <div className="co-field"><label>State</label><input className="co-input" value={newAddr.state} onChange={setN("state")} placeholder="State" /></div>
                      </div>
                      <div className="co-field"><label>Pincode</label><input className="co-input" value={newAddr.pincode} onChange={setN("pincode")} placeholder="6-digit pincode" /></div>
                    </div>
                  )}
                </div>
              </AnimatedSection>

              {/* GIFT OPTION */}
              <AnimatedSection direction="left" delay={80}>
                <div className="co-card">
                  <div className={`gift-toggle ${isGift ? "on" : ""}`} onClick={() => setIsGift(!isGift)}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <FaGift style={{ color: isGift ? "#ec4899" : "#94a3b8", fontSize: "16px" }} />
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>Send as a Gift 🎁</p>
                        <p style={{ fontSize: "12px", color: "#64748b" }}>Deliver to someone special with a message</p>
                      </div>
                    </div>
                    <div className={`toggle-sw ${isGift ? "on" : ""}`}><div className="knob" /></div>
                  </div>

                  {isGift && (
                    <div style={{ marginTop: "16px" }}>
                      <div className="co-grid2">
                        <div className="co-field"><label>Recipient Name</label><input className="co-input" value={giftDetails.recipientName} onChange={setG("recipientName")} placeholder="Who is it for?" /></div>
                        <div className="co-field"><label>Recipient Phone</label><input className="co-input" value={giftDetails.recipientPhone} onChange={setG("recipientPhone")} placeholder="Their mobile number" /></div>
                      </div>
                      <div className="co-field"><label>Gift Message</label><textarea className="co-input" value={giftDetails.message} onChange={setG("message")} placeholder="Write a heartfelt message (optional)" rows={3} style={{ resize: "none" }} /></div>
                    </div>
                  )}
                </div>
              </AnimatedSection>


            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div className="md:col-span-2">
              <AnimatedSection direction="right">
                <div className="co-card" style={{ position: "sticky", top: "96px" }}>
                  <p className="co-section-title"><FaShoppingBag className="text-cyan-500" /> Order Summary</p>

                  {shipping === 0 && (
                    <div className="free-ship">🎉 You qualify for FREE delivery!</div>
                  )}

                  <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "16px" }}>
                    {cartItems.map((item) => (
                      <div key={item.id} className="order-item">
                        <img src={getProductImage(item)} alt={item.name}
 style={{ width: "44px", height: "44px", objectFit: "cover", borderRadius: "10px", background: "#f8fafc", flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: "12px", fontWeight: 600, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                          <p style={{ fontSize: "11px", color: "#94a3b8" }}>Qty: {item.qty}</p>
                        </div>
                        <p style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", flexShrink: 0 }}>₹{(item.price * item.qty).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                    {[
                      { label: `Subtotal (${cartItems.reduce((s,i) => s+i.qty, 0)} items)`, val: `₹${cartTotal.toLocaleString()}` },
                      { label: "Delivery", val: shipping === 0 ? "FREE" : `₹${shipping}`, green: shipping === 0 },
                      { label: isGift ? "Gift Wrapping" : null, val: "Free", green: true },
                    ].filter(r => r.label).map((row) => (
                      <div key={row.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>
                        <span>{row.label}</span>
                        <span style={{ color: row.green ? "#16a34a" : "#1e293b", fontWeight: row.green ? 700 : 400 }}>{row.val}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "17px", fontWeight: 800, color: "#1e293b", borderTop: "1px solid #f1f5f9", paddingTop: "10px", marginTop: "4px" }}>
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                  className="place-btn" 
                  style={{ marginTop: "16px" }} 
                  onClick={handleWhatsAppOrder}
                  disabled={whatsappLoading}>
                   {whatsappLoading ? (
  <>
    <FaCheckCircle style={{ fontSize: "14px" }} />
     Submitted ....
  </>
) : (
  <>
    <FaCheckCircle style={{ fontSize: "14px" }} />
    Continue on WhatsApp · ₹{total.toLocaleString()}
  </>
)}
                  </button>

                  <p style={{ fontSize: "11px", color: "#94a3b8", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                    <FaLock style={{ fontSize: "9px" }} /> 100% Secure Checkout
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
}