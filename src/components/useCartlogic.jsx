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
    // 1. Troviamo il prodotto nel carrello
    const existingItem = prevCart.find((item) => item.slug === slug);

    if (existingItem && existingItem.quantity > 1) {
      // 2. Se la quantità è maggiore di 1, diminuiamo di uno
      return prevCart.map((item) =>
        item.slug === slug 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    }
    
    // 3. Se la quantità è 1 (o meno), rimuoviamo l'intera riga
    return prevCart.filter((item) => item.slug !== slug);
  });
};
  // 3. Conteggio totale (somma le quantità)
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

  
  return { 
    cart, 
    addToCart, 
    removeFromCart, 
    cartCount 
  };
} 