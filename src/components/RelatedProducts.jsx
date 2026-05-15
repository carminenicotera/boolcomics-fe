import { Link } from "react-router-dom";

export default function RelatedProducts({ products, addToCart }) {
  
  // Se non ci sono prodotti correlati con categorie in comune, nascondi la sezione
  if (!products || products.length === 0) {
    return null;
  }

  const handlePurchaseClick = (comic) => {
    const isOutOfStock = comic.stock_quantity <= 0;
    if (isOutOfStock) {
      alert("Spiacenti, il prodotto è esaurito!");
      return;
    }
    addToCart(comic, 1);
    alert(`${comic.name} aggiunto al carrello!`);
  };

  return (
    <div className="my-5">
      <h3 className="fw-bold mb-4">Potrebbe interessarti anche</h3>
      
      <div className="row g-4">
        {products.map(comic => {
          const isOutOfStock = comic.stock_quantity <= 0;
          return (
            <div className="col-12 col-sm-6 col-lg-3" key={comic.id}>
              <div className="card h-100 shadow-sm product-card">
                
                {/* Il link cambia lo slug nell'URL e attiva il rinfresco automatico della pagina */}
                <Link to={`/products/${comic.slug}`}>
                  <img 
                    src={`${import.meta.env.VITE_API_URL}${comic.image_url}`}
                    alt={comic.name} 
                    className="card-img-top object-fit-cover product-image" 
                    style={{ maxHeight: '450px', objectFit: 'cover' }}
                  />
                </Link>

                <div className="card-body d-flex flex-column text-center">
                  <Link to={`/products/${comic.slug}`} className="text-decoration-none">
                    <h6 className="fw-bold text-dark text-truncate mb-2">{comic.name}</h6>
                  </Link>
                  
                  <p className="fw-bold text-danger mt-auto mb-3">€ {comic.price}</p>
                  
                  <button 
                    className="btn fw-bold w-100 btn-sm" 
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
  );
}
