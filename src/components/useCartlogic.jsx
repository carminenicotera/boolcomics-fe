import { useState } from "react";

export function useCartLogic() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };
  console.log("Prodotto ricevuto dall'hook:")

  const cartCount = cart.length;

  return { cart, addToCart, cartCount };
}