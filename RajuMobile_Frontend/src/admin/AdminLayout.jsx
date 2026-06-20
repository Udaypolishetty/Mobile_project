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

    {/* Main Content */}
    <main className="lg:ml-64 p-4 lg:p-8">
      {children}
    </main>

  </div>
);
}
