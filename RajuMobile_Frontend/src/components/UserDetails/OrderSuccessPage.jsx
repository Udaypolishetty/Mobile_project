// import { useNavigate } from "react-router-dom";

// export default function OrderSuccessPage() {
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="text-center max-w-sm px-4">
//         <div className="text-7xl mb-4 animate-bounce">🎉</div>
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h1>
//         <p className="text-gray-400 text-sm mb-6">Thank you for shopping with Raju Mobile. You will receive a confirmation soon.</p>
//         <button onClick={() => navigate("/")} className="bg-black hover:bg-cyan-600 text-white font-bold px-8 py-3 rounded-xl transition">
//           Continue Shopping
//         </button>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle, FaBoxOpen, FaTruck, FaHome, FaStar, FaArrowRight, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { getOrder } from "../../api/orderApi";

const TRACKING_STEPS = [
  {
    id: "confirmed",
    label: "Order Confirmed",
    icon: FaCheckCircle,
    desc: "We've received your order",
  },
  {
    id: "packed",
    label: "Being Prepared",
    icon: MdInventory,
    desc: "Your items are being packed",
  },
  {
    id: "out_for_delivery",
    label: "Out For Delivery",
    icon: FaTruck,
    desc: "On the way to you",
  },
  {
    id: "delivered",
    label: "Delivered",
    icon: FaHome,
    desc: "Enjoy your purchase!",
  },
];

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialOrder = location.state?.order;

const [order, setOrder] = useState(initialOrder);

  const [animStep, setAnimStep] = useState(0);

  // Animate the timeline steps in on load
  useEffect(() => {
    const timers = TRACKING_STEPS.map((_, i) =>
      setTimeout(() => setAnimStep(i + 1), 300 + i * 250)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

useEffect(() => {
  if (!initialOrder?.id) return;

  getOrder(initialOrder.id)
    .then(setOrder)
    .catch(console.error);
}, [initialOrder?.id]);

useEffect(() => {
  if (!initialOrder?.id) return;

  const interval = setInterval(() => {
    getOrder(initialOrder.id)
      .then(setOrder)
      .catch(console.error);
  }, 15000);

  return () => clearInterval(interval);
}, [initialOrder?.id]);

  const estimatedDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
  };

  const orderId = order?.id || `ORD${Date.now()}`;
  const orderDate = order?.date ? new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : new Date().toLocaleDateString("en-IN");

  const statusIndex = {
  pending: 0,
  confirmed: 1,
  packed: 2,
  shipped: 2,
  out_for_delivery: 3,
  delivered: 4,
  cancelled: -1,
};

const currentStep =
  statusIndex[order?.status] || 0;

  console.log("ORDER DATA:", order);
console.log("ORDER STATUS:", order?.status);
console.log("CURRENT STEP:", currentStep);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        .os-root { font-family: 'DM Sans', sans-serif; background: #f8fafc; min-height: 100vh; padding: 40px 16px; }

        /* Confetti burst animation */
        @keyframes popIn {
          0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
          60%  { transform: scale(1.2) rotate(4deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .pop-in { animation: popIn 0.6s cubic-bezier(.4,0,.2,1) forwards; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .fade-up-d1 { animation: fadeUp 0.5s 0.1s ease both; }
        .fade-up-d2 { animation: fadeUp 0.5s 0.2s ease both; }
        .fade-up-d3 { animation: fadeUp 0.5s 0.35s ease both; }

        .os-card { background: white; border-radius: 20px; border: 1px solid #f0f0f0; padding: 24px; margin-bottom: 16px; box-shadow: 0 1px 8px rgba(0,0,0,0.04); }

        /* Timeline */
        .timeline { display: flex; flex-direction: column; gap: 0; }
        .tl-item { display: flex; gap: 16px; position: relative; }
        .tl-left { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; width: 40px; }
        .tl-dot {
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          z-index: 1; transition: all 0.4s; flex-shrink: 0;
        }
        .tl-dot.done { background: linear-gradient(135deg, #06b6d4, #0891b2); box-shadow: 0 4px 12px rgba(6,182,212,0.35); }
        .tl-dot.pending { background: #f1f5f9; border: 2px solid #e2e8f0; }
        .tl-dot.active { background: linear-gradient(135deg, #06b6d4, #0891b2); box-shadow: 0 0 0 4px rgba(6,182,212,0.2); animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 4px rgba(6,182,212,0.2); } 50% { box-shadow: 0 0 0 8px rgba(6,182,212,0.08); } }
        .tl-line { flex: 1; width: 2px; background: #e2e8f0; margin: 2px 0; min-height: 28px; transition: background 0.4s; }
        .tl-line.done { background: linear-gradient(to bottom, #06b6d4, #0891b2); }
        .tl-content { padding-bottom: 24px; flex: 1; }
        .tl-label { font-size: 14px; font-weight: 700; color: #1e293b; }
        .tl-label.pending { color: #94a3b8; }
        .tl-desc { font-size: 12px; color: #94a3b8; margin-top: 2px; }
        .tl-time { font-size: 11px; color: #06b6d4; font-weight: 600; margin-top: 3px; }

        /* ETA badge */
        .eta-badge {
          background: linear-gradient(135deg, #0f172a, #1e3a5f);
          color: white; border-radius: 14px; padding: 16px 20px;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          margin-bottom: 16px;
        }

        /* Buttons */
        .os-btn-primary {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          width: 100%; padding: 14px; border-radius: 12px; border: none;
          background: linear-gradient(135deg, #0f172a, #1e3a5f); color: white;
          font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .os-btn-primary:hover { background: linear-gradient(135deg, #0891b2, #06b6d4); box-shadow: 0 6px 20px rgba(6,182,212,0.35); transform: translateY(-1px); }
        .os-btn-outline {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          width: 100%; padding: 13px; border-radius: 12px;
          border: 1.5px solid #e2e8f0; background: white; color: #475569;
          font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s;
          font-family: 'DM Sans', sans-serif; margin-top: 10px;
        }
        .os-btn-outline:hover { border-color: #06b6d4; color: #0891b2; }

        /* Order items */
        .oi-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f8fafc; }
      `}</style>

      <div className="os-root">
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>

          {/* Success hero */}
          <div className="os-card" style={{ textAlign: "center", padding: "32px 24px" }}>
            <div className="pop-in" style={{ fontSize: "64px", marginBottom: "8px" }}>🎉</div>
            <h1 className="fade-up-d1" style={{ fontSize: "24px", fontWeight: 800, color: "#1e293b", marginBottom: "6px" }}>
              Order Placed Successfully!
            </h1>
            <p className="fade-up-d2" style={{ fontSize: "13px", color: "#64748b", marginBottom: "16px" }}>
              Thank you for shopping with Raju's Mobile. You'll receive a confirmation shortly.
            </p>
            <div className="fade-up-d3" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a",
              padding: "8px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: 700
            }}>
              <FaCheckCircle />
              Order ID: {orderId}
            </div>
            <div
  style={{
    marginTop: "10px",
    display: "inline-block",
    background: "#ecfeff",
    color: "#0891b2",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: 700,
    fontSize: "12px",
  }}
>
  Status: {order?.status}
</div>
            <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "8px" }}>
              Placed on {orderDate} • {order?.paymentMethod === "cod" ? "Cash on Delivery" : order?.paymentMethod?.toUpperCase() || "COD"}
            </p>
          </div>

          {/* ETA */}
          <div className="eta-badge fade-up-d2">
            <div>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px" }}>Estimated Delivery</p>
              <p style={{ fontSize: "18px", fontWeight: 800, marginTop: "2px" }}>{estimatedDate()}</p>
            </div>
            <FaTruck style={{ fontSize: "32px", color: "#06b6d4", opacity: 0.8 }} />
          </div>

          {/* Order tracking timeline */}
          <div className="os-card fade-up-d2">
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", marginBottom: "20px", display: "flex", alignItems: "center", gap: "6px" }}>
              <FaTruck style={{ color: "#06b6d4" }} /> Live Tracking
            </p>
            <div className="timeline">
              {TRACKING_STEPS.map((step, i) => {
                const Icon = step.icon;
              const isDone = i < currentStep;
const isActive = i === currentStep - 1;
                return (
                  <div key={step.id} className="tl-item">
                    <div className="tl-left">
                      <div
                        className={`tl-dot ${isDone ? (isActive ? "active" : "done") : "pending"}`}
                        style={{ opacity: isDone ? 1 : 0.4, transition: `all 0.4s ${i * 0.1}s` }}
                      >
                        <Icon style={{ fontSize: "14px", color: isDone ? "white" : "#cbd5e1" }} />
                      </div>
                      {i < TRACKING_STEPS.length - 1 && (
                        <div className={`tl-line ${i < animStep - 1 ? "done" : ""}`} />
                      )}
                    </div>
                    <div className="tl-content" style={{ opacity: isDone ? 1 : 0.4, transition: `opacity 0.4s ${i * 0.15}s` }}>
                      <p className={`tl-label ${isDone ? "" : "pending"}`}>{step.label}</p>
                      <p className="tl-desc">{step.desc}</p>
                      {isActive && (
  <p className="tl-time">
    Current Status ✓
  </p>
)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery address */}
          {order?.deliveryAddress && (
            <div className="os-card fade-up-d3">
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                <FaMapMarkerAlt style={{ color: "#06b6d4" }} /> Delivering To
              </p>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>{order.deliveryAddress.name}</p>
              <p style={{ fontSize: "13px", color: "#64748b", marginTop: "3px" }}>{order.deliveryAddress.address}</p>
              {order.deliveryAddress.pincode && (
                <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>Pincode: {order.deliveryAddress.pincode}</p>
              )}
              {order.isGift && (
                <div style={{ marginTop: "10px", padding: "10px", background: "#fff0f6", borderRadius: "10px", border: "1px solid #fce7f3" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#be185d" }}>🎁 Gift for {order.giftDetails?.recipientName}</p>
                  {order.giftDetails?.message && <p style={{ fontSize: "12px", color: "#9d174d", marginTop: "3px" }}>"{order.giftDetails.message}"</p>}
                </div>
              )}
            </div>
          )}

          {/* Order items */}
          {order?.items?.length > 0 && (
            <div className="os-card fade-up-d3">
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                <FaBoxOpen style={{ color: "#06b6d4" }} /> Items Ordered ({order.items.length})
              </p>
              {order.items.map((item) => (
                <div key={item.id} className="oi-row">
                  <img src={item.image} alt={item.name} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "10px", background: "#f8fafc", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                    <p style={{ fontSize: "11px", color: "#94a3b8" }}>Qty: {item.qty} × ₹{item.price.toLocaleString()}</p>
                  </div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", flexShrink: 0 }}>₹{(item.price * item.qty).toLocaleString()}</p>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "15px", paddingTop: "12px", marginTop: "4px", borderTop: "1px solid #f1f5f9" }}>
                <span>Total Paid</span>
                <span style={{ color: "#0891b2" }}>₹{order.total?.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Rate + CTA */}
          <div className="os-card" style={{ textAlign: "center" }}>
            <FaStar style={{ fontSize: "28px", color: "#fbbf24", marginBottom: "8px" }} />
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b", marginBottom: "4px" }}>Thanks for choosing us!</p>
            <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "20px" }}>Your order details are saved in My Orders in your profile.</p>

            <button className="os-btn-primary" onClick={() => navigate("/account")}>
              View My Orders <FaArrowRight style={{ fontSize: "12px" }} />
            </button>
            <button className="os-btn-outline" onClick={() => navigate("/catalog")}>
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
    </>
  );
}