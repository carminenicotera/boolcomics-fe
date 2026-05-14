import { Link } from "react-router-dom";

export default function Whishlist({ whishlist, handleWhishlist, addToCart }) {

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

    return (<>
        <div className="container mb-5 mt-5">
            <div className="row g-4">
                {whishlist.map(comic => {
                    const isOutOfStock = comic.stock_quantity <= 0;
                    return (
                        <div key={comic.id} className="col-12 col-sm-6 col-lg-3">
                            <div className="card product-card h-100">

                                {/* IMAGE */}
                                <Link to={`/products/${comic.slug}`} className="product-image-wrapper">
                                    <img src="/img/placeholdercomic.png" alt={comic.name} className="card-img-top product-image" />
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
                                        {isOutOfStock ? 'ESAURITO' : 'ACQUISTA'}
                                    </button>

                                    <button
                                        className="btn fw-bold w-100"
                                        onClick={() => handleWhishlist(comic)}
                                        disabled={isOutOfStock}
                                        style={{
                                            background: '#1e1e1e',
                                            color: 'white',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Rimuovi dalla Wishlist
                                    </button>

                                </div>

                            </div>

                        </div>
                    );
                })}

            </div>
        </div>
    </>)
}