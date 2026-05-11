import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductMainCard from '../components/ProductMainCard';
import ProductDescriptionCard from '../components/ProductDescriptionCard';


// URL base dall'API definita nelle variabili d'ambiente
const API_URL = import.meta.env.VITE_API_URL;


export default function ComicPage() {
    const { slug } = useParams();
    const [comic, setComic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch del prodotto in base allo slug
    useEffect(() => {
        fetch(`${API_URL}/products/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error('Prodotto non trovato');
                return res.json();
            })
            .then(data => {
                setComic(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [slug]);

    // Se è in caricamento, mostra un messaggio
    if (loading) return <p>Caricamento...</p>;

    // Se c'è un errore, mostra il messaggio
    if (error) return <p>Errore: {error}</p>;


    return (

        <>

            <div className='container'>

                {/* card dettails  */}
                <ProductMainCard comic={comic} />

                {/* card description */}
                <ProductDescriptionCard comic={comic} />

            </div>

        </>

    )

}