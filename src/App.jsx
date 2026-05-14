import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import ComicPage from "./pages/ComicPage"
import CatalogPage from "./pages/CatalogPage"
import CheckoutPage from "./pages/CheckoutPage"
import CartPage from "./pages/CartPage"
import { useCartLogic } from "./components/useCartLogic";
import Whishlist from "./pages/Whishlist"
import { useState } from "react"


function App() {
  const { cart, addToCart, removeFromCart, cartCount, clearCart } = useCartLogic();

  const [whishlist, setWhishlist] = useState([]);

  function handleWhishlist(product) {

    const isAdded = whishlist.some(item => item.slug === product.slug);

    if (isAdded) {
      //Remove
      setWhishlist(whishlist.filter(item => item.slug !== product.slug));
      return;
    }

    setWhishlist([...whishlist, product]);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout cartCount={cartCount} />}>
            <Route index element={<HomePage addToCart={addToCart} whishlist={whishlist} handleWhishlist={handleWhishlist} />} />
            <Route path="/catalog" element={<CatalogPage addToCart={addToCart} />} />
            <Route path="/products/:slug" element={<ComicPage addToCart={addToCart} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />
            <Route path="/whishlist" element={<Whishlist whishlist={whishlist} handleWhishlist={handleWhishlist} addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
