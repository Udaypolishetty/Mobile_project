import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchModal from "./components/SearchModal";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import "./App.css";
import "./index.css"
import {
  WishlistPage,
  AccountPage,
  CheckoutPage,
  OrderSuccessPage,
  ContactPage,
  NotFoundPage,
} from "./pages/OtherPages";

function Layout({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/catalog"
            element={
              <Layout>
                <CatalogPage />
              </Layout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Layout>
                <ProductPage />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <CartPage />
              </Layout>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Layout>
                <WishlistPage />
              </Layout>
            }
          />
          <Route
            path="/account"
            element={
              <Layout>
                <AccountPage />
              </Layout>
            }
          />
          <Route
            path="/checkout"
            element={
              <Layout>
                <CheckoutPage />
              </Layout>
            }
          />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route
            path="/contact"
            element={
              <Layout>
                <ContactPage />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFoundPage />
              </Layout>
            }
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
