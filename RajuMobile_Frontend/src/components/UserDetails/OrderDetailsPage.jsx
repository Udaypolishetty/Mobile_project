

import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getOrder } from "../../api/orderApi";
import {
  FaCheckCircle,
  FaBoxOpen,
  FaTruck,
  FaHome,
  FaMapMarkerAlt,
  FaReceipt,
  FaArrowLeft,
} from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";

// Matching the base API constant from your working ProductDetailPage
const API = "http://127.0.0.1:8000";

// The exact image resolution pattern that works everywhere in your app
const resolveImg = (img) => {
  if (!img) return null;
  if (typeof img === "string") return img.startsWith("http") ? img : `${API}${img}`;
  if (img.image) return img.image.startsWith("http") ? img.image : `${API}${img.image}`;
  return null;
};

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getOrder(id)
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const timeline = useMemo(() => {
    const status = order?.status?.toLowerCase?.() || "";

    const currentStepMap = {
      pending: 0,
      confirmed: 1,
      packed: 2,
      shipped: 3,
      out_for_delivery: 3,
      delivered: 4,
      cancelled: -1,
    };

    const currentStep = currentStepMap[status] ?? 0;

    return [
      { key: 1, label: "Confirmed", icon: FaCheckCircle },
      { key: 2, label: "Packed", icon: FaBoxOpen },
      { key: 3, label: "Shipped", icon: FaTruck },
      { key: 4, label: "Delivered", icon: FaHome },
    ].map((step) => ({
      ...step,
      done: currentStep >= step.key,
      active: currentStep === step.key,
    }));
  }, [order]);

  const progressPercent =
    timeline.length > 1
      ? ((timeline.filter((step) => step.done).length - 1) /
        (timeline.length - 1)) *
      100
      : 0;

  const statusClasses = useMemo(() => {
    const status = order?.status?.toLowerCase?.() || "";

    if (status.includes("cancel")) {
      return "bg-red-100 text-red-700 border-red-200";
    }
    if (status.includes("deliver")) {
      return "bg-green-100 text-green-700 border-green-200";
    }
    if (status.includes("ship")) {
      return "bg-cyan-100 text-cyan-700 border-cyan-200";
    }
    if (status.includes("pack")) {
      return "bg-amber-100 text-amber-700 border-amber-200";
    }
    return "bg-violet-100 text-violet-700 border-violet-200";
  }, [order]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] px-4 md:px-6 py-6 md:py-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="h-8 w-20 bg-gray-200 rounded-lg animate-pulse" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="grid grid-cols-1 xl:grid-cols-[1.65fr_1fr] gap-6"
          >
            <div className="space-y-6">
              <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 md:p-7 border-b border-gray-100">
                  <div className="space-y-4">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
                  </div>
                </div>

                <div className="p-5 md:p-7">
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-3 flex-1 bg-gray-100 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-5 md:p-7">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-6" />
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-2xl">
                      <div className="w-28 h-28 bg-gray-200 rounded-xl animate-pulse flex-shrink-0" />
                      <div className="flex-1 space-y-3">
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
                        <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-5 md:p-7"
                >
                  <div className="space-y-4">
                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
                      <div className="h-3 w-5/6 bg-gray-100 rounded animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] px-4 py-10">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center">
          <HiOutlineShoppingBag className="text-5xl text-gray-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order not found</h2>
          <p className="text-sm text-gray-500 mb-6">
            We couldn’t find the order you’re looking for.
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="inline-flex items-center gap-2 bg-black hover:bg-cyan-600 text-white font-semibold px-5 py-3 rounded-2xl transition-all duration-300"
          >
            <FaArrowLeft className="text-sm" />
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#f6f7fb] px-4 md:px-6 py-6 md:py-10"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-cyan-600 transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            Back
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 xl:grid-cols-[1.65fr_1fr] gap-6"
        >
          <div className="space-y-6">
            <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 md:p-7 border-b border-gray-100 bg-gradient-to-r from-white to-cyan-50/40">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-400 font-bold mb-2">
                      Order details
                    </p>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                      Order #{order.id}
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                      Placed on {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-bold uppercase border ${statusClasses}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-7">
                {order.status?.toLowerCase() === "cancelled" ? (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
                    <h3 className="text-red-600 font-bold text-lg">Order Cancelled</h3>
                    <p className="text-gray-600 mt-2">
                      This order has been cancelled and will not be delivered.
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute top-5 left-0 right-0 h-[3px] bg-gray-200 rounded-full" />

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-5 left-0 h-[3px] bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                    />

                    <div className="relative grid grid-cols-4 gap-3 md:gap-4">
                      {timeline.map((step, index) => {
                        const Icon = step.icon;

                        return (
                          <motion.div
                            key={step.key}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 * index, duration: 0.35 }}
                            className="flex flex-col items-center text-center"
                          >
                            <motion.div
                              initial={false}
                              animate={{
                                scale: step.active ? 1.08 : 1,
                                backgroundColor: step.done ? "#16a34a" : "#f3f4f6",
                                color: step.done ? "#ffffff" : "#9ca3af",
                                borderColor: step.done ? "#16a34a" : "#e5e7eb",
                              }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center shadow-sm"
                            >
                              <Icon className="text-sm md:text-base" />
                            </motion.div>

                            <p
                              className={`mt-3 text-xs md:text-sm font-bold ${step.done ? "text-gray-900" : "text-gray-500"
                                }`}
                            >
                              {step.label}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-5 md:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <HiOutlineShoppingBag className="text-xl text-gray-700" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900">Items in this order</h2>
                  <p className="text-sm text-gray-500">
                    {order.items.length} product{order.items.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {order.items.map((item, index) => {
                  // Fallback fallback ladder checking order schema vs product schema nested structures
                  const resolvedSrc =
                    resolveImg(item.product_image) ||
                    resolveImg(item.image) ||
                    resolveImg(item.product?.image) ||
                    resolveImg(item.product?.images?.[0]);

                  return (
                    <motion.div
                      key={item.id || index}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 * index, duration: 0.35 }}
                      className="group flex flex-col sm:flex-row gap-4 rounded-3xl border border-gray-100 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="w-full sm:w-28 h-48 sm:h-28 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center">
                        <img
                          src={resolvedSrc || "https://placehold.co/150x150/f1f5f9/94a3b8?text=Product"}
                          alt={item.product_name || "Product"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "https://placehold.co/150x150/f1f5f9/94a3b8?text=Image+Error";
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div>
                            <h3 className="text-base md:text-lg font-bold text-gray-900">
                              {item.product_name || "Unnamed Product"}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Quantity: {item.quantity}
                            </p>
                          </div>

                          <p className="text-lg font-black text-cyan-600 whitespace-nowrap">
                            ₹{Number(item.price).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-5 md:p-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-cyan-50 flex items-center justify-center">
                  <FaReceipt className="text-lg text-cyan-700" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900">Order summary</h2>
                  <p className="text-sm text-gray-500">Payment and total details</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{Number(order.total_amount).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span>Tax</span>
                  <span>Included</span>
                </div>
                <div className="border-t border-dashed border-gray-200 pt-3 flex items-center justify-between">
                  <span className="text-base font-bold text-gray-900">Total paid</span>
                  <span className="text-xl font-black text-gray-900">
                    ₹{Number(order.total_amount).toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-5 md:p-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-lg text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900">Delivery address</h2>
                  <p className="text-sm text-gray-500">Shipping destination</p>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 space-y-1">
                <p className="font-bold text-gray-900">{order.customer_name}</p>
                <p className="text-sm text-gray-600 leading-6">{order.address}</p>
                <p className="text-sm text-gray-500">PIN: {order.pincode}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.24 }}
              className="bg-gradient-to-br from-black to-gray-900 rounded-[28px] p-5 md:p-7 text-white shadow-lg"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-white/60 font-bold mb-2">
                Need help?
              </p>
              <h3 className="text-xl font-black mb-2">We’re tracking it for you</h3>
              <p className="text-sm text-white/70 leading-6 mb-5">
                Contact support if your order status has not changed for a long time.
              </p>

              <button className="w-full bg-white text-black font-bold py-3 rounded-2xl hover:bg-cyan-100 transition-all duration-300 active:scale-[0.98]">
                Contact Support
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}