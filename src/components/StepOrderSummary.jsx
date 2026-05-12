const cartData = [
    { id: 1, name: 'Naruto Vol. 1', price: 5.20, quantity: 2 },
    { id: 2, name: 'Berserk Vol. 1', price: 7.90, quantity: 1 },
    { id: 3, name: 'Dragon Ball Vol. 1', price: 4.30, quantity: 3 },
    { id: 4, name: 'Death Note Vol. 1', price: 5.20, quantity: 1 },
    { id: 5, name: 'One Piece Vol. 1', price: 5.20, quantity: 2 },
    { id: 6, name: 'Attack on Titan Vol. 1', price: 6.50, quantity: 1 },
    { id: 7, name: 'Fullmetal Alchemist Vol. 1', price: 5.90, quantity: 2 },
    { id: 8, name: 'Demon Slayer Vol. 1', price: 6.50, quantity: 1 },
    { id: 9, name: 'Watchmen', price: 24.00, quantity: 1 },
    { id: 10, name: 'Dylan Dog n. 1', price: 4.50, quantity: 2 },
];
export default function StepOrderSummary({ formData, handleBack }) {

    // Calcolo del totale dell'ordine
    const total = cartData.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);


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
                            cartData.map(item => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between px-0">
                                    <span className="fw-semibold">{item.name} <span className="text-secondary">x{item.quantity}</span></span>
                                    <span>€{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
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