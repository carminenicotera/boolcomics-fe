import { useState } from "react";

export function useCartLogic() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    console.log("Prodotto ricevuto dall'hook:")
  };


  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    console.log("prodotto eliminato")
  };
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return { cart, addToCart, cartCount, removeFromCart };
}