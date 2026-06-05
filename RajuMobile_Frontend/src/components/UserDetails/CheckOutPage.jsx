import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import AnimatedSection from "../AnimatedSection";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, setShowAuthModal } = useAuth();
  const navigate = useNavigate();

  if (!user) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-5xl mb-4">🔐</p>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Sign in to Checkout</h2>
        <p className="text-gray-400 text-sm mb-6">You need to be signed in to place an order</p>
        <button onClick={() => setShowAuthModal(true)} className="bg-black hover:bg-cyan-600 text-white font-bold px-6 py-3 rounded-xl transition">Sign In / Register</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm mb-6 transition">
          <FaArrowLeft /> Back to Cart
        </button>
        <AnimatedSection direction="up">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <AnimatedSection direction="left">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-800 mb-3">Delivery Address</h2>
                <div className="space-y-3">
                  {[
                    { label: "Full Name", type: "text", placeholder: user.name },
                    { label: "Phone",     type: "tel",  placeholder: "+91 XXXXX XXXXX" },
                    { label: "Address",   type: "text", placeholder: "House No, Street, Area" },
                    { label: "City",      type: "text", placeholder: "City" },
                    { label: "Pincode",   type: "text", placeholder: "Pincode" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide block mb-1">{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-400 transition" />
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={100}>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-800 mb-3">Payment Method</h2>
                <div className="space-y-2">
                  {["Cash on Delivery", "UPI / PhonePe / GPay", "Credit / Debit Card"].map((method) => (
                    <label key={method} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                      <input type="radio" name="payment" defaultChecked={method === "Cash on Delivery"} className="accent-cyan-500" />
                      <span className="text-sm text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection direction="right">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="font-bold text-gray-800 mb-3">Order Summary</h2>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-600">
                    <span className="truncate pr-2">{item.name} × {item.qty}</span>
                    <span className="flex-shrink-0">Rs.{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-800 mb-4">
                <span>Total</span>
                <span>Rs.{cartTotal.toLocaleString()}</span>
              </div>
              <button onClick={() => { clearCart(); navigate("/order-success"); }} className="w-full bg-black hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition">
                Place Order
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}