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

  // Funzione centralizzata per gestire il click in sicurezza
  const handlePurchaseClick = (comic) => {
    const isOutOfStock = comic.stock_quantity <= 0;
    if (isOutOfStock) {
      alert("Spiacenti, il prodotto è esaurito!");
      return;
    }
    // Usa la logica corretta passando i parametri separati (prodotto, quantità)
    addToCart(comic, 1);
    alert(`${comic.name} aggiunto al carrello!`);
  };

  return (
    <>
      {/* PRODUCTS */}
      <section className="py-5">
        <div className="container">

          {/* TOP BAR */}
          {searchQuery && (
            <div className={`row justify-content-${filteredComics.length === 0 ? 'center' : 'between'} align-items-center mb-4 g-3`}>

              {/* RESULTS */}
              <div className="col-12 col-md-auto">
                {filteredComics.length === 0 ? (

                  <div class="search-empty-state">
                    <div class="empty-badge">OPS!</div>

                    <h2 class="empty-title">Nessun risultato trovato</h2>

                    <p class="empty-message">
                      La ricerca per  non ha portato alla luce nessun volume.

                      Prova a digitare una nuova parola chiave.
                    </p>

                    <Link to="/catalog" class="btn btn-outline-danger">Mostra tutto il catalogo</Link>
                  </div>

                ) : (

                  <p className="results-text mb-0">
                    {filteredComics.length} prodotti trovati
                  </p>
                )}
                
              </div>


              {/* SORT BY */}
              {filteredComics.length !== 0 && (

                <div className="col-12 col-md-3">
                  <select className="form-select catalog-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">Ordina per</option>
                    <option value="name">Nome</option>
                    <option value="low-price">Prezzo: dal più basso</option>
                    <option value="high-price">Prezzo: dal più alto</option>
                    <option value="recent">Più recenti</option>
                  </select>
                </div>


              )}
            </div>
          )}

          {/* PRODUCTS GRID */}
          <div className="row g-4">
            {filteredComics.map(comic => {
              const isOutOfStock = comic.stock_quantity <= 0;
              return (
                <div key={comic.id} className="col-12 col-sm-6 col-lg-3">
                  <div className="card product-card h-100">

                    {/* IMAGE */}
                    <Link to={`/products/${comic.slug}`} className="product-image-wrapper">
                      <img src={`${import.meta.env.VITE_API_URL}${comic.image_url}`} className="card-img-top product-image" />
                    </Link>

                    {/* BODY */}
                    <div className="card-body d-flex flex-column text-center">

                      {/* TITLE */}
                      <h5 className="product-title">
                        {comic.name}
                      </h5>

                      {/* PRICE */}
                      <p className="product-price mt-auto">
                        € {comic.price}
                      </p>

                      {/* BUTTON MODIFICATO CON BLOCCO DI SICUREZZA */}
                      <button
                        className="btn fw-bold w-100"
                        onClick={() => handlePurchaseClick(comic)}
                        disabled={isOutOfStock}
                        style={{
                          background: isOutOfStock ? '#6c757d' : '#E63946',
                          color: 'white',
                          cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {isOutOfStock ? 'ESAURITO' : 'ACQUISTA'}
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>
    </>
  )
}
