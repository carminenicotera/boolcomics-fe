import { useState } from "react";

export function useCartLogic() {
  const [cart, setCart] = useState([]);

  // Riceve l'oggetto prodotto e la quantità separata come secondo parametro
  const addToCart = (product, customQuantity = 1) => { 
    const amountToAdd = Number(customQuantity) || 1;

    setCart((prevCart) => {
      const exists = prevCart.find(item => item.slug === product.slug);

      if (exists) {
        return prevCart.map(item => {
          if (item.slug === product.slug) {
            const currentQty = Number(item.quantity) || 0;
            return { 
              ...item, 
              quantity: currentQty + amountToAdd 
            };
          }
          return item;
        });
      }
      // Quando lo inserisce la prima volta, imposta la quantità corretta
      return [...prevCart, { ...product, quantity: amountToAdd }]; 
    });
  };

  const removeFromCart = (slug) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.slug === slug);

      if (itemInCart && (Number(itemInCart.quantity) || 1) > 1) {
        return prevCart.map((item) =>
          item.slug === slug 
            ? { ...item, quantity: (Number(item.quantity) || 1) - 1 } 
            : item
        );
      }
      return prevCart.filter((item) => item.slug !== slug);
    });
  };
 
  const cartCount = cart.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);

  return { 
    cart, 
    addToCart, 
    removeFromCart, 
    cartCount 
  };
}
