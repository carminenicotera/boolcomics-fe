import { useEffect, useState } from "react"

export default function CatalogPage() {

  const [comics, setComics] = useState([])

  useEffect(() => {
    const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000"
    fetch(`${api_url}/products`)
      .then(res => res.json())
      .then(data => setComics(data))
      .catch(err => console.error("Errore nel recupero dei prodotti:", err))
  }, [])

  return (
    <>
      <div className="container">
        <h1 className="my-5">Catalogo dei Fumetti</h1>
        <p>Qui potrai esplorare il nostro vasto catalogo di fumetti e manga. Scopri le ultime uscite e i classici intramontabili!</p>
      </div>

      <div className="container py-5">

        <h1 className="mb-4">
          Catalogo
        </h1>

        <div className="row g-4">

          { comics.map(comic => (

            <div key={ comic.id } className="col-12 col-sm-6 col-lg-3">

              <div className="card h-100">

                <img src={ comic.image_url } className="card-img-top" alt={ comic.name } />

                <div className="card-body">

                  <h5>
                    { comic.name }
                  </h5>

                  <p>
                    € { comic.price }
                  </p>

                </div>

              </div>

            </div>

          )) }

        </div>

      </div>
    </>
  )
}