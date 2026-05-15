import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Homepage({ addToCart, whishlist, handleWhishlist }) {

  const API_URL = import.meta.env.VITE_API_URL;

  const [lastestProducts, setLatestProducts] = useState([])
  const [carosell, setCarosell] = useState([])
  const [mostPurchased, setMostPurchased] = useState([])


  // Chiamata per le ultime uscite
  useEffect(() => {
    fetch(`${API_URL}/products/last-arrived`)
      .then(res => res.json())
      .then(data => {
        setLatestProducts(data.slice(0, 4));
      })
      .catch(err => console.error(err));
  }, []);

  // Carosello
  useEffect(() => {
    fetch(`${API_URL}/products/`)
      .then(res => res.json())
      .then(data => setCarosell(data.slice(0, 3)))
      .catch(err => console.error(err));
  }, [])

  // Chiamata più venduti
  useEffect(() => {
    fetch(`${API_URL}/products/most-purchased`)
      .then(res => res.json())
      .then(data => {
        setMostPurchased(data.slice(0, 4))
      })
      .catch(err => console.error(err));
  }, [])

  // Funzione centralizzata per gestire il click sul pulsante acquista in sicurezza
  const handlePurchaseClick = (comic) => {
    const isOutOfStock = comic.stock_quantity <= 0;
    if (isOutOfStock) {
      alert("Spiacenti, il prodotto è esaurito!");
      return;
    }
    // Usa la nostra nuova logica passandogli il secondo argomento esplicito (1 copia)
    addToCart(comic, 1);
    alert(`${comic.name} aggiunto al carrello!`);
  };

  return (
    <>
      {/* CAROSELLO */}
      <div className="container mb-5 mt-5">
        <div id="carouselExampleCaptions" className="carousel slide shadow" data-bs-ride="carousel">

          <div className="carousel-indicators">
            {carosell.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

          <div className="carousel-inner rounded">
            {carosell.map((comic, index) => (
              <div key={comic.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <img
                  src="/img/placeholdercomic.png"
                  className="d-block w-100"
                  alt={comic.name}
                  style={{ height: '400px', objectFit: 'cover', filter: 'brightness(0.6)' }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h2 className="fw-bold">{comic.name}</h2>
                  <p className="mb-2"><strong>Genere:</strong> {comic.genre} | <strong>Autore:</strong> {comic.author}</p>
                  <h4 className="text-danger fw-bold">€{comic.price}</h4>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Precedente</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Successivo</span>
          </button>
        </div>
      </div>

      {/* ULTIME USCITE */}
      <div className="container">
        <h2 className="text-center">ULTIME USCITE</h2>
        <div className="row">
          {lastestProducts.map(comic => {
            const isOutOfStock = comic.stock_quantity <= 0;
            const isInWhishlist = whishlist.some(item => item.slug === comic.slug);
            return (
              <div className="col-12 col-sm-6 col-lg-3 mb-4" key={comic.id}>
                <div className="card product-card h-100 shadow-sm">
                  <Link to={`/products/${comic.slug}`}>
                    <img src="/img/placeholdercomic.png" alt={comic.name} className="card-img-top object-fit-cover product-image" />
                  </Link>
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="fw-bold">{comic.name}</h5>
                    <span className="mb-2"><strong>Uscita:</strong> {comic.release_date ? comic.release_date.split('T')[0] : 'N/A'}</span>
                    <p className="fw-bold mt-auto">€{comic.price}</p>

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
                      {isOutOfStock ? 'ESAURITO' : 'ACQUISTA'}
                    </button>

                    <button
                      className="btn fw-bold w-100"
                      onClick={() => handleWhishlist(comic)}
                      style={{
                        background: '#1e1e1e',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      {isInWhishlist ? 'Rimuovi dalla Whishlist' : 'Aggiungi alla Whishlist'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* I PIÙ VENDUTI */}
      <div className="container">
        <h2 className="text-center">I PIÙ VENDUTI</h2>
        <div className="row">
          {mostPurchased.map(comic => {
            const isOutOfStock = comic.stock_quantity <= 0;
            const isInWhishlist = whishlist.some(item => item.slug === comic.slug);
            return (
              <div className="col-12 col-sm-6 col-lg-3 mb-4" key={comic.id}>
                <div className="card h-100 shadow-sm product-card">
                  <Link to={`/products/${comic.slug}`}>
                    <img src="/img/placeholdercomic.png" alt={comic.name} className="card-img-top object-fit-cover product-image" />
                  </Link>
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="fw-bold">{comic.name}</h5>
                    <p className="fw-bold mt-auto">€{comic.price}</p>

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
                      {isOutOfStock ? 'ESAURITO' : 'ACQUISTA'}
                    </button>

                    <button
                      className="btn fw-bold w-100"
                      onClick={() => handleWhishlist(comic)}
                      style={{
                        background: '#1e1e1e',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      {isInWhishlist ? 'Rimuovi dalla Whishlist' : 'Aggiungi alla Whishlist'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}
