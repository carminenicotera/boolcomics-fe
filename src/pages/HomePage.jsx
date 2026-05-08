import { useState } from "react";

export default function Homepage(){

  const [comics] = useState([
    { id: 1, titolo: "Spider-Man", vendite: 500, dataUscita: "2023-10-01", img: "https://placehold.co/200x300" },
    { id: 2, titolo: "Batman", vendite: 850, dataUscita: "2024-01-15", img: "https://placehold.co/200x300" },
    { id: 3, titolo: "X-Men", vendite: 300, dataUscita: "2024-02-10", img: "https://placehold.co/200x300" },
    { id: 4, titolo: "Watchmen", vendite: 1200, dataUscita: "2023-05-20", img: "https://placehold.co/200x300" },
  ]);

  const piuVenduti = [...comics].sort((a, b) => b.vendite - a.vendite);
  const nuoviArrivi = [...comics].sort((a, b) => new Date(b.dataUscita) - new Date(a.dataUscita));

   const carouselImgStyle = {
    height: '300px',
    objectFit: 'cover',
    filter: 'brightness(0.6)' 
  };


    return(
        <>
         <div className="container mb-5">
        <div id="carouselExampleCaptions" className="carousel slide shadow" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner rounded">
            <div className="carousel-item active">
              <img src="https://placehold.co/1200x400/000/fff?text=Promo+Spider-man" className="d-block w-100" alt="..." style={carouselImgStyle} />
              <div className="carousel-caption d-none d-md-block">
                <h5>Spider-Man: Across the Universe</h5>
                <p>Scopri l'ultima avventura del tessiragnatele.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://placehold.co/1200x400/222/fff?text=Nuovi+Arrivi+Batman" className="d-block w-100" alt="..." style={carouselImgStyle} />
              <div className="carousel-caption d-none d-md-block">
                <h5>Il Cavaliere Oscuro</h5>
                <p>Le nuove uscite DC Comics sono arrivate.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://placehold.co/1200x400/444/fff?text=Sconti+Marvel" className="d-block w-100" alt="..." style={carouselImgStyle} />
              <div className="carousel-caption d-none d-md-block">
                <h5>Sconti Stracciati</h5>
                <p>Tutto il mondo Marvel scontato del 30%.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>


   <div className='container'>
    <div className='row'>
      <h2>ARTICOLI PIU' VENDUTI!</h2>
        {piuVenduti.map(comic => (
            <div className="col-md-3 mb-4" key={comic.id}>
              <div className="card h-100 shadow-sm">
                <img src={comic.img} className="card-img-top" alt={comic.titolo} />
                <div className="card-body text-center">
                  <h6 className="fw-bold">{comic.titolo}</h6>
                  <p className="badge bg-danger mb-0">{comic.vendite} vendite</p>
                </div>
              </div>
            </div>
          ))}
    </div>
   </div>

   <div className="container">
    <div className="row">
        <h2>NUOVI ARTICOLI!</h2>
       {nuoviArrivi.map(comic => (
            <div className="col-md-3 mb-4" key={comic.id}>
              <div className="card h-100 shadow-sm">
                <img src={comic.img} className="card-img-top" alt={comic.titolo} />
                <div className="card-body text-center">
                  <h6 className="fw-bold">{comic.titolo}</h6>
                  <small className="text-muted">Data: {comic.dataUscita}</small>
                </div>
              </div>
            </div>
          ))}
    </div>
   </div>

        
        </>
    )
}