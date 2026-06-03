import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export function WishlistPage() {
  const { wishlist } = useCart();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaHeart className="text-6xl text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-400 text-sm mb-6">Save items you love to revisit later!</p>
          <button
            onClick={() => navigate("/catalog")}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition"
          >
            Explore Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist ({wishlist.length})</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">My Account</h1>
        <p className="text-gray-400 text-sm mb-8">Sign in to manage your orders and wishlist</p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <h2 className="font-bold text-gray-800 mb-4">Sign In</h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide block mb-1">Email</label>
              <input type="email" placeholder="you@email.com" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-400 transition" />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide block mb-1">Password</label>
              <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-400 transition" />
            </div>
            <button className="w-full bg-black hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition mt-1">
              Sign In
            </button>
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            Don't have an account?{" "}
            <span className="text-cyan-600 font-semibold cursor-pointer hover:underline">Sign Up</span>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400">
          This is a frontend demo. Backend coming soon!
        </p>
      </div>
    </div>
  );
}

export function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleOrder = () => {
    clearCart();
    navigate("/order-success");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-3">Delivery Address</h2>
              <div className="space-y-3">
                {[
                  { label: "Full Name", type: "text", placeholder: "Your Name" },
                  { label: "Phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  { label: "Address", type: "text", placeholder: "House No, Street, Area" },
                  { label: "City", type: "text", placeholder: "City" },
                  { label: "Pincode", type: "text", placeholder: "Pincode" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide block mb-1">{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-400 transition" />
                  </div>
                ))}
              </div>
            </div>

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
          </div>

          <div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="font-bold text-gray-800 mb-3">Order Summary</h2>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-600">
                    <span className="truncate pr-2">{item.name} × {item.qty}</span>
                    <span className="flex-shrink-0">₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-800 mb-4">
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <button
                onClick={handleOrder}
                className="w-full bg-black hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition"
              >
                Place Order
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">Frontend demo — no real payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrderSuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-sm px-4">
        <div className="text-7xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h1>
        <p className="text-gray-400 text-sm mb-6">
          Thank you for shopping with Raju Mobile. You'll receive a confirmation soon.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-black hover:bg-cyan-600 text-white font-bold px-8 py-3 rounded-xl transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Let's Talk</h1>
        <p className="text-gray-400 text-sm mb-8">Do you have any questions or need assistance? Reach out to us!</p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="space-y-3">
            {[
              { label: "Your Name", type: "text", placeholder: "Your Name" },
              { label: "Email", type: "email", placeholder: "you@email.com" },
              { label: "Phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide block mb-1">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-400 transition" />
              </div>
            ))}
            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide block mb-1">Message</label>
              <textarea rows={4} placeholder="Your message..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-400 transition resize-none" />
            </div>
            <button className="w-full bg-black hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition">
              Send Message
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-sm text-gray-600 space-y-2">
          <p>📧 <strong>Email:</strong> raju.mobile@gmail.com</p>
          <p>📞 <strong>Phone:</strong> +91 98765 43210</p>
          <p>📍 <strong>Address:</strong> Hyderabad, Telangana, India</p>
        </div>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-8xl font-black text-gray-200 mb-4">404</p>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-400 text-sm mb-6">The page you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/")} className="bg-black hover:bg-cyan-600 text-white font-bold px-6 py-3 rounded-xl transition">
          Go Home
        </button>
      </div>
    </div>
  );
}
