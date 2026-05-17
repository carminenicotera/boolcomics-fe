import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useCart } from "../components/CartProvider" 

export default function CatalogPage() { 
  
  // Estraiamo tutto il necessario dal Context globale
  const { handleAddToCart, whishlist, handleWhishlist } = useCart();

  
  const [searchParams, setSearchParams] = useSearchParams()
  const [filteredComics, setFilteredComics] = useState([])
  // QUERY PARAMS
  const searchQuery = searchParams.get("search") || ""

  // FETCH PRODUCTS
  useEffect(() => {

    

    const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000"
    
    fetch(`${api_url}/products`)
      .then(res => res.json())
      .then(data => {

        // SE IL BACKEND RESTITUISCE ERRORE
        if (!Array.isArray(data)) {
          setFilteredComics([])
          return
        }
        setFilteredComics(data)
      })
      .catch(err => console.error("Errore nel caricamento dei prodotti:", err));
  }, []);


  const handlePurchaseClick = (comic) => {
    const isOutOfStock = comic.stock_quantity <= 0
    if (isOutOfStock) {
      alert("Spiacenti, il prodotto è esaurito!")
      return
    }
    
    handleAddToCart(comic, 1);
  };

  return (
    <>
      {/* PRODUCTS */}
      <section className="py-5">
        <div className="container">

          {/* TOP BAR */}
          
          {searchQuery && (
            <div className={`row justify-content-${filteredComics.length === 0 ? "center" : "between"} align-items-center mb-4 g-3`}>

              {/* RESULTS */}
              <div className="col-12 col-md-auto">
                {filteredComics.length === 0 ? (
                  <div className="search-empty-state">
                    <div className="empty-badge"> OPS! </div>
                    <h2 className="empty-title">Nessun risultato trovato</h2>
                    <p className="empty-message">
                      La ricerca per <strong>{searchQuery}</strong> non ha portato alla luce nessun volume.
                      <br />
                      Prova a digitare una nuova parola chiave.
                    </p>
                    <Link to="/catalog" className="btn btn-outline-danger">
                      Mostra tutto il catalogo
                    </Link>
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
                  <select
                    className="form-select catalog-select"
                    value={sortBy}
                    onChange={(e) => {
                      const newParams = new URLSearchParams(searchParams)
                      if (e.target.value) {
                        newParams.set("sort", e.target.value)
                      } else {
                        newParams.delete("sort")
                      }
                      setSearchParams(newParams)
                    }}
                  >

                    <option value="">
                      Ordina per
                    </option>

                    <option value="name">
                      Nome
                    </option>

                    <option value="low-price">
                      Prezzo: dal più basso
                    </option>

                    <option value="high-price">
                      Prezzo: dal più alto
                    </option>

                    <option value="recent">
                      Più recenti
                    </option>

                  </select>
                </div>
              )}
            </div>
          )}

          {/* PRODUCTS GRID */}
          <div className="row g-4">
            {filteredComics.map(comic => {
              const isOutOfStock = comic.stock_quantity <= 0
              // Ora controlla l'array globale del Context correttamente
              const isInWhishlist = whishlist ? whishlist.some(item => item.slug === comic.slug) : false;

              return (
                <div
                  key={comic.id}
                  className="col-12 col-sm-6 col-lg-3"
                >
                  <div className="card product-card h-100">
                    {/* IMAGE */}
                    <Link
                      to={`/products/${comic.slug}`}
                      className="product-image-wrapper"
                    >
                      <img
                        src={`${import.meta.env.VITE_API_URL}${comic.image_url}`}
                        alt={comic.name}
                        className="card-img-top product-image"
                      />
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
                          cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                          marginBottom: '1rem'
                        }}
                      >

                        {isOutOfStock ? "ESAURITO" : "ACQUISTA"}

                      </button>

                      <button
                        className="btn fw-bold w-100"
                        onClick={() => handleWhishlist(comic)}
                        style={{
                          background: '#1e1e1e',
                          color: 'white',
                          cursor: 'pointer',
                        }}
                      >
                        {isInWhishlist ? 'Rimuovi dalla Whishlist' : 'Aggiungi alla Whishlist'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}