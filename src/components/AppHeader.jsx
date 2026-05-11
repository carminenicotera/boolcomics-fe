import { Link } from "react-router-dom";

export default function AppHeader() {

  return (

    <header>

      <nav className="navbar navbar-expand-md border-bottom py-1">

        <div className="container">

          {/* LOGO */ }
          <Link
            className="navbar-brand d-flex align-items-center"
            to="/"
          >

            {/* DESKTOP / TABLET */ }
            <img
              src="/img/boolcomics-logo.png"
              alt="BoolComics"
              className="desktop-logo"
            />

            {/* MOBILE */ }
            <img
              src="/img/boolcomics-icon.png"
              alt="BoolComics"
              className="mobile-logo"
            />

          </Link>

          {/* TOGGLER */ }
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* MENU */ }
          <div
            className="collapse navbar-collapse"
            id="navbarNav"
          >

            <ul className="navbar-nav ms-auto align-items-md-center gap-md-3">

              <li className="nav-item">
                <Link
                  className="nav-link custom-link"
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link custom-link"
                  to="/catalog"
                >
                  Catalogo
                </Link>
              </li>

              {/* SEARCH */ }
              <li className="nav-item">
                <button className="btn icon-btn">
                  <i className="bi bi-search"></i>
                </button>
              </li>

              {/* CART */ }
              <Link
                  className="nav-link custom-link cart-btn"
                  to="/cart"
                ><i className="bi bi-bag me-2"></i>
                  Cart
                </Link>

            </ul>

          </div>

        </div>

      </nav>

    </header>

  );
}