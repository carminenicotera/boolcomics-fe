export default function ProductMainCard({ comic }) {
    if (!comic) {
        return null;
    }

    const isDiscounted = comic.price < comic.original_price;

    return (

        <>

            <div>

                <div className="card shadow-sm my-4">

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-4 text-center">
                                <img
                                    src={comic.image_url}
                                    alt={comic.name}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: '450px', objectFit: 'cover' }}
                                />
                            </div>

                            <div className="col-md-8">
                                <h2 className="card-title">{comic.name}</h2>
                                <hr />
                                <div className="d-flex align-items-baseline mb-3">
                                    {isDiscounted && (
                                        <p className="text-muted text-decoration-line-through me-2 mb-0">€{comic.original_price.toFixed(2)}</p>
                                    )}
                                    <h3 className="text-danger mb-0">€{comic.price.toFixed(2)}</h3>
                                </div>
                                <p className="mb-3">
                                    Disponibilità: {comic.stock_quantity > 0 ?
                                        <span className="text-success">In stock ({comic.stock_quantity} pezzi)</span> :
                                        <span className="text-danger">Esaurito</span>}
                                </p>

                                <div className="col-auto">
                                    <div className="input-group" style={{ width: '130px' }}>
                                        <span className="input-group-text">Qtà</span>
                                        <input
                                            type="number"
                                            className="form-control text-center"
                                            defaultValue="1"
                                            min="1"
                                            max={comic.stock_quantity}
                                        />
                                    </div>
                                </div>

                                {/* Sezione Azioni: Carrello e Preferiti */}
                                <div className="d-flex flex-column flex-sm-row gap-3 mt-4">


                                    {/* Bottone Carrello */}
                                    <button className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2">
                                        <i className="bi bi-cart-plus"></i>
                                        Aggiungi al carrello
                                    </button>

                                    {/* Bottone Preferiti */}
                                    <button className="btn btn-outline-danger btn-lg d-flex align-items-center justify-content-center gap-2">
                                        <i className="bi bi-heart"></i>
                                        Preferiti
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>

    );

}