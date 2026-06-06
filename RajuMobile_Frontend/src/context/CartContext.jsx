// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [wishlist, setWishlist] = useState([]);

//   const addToCart = (product, qty = 1) => {
//     setCartItems((prev) => {
//       const existing = prev.find((i) => i.id === product.id);
//       if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
//       return [...prev, { ...product, qty }];
//     });
//   };

//   const removeFromCart = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));

//   const updateQty = (id, qty) => {
//     if (qty < 1) return removeFromCart(id);
//     setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
//   };

//   const clearCart = () => setCartItems([]);

//   const toggleWishlist = (product) => {
//     setWishlist((prev) =>
//       prev.find((i) => i.id === product.id)
//         ? prev.filter((i) => i.id !== product.id)
//         : [...prev, product]
//     );
//   };

//   const isWishlisted = (id) => wishlist.some((i) => i.id === id);
//   const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
//   const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, wishlist, toggleWishlist, isWishlisted, cartCount, cartTotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);




import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // ── Load from localStorage on mount ──
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("raju_cart")) || []; }
    catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("raju_wishlist")) || []; }
    catch { return []; }
  });
  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem("raju_orders")) || []; }
    catch { return []; }
  });

  // ── Persist to localStorage on change ──
  useEffect(() => { localStorage.setItem("raju_cart", JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { localStorage.setItem("raju_wishlist", JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem("raju_orders", JSON.stringify(orders)); }, [orders]);

  // ── Cart ──
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  };

  const clearCart = () => setCartItems([]);

  const getQty = (id) => cartItems.find((i) => i.id === id)?.qty || 0;

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  // ── Wishlist ──
  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.find((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product]
    );
  };
  const isWishlisted = (id) => wishlist.some((i) => i.id === id);

  // ── Orders ──
  const placeOrder = (orderData) => {
    const order = {
      id: `ORD${Date.now()}`,
      date: new Date().toISOString(),
      status: "confirmed",
      statusHistory: [
        { status: "confirmed", label: "Order Confirmed", time: new Date().toISOString() },
      ],
      items: [...cartItems],
      total: cartTotal,
      ...orderData,
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
    return order;
  };

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQty, clearCart, getQty,
      cartCount, cartTotal,
      wishlist, toggleWishlist, isWishlisted,
      orders, placeOrder,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);