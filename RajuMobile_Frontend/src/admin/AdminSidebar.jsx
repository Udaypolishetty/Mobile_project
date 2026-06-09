import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminSidebar() {
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

      <div className="absolute bottom-5 left-0 w-full px-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#c8102e] hover:opacity-90 transition">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}