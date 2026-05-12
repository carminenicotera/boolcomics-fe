export default function StepPayment({ formData, handleChange, handleNext, handleBack }) {

    // Funzione per gestire l'invio del form
    const handleSubmit = (e) => {
        e.preventDefault();
        handleNext();
    };


    return (

        <>

            <div className="card shadow-sm">

                <div className="card-body p-4">
                    <h4 className="mb-4">Dati di pagamento</h4>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Nome sulla carta</label>
                            <input
                                type="text"
                                className="form-control"
                                name="card_name"
                                value={formData.card_name}
                                onChange={handleChange}
                                placeholder="Es. Mario Rossi"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Numero carta</label>
                            <input
                                type="text"
                                className="form-control"
                                name="card_number"
                                value={formData.card_number}
                                onChange={handleChange}
                                placeholder="Es. 1234567890123456"
                                maxLength={16}
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Scadenza</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="card_expiry"
                                    value={formData.card_expiry}
                                    onChange={handleChange}
                                    placeholder="MM/AA"
                                    maxLength={5}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">CVV</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="card_cvv"
                                    value={formData.card_cvv}
                                    onChange={handleChange}
                                    placeholder="Es. 123"
                                    maxLength={3}
                                    required
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={handleBack}
                            >
                                ← Indietro
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Avanti →
                            </button>
                        </div>

                    </form>
                </div>

            </div>

        </>

    );

}