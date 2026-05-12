export default function StepOrderSummary({ formData, handleBack, cart }) {
    console.log(cart);
    // Calcolo del totale dell'ordine
    const total = cart.reduce((acc, item) => acc + parseFloat(item.price) * (item.quantity || 1), 0);


    return (

        <>

            <div className="card shadow-sm">

                <div className="card-body p-4">
                    <h4 className="mb-4">Riepilogo ordine</h4>


                    {/* Dati personali */}
                    <h6 className="text-muted mb-2">Dati personali</h6>
                    <p className="mb-1"><strong>Nome:</strong> {formData.first_name} {formData.last_name}</p>
                    <p className="mb-3"><strong>Email:</strong> {formData.email}</p>

                    <hr />

                    {/* Indirizzo di spedizione */}
                    <h6 className="text-muted mb-2">Indirizzo di spedizione</h6>
                    <p className="mb-1"><strong>Via:</strong> {formData.street}</p>
                    <p className="mb-1"><strong>Città:</strong> {formData.city} ({formData.state})</p>
                    <p className="mb-3"><strong>CAP:</strong> {formData.zip_code} — {formData.country}</p>

                    <hr />

                    {/* Prodotti */}
                    <h6 className="text-muted mb-2">Prodotti</h6>
                    <ul className="list-group list-group-flush mb-3">

                        {/* Lista dei prodotti */}
                        {
                            cart.map(item => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between px-0">
                                    <span className="fw-semibold">{item.name} <span className="text-secondary">x{item.quantity || 1}</span></span>
                                    <span>€{(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}</span>
                                </li>
                            ))
                        }

                    </ul>

                    <hr />

                    {/* Totale */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">Totale</h5>
                        <h5 className="mb-0 text-danger">€{total.toFixed(2)}</h5>
                    </div>

                    {/* Pulsanti */}
                    <div className="d-flex justify-content-between mt-4">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={handleBack}
                        >
                            ← Indietro
                        </button>
                        <button className="btn btn-success btn-lg">
                            ✓ Completa acquisto
                        </button>
                    </div>

                </div>

            </div>

        </>

    );

}