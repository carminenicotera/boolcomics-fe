import { createContext, useContext, useState } from "react";
import { useCartLogic } from "../components/useCartLogic";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    cartCount, 
    clearCart
  } = useCartLogic();
  
  const [whishlist, setWhishlist] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [lastAdded, setLastAdded] = useState("");

  const handleWhishlist = (comic) => {
    setWhishlist((prev) => {
      const exists = prev.some((item) => item.slug === comic.slug);
      if (exists) {
        return prev.filter((item) => item.slug !== comic.slug);
      } else {
        return [...prev, comic];
      }
    });
  };

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
    const displayLabel = quantity > 1 ? `${product.name} x ${quantity}` : product.name;
    setLastAdded(displayLabel);
    setShowPopup(true);

    const cartElem = document.getElementById('miniCart');
    if (cartElem && window.bootstrap && window.bootstrap.Offcanvas) {
      const instance = window.bootstrap.Offcanvas.getOrCreateInstance(cartElem);
      instance.show();
    }

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const value = {
    cart,
    cartCount,
    addToCart: handleAddToCart, 
    handleAddToCart,
    removeFromCart,
    clearCart,
    showPopup,
    setShowPopup,
    lastAdded,
    whishlist,        
    handleWhishlist   
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);