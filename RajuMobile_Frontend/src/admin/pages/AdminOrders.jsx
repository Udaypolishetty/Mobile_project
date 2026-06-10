import { useEffect, useState } from "react";
import { getOrders } from "../adminApi";
import { updateOrderStatus } from "../../api/orderApi";
import { FaWhatsapp, FaCalendarAlt, FaUser, FaPhoneAlt, FaMapMarkerAlt, FaBoxOpen } from "react-icons/fa";

const STATUS_STEPS = [
  { value: "pending", label: "Pending", color: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
  { value: "confirmed", label: "Confirmed", color: "bg-blue-500", text: "text-blue-700", bg: "bg-blue-50" },
  { value: "packed", label: "Packed", color: "bg-indigo-500", text: "text-indigo-700", bg: "bg-indigo-50" },
  { value: "shipped", label: "Shipped", color: "bg-purple-500", text: "text-purple-700", bg: "bg-purple-50" },
  { value: "out_for_delivery", label: "Out For Delivery", color: "bg-cyan-500", text: "text-cyan-700", bg: "bg-cyan-50" },
  { value: "delivered", label: "Delivered", color: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" }
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    getOrders()
      .then((data) => {
        setOrders(data || []);
        setGlobalLoading(false);
      })
      .catch(() => setGlobalLoading(false));
  }, []);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    } catch (err) {
      console.error("Status update failed:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStepIndex = (currentStatus) => {
    return STATUS_STEPS.findIndex((step) => step.value === currentStatus);
  };

  if (globalLoading) {
    return (
      <div className="min-h-screen p-6 space-y-6 animate-pulse" style={{ background: "#f5f0eb" }}>
        <div className="h-9 bg-gray-300 rounded-lg w-48 mb-8" />
        {[1, 2].map((n) => (
          <div key={n} className="bg-white rounded-[24px] p-6 h-80 space-y-4 border border-gray-100 shadow-sm" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: "#f5f0eb", fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-5xl mx-auto">
        
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Manage <span className="text-cyan-600">Orders</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Live order tracking, processing pipelines and customer management panels.</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
            <p className="text-gray-400 font-medium">No order files found matching this pipeline.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const currentStepIdx = getStepIndex(order.status);
              const isCancelled = order.status === "cancelled";
              const isUpdating = updatingId === order.id;

              return (
                <div
                  key={order.id}
                  className={`group relative bg-white rounded-3xl border border-gray-100/90 p-6 md:p-8 flex flex-col gap-6 transition-all duration-500 ${
                    isUpdating ? "opacity-70 pointer-events-none scale-[0.99]" : ""
                  }`}
                  style={{ boxShadow: "0 10px 30px -10px rgba(139, 92, 26, 0.04)" }}
                >
                  {/* Individual Mini Loader Overlay */}
                  {isUpdating && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] rounded-3xl flex items-center justify-center z-10">
                      <div className="w-8 h-8 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  {/* Top metadata grid row */}
                  <div className="flex justify-between items-start flex-wrap gap-4 pb-4 border-b border-gray-100/70">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-extrabold text-gray-950">Order #{order.id}</h3>
                        {isCancelled && (
                          <span className="px-2.5 py-0.5 bg-rose-50 text-rose-600 text-xs font-bold rounded-full border border-rose-200">
                            Cancelled
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-gray-600">
                        <span className="flex items-center gap-2"><FaUser className="text-gray-400 text-xs" /> <strong>Customer:</strong> {order.customer_name}</span>
                        <span className="flex items-center gap-2"><FaPhoneAlt className="text-gray-400 text-xs" /> <strong>Phone:</strong> {order.phone}</span>
                        <span className="flex items-center gap-2 text-cyan-600 font-bold"><strong className="text-gray-600 font-normal">Total Amount:</strong> ₹{order.total_amount}</span>
                        <span className="flex items-center gap-2 text-xs"><FaCalendarAlt className="text-gray-400" /> {new Date(order.created_at).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Quick Native Select Action Dropdown */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <select
                        value={order.status}
                        disabled={isUpdating}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="border border-gray-200 bg-gray-50/50 font-semibold text-gray-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all cursor-pointer"
                      >
                        {STATUS_STEPS.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                        <option value="cancelled">Cancelled</option>
                      </select>

                      <a
                        href={`https://wa.me/91${order.phone}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#25D366] hover:bg-[#20ba56] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 duration-300"
                      >
                        <FaWhatsapp className="text-base" /> WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Core Addresses section */}
                  <div className="text-sm bg-gray-50/60 rounded-2xl p-4 border border-gray-100 flex gap-3">
                    <FaMapMarkerAlt className="text-cyan-600 mt-0.5 text-base flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-0.5">Shipping Destination</h4>
                      <p className="text-gray-600">{order.address}</p>
                      <p className="text-gray-500 text-xs font-semibold mt-0.5">{order.city}, {order.state} - {order.pincode}</p>
                    </div>
                  </div>

                  {/* Render Ordered Products */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <FaBoxOpen className="text-gray-400" /> Items List
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {order.items?.map((item) => (
                        <div key={item.id} className="border border-gray-100 rounded-xl p-3 bg-white hover:border-gray-200 transition-colors">
                          <p className="font-bold text-gray-950 text-sm truncate">{item.product_name}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500 mt-1 font-medium">
                            <span>Qty: <strong className="text-gray-800">{item.quantity}</strong></span>
                            <span>Unit Cost: <strong className="text-cyan-600">₹{item.price}</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive tracking timeline step buttons */}
                  <div className="pt-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-4">Interactive Pipeline Status Tracking</h4>
                    
                    {/* Horizontal pipeline track layout */}
                    <div className="relative flex justify-between items-center w-full gap-2">
                      {/* Base connecting line */}
                      <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gray-100 -translate-y-1/2 z-0 rounded-full" />
                      
                      {/* Active green timeline filler */}
                      {!isCancelled && currentStepIdx >= 0 && (
                        <div 
                          className="absolute top-1/2 left-0 h-[3px] bg-cyan-500 -translate-y-1/2 transition-all duration-500 z-0 rounded-full"
                          style={{ width: `${(currentStepIdx / (STATUS_STEPS.length - 1)) * 100}%` }}
                        />
                      )}

                      {STATUS_STEPS.map((step, idx) => {
                        const isActive = !isCancelled && idx <= currentStepIdx;
                        const isCurrent = !isCancelled && idx === currentStepIdx;

                        return (
                          <button
                            key={step.value}
                            type="button"
                            disabled={isUpdating}
                            onClick={() => handleStatusChange(order.id, step.value)}
                            className="relative flex flex-col items-center group/btn z-10 focus:outline-none flex-1"
                          >
                            {/* Node element icon circle */}
                            <div 
                              className={`w-5 h-5 rounded-full flex items-center justify-center border-4 transition-all duration-300 transform ${
                                isCurrent ? "bg-white scale-125 shadow-md border-cyan-500" :
                                isActive ? "bg-cyan-500 border-cyan-500 scale-100" : "bg-white border-gray-200 hover:border-gray-400"
                              }`}
                            >
                              {isCurrent && <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-ping" />}
                            </div>
                            
                            {/* Dynamic Text Label underneath node */}
                            <span 
                              className={`text-[10px] md:text-xs font-bold mt-2 text-center whitespace-nowrap px-1.5 py-0.5 rounded-md transition-all duration-300 hidden sm:inline-block ${
                                isCurrent ? `${step.text} ${step.bg} shadow-sm border border-gray-100` :
                                isActive ? "text-gray-800" : "text-gray-400 group-hover/btn:text-gray-600"
                              }`}
                            >
                              {step.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}