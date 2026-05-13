import { useState } from 'react';

export default function ProductMainCard({ comic, addToCart }) {

    const [quantity, setQuantity] = useState(1);
    const [showAlert, setShowAlert] = useState(false);

    // Stato cuore preferiti
    const [isFavorite, setIsFavorite] = useState(false);

    // Controllo disponibilità
    const isOutOfStock = comic.stock_quantity <= 0;

    // Controllo sconto
    const isDiscounted =
        comic.original_price &&
        parseFloat(comic.original_price) > parseFloat(comic.price);

    // Gestione quantità input
    const handleQuantityChange = (e) => {

        let value = parseInt(e.target.value);

        if (isNaN(value) || value < 1) {
            value = 1;
        }

        if (value > comic.stock_quantity) {
            value = comic.stock_quantity;
        }

        setQuantity(value);
    };

    // Aggiungi al carrello
    const handleAddToCart = () => {

        if (isOutOfStock) return;

        addToCart({
            ...comic,
            quantity
        });

        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 2500);
    };

    return (

        <div className="card border-0 shadow-sm p-4 my-4">

            {/* ALERT */ }
            {
                showAlert && (
                    <div className="alert alert-success alert-dismissible fade show">
                        <strong>{ comic.name }</strong> aggiunto al carrello!
                    </div>
                )
            }

            <div className="row g-4 align-items-start">

                {/* IMMAGINE */ }
                <div className="col-lg-5 text-center">

                    <img
                        src={ comic.image_url }
                        alt={ comic.name }
                        className="img-fluid rounded shadow-sm"
                        style={ {
                            maxHeight: '500px',
                            objectFit: 'cover'
                        } }
                        onError={ (e) =>
                            (e.target.src = '/img/placeholdercomic.png')
                        }
                    />

                </div>

                {/* DETTAGLI */ }
                <div className="col-lg-7">

                    {/* TITOLO + WISHLIST */ }
                    <div className="d-flex justify-content-between align-items-start">

                        <h1 className="fw-bold mb-3">
                            { comic.name }
                        </h1>

                        {/* CUORE PREFERITI */ }
                        <button
                            className="btn border-0 p-0"
                            onClick={ () => setIsFavorite(!isFavorite) }
                            style={ {
                                fontSize: '1.8rem',
                                transition: '0.2s'
                            } }
                        >
                            <i
                                className={ `bi ${isFavorite
                                        ? 'bi-heart-fill text-danger'
                                        : 'bi-heart text-secondary'
                                    }` }
                            ></i>
                        </button>

                    </div>

                    {/* PREZZI */ }
                    <div className="d-flex align-items-center gap-3 mb-4">

                        {
                            isDiscounted && (
                                <span className="text-muted text-decoration-line-through fs-5">
                                    €{ parseFloat(comic.original_price).toFixed(2) }
                                </span>
                            )
                        }

                        <span className="text-danger fw-bold fs-2">
                            €{ parseFloat(comic.price).toFixed(2) }
                        </span>

                    </div>

                    <hr />

                    {/* DISPONIBILITÀ */ }
                    <div className="mb-4">

                        <span className="fw-bold me-2">
                            Disponibilità:
                        </span>

                        {
                            isOutOfStock ? (
                                <span className="text-danger fw-semibold">
                                    Esaurito
                                </span>
                            ) : (
                                <span className="text-success fw-semibold">
                                    In stock ({ comic.stock_quantity } pezzi)
                                </span>
                            )
                        }

                    </div>

                    {/* QUANTITÀ */ }
                    <div className="mb-4">

                        <label className="fw-bold text-uppercase small text-muted mb-2 d-block">
                            Quantità
                        </label>

                        <div
                            className="input-group"
                            style={ { width: '160px' } }
                        >

                            {/* MENO */ }
                            <button
                                className="btn btn-outline-dark"
                                disabled={ isOutOfStock }
                                onClick={ () =>
                                    setQuantity((q) =>
                                        q > 1 ? q - 1 : 1
                                    )
                                }
                            >
                                -
                            </button>

                            {/* INPUT */ }
                            <input
                                type="number"
                                className="form-control text-center fw-bold"
                                value={ quantity }
                                min="1"
                                max={ comic.stock_quantity }
                                onChange={ handleQuantityChange }
                                disabled={ isOutOfStock }
                            />

                            {/* PIÙ */ }
                            <button
                                className="btn btn-outline-dark"
                                disabled={ isOutOfStock }
                                onClick={ () =>
                                    setQuantity((q) =>
                                        q < comic.stock_quantity
                                            ? q + 1
                                            : q
                                    )
                                }
                            >
                                +
                            </button>

                        </div>

                    </div>

                    {/* BOTTONE CARRELLO */ }
                    <div className="d-grid">

                        <button
                            className="btn btn-danger btn-lg fw-bold py-3"
                            disabled={ isOutOfStock }
                            onClick={ handleAddToCart }
                            style={ {
                                backgroundColor: isOutOfStock
                                    ? '#6c757d'
                                    : '#E63946',
                                border: 'none'
                            } }
                        >

                            <i className="bi bi-cart-plus me-2"></i>

                            {
                                isOutOfStock
                                    ? 'PRODOTTO ESAURITO'
                                    : 'AGGIUNGI AL CARRELLO'
                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}