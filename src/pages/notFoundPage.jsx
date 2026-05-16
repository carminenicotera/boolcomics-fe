import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (

        <>

            <header class="header-404">
               <img
              src="/img/boolcomics-logo.png"
              alt="BoolComics"
              className="desktop-logo"
            />
            </header>

            <main class="error-404 container">
                <div class="error-badge">404</div>

                <h1 class="error-title">BOOM! Pagina Esaurita!</h1>
                <p class="error-message">
                    La pagina che stavi cercando è andata a ruba o non è mai esistita.
                    
                </p>

                <Link to="/" class="btn btn-danger">TORNA ALLA HOME</Link>
            </main>


        </>
    )

}