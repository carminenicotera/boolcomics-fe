import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function CatalogPage() {

  const [comics, setComics] = useState([])

  useEffect(() => {
    const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000"
    fetch(`${api_url}/products`)
      .then(res => res.json())
      .then(data => setComics(data))
      .catch(err => console.error("Errore nel recupero dei prodotti:", err))
  }, [])

  return (
    <>
      {/* PAGE HEADER */ }
      <section className="py-5 bg-light">
        <div className="container">
          <h1 className="fw-bold text-uppercase mb-3">
            Catalogo
          </h1>
          <p className="text-secondary">
            Qui potrai esplorare il nostro vasto catalogo
            di fumetti e manga.
          </p>
        </div>
      </section>

      {/* PRODUCTS */ }
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            { comics.map(comic => (
              <div key={ comic.id } className="col-12 col-sm-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm">

                  {/* IMAGE */ }
                  <Link to={ `/products/${comic.slug}` }>
                    <img src="/public/img/placeholdercomic.png" alt={ comic.name } className="card-img-top object-fit-cover" />
                  </Link>

                  {/* BODY */ }
                  <div className="card-body text-center d-flex flex-column">

                    {/* TITLE */ }
                    <h5 className="fw-bold">
                      { comic.name }
                    </h5>

                    {/* PRICE */ }
                    <p className="fs-5 fw-bold mt-2">
                      € { comic.price }
                    </p>

                    {/* BUTTON */ }
                    <button className="btn btn-danger mt-auto text-white fw-bold text-uppercase">
                      Acquista
                    </button>

                  </div>

                </div>

              </div>

            )) }

          </div>

        </div>

      </section>
    </>
  )
}