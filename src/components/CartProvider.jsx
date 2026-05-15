import { createContext, useContext, useState } from "react";
import { useCartLogic } from "../components/useCartLogic"; // Assicurati che il percorso sia corretto

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { cart, addToCart, removeFromCart, cartCount, clearCart } = useCartLogic();
  
  // Stati per il Popup
  const [showPopup, setShowPopup] = useState(false);
  const [lastAdded, setLastAdded] = useState("");

  
  const handleAddToCart = (product, quantity = 1) => {
  
 
  addToCart(product, quantity);
  const displayLabel = quantity > 1 ? `${product.name} x ${quantity}` : product.name;
  setLastAdded(displayLabel);
  setShowPopup(true);


  setTimeout(() => {
    setShowPopup(false);
  }, 3000);
};

  const value = {
    cart,
    cartCount,
    addToCart: handleAddToCart, 
    removeFromCart,
    clearCart,
    showPopup,
    setShowPopup,
    lastAdded
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);