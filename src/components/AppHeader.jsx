import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useCart} from "../components/CartProvider"

export default function AppHeader() {
  const [showSearch, setShowSearch] = useState(false);
  const { cartCount, showPopup, setShowPopup, lastAdded } = useCart();

  return (
    <header className="sticky-top bg-white">
      <nav className="navbar navbar-expand-md border-bottom py-1">
        <div className="container">
          {/* NAVBAR */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            {/* LOGO */}
            <img
              src="/img/boolcomics-logo.png"
              alt="BoolComics"
              className="desktop-logo"
            />

            {/* ICON */}
            <img
              src="/img/boolcomics-icon.png"
              alt="BoolComics"
              className="mobile-logo"
            />
          </Link>

          {/* TOGGLER */}
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* MENU */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-md-center gap-md-3">
              {/* HOME */}
              <li className="nav-item">
                <Link className="nav-link custom-link" to="/">
                  Home
                </Link>
              </li>

              {/* CATALOG */}
              <li className="nav-item">
                <Link className="nav-link custom-link" to="/catalog">
                  Catalogo
                </Link>
              </li>

              {/* SEARCH */}
              <li className="nav-item">
                <button
                  className="btn icon-btn"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <i className="bi bi-search"></i>
                </button>
              </li>

              {/* CART CON POPUP */}
             <li className="nav-item position-relative">
  <Link 
    className="nav-link custom-link cart-btn" 
    to="#" 
    data-bs-toggle="offcanvas" 
    data-bs-target="#miniCart"
  >
    <i className="bi bi-bag me-2"></i>
    Cart
    {cartCount > 0 && (
      <span className="badge rounded-pill bg-danger ms-1">
        {cartCount}
      </span>
    )}
  </Link>
                {/* POPUP DI CONFERMA AGGIUNGIMENTO */}
                {showPopup && (
                  <div
                    className="position-absolute end-0 mt-2 shadow-lg animate__animated animate__fadeInDown"
                    style={{ zIndex: 1060, width: "230px", top: "100%" }}
                  >
                    <div className="card border-0 bg-white shadow">
                      <div className="card-body p-2 d-flex align-items-center">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <div className="flex-grow-1 overflow-hidden">
                          <p className="mb-0 small fw-bold text-dark">
                            Aggiunto!
                          </p>
                          <p className="mb-0 text-muted extra-small text-truncate">
                            {lastAdded}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="btn-close ms-2"
                          style={{ fontSize: "0.5rem" }}
                          onClick={() => setShowPopup(false)}
                        ></button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* SEARCH BAR */}
      <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />

      {/* Stile extra per testi molto piccoli */}
      <style>{`
        .extra-small { font-size: 0.7rem; }
      `}</style>
    </header>
  );
}