import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

function CartPage() {
  const { cartItems, removeFromCart, updateQty, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaShoppingCart className="text-6xl text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-400 text-sm mb-6">Add some products to get started!</p>
          <button
            onClick={() => navigate("/catalog")}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const shipping = cartTotal > 499 ? 0 : 49;
  const total = cartTotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm mb-6 transition"
        >
          <FaArrowLeft /> Continue Shopping
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          My Cart ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 items-center"
              >
{/* Replace the image section inside cartItems.map with this: */}
<Link to={`/product/${item.id}`} className="flex-shrink-0">
  <img
    src={
      item.image 
        ? (item.image.startsWith('http') ? item.image : `http://127.0.0.1:8000${item.image}`)
        : (item.images && item.images.length > 0 
            ? (item.images[0].image?.startsWith('http') ? item.images[0].image : `http://127.0.0.1:8000${item.images[0].image}`)
            : 'https://via.placeholder.com/150')
    }
    alt={item.name}
    className="w-20 h-20 object-cover rounded-xl bg-gray-50 border border-gray-100"
    onError={(e) => {
      // If the image fails entirely, fall back to a clean placeholder and stop the blinking loop
      e.target.onerror = null; 
      e.target.src = "https://via.placeholder.com/150?text=No+Image";
    }}
  />
</Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`}>
                    <p className="text-gray-800 font-semibold text-sm line-clamp-2 hover:text-cyan-700 transition mb-0.5">
                      {item.name}
                    </p>
                  </Link>
                  <p className="text-gray-400 text-xs mb-2">{item.category}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold transition"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 flex flex-col items-end gap-2">
                  <p className="font-bold text-gray-800">₹{(item.price * item.qty).toLocaleString()}</p>
                  <p className="text-gray-400 text-xs">₹{item.price.toLocaleString()} each</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-red-400 hover:text-red-600 text-sm font-medium transition"
            >
              Clear Cart
            </button>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-2.5 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-green-600 text-xs">🎉 You qualify for free shipping!</p>
                )}
                <div className="border-t border-gray-100 pt-2.5 flex justify-between font-bold text-gray-800 text-base">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-black hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition mb-3"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/catalog"
                className="block text-center text-cyan-600 text-sm hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
