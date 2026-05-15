import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import ComicPage from "./pages/ComicPage"
import CatalogPage from "./pages/CatalogPage"
import CheckoutPage from "./pages/CheckoutPage"
import CartPage from "./pages/CartPage"
import NotFoundPage from "./pages/notFoundPage"
import { useCartLogic } from "./components/useCartLogic";


function App() {
  const { cart, addToCart, removeFromCart, cartCount, clearCart, discount, couponCode, setDiscount, setCouponCode } = useCartLogic();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout cartCount={cartCount} />}>
            <Route index element={<HomePage addToCart={addToCart} />} />
            <Route path="/catalog" element={<CatalogPage addToCart={addToCart} />} />
            <Route path="/products/:slug" element={<ComicPage addToCart={addToCart} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} />} />
            <Route path="/checkout" element={ <CheckoutPage cart={cart} clearCart={clearCart} discount={discount} couponCode={couponCode} /> } />
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} discount={discount} couponCode={couponCode} setDiscount={setDiscount} setCouponCode={setCouponCode} />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
