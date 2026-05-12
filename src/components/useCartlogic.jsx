import { useState } from "react";

export function useCartLogic() {
  const [cart, setCart] = useState([]);

  // 1. Funzione per aggiungere o sommare
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Usiamo lo slug come identificatore unico (o .id se lo hai)
      const existingItem = prevCart.find((item) => item.slug === product.slug);

      if (existingItem) {
        return prevCart.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 2. Funzione per rimuovere
  const removeFromCart = (slug) => {
  setCart((prevCart) => {
    // 1. Cerchiamo l'oggetto nel carrello
    const itemInCart = prevCart.find((item) => item.slug === slug);

    // 2. Se l'oggetto esiste e la quantità è maggiore di 1...
    if (itemInCart && itemInCart.quantity > 1) {
      return prevCart.map((item) =>
        item.slug === slug 
          ? { ...item, quantity: Number(item.quantity) - 1 } 
          : item
      );
    }

    // 3. Altrimenti (se è l'ultimo pezzo), lo rimuoviamo del tutto
    return prevCart.filter((item) => item.slug !== slug);
  });
};
  // 3. Conteggio totale (somma le quantità)
 const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  
  return { 
    cart, 
    addToCart, 
    removeFromCart, 
    cartCount 
  };
} 