import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function CartPage({ cart, removeFromCart }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const total = cart?.reduce((acc, item) => {
    return acc + (parseFloat(item.price) * (item.quantity || 1));
  }, 0) || 0;

  // Funzione di controllo stock in tempo reale prima di andare al checkout
  const handleProceedToCheckout = async () => {
    setErrorMessage("");
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      // Interroghiamo l'endpoint dei prodotti filtrando per quelli nel carrello
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error("Impossibile verificare lo stock.");

      const dbProducts = await response.json();

      // Controlliamo ogni articolo nel carrello rispetto al database reale
      for (const item of cart) {
        const dbProduct = dbProducts.find(p => p.slug === item.slug);

        if (!dbProduct || dbProduct.stock_quantity <= 0) {
          setErrorMessage(`Il fumetto "${item.name}" è purtroppo esaurito. Rimuovilo per continuare.`);
          return;
        }

        if (item.quantity > dbProduct.stock_quantity) {
          setErrorMessage(`Quantità non disponibile per "${item.name}". Stock massimo: ${dbProduct.stock_quantity} pz.`);
          return;
        }
      }

      // Se tutti i controlli passano, andiamo alla pagina di checkout
      navigate('/checkout');

    } catch (err) {
      setErrorMessage("Errore di connessione durante la verifica della disponibilità.");
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold m-0">Il tuo Carrello</h1>
        <span className="badge bg-secondary fs-6">{ cart?.reduce((acc, item) => acc + (item.quantity || 1), 0) || 0 } Articoli</span>
      </div>

      {/* SE IL CARRELLO È VUOTO */ }
      { !cart || cart.length === 0 ? (
        <div className="text-center py-5 border rounded bg-light shadow-sm">
          <i className="bi bi-cart-x fs-1 text-muted"></i>
          <p className="fs-4 mt-3 btn-warning" style={ { color: 'white' } }>Il tuo carrello è vuoto!</p>
          <p className="text-muted">Torna al catalogo per scegliere i tuoi fumetti preferiti.</p>
          <Link to="/catalog" className="btn btn-lg mt-2 fw-bold" style={ { background: '#E63946', color: 'white' } }>
            VAI AL CATALOGO
          </Link>
        </div>
      ) : (
        /* SE CI SONO PRODOTTI */
        <div className="row g-4">

          {/* COLONNA SINISTRA: LISTA PRODOTTI */ }
          <div className="col-lg-8">
            {/* Blocco Messaggio di Errore se lo stock fallisce */ }
            { errorMessage && (
              <div className="alert alert-danger fw-bold border-0 shadow-sm mb-3">
                ⚠️ { errorMessage }
              </div>
            ) }

            { cart.map((item, index) => (
              <div key={ index } className="card mb-3 border-0 shadow-sm overflow-hidden">
                <div className="row g-0 align-items-center">
                  <div className="col-3 col-md-2">
                    <img
                      src={ item.image_url || "/img/placeholdercomic.png" }
                      className="img-fluid"
                      alt={ item.name }
                      style={ { objectFit: 'cover', height: '100px', width: '100%' } }
                    />
                  </div>
                  <div className="col-6 col-md-7 ps-3">
                    <h5 className="mb-1 fw-bold">{ item.name }</h5>
                    <div className="d-flex align-items-center mt-2">
                      <span className="text-muted mb-0">
                        Quantità: <span className="fw-bold text-dark">{ item.quantity || 1 }</span>
                      </span>
                      <span className="text-muted small ms-2">(€{ item.price } l'uno)</span>
                    </div>
                  </div>
                  <div className="col-3 col-md-3 text-end pe-4">
                    <span className="h5 fw-bold text-danger">
                      €{ (parseFloat(item.price) * (item.quantity || 1)).toFixed(2) }
                    </span>
                    <button
                      className="btn btn-outline-danger btn-sm m-3"
                      onClick={ () => removeFromCart(item.slug) }
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            )) }
          </div>

          {/* COLONNA DESTRA: RIEPILOGO E PAGAMENTO */ }
          <div className="col-lg-4">
            <div className="card p-4 border-0 shadow-sm bg-dark text-white">
              <h3 className="fw-bold mb-4">Riepilogo</h3>

              <div className="d-flex justify-content-between mb-2">
                <span>Prodotti:</span>
                <span>€{ total.toFixed(2) }</span>
              </div>

              <div className="d-flex justify-content-between mb-4">
                <span>Spedizione:</span>
                <span className="text-success fw-bold">GRATIS</span>
              </div>

              <hr className="bg-secondary" />

              <div className="d-flex justify-content-between mb-4">
                <span className="h4 m-0 fw-bold">TOTALE:</span>
                <span className="h4 m-0 text-warning fw-bold">€{ total.toFixed(2) }</span>
              </div>

              {/* BOTTONE PROCEDI AL PAGAMENTO */ }
              <button
                className="btn btn-lg w-100 fw-bold mb-3 shadow text-uppercase"
                onClick={ handleProceedToCheckout }
                style={ { background: '#E63946', color: 'white' } }
              >
                Procedi al pagamento
              </button>

              <Link to="/catalog" className="btn btn-outline-light btn-sm w-100 border-0">
                ← Continua lo shopping
              </Link>
            </div>
          </div>

        </div>
      ) }
    </div>
  );
}
