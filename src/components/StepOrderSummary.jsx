import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function StepOrderSummary({ formData, handleBack, cart }) {

    // Calcolo del totale dell'ordine
    const total = cart.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

    // Hook per la navigazione e stato per la modale di conferma
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    // Funzione per completare l'ordine
    const handleCompleteOrder = async () => {
        try {
            // 1. Salvataggio dell'indirizzo
            const addressRes = await fetch(`${API_URL}/addresses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zip_code: formData.zip_code,
                    country: formData.country,
                })
            });

            if (!addressRes.ok) throw new Error('Errore nel salvataggio indirizzo');

            const addressData = await addressRes.json();
            console.log('Indirizzo salvato con id:', addressData.id);

            // 2. Dati ordine
            const orderData = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                address: addressData.id,
                status: 'pending',
                total_price: total,
                items: cart.map(item => ({
                    slug: item.slug,
                    quantity: item.quantity
                }))
            };
            console.log('Invio dati ordine:', orderData);

            // Creazione dell'ordine
            const orderRes = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (!orderRes.ok) {
                const errorData = await orderRes.json();
                throw new Error(errorData.message || 'Errore nella creazione dell\'ordine');
            }

            const orderResult = await orderRes.json();
            console.log('Ordine creato con successo:', orderResult);

            // 4. Successo e reindirizzamento
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                navigate('/');
            }, 2000);

        } catch (err) {
            alert('Errore durante l\'acquisto: ' + err.message);
        }
    };


    return (

        <>

            <div className="card shadow-sm">

                <div className="card-body p-4">
                    <h4 className="mb-4">Riepilogo ordine</h4>


                    {/* Dati personali */ }
                    <h6 className="text-muted mb-2">Dati personali</h6>
                    <p className="mb-1"><strong>Nome:</strong> { formData.first_name } { formData.last_name }</p>
                    <p className="mb-3"><strong>Email:</strong> { formData.email }</p>

                    <hr />

                    {/* Indirizzo di spedizione */ }
                    <h6 className="text-muted mb-2">Indirizzo di spedizione</h6>
                    <p className="mb-1"><strong>Via:</strong> { formData.street }</p>
                    <p className="mb-1"><strong>Città:</strong> { formData.city } ({ formData.state })</p>
                    <p className="mb-3"><strong>CAP:</strong> { formData.zip_code } — { formData.country }</p>

                    <hr />

                    {/* Prodotti */ }
                    <h6 className="text-muted mb-2">Prodotti</h6>
                    <ul className="list-group list-group-flush mb-3">

                        {/* Lista dei prodotti */ }
                        {
                            cart.map(item => (
                                <li key={ item.id } className="list-group-item d-flex justify-content-between px-0">
                                    <span className="fw-semibold">{ item.name } <span className="text-secondary">x{ item.quantity }</span></span>
                                    <span>€{ (parseFloat(item.price) * item.quantity).toFixed(2) }</span>
                                </li>
                            ))
                        }

                    </ul>

                    <hr />

                    {/* Totale */ }
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">Totale</h5>
                        <h5 className="mb-0 text-danger">€{ total.toFixed(2) }</h5>
                    </div>

                    {/* Pulsanti */ }
                    <div className="d-flex justify-content-between mt-4">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={ handleBack }
                        >
                            ← Indietro
                        </button>

                        {/* Pulsante per completare l'ordine */ }
                        <button className="btn btn-success btn-lg" onClick={ handleCompleteOrder }>
                            ✓ Completa acquisto
                        </button>
                    </div>

                </div>

                <div>
                    {/* Modale di conferma ordine */ }
                    { showModal && (
                        <div className="modal d-block" style={ { backgroundColor: 'rgba(0,0,0,0.5)' } }>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content text-center p-4">
                                    <h4 className="mb-2">🎉 Grazie per averci scelto!</h4>
                                    <p className="text-muted">Verrai reindirizzato alla home...</p>
                                </div>
                            </div>
                        </div>
                    ) }
                </div>

            </div>

        </>

    );

}