import { useState } from "react";
import { useEffect } from "react";
import { data } from "react-router-dom";
export default function Homepage(){

  const API_URL = import.meta.env.VITE_API_URL;

  const [lastestProducts,setLatestProducts] = useState([])
  const [carosell,setCarosell] = useState([])



useEffect(() => {
    fetch(`${API_URL}/products/`)
        .then(res => res.json())
        .then(data => {
            const sorted = data.sort((a, b) => b.release_date.localeCompare(a.release_date));
            
            setLatestProducts(sorted.slice(0, 4));
        })
        .catch(err => console.error(err));
}, []);

useEffect(() => {
   fetch(`${API_URL}/products/`)
        .then(res => res.json())
        .then(data => setCarosell(data.slice(0, 3))
      ).catch(err => console.error(err));
}, [])


   


   const carouselImgStyle = {
    height: '300px',
    objectFit: 'cover',
    filter: 'brightness(0.6)' 
  };


    return(
        <>
       <div className="container mb-5 mt-5">
  <div id="carouselExampleCaptions" className="carousel slide shadow" data-bs-ride="carousel">
    
   
    <div className="carousel-indicators">
      {carosell.map((_, index) => (
        <button
          key={index}
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to={index}
          className={index === 0 ? "active" : ""}
          aria-label={`Slide ${index + 1}`}
        ></button>
      ))}
    </div>

  
    <div className="carousel-inner rounded">
      {carosell.map((comic, index) => (
        <div key={comic.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
          <img 
            src="https://placehold.co/600x400"
            className="d-block w-100" 
            alt={comic.name} 
            style={{ height: '400px', objectFit: 'cover', filter: 'brightness(0.6)' }} 
          />
          <div className="carousel-caption d-none d-md-block">
            <h2 className="fw-bold">{comic.name}</h2>
            <p className="mb-2"><strong>Genere:</strong> {comic.genre} | <strong>Autore:</strong> {comic.author}</p>
            <h4 className="text-danger fw-bold">€{comic.price}</h4>
          </div>
        </div>
      ))}
    </div>

    
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Precedente</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Successivo</span>
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