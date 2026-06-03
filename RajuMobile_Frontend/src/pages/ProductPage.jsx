import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaStar, FaHeart, FaShoppingCart, FaArrowLeft, FaShieldAlt, FaTruck, FaUndo } from "react-icons/fa";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";
import AnimatedSection from "../components/AnimatedSection";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const { requireAuth } = useAuth();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <div className="text-center">
          <p className="text-5xl mb-4">🔍</p>
          <p className="font-semibold">Product not found</p>
          <button onClick={() => navigate("/catalog")} className="mt-4 text-cyan-600 underline text-sm">Back to Catalog</button>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    requireAuth(() => {
      addToCart(product, qty);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    });
  };

  const handleWishlist = () => requireAuth(() => toggleWishlist(product));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm mb-6 transition">
          <FaArrowLeft /> Back
        </button>

        <AnimatedSection direction="up">
          <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
            <div className="relative bg-gray-50 rounded-xl overflow-hidden h-80 md:h-96">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">{product.badge}</span>
              )}
              <button onClick={handleWishlist} className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition">
                <FaHeart className={isWishlisted(product.id) ? "text-pink-500 text-lg" : "text-gray-300 text-lg"} />
              </button>
            </div>

            <div className="flex flex-col">
              <p className="text-cyan-600 text-xs font-semibold uppercase tracking-widest mb-1">{product.category}</p>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-sm ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>

              <div className="flex items-end gap-3 mb-4">
                <span className="text-3xl font-extrabold text-gray-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-gray-400 line-through text-lg">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-0.5 rounded-full">{discount}% OFF</span>
                  </>
                )}
              </div>

              {product.inStock
                ? <span className="text-green-600 text-sm font-semibold mb-4">✓ In Stock</span>
                : <span className="text-red-500 text-sm font-semibold mb-4">✗ Out of Stock</span>
              }

              <div className="flex items-center gap-3 mb-5">
                <span className="text-sm text-gray-600 font-medium">Qty:</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 text-lg font-bold text-gray-600 transition">−</button>
                  <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 text-lg font-bold text-gray-600 transition">+</button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                  className={`flex-1 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition ${
                    added ? "bg-green-500 text-white" : "bg-black hover:bg-cyan-600 text-white disabled:bg-gray-200 disabled:text-gray-400"
                  }`}
                >
                  <FaShoppingCart />
                  {added ? "Added! ✓" : "Add to Cart"}
                </button>
                <button
                  onClick={handleWishlist}
                  className={`px-4 py-3 rounded-xl border-2 transition ${
                    isWishlisted(product.id) ? "border-pink-500 text-pink-500 bg-pink-50" : "border-gray-200 text-gray-400 hover:border-pink-400 hover:text-pink-400"
                  }`}
                >
                  <FaHeart />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-gray-100">
                {[
                  { icon: FaTruck, text: "Free Shipping" },
                  { icon: FaShieldAlt, text: "Genuine Product" },
                  { icon: FaUndo, text: "Easy Returns" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-1 text-center">
                    <Icon className="text-cyan-500 text-lg" />
                    <span className="text-xs text-gray-500 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {related.length > 0 && (
          <div>
            <AnimatedSection direction="up">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Related Products</h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <AnimatedSection key={p.id} direction="up" delay={i * 80}>
                  <ProductCard product={p} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
