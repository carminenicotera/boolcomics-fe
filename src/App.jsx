import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import ComicPage from "./pages/ComicPage"
import CatalogPage from "./pages/CatalogPage"
import CheckoutPage from "./pages/CheckoutPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={ <DefaultLayout /> }>
            <Route index element={ <HomePage /> } />
            <Route path="/catalog" element={ <CatalogPage /> } />
            <Route path="/products/:slug" element={<ComicPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
