import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

import WishlistPage from "./components/UserDetails/WishlistPage";
import AccountPage from "./components/UserDetails/AccountPage";
import CheckoutPage from "./components/UserDetails/CheckOutPage";
import OrderSuccessPage from "./components/UserDetails/OrderSuccessPage";
import ContactPage from "./components/UserDetails/ContactPage";
import NotFoundPage from "./components/UserDetails/NotFoundPage";
import OrderDetailsPage from "./components/UserDetails/OrderDetailsPage";
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
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
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
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
