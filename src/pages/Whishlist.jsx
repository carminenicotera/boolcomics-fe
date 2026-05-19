import { Link } from "react-router-dom";
import { useCart } from "../components/CartProvider";

export default function Whishlist() {
    // Recuperiamo i dati e le funzioni direttamente dal Context globale
    const { whishlist, handleWhishlist, handleAddToCart } = useCart();

    const handlePurchaseClick = (comic) => {
        const isOutOfStock = comic.stock_quantity <= 0
        if (isOutOfStock) {
            alert("Spiacenti, il prodotto è esaurito!")
            return
        }
        handleAddToCart(comic, 1);
    };


    // --- AGGIUNTO BLOCCO DI PROTEZIONE ANTI-CRASH ---
    // Se la wishlist non esiste ancora o è vuota, mostra una bella interfaccia di cortesia
    if (!whishlist || whishlist.length === 0) {
        return (
            <div className="container text-center py-5 my-5">
                <i className="bi bi-heart text-muted fs-1"></i>
                <h2 className="mt-3 fw-bold">La tua Wishlist è vuota</h2>
                <p className="text-muted">Esplora il catalogo per aggiungere i tuoi fumetti preferiti.</p>
                <Link to="/catalog" className="btn fw-bold mt-3 text-uppercase" style={ { background: '#E63946', color: 'white' } }>
                    Vai al Catalogo
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="container mb-5 mt-5">

                <div className="d-flex align-items-center justify-content-center my-5 position-relative">
                    <div className="flex-grow-1 bg-dark" style={ { height: '4px', opacity: 0.8 } }></div>
                    <div className="mx-3" style={ { transform: 'rotate(-2deg)' } }>
                        <h1
                            className="bg-dark text-white px-4 py-2 m-0 text-uppercase fs-3 fw-bold text-center"
                            style={ {
                                fontFamily: '"Impact", "Arial Black", sans-serif',
                                border: '3px solid #E63946',
                                letterSpacing: '2px'
                            } }
                        >
                            LA TUA WISHLIST <span className="badge bg-secondary fs-6 ms-2 align-middle">{ whishlist.length }</span>
                        </h1>
                    </div>
                    <div className="flex-grow-1 bg-dark" style={ { height: '4px', opacity: 0.8 } }></div>
                </div>

                <div className="row g-4">
                    { whishlist.map(comic => {
                        const isOutOfStock = comic.stock_quantity <= 0;
                        const isInWhishlist = whishlist.some(item => item.slug === comic.slug);

                        return (
                            <div key={ comic.id } className="col-12 col-sm-6 col-lg-3">
                                <div className="card shadow-sm product-card bg-light h-100">

                                    {/* IMAGE (Sostituita con l'url dinamico dell'API come nelle altre pagine) */ }
                                    <Link to={ `/products/${comic.slug}` } className="product-image-wrapper">
                                        <img
                                            src={ comic.image_url ? `${import.meta.env.VITE_API_URL}${comic.image_url}` : "/img/placeholdercomic.png" }
                                            alt={ comic.name }
                                            className="card-img-top product-image"
                                        />
                                    </Link>

                                    {/* BODY */ }
                                    <div className="card-body d-flex flex-column text-center">

                                        {/* TITLE */ }
                                        <h5 className="product-title fw-bold">
                                            { comic.name }
                                        </h5>

                                        {/* PRICE */ }
                                        <p className="product-price mt-auto fw-bold text-danger">
                                            € { comic.price }
                                        </p>

                                        {/* BUTTON ACQUISTA */ }
                                        <button
                                            className="btn fw-bold w-100"
                                            onClick={ () => handlePurchaseClick(comic) }
                                            disabled={ isOutOfStock }
                                            style={ {
                                                background: isOutOfStock ? '#6c757d' : '#E63946',
                                                color: 'white',
                                                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                                                marginBottom: '1rem'
                                            } }
                                        >
                                            { isOutOfStock ? 'ESAURITO' : 'ACQUISTA' }
                                        </button>

                                        {/* BUTTON RIMUOVI */ }
                                        <button
                                            className="btn fw-bold w-100"
                                            onClick={ () => handleWhishlist(comic) }
                                            style={ {
                                                background: '#1e1e1e',
                                                color: 'white',
                                                cursor: 'pointer'
                                            } }
                                        >
                                            { isInWhishlist ? 'Rimuovi dalla Whishlist' : 'Aggiungi alla Whishlist' }
                                        </button>

                                    </div>
                                </div>
                            </div>
                        );
                    }) }
                </div>
            </div>
        </>
    );
}