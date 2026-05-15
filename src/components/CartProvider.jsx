import { createContext, useContext, useState } from "react";
import { useCartLogic } from "../components/useCartLogic"; // Assicurati che il percorso sia corretto

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { cart, addToCart, removeFromCart, cartCount, clearCart } = useCartLogic();
  
  // Stati per il Popup
  const [showPopup, setShowPopup] = useState(false);
  const [lastAdded, setLastAdded] = useState("");

  // Funzione che avvolge addToCart e aggiunge il popup
  const handleAddToCart = (product, quantity = 1) => {
    console.log("CONTESTO: Sto provando ad aggiungere", product.name); // <--- AGGIUNGI QUESTO
  addToCart(product, quantity);
    setLastAdded(product.name);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const value = {
    cart,
    cartCount,
    addToCart: handleAddToCart, // Sovrascriviamo con quella che ha il popup
    removeFromCart,
    clearCart,
    showPopup,
    setShowPopup,
    lastAdded
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);