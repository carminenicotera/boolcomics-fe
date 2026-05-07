export default function Homepage(){
    return(
        <>
        <h1 className="text-center">BENVENUTI</h1>
         <div className='container'>
    <div className='row'>
      <div className='col'>
        <div class="card text-bg-dark">
         <img src="https://placehold.co/600x400" class="card-img" alt="..."/>
  <div class="card-img-overlay">
    <h5 class="card-title">Nome fumetto</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <h2 class="card-text"><small>COMPRA AD UN PREZZO STRACCIATO</small></h2>
  </div>
</div>
      </div>
    </div>
   </div>

   <div className='container'>
    <div className='row'>
      <h2>ARTICOLI PIU' VENDUTI!</h2>
      <div className="col-3">
        <p>futuro ordinamento dei comics per quantità venduta</p>
      </div>
    </div>
   </div>

   <div className="container">
    <div className="row">
        <h2>NUOVI ARTICOLI!</h2>
     <div className="col-3">
        <p>futuro ordinamento dei comics per data di uscita</p>
     </div>
    </div>
   </div>

        
        </>
    )
}