import { Link } from "react-router-dom";

export default function CartPage({ cart, removeFromCart }) {
  
 
  const total = cart?.reduce((acc, item) => acc + parseFloat(item.price), 0) || 0;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold m-0">Il tuo Carrello</h1>
        <span className="badge bg-secondary fs-6">{cart?.length || 0} Articoli</span>
      </div>

      {/* SE IL CARRELLO È VUOTO */}
      {!cart || cart.length === 0 ? (
        <div className="text-center py-5 border rounded bg-light shadow-sm">
          <i className="bi bi-cart-x fs-1 text-muted"></i>
          <p className="fs-4 mt-3 btn-warning" style={ {  color: 'white' } }>Il tuo carrello è vuoto!</p>
          <p className="text-muted">Torna al catalogo per scegliere i tuoi fumetti preferiti.</p>
          <Link to="/catalog" className="btn btn-lg mt-2 fw-bold" style={ { background: '#E63946', color: 'white' } }>
            VAI AL CATALOGO
          </Link>
        </div>
      ) : (
        /* SE CI SONO PRODOTTI */
        <div className="row g-4">
          
          {/* COLONNA SINISTRA: LISTA PRODOTTI */}
          <div className="col-lg-8">
            {cart.map((item, index) => (
              <div key={index} className="card mb-3 border-0 shadow-sm overflow-hidden">
                <div className="row g-0 align-items-center">
                  <div className="col-3 col-md-2">
                    <img 
                      src="/public/img/placeholdercomic.png" 
                      className="img-fluid" 
                      alt={item.name}
                      style={{ objectFit: 'cover', height: '100px', width: '100%' }}
                    />
                  </div>
                  <div className="col-6 col-md-7 ps-3">
                    <h5 className="mb-1 fw-bold">{item.name}</h5>
                    <p className="text-muted small mb-0">Disponibilità immediata</p>
                  </div>
                  <div className="col-3 col-md-3 text-end pe-4">
                    <span className="h5 fw-bold text-danger">€{item.price}</span>
                    <button 
  className="btn btn-outline-danger btn-sm" 
  onClick={() => removeFromCart(index)}
>
  <i className="bi bi-trash"></i> Elimina
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* COLONNA DESTRA: RIEPILOGO E PAGAMENTO */}
          <div className="col-lg-4">
            <div className="card p-4 border-0 shadow-sm bg-dark text-white">
              <h3 className="fw-bold mb-4">Riepilogo</h3>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Prodotti:</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-4">
                <span>Spedizione:</span>
                <span className="text-success fw-bold">GRATIS</span>
              </div>
              
              <hr className="bg-secondary" />
              
              <div className="d-flex justify-content-between mb-4">
                <span className="h4 m-0 fw-bold">TOTALE:</span>
                <span className="h4 m-0 text-warning fw-bold">€{total.toFixed(2)}</span>
              </div>

              {/* BOTTONE PROCEDI AL PAGAMENTO */}
              <button 
                className="btn btn-lg w-100 fw-bold mb-3 shadow text-uppercase"
                onClick={() => alert("Reindirizzamento al modulo di pagamento in corso...")}
                style={ { background: '#E63946', color: 'white' }}
              >
                Procedi al pagamento
              </button>

              <Link to="/catalog" className="btn btn-outline-light btn-sm w-100 border-0">
                ← Continua lo shopping
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}