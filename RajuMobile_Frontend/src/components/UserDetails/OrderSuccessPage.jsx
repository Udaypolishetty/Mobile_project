import { useNavigate } from "react-router-dom";

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-sm px-4">
        <div className="text-7xl mb-4 animate-bounce">🎉</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h1>
        <p className="text-gray-400 text-sm mb-6">Thank you for shopping with Raju Mobile. You will receive a confirmation soon.</p>
        <button onClick={() => navigate("/")} className="bg-black hover:bg-cyan-600 text-white font-bold px-8 py-3 rounded-xl transition">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}