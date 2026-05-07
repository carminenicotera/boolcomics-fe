import ProductMainCard from '../components/ProductMainCard';
import ProductDescriptionCard from '../components/ProductDescriptionCard';


const comicData = {
    id: 1,
    name: "Naruto Vol. 1",
    description: "L'inizio del cammino di Naruto Uzumaki per diventare Hokage.",
    genre: "Manga",
    author: "Masashi Kishimoto",
    release_date: "1999-09-21",
    publisher: "Planet Manga",
    binding: "Brossurato",
    ean: "9788863041934",
    price: 5.20,
    original_price: 5.20,
    stock_quantity: 150,
    image_url: "https://picsum.photos/400/600"
};


export default function ComicPage() {




    return (

        <>

            <div >
                <nav>Da sotituire dopo con il componente NavBar</nav>
            </div>


            <div className='container'>

                {/* card dettails  */}
                <ProductMainCard comic={comicData} />

                {/* card description */}
                <ProductDescriptionCard comic={comicData} />

            </div>


            <div >
                <footer>Da sotituire dopo con il componente Footer</footer>
            </div>

        </>

    )

}