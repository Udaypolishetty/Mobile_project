

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit,
  FaSignOutAlt, FaShoppingBag, FaHeart, FaHeadset,
  FaCheckCircle, FaTimes, FaSave, FaBoxOpen, FaCalendarAlt,
} from "react-icons/fa";
import { MdVerified, MdLocationCity } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../api/authApi";
import { getMyOrders } from "../../api/orderApi";
import { getProductImage } from "../../utils/imageHelper";
import AnimatedSection from "../AnimatedSection";

/* ─── tiny reusable info row ─────────────────────────────────── */
function InfoRow({ icon: Icon, label, value, iconColor = "text-cyan-500" }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className={`text-sm ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-gray-800 mt-0.5 break-words">
          {value || <span className="text-gray-300 font-normal italic">Not provided</span>}
        </p>
      </div>
    </div>
  );
}

/* ─── edit field ─────────────────────────────────────────────── */
function EditField({ label, value, onChange, type = "text", textarea = false }) {
  return (
    <div className="mb-3">
      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition"
        />
      )}
    </div>
  );
}

/* ─── status badge color helper ──────────────────────────────── */
function statusBadgeClass(status) {
  const s = (status || "").toLowerCase();
  if (s.includes("deliver")) return "bg-green-100 text-green-700";
  if (s.includes("cancel")) return "bg-red-100 text-red-600";
  if (s.includes("ship")) return "bg-cyan-100 text-cyan-700";
  if (s.includes("process") || s.includes("pack")) return "bg-amber-100 text-amber-700";
  return "bg-violet-100 text-violet-700"; // pending / confirmed
}

/* ─── order skeleton ──────────────────────────────────────────── */
function OrderSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
          <div className="animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="flex gap-3">
              <div className="w-20 h-20 bg-gray-200 rounded-xl" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN ACCOUNT PAGE
═══════════════════════════════════════════════════════════════ */
export default function AccountPage() {
  const { user, logout, updateUser, setShowAuthModal, setAuthMode } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile"); // "profile" | "orders" | "settings"
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [trackingOrderId, setTrackingOrderId] = useState(null);

  const [form, setForm] = useState({
    name: "", phone: "", address: "", pincode: "", city: "", state: "",
  });

  /* ── load orders once on mount ── */
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoadingOrders(true);
        const data = await getMyOrders();
        const formatted = data.map((order) => ({
          id: order.id,
          status: order.status,
          date: order.created_at,
          total: order.total_amount,
          items: (order.items || []).map((item) => ({
            id: item.id,
            name: item.product_name || item.product?.name || "Product",
            qty: item.quantity,
            price: item.price,
            image: item.product_image,
          })),
        }));
        if (active) setOrders(formatted);
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        if (active) setLoadingOrders(false);
      }
    })();
    return () => { active = false; };
  }, []);
  console.log("Orders:", formatted);

  const openEdit = () => {
    setForm({
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
      pincode: user?.pincode || "",
      city: user?.city || "",
      state: user?.state || "",
    });
    setEditing(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await updateProfile(form);
      updateUser(result.user);
      setSaveMsg("Profile updated successfully!");
      setEditing(false);
      setTimeout(() => setSaveMsg(""), 3000);
    } catch (err) {
      setSaveMsg("❌ " + (err.response?.data?.error || "Update failed. Try again."));
      setTimeout(() => setSaveMsg(""), 4000);
    }
    setSaving(false);
  };

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(async () => {
      try { await logout(); } catch (err) { console.error(err); }
      navigate("/", { replace: true });
      setTimeout(() => window.location.reload(), 50);
    }, 700);
  };

  const handleTrackOrder = (orderId) => {
    setTrackingOrderId(orderId);
    setTimeout(() => navigate(`/order/${orderId}`), 300);
  };

  /* ── Not signed in ─────────────────────────────────────────── */
  if (!user) {
    return (
      <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center px-4">
        <AnimatedSection direction="up" className="w-full max-w-sm">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-2xl text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">My Account</h2>
            <p className="text-gray-400 text-sm mb-6">Sign in to view your profile, orders and wishlist</p>
            <button
              onClick={() => { setAuthMode("login"); setShowAuthModal(true); }}
              className="w-full bg-black hover:bg-cyan-600 text-white font-bold py-3 rounded-2xl transition mb-3 text-sm"
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode("register"); setShowAuthModal(true); }}
              className="w-full border-2 border-gray-100 hover:border-cyan-300 text-gray-600 font-semibold py-3 rounded-2xl transition text-sm"
            >
              Create Account
            </button>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  /* ── Logging out overlay ───────────────────────────────────── */
  if (loggingOut) {
    return (
      <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-md">
        <div className="w-[420px] max-w-[90%] bg-[#111827] rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/20">
          <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-red-500" />
          <div className="p-10 text-center">
            <div className="w-32 h-32 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-lg mb-6">
              <img src="/mobile_logo.png" alt="Raju Mobile" className="w-24 h-24 object-contain" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Raju Mobile</h1>
            <p className="text-cyan-400 text-lg mb-8">Signing Out...</p>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-white/20 rounded-full" />
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-8">Thank you for visiting Raju Mobile</p>
          </div>
        </div>
      </div>
    );
  }

  const initials = (user.name || "U").split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* ── Hero header card ───────────────────────────────── */}
        <AnimatedSection direction="up">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-5">
            <div className="h-24 bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900 relative">
              <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #06b6d4 0%, transparent 60%)" }}
              />
            </div>

            <div className="px-6 pb-6 relative">
              <div className="flex items-end justify-between -mt-8 mb-4 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-2xl font-black shadow-lg border-4 border-white">
                  {initials}
                </div>
                <button
                  onClick={openEdit}
                  className="flex items-center gap-1.5 bg-black hover:bg-cyan-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-sm"
                >
                  <FaEdit className="text-[10px]" /> Edit Profile
                </button>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xl font-extrabold text-gray-900">{user.name}</h1>
                  <MdVerified className="text-cyan-500 text-base" />
                </div>
                <p className="text-gray-400 text-sm">{user.email}</p>
                {user.member_since && (
                  <p className="text-[11px] text-gray-300 mt-0.5 flex items-center gap-1">
                    <FaCalendarAlt className="text-[10px]" /> Member since {user.member_since}
                  </p>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Tabs ──────────────────────────────────────────── */}
        <AnimatedSection direction="up" delay={80}>
          <div className="flex gap-2 mb-5 bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm">
            {[
              { id: "profile", label: "Profile", icon: FaUser },
              { id: "orders", label: "Orders", icon: FaShoppingBag },
              { id: "settings", label: "Settings", icon: FaHeadset },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition ${activeTab === id
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <Icon className="text-xs" /> {label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* ── Success flash ───────────────────────────────────── */}
        {saveMsg && (
          <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium mb-4 ${saveMsg.startsWith("❌")
              ? "bg-red-50 text-red-600 border border-red-100"
              : "bg-green-50 text-green-700 border border-green-100"
            }`}>
            <FaCheckCircle className="flex-shrink-0" />
            {saveMsg}
          </div>
        )}

        {/* ════════════ TAB: PROFILE ════════════ */}
        {activeTab === "profile" && !editing && (
          <AnimatedSection direction="up" delay={100}>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-4">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-base">
                <FaUser className="text-cyan-500 text-sm" /> Personal Information
              </h2>
              <InfoRow icon={FaUser} label="Full Name" value={user.name} />
              <InfoRow icon={FaEnvelope} label="Email Address" value={user.email} iconColor="text-blue-500" />
              <InfoRow icon={FaPhone} label="Phone Number" value={user.phone} iconColor="text-green-500" />
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-base">
                <FaMapMarkerAlt className="text-red-400 text-sm" /> Delivery Address
              </h2>
              <InfoRow icon={FaMapMarkerAlt} label="Street Address" value={user.address} iconColor="text-red-400" />
              <InfoRow icon={MdLocationCity} label="City" value={user.city} iconColor="text-purple-500" />
              <InfoRow icon={FaMapMarkerAlt} label="State" value={user.state} iconColor="text-orange-500" />
              <InfoRow icon={FaMapMarkerAlt} label="Pincode" value={user.pincode} iconColor="text-teal-500" />
            </div>
          </AnimatedSection>
        )}

        {/* ── Edit Profile Form ─────────────────────────────── */}
        {activeTab === "profile" && editing && (
          <AnimatedSection direction="up">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-800 text-base">Edit Profile</h2>
                <button onClick={() => setEditing(false)} className="text-gray-400 hover:text-gray-700 transition">
                  <FaTimes />
                </button>
              </div>

              <EditField label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <EditField label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} type="tel" />

              <div className="border-t border-gray-50 pt-4 mt-1 mb-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Delivery Address</p>
              </div>

              <EditField label="Street Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} textarea />
              <div className="grid grid-cols-2 gap-3">
                <EditField label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
                <EditField label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} />
              </div>
              <EditField label="Pincode" value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v })} />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 border-2 border-gray-100 hover:border-gray-200 text-gray-600 font-semibold py-3 rounded-2xl transition text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-black hover:bg-cyan-600 text-white font-bold py-3 rounded-2xl transition text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {saving
                    ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><FaSave className="text-xs" /> Save Changes</>}
                </button>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* ════════════ TAB: ORDERS ════════════ */}
        {activeTab === "orders" && (
          <AnimatedSection direction="up" delay={100}>
            {loadingOrders ? (
              <OrderSkeleton />
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center">
                <FaBoxOpen className="text-5xl text-gray-200 mx-auto mb-4" />
                <h3 className="font-bold text-gray-700 mb-1">No orders yet</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Your order history will appear here once you place an order.
                </p>
                <button
                  onClick={() => navigate("/catalog")}
                  className="bg-black hover:bg-cyan-600 text-white font-bold px-6 py-3 rounded-2xl transition text-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">

                    {/* Order header */}
                    <div className="flex justify-between mb-3">
                      <div>
                        <p className="font-bold text-gray-800">Order #{order.id}</p>
                        <p className="text-xs text-gray-500">
                          {order.date ? new Date(order.date).toLocaleString() : "Date unavailable"}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusBadgeClass(order.status)}`}>
                        {order.status || "Pending"}
                      </span>
                    </div>

                    {/* Items */}
                    {order.items.map((item) => (
                   
                      <div key={item.id} className="flex gap-3 py-2 border-t border-gray-100">
                        <img
                          src={item.image || getProductImage(item)}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl bg-gray-50"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://placehold.co/80x80/f1f5f9/94a3b8?text=${encodeURIComponent((item.name || "").split(" ").slice(0, 2).join(" "))}`;
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                          <p className="font-bold text-cyan-600">₹{item.price}</p>
                        </div>
                      </div>
                  ))}

                    {/* Total */}
                    <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between">
                      <span className="font-semibold text-gray-700">Total</span>
                      <span className="font-bold text-gray-900">₹{order.total}</span>
                    </div>

                    {/* Track button */}
                    <button
                      onClick={() => handleTrackOrder(order.id)}
                      disabled={trackingOrderId === order.id}
                      className={`w-full mt-4 py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2 text-white ${trackingOrderId === order.id
                          ? "bg-cyan-500 cursor-not-allowed"
                          : "bg-black hover:bg-cyan-600 active:scale-95"
                        }`}
                    >
                      {trackingOrderId === order.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Loading...</span>
                        </>
                      ) : (
                        "Track Order"
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </AnimatedSection>
        )}

        {/* ════════════ TAB: SETTINGS ════════════ */}
        {activeTab === "settings" && (
          <AnimatedSection direction="up" delay={100}>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-4">
              {[
                { icon: FaShoppingBag, label: "My Cart", onClick: () => navigate("/cart"), color: "text-cyan-500" },
                { icon: FaHeart, label: "My Wishlist", onClick: () => navigate("/wishlist"), color: "text-pink-500" },
                { icon: FaHeadset, label: "Contact Support", onClick: () => navigate("/contact"), color: "text-purple-500" },
                { icon: FaEdit, label: "Edit Profile", onClick: openEdit, color: "text-blue-500" },
              ].map(({ icon: Icon, label, onClick, color }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="w-full flex items-center gap-3 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition text-left"
                >
                  <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center">
                    <Icon className={`text-sm ${color}`} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{label}</span>
                  <span className="ml-auto text-gray-300 text-xs">›</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 border-2 border-red-100 hover:bg-red-50 text-red-500 font-bold py-3.5 rounded-2xl transition text-sm"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </AnimatedSection>
        )}

      </div>
    </div>
  );
}
