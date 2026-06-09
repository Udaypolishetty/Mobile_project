import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {

  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

//   if (!user.is_staff) {
//     return <Navigate to="/" />;
//   }
console.log(user)
  return (
    <div className="bg-[#f5f0eb] min-h-screen">
      <AdminSidebar />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}