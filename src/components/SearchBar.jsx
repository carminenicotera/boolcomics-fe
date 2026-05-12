import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function SearchBar({ showSearch, setShowSearch }) {

  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Reset search term when navigating to a different page
    setShowSearch(false)
  }, [location])

  // SUBMIT SEARCH
  const handleSearch = (e) => {
    e.preventDefault()

    if (!searchTerm.trim()) return

    navigate(`/catalog?search=${searchTerm}`)

    setShowSearch(false)
  }


  return (
    <div className={ `searchbar-wrapper${showSearch ? "active" : ""}` }>
      <div className="container">
        <form onSubmit={ handleSearch } className="row g-3 align-items-center">

          {/* SEARCH INPUT */ }
          <div className=" col-12 col-md-9">
            <div className="search-input-wrapper">
              <i className="bi bi-search searchbar-icon"></i>
              <input type="text" className="searchbar-input" placeholder="Cerca manga, comics..." value={ searchTerm } onChange={ (e) => setSearchTerm(e.target.value) } />
            </div>
          </div>
          
          {/* SEARCH BUTTON */ }
          <div className="col-12 col-md-3">
            <button type="submit" className="btn cart-btn w-100">
              Cerca
            </button>
          </div>
        </form>
      </div >
    </div >
  )
}