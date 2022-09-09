import React, { useContext, useEffect, useState } from "react";
import { commerce } from "../lib/commerce";

const ChecContext = React.createContext();

export function useChec() {
  return useContext(ChecContext);
}

export function ChecProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [checkoutToken, setCheckoutToken] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // fetchProducts function.
  async function fetchProducts() {
    const products = await commerce.products.list();
    setProducts(products.data);
  }

  // fetchCart function.
  async function fetchCart() {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  }

  // AddToCart function
  async function handleAddToCart(productId, quantity) {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item);
  }

  // UpdateCartQty function
  async function handleUpdateCartQty(lineItemId, quantity) {
    const cart = await commerce.cart.update(lineItemId, { quantity });
    setCart(cart);
  }

  // RemoveFromCart function
  async function handleRemoveFromCart(lineItemId) {
    const cart = await commerce.cart.remove(lineItemId);
    setCart(cart);
  }

  // EmptyCart function
  async function handleEmptyCart() {
    const cart = await commerce.cart.empty();
    setCart(cart);
  }

  // RefreshCart function
  async function handleRefreshCart() {
    const cart = await commerce.cart.refresh();
    setCart(cart);
  }

  // CaptureCheckout function
  async function handleCaptureCheckout(checkoutTokenId, newOrder) {
    const incomingOrder = await commerce.checkout.capture(
      checkoutTokenId,
      newOrder
    );
    setOrder(incomingOrder);
    handleRefreshCart();
  }
  // generateCheckoutToken function
  async function generateCheckoutToken(cart) {
    const token = await commerce.checkout.generateToken(cart.id, {
      type: "cart",
    });
    setCheckoutToken(token);
  }

  const value = {
    products,
    cart,
    order,
    checkoutToken,
    handleAddToCart,
    handleUpdateCartQty,
    handleRemoveFromCart,
    handleEmptyCart,
    handleCaptureCheckout,
    generateCheckoutToken,
  };

  return <ChecContext.Provider value={value}>{children}</ChecContext.Provider>;
}
