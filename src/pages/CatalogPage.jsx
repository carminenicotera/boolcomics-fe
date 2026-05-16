import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useCart } from "../components/CartProvider" 

export default function CatalogPage() { 
  
  // Estraiamo tutto il necessario dal Context globale
  const { handleAddToCart, whishlist, handleWhishlist } = useCart();

  const [comics, setComics] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState("")

  const searchQuery = searchParams.get("search") || ""

  useEffect(() => {
    setSearchParams({}, { replace: true })
  }, [])

  useEffect(() => {
    const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000"
    
    fetch(`${api_url}/products`)
      .then(res => res.json())
      .then(data => {
        setComics(data);
      })
      .catch(err => console.error("Errore nel caricamento dei prodotti:", err));
  }, []);

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
      <section className="py-5">
        <div className="container">

          <div className="row justify-content-between align-items-center mb-4 g-3">
            <div className="col-12 col-md-auto">
              <p className="results-text mb-0">
                { filteredComics.length } prodotti trovati
              </p>
            </div>

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

          <div className="row g-4">
            { filteredComics.map(comic => {
              const isOutOfStock = comic.stock_quantity <= 0
              // Ora controlla l'array globale del Context correttamente
              const isInWhishlist = whishlist ? whishlist.some(item => item.slug === comic.slug) : false;

              return (
                <div key={ comic.id } className="col-12 col-sm-6 col-lg-3">
                  <div className="card product-card h-100">

                    <Link to={ `/products/${comic.slug}` } className="product-image-wrapper">
                      <img src={`${import.meta.env.VITE_API_URL}${comic.image_url}`} className="card-img-top product-image" alt={comic.name} />
                    </Link>

                    <div className="card-body d-flex flex-column text-center">

                      <h5 className="product-title">{ comic.name }</h5>

                      <p className="product-price mt-auto">€ { comic.price }</p>

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
                        { isOutOfStock ? "ESAURITO" : "ACQUISTA" }
                      </button>

                      <button
                        className="btn fw-bold w-100"
                        onClick={ () => handleWhishlist(comic) }
                        style={{
                          background: '#1e1e1e',
                          color: 'white',
                          cursor: 'pointer',
                        }}
                      >
                        { isInWhishlist ? 'Rimuovi dalla Whishlist' : 'Aggiungi alla Whishlist' }
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