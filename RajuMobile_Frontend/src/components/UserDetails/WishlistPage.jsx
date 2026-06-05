import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import ProductCard from "../Products/ProductCard";
import AnimatedSection from "../AnimatedSection";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function WishlistPage() {
    const { wishlist } = useCart();
    const { user, setShowAuthModal } = useAuth();
    const navigate = useNavigate();

    if (!user) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center px-4">
                <FaHeart className="text-6xl text-gray-200 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-700 mb-2">Sign in to view wishlist</h2>
                <p className="text-gray-400 text-sm mb-6">Save items you love and access them anytime</p>
                <button onClick={() => setShowAuthModal(true)} className="bg-black hover:bg-cyan-600 text-white font-bold px-6 py-3 rounded-xl transition">Sign In / Register</button>
            </div>
        </div>
    );

    if (wishlist.length === 0) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <FaHeart className="text-6xl text-gray-200 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-700 mb-2">Your wishlist is empty</h2>
                <p className="text-gray-400 text-sm mb-6">Save items you love to revisit later!</p>
                <button onClick={() => navigate("/catalog")} className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition">Explore Products</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <AnimatedSection direction="up">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist ({wishlist.length})</h1>
                </AnimatedSection>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {wishlist.map((p, i) => (
                        <AnimatedSection key={p.id} direction="up" delay={i * 60}>
                            <ProductCard product={p} />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </div>
    );
}