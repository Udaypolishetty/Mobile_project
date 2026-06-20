import { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/HomeFiles/Footer";
import SearchModal from "./components/SearchModal";
import AuthModal from "./components/Authentication/AuthModal";
import HomePage from "./components/HomeFiles/HomePage";
import CatalogPage from "./components/Products/CatalogPage";
import ProductPage from "./components/Products/ProductPage";
import CartPage from "./components/UserDetails/CartPage";
import WhatsappButton from "./components/HomeFiles/WhatsappButton";
import Products from "./components/Products/Products";
import PoliciesPage from "./components/Legal/PoliciesPage";
import WishlistPage from "./components/UserDetails/WishlistPage";
import AccountPage from "./components/UserDetails/AccountPage";
import CheckoutPage from "./components/UserDetails/CheckOutPage";
import OrderSuccessPage from "./components/UserDetails/OrderSuccessPage";
import ContactPage from "./components/UserDetails/ContactPage";
import NotFoundPage from "./components/UserDetails/NotFoundPage";
import OrderDetailsPage from "./components/UserDetails/OrderDetailsPage";
import FooterInfo from "./pages/FooterInfo";
import ScrollToTop from "./components/ScrollToTop";
import ServicesPage from "./pages/ServicesPage";
import LogoLoader from "./pages/LogoLoader";



import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminCustomers from "./admin/pages/AdminCustomers";

function Layout({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AuthModal />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3500ms (3.5s) allows your text split dynamics to seamlessly finish running
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);



  return (
    <BrowserRouter>
    <ScrollToTop />
      <AuthProvider>
        <CartProvider>

          {/* AnimatePresence monitors components leaving the DOM */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              /* Intro Loader Mask Layout */
              <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#ffffff",
                  zIndex: 99999, // Keeps it completely clear of sticky menus/navbars
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <LogoLoader />
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Main App Container: Fades in nicely right after the loader lifts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          ></motion.div>
          <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>} />

            <Route path="/products" element={<Layout><Products /></Layout>} />
            

            <Route path="/catalog" element={<Layout><CatalogPage /></Layout>} />
            <Route path="/product/:id" element={<Layout><ProductPage /></Layout>} />
            <Route path="/cart" element={<Layout><CartPage /></Layout>} />
            <Route path="/wishlist" element={<Layout><WishlistPage /></Layout>} />
            <Route path="/account" element={<Layout><AccountPage /></Layout>} />
            <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
            <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
            <Route
  path="/order/:id"
  element={<OrderDetailsPage />}
/>

<Route
  path="/info/:type"
  element={
    <Layout>
      <FooterInfo />
    </Layout>
  }
/>
<Route path="/services" element={<Layout><ServicesPage /></Layout>} />


<Route path="/admin-dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />

<Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />

<Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />

<Route path="/admin/customers" element={<AdminLayout><AdminCustomers /></AdminLayout>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
