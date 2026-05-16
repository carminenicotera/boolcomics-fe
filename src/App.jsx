import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CartProvider } from "./components/CartProvider"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import ComicPage from "./pages/ComicPage"
import CatalogPage from "./pages/CatalogPage"
import CheckoutPage from "./pages/CheckoutPage"
import CartPage from "./pages/CartPage"
import NotFoundPage from "./pages/notFoundPage"
import { useCartLogic } from "./components/useCartLogic";
import Whishlist from "./pages/Whishlist"

function App() {
  const { cart, addToCart, removeFromCart, cartCount, clearCart } = useCartLogic();

  return (
    <>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={ <DefaultLayout cartCount={cartCount} /> }>
            <Route index element={ <HomePage addToCart={addToCart} /> } />
            <Route path="/catalog" element={ <CatalogPage /> } />
            <Route path="/products/:slug" element={<ComicPage addToCart={addToCart}/>} />
            <Route path="/checkout" element={ <CheckoutPage cart={cart} clearCart={clearCart} /> } />
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} addToCart={addToCart}/>} />
            
           
            <Route path="/wishlist" element={<Whishlist />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </>
  )
}

export default App;