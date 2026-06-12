import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
   FaSpinner,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../api/authApi";

export default function AdminSidebar() {

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
const [loading, setLoading] = useState(false);


  const menu = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin-dashboard",
    },
    {
      name: "Products",
      icon: <FaBoxOpen />,
      path: "/admin/products",
    },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      path: "/admin/orders",
    },
    {
      name: "Customers",
      icon: <FaUsers />,
      path: "/admin/customers",
    },
  ];

  const handleLogout = async () => {
  setIsLoggingOut(true);

  try {
    const refresh = localStorage.getItem("refresh_token");

    if (refresh) {
      await logoutUser(refresh);
    }
  } catch (error) {
    console.error(error);
  }

  setTimeout(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    navigate("/");
  }, 1500); // 1.5 seconds
};
  return (
    <aside className="w-64 bg-[#0a0f1e] text-white min-h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-white/10">
        <h1 className="font-black text-xl">
          Raju <span className="text-cyan-400">Admin</span>
        </h1>

        <p className="text-xs text-gray-400 mt-1">
          Mobile Store Dashboard
        </p>
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-cyan-500 text-black font-semibold"
                  : "hover:bg-white/10"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

{
  isLoggingOut && (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="text-center">

        <img
          src="/logo.png"
          alt="Raju Mobile"
          className="w-28 h-28 mx-auto mb-4"
        />

        <h1 className="text-3xl font-bold text-blue-700">
          Raju Mobile
        </h1>

        <p className="text-gray-600 mt-2">
          Admin Logout...
        </p>

        <div className="mt-6 flex justify-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>

      </div>
    </div>
  )
}
      <div className="absolute bottom-5 left-0 w-full px-4">
        <button
  onClick={handleLogout}
  disabled={loading}
  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[#c8102e] hover:opacity-90 transition disabled:opacity-70"
>
  {loading ? (
  <>
    <FaSpinner className="animate-spin" />
    Logging out...
  </>
) : (
  <>
    <FaSignOutAlt />
    Logout
  </>
)}
</button>
      </div>
    </aside>
  );
}