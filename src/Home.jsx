import { useState } from 'react'
import Attraction from './Attraction.jsx'


export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  function handleSubmit(e){
    e.preventDefault();
    //console.log(JSON.parse(localStorage.getItem(search)))
    if(localStorage.getItem(search)){
      setResults(JSON.parse(localStorage.getItem(search)))
    } else{
      let map = new google.maps.Map(document.getElementById('map'), {});

      var service = new google.maps.places.PlacesService(map);
      service.textSearch({'query': search}, callback);
    }
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      localStorage.setItem(search, JSON.stringify(results))
      results.map(result => {
        if(result.photos){
          localStorage.setItem(result.place_id + 'image', result.photos[0].getUrl())
        }
      })
      setResults(results)
    }
  }

  return(
    <>
    <div className='jumbotron bg-secondary col-md-12 justify-content-center text-center'>
      <form onSubmit={handleSubmit}>
        <h1 className='display-1 text-light' >Attractions</h1>
        <h6>Search for Attractions.</h6>
        <input value={search} onChange={e=>{setSearch(e.target.value)}}type="text" className='form-control'/>
        <button className='btn btn-primary form-control mt-2 mb-4 border-2 border-dark'>Search</button>
      </form>
    </div>

    <div className="row justify-content-center text-center align-items-center">
      {results.map(result => {
        return <Attraction key={result.place_id} attraction = {result}/>
      })}
    </div>
    </>
  )
}
