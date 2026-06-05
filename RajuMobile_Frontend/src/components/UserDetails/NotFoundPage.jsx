import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-8xl font-black text-gray-200 mb-4">404</p>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Page Not Found</h2>
        <button onClick={() => navigate("/")} className="bg-black hover:bg-cyan-600 text-white font-bold px-6 py-3 rounded-xl transition mt-4">Go Home</button>
      </div>
    </div>
  );
}