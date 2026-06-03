import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 h-48">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {product.badge && (
          <span className="absolute top-2 left-2 bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
        <button
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition"
          onClick={() => toggleWishlist(product)}
        >
          <FaHeart className={isWishlisted(product.id) ? "text-pink-500" : "text-gray-300"} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[10px] text-cyan-600 font-semibold uppercase tracking-wider mb-0.5">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-gray-800 text-sm font-semibold line-clamp-2 hover:text-cyan-700 transition leading-snug mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-[10px] ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-1.5 mb-2 mt-auto">
          <span className="text-gray-900 font-bold text-base">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <>
              <span className="text-gray-400 text-xs line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="text-green-600 text-[10px] font-semibold">{discount}% off</span>
            </>
          )}
        </div>

        {/* Add to cart */}
        <button
          disabled={!product.inStock}
          onClick={() => addToCart(product)}
          className="w-full bg-black hover:bg-cyan-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-xs font-semibold py-2 rounded-xl transition-colors duration-200 flex items-center justify-center gap-1.5 mt-1"
        >
          <FaShoppingCart className="text-xs" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
