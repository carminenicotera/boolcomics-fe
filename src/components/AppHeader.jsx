import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function AppHeader() {

  const [showSearch, setShowSearch] = useState(false)

  return (

    <header>

      <nav className="navbar navbar-expand-md border-bottom py-1">

        <div className="container">

          {/* NAVBAR  */ }
          <Link className="navbar-brand d-flex align-items-center" to="/">

            {/* LOGO */ }
            <img
              src="/img/boolcomics-logo.png"
              alt="BoolComics"
              className="desktop-logo"
            />

            {/* ICON */ }
            <img
              src="/img/boolcomics-icon.png"
              alt="BoolComics"
              className="mobile-logo"
            />

          </Link>

          {/* TOGGLER */ }
          <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* MENU */ }
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-md-center gap-md-3">

              {/* HOME */ }
              <li className="nav-item">
                <Link className="nav-link custom-link" to="/">
                  Home
                </Link>
              </li>

              {/* CATALOG */ }
              <li className="nav-item">
                <Link className="nav-link custom-link" to="/catalog">
                  Catalogo
                </Link>
              </li>

              {/* SEARCH */ }
              <li className="nav-item">
                <button className="btn icon-btn" onClick={ () => setShowSearch(!showSearch) }>
                  <i className="bi bi-search"></i>
                </button>
              </li>

              {/* CART */ }
              <li className="nav-item">
                <button className="btn cart-btn">
                  <i className="bi bi-bag me-2"></i>
                  Cart
                </button>
              </li>

            </ul>

          </div>

        </div>

      </nav>
      {/* SEARCH BAR */ }
      <SearchBar showSearch={ showSearch } />

    </header>

  );
}