export default function StepShippingAddress({ formData, handleChange, handleNext, handleBack }) {

    // Funzione per gestire l'invio del form
    const handleSubmit = (e) => {
        e.preventDefault();
        handleNext();
    };


    return (

        <>

            <div className="card shadow-sm">

                <div className="card-body p-4">
                    <h4 className="mb-4">Indirizzo di spedizione</h4>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Indirizzo</label>
                            <input
                                type="text"
                                className="form-control"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                placeholder="Es. Via Roma 12"
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Città</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Es. Milano"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Provincia</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="Es. MI"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">CAP</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="zip_code"
                                    value={formData.zip_code}
                                    onChange={handleChange}
                                    placeholder="Es. 20100"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Paese</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="Es. Italia"
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
                            <button type="submit" className="btn btn-danger">
                                Avanti →
                            </button>
                        </div>

                    </form>
                </div>

            </div>

        </>

    );

}