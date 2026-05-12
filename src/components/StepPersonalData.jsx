export default function StepPersonalData({ formData, handleChange, handleNext }) {

    // Funzione per gestire l'invio del form
    const handleSubmit = (e) => {
        e.preventDefault();
        handleNext();
    };


    return (

        <>

            <div className="card shadow-sm">
                
                <div className="card-body p-4">
                    <h4 className="mb-4">Dati personali</h4>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="Inserisci il tuo nome"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Cognome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Inserisci il tuo cognome"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Inserisci la tua email"
                                required
                            />
                        </div>

                        <div className="d-flex justify-content-end mt-4">
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