import { useState } from 'react';

export default function ProductMainCard({ comic, addToCart }) {
    const [quantity, setQuantity] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    // Stato per il cuore dei preferiti
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddClick = () => {
        addToCart(comic, quantity);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2500);
    };

    return (
        <div className="card border-0 shadow-sm p-4 mb-4 position-relative">
            
            {/* ALERT A TEMPO */}
          

            <div className="row">
                {/* LATO IMMAGINE */}
                <div className="col-md-5">
                    <img src={comic.image_url} alt={comic.name} className="img-fluid rounded shadow-sm" />
                </div>

                {/* LATO DETTAGLI */}
                <div className="col-md-7">
                    <div className="d-flex justify-content-between align-items-start">
                        <h1 className="fw-bold">{comic.name}</h1>
                        
                        {/* BOTTONE PREFERITI (CUORE) */}
                        <button 
                            className="btn border-0 p-0" 
                            onClick={() => setIsFavorite(!isFavorite)}
                            style={{ fontSize: '1.5rem', transition: 'transform 0.2s' }}
                        >
                            <i className={`bi ${isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart text-muted'}`}></i>
                        </button>
                    </div>

                    <p className="h3 text-danger mb-4">€{comic.price}</p>
                    
                    <hr />

                    {/* SELETTORE QUANTITÀ */}
                    <div className="my-4">
                        <label className="d-block mb-2 fw-bold text-uppercase small text-muted">Quantità:</label>
                        <div className="d-flex align-items-center">
                            <div className="input-group" style={{ width: '140px' }}>
                                <button 
                                    className="btn btn-outline-dark" 
                                    onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}
                                >-</button>
                                <span className="form-control text-center fw-bold border-dark">
                                    {quantity}
                                </span>
                                <button 
                                    className="btn btn-outline-dark" 
                                    onClick={() => setQuantity(q => q + 1)}
                                >+</button>
                            </div>
                        </div>
                    </div>

                    {/* TASTO ACQUISTA */}
                    <div className="d-grid gap-2">
                        <button 
                            className="btn btn-danger btn-lg fw-bold py-3" 
                            onClick={handleAddClick}
                        >
                            <i className="bi bi-cart-plus me-2"></i>
                            AGGIUNGI AL CARRELLO
                        </button>
                    </div>

                   
                </div>
            </div>
        </div>
    );
}