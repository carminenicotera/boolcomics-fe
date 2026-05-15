import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import ComicPage from "./pages/ComicPage"
import CatalogPage from "./pages/CatalogPage"
import CheckoutPage from "./pages/CheckoutPage"
import CartPage from "./pages/CartPage"
import NotFoundPage from "./pages/notFoundPage"
import { useCartLogic } from "./components/useCartLogic";
import Whishlist from "./pages/Whishlist"
import { useState } from "react"


function App() {
  const { cart, addToCart, removeFromCart, cartCount, clearCart, discount, couponCode, setDiscount, setCouponCode } = useCartLogic();

  const [whishlist, setWhishlist] = useState([]);

  function handleWhishlist(product) {

    const isAdded = whishlist.some(item => item.slug === product.slug);

    if (isAdded) {
      //Remove
      alert("Prodotto rimosso dalla Whishlist: " + product.name)
      setWhishlist(whishlist.filter(item => item.slug !== product.slug));
      return;
    }

    alert("Prodotto aggiunto alla Whishlist: " + product.name)

    setWhishlist([...whishlist, product]);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout cartCount={cartCount} />}>
            <Route index element={<HomePage addToCart={addToCart} whishlist={whishlist} handleWhishlist={handleWhishlist} />} />
            <Route path="/catalog" element={<CatalogPage whishlist={whishlist} handleWhishlist={handleWhishlist} addToCart={addToCart} />} />
            <Route path="/products/:slug" element={<ComicPage addToCart={addToCart} />} />
            <Route path="/checkout" element={ <CheckoutPage cart={cart} clearCart={clearCart} discount={discount} couponCode={couponCode} /> } />
            <Route path="/whishlist" element={<Whishlist whishlist={whishlist} handleWhishlist={handleWhishlist} addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} discount={discount} couponCode={couponCode} setDiscount={setDiscount} setCouponCode={setCouponCode} />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
