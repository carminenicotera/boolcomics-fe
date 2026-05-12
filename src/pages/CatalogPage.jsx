import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

export default function CatalogPage({ addToCart }) {

  const [comics, setComics] = useState([])
  const [sortBy, setSortBy] = useState("")
  const [searchParams] = useSearchParams("")

  const searchQuery = searchParams.get("search") || ""

  useEffect(() => {
    const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000"
    fetch(`${api_url}/products`)
      .then(res => res.json())
      .then(data => setComics(data))
      .catch(err => console.error("Errore nel recupero dei prodotti:", err))
  }, [])

  const filteredComics = [...comics]
    .filter(comic => comic.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      }
      if (sortBy === "low-price") {
        return a.price - b.price
      }
      if (sortBy === "high-price") {
        return b.price - a.price
      }
      if (sortBy === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
      return 0
    })

  return (
    <>
      {/* PAGE HEADER */ }
      {/* <section className="catalog-header py-5">
        <div className="container">
          <h1 className="catalog-title">
            Catalogo
          </h1>
          <p className="catalog-subtitle">
            Qui potrai esplorare il nostro vasto catalogo
            di fumetti e manga.
          </p>
        </div>
      </section> */}

      {/* PRODUCTS */ }
      <section className="py-5">
        <div className="container">

          {/* TOP BAR */ }
          {searchQuery && (
          <div className="row justify-content-between align-items-center mb-4 g-3">

            {/* RESULTS */ }
            <div className="col-12 col-md-auto">
              <p className="results-text mb-0">
                { filteredComics.length } prodotti trovati
              </p>
            </div>

            {/* SORT BY */ }
            <div className="col-12 col-md-3">
              <select className="form-select catalog-select" value={ sortBy } onChange={ (e) => setSortBy(e.target.value) }>
                <option value="">Ordina per</option>
                <option value="name">Nome</option>
                <option value="low-price">Prezzo: dal più basso</option>
                <option value="high-price">Prezzo: dal più alto</option>
                <option value="recent">Più recenti</option>
              </select>
            </div>
          </div>
          ) }

          {/* PRODUCTS GRID */ }
          <div className="row g-4">
            { filteredComics.map(comic => (
              <div key={ comic.id } className="col-12 col-sm-6 col-lg-3">
                <div className="card product-card h-100">

                  {/* IMAGE */ }
                  <Link to={ `/products/${comic.slug}` } className="product-image-wrapper">
                    <img src="/public/img/placeholdercomic.png" alt={ comic.name } className="card-img-top product-image" />
                  </Link>

                  {/* BODY */ }
                  <div className="card-body d-flex flex-column text-center">

                    {/* TITLE */ }
                    <h5 className="product-title">
                      { comic.name }
                    </h5>

                    {/* PRICE */ }
                    <p className="product-price">
                      € { comic.price }
                    </p>

                    {/* BUTTON */ }
                    <span className="btn fw-bold" onClick={() => {
                        addToCart(comic);
                        
                        alert(`${comic.name} aggiunto al carrello!`);
                      }} style={ { background: '#E63946', color: 'white' } }>ACQUISTA</span>
                 

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