import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "./AdminSidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";



export default function AdminLayout({ children }) {
const [sidebarOpen, setSidebarOpen] = useState(false);
const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { user, loadingUser } = useAuth();

    if (loadingUser) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!user || !user.is_staff) {
        return <Navigate to="/" />;
    }

   return (
  <div className="bg-[#f5f0eb] min-h-screen">

    {/* Mobile Header */}
    <div className="lg:hidden flex items-center p-4 bg-[#000b2e] text-white">
      <button
        onClick={() => setSidebarOpen(true)}
        className="text-2xl"
      >
        <FaBars />
      </button>

      <h1 className="ml-4 font-bold text-lg">
        Raju Admin
      </h1>
    </div>

    {/* Desktop Sidebar */}
    <div className="hidden lg:block">
      <AdminSidebar 
           isLoggingOut={isLoggingOut}
           setIsLoggingOut={setIsLoggingOut}
          />
    </div>

    {/* Mobile Sidebar */}
    {sidebarOpen && (
      <>
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />

        <div className="fixed left-0 top-0 h-full z-50">
          <AdminSidebar onClose={() => setSidebarOpen(false)}
  isLoggingOut={isLoggingOut}
  setIsLoggingOut={setIsLoggingOut} />
        </div>
      </>
    )}
{isLoggingOut && (
  <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-md">
    <div className="bg-[#07132b] rounded-3xl p-10 text-center shadow-2xl border border-cyan-500/20 min-w-[450px]">

      <img
        src="/mobile_logos.png"
        alt="Raju Mobile"
        className="w-28 h-28 mx-auto mb-6 rounded-3xl bg-white p-3"
      />

      <h1 className="text-5xl font-black text-white">
        Raju Mobile
      </h1>

      <p className="text-cyan-400 text-xl mt-3">
        Signing Out...
      </p>

      <div className="mt-6 flex justify-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-cyan-400 rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
)}
    {/* Main Content */}
    <main className="lg:ml-64 p-4 lg:p-8">
      {children}
    </main>

  </div>
);
}
