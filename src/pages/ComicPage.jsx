import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductMainCard from '../components/ProductMainCard';
import ProductDescriptionCard from '../components/ProductDescriptionCard';
import RelatedProducts from '../components/RelatedProducts';

const API_URL = import.meta.env.VITE_API_URL;

export default function ComicPage({ addToCart }) {
    const { slug } = useParams();
    const [comic, setComic] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    if (comic && comic.slug !== slug && !loading) {
        setLoading(true);
        setComic(null);
        setRelated([]);
        setError(null);
    }

    // 1. Recupera il prodotto principale in base allo slug
    useEffect(() => {
        fetch(`${API_URL}/products/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error('Prodotto non trovato');
                return res.json();
            })
            .then(data => {
                setComic(data);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [slug]);

    // 2. Trova i correlati analizzando le categorie del prodotto principale
    useEffect(() => {
        if (!comic) return;

        fetch(`${API_URL}/products`)
            .then(res => res.json())
            .then(allProducts => {
                const currentCategoriesSlugs = comic.categories?.map(c => c.slug) || [];

                const filtered = allProducts.filter(item => {
                    if (item.slug === comic.slug) return false;

                    const hasCommonCategory = item.categories?.some(cat => 
                        currentCategoriesSlugs.includes(cat.slug)
                    );
                    return hasCommonCategory;
                });

                setRelated(filtered.slice(0, 4));
                setLoading(false);
            })
            .catch(err => {
                console.error("Errore nel recupero dei correlati:", err);
                setLoading(false);
            });
    }, [comic]);

    if (loading) return <p className="container py-5">Caricamento...</p>;
    if (error) return <p className="container py-5 text-danger">Errore: {error}</p>;

    return (
        <>
            <div className='container py-4'>
                <ProductMainCard comic={comic} addToCart={addToCart} />
                <ProductDescriptionCard comic={comic} />
                <RelatedProducts products={related} addToCart={addToCart} />
            </div>
        </>
    );
}
