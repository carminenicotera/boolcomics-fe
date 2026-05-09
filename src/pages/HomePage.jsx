import { useState } from "react";
import { useEffect } from "react";
import { data } from "react-router-dom";
export default function Homepage(){

  const API_URL = import.meta.env.VITE_API_URL;

  const [lastestProducts,setLatestProducts] = useState([])



useEffect(() => {
    fetch(`${API_URL}/products/`)
        .then(res => res.json())
        .then(data => {
            const sorted = data.sort((a, b) => b.release_date.localeCompare(a.release_date));
            
            setLatestProducts(sorted.slice(0, 4));
        })
        .catch(err => console.error(err));
}, []);
   


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


  

   <div className="container">
    <h2 className="text-center">ULTIME USCITE</h2>
  <div className="row">
    {lastestProducts.map(comic => (
      <div className="col-md-3 mb-4" key={comic.id}>
        <div className="card h-100 shadow-sm">
          
          <img 
            src={comic.image_url} 
            className="card-img-top" 
            alt={comic.name} 
            style={{ objectFit: 'cover', height: '300px'}} />
          <div className="card-body text-center">
            <h5 className="fw-bold">{comic.name}</h5>
            <strong>Uscita:</strong> {comic.release_date.split('T')[0]}
            <p className="fw-bold">€{comic.price}</p>
            <span className="btn fw-bold" style={{background: '#E63946', color:'white'}}>ACQUISTA</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

<div className="container">
  <h1 className="text-center">i più venduti</h1>
  <div className="row">
    

  </div>
</div>

        
        </>
    )
}