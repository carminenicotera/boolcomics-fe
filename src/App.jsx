import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import ComicPage from "./pages/ComicPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={ <DefaultLayout /> }>
            <Route index element={ <HomePage /> } />
            <Route path="/comics/:comicId" element={ <ComicPage /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
