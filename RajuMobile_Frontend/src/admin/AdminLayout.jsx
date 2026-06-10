import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {

    const { user, loadingUser } = useAuth();

    if (loadingUser) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!user || !user.is_staff) {
        return <Navigate to="/" />;
    }

    return (
        <div className="bg-[#f5f0eb] min-h-screen">
            <AdminSidebar />
            <main className="ml-64 p-8">
                {children}
            </main>
        </div>
    );
}