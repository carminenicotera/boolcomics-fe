import { Link } from "react-router-dom";

export default function AppHeader() {

  return (

    <header>

      <nav className="navbar navbar-expand-lg bg-white border-bottom py-3">

        <div className="container">

          {/* LOGO */ }
          <Link
            className="navbar-brand d-flex align-items-center"
            to="/"
          >

            {/* DESKTOP */ }
            <img
              src="/img/boolcomics-logo.png"
              alt="BoolComics"
              className="img-fluid d-none d-md-block"
              style={ { maxHeight: "45px" } }
            />

            {/* MOBILE */ }
            <img
              src="/img/boolcomics-icon.png"
              alt="BoolComics"
              className="img-fluid d-block d-md-none"
              style={ { maxHeight: "42px" } }
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

            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

              <li className="nav-item">
                <Link className="nav-link custom-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link custom-link" to="/comics">
                  Comics
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link custom-link" to="/manga">
                  Manga
                </Link>
              </li>

              <li className="nav-item">
                <button className="btn icon-btn">
                  <i className="bi bi-search"></i>
                </button>
              </li>

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

    </header>

  );
}