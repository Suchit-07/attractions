import { useEffect, useState } from "react";

export default function Attraction({attraction, refresh}) {
    const [saved, setSaved] = useState(false)
    useEffect(()=>{
      let stored = JSON.parse(localStorage.getItem('saved'))
      
      if(stored){
        for(const el in stored) {
          if(stored[el].place_id == attraction.place_id){
            setSaved(true)
            break;
          }
        }
      }
    }, [])

    const attractionStyle = {
        borderRadius: '10px', 
        height:'35rem', 
        width: '18rem',
    };

    const buttonStyle = {
      borderRadius: '10px', 
      width: "100%"
    };

    function saveAttraction(){
      let stored = JSON.parse(localStorage.getItem('saved'))
      console.log(stored)
      if(stored){

        stored = stored.filter(el => {
          return el.place_id !== attraction.place_id;
        });

        stored.push(attraction)
        localStorage.setItem('saved', JSON.stringify(stored))
        setSaved(!saved)
        if (typeof refresh === 'function') {
          refresh();
        }
      } else{
        let attArray = [attraction];
        localStorage.setItem('saved', JSON.stringify(attArray))
        setSaved(!saved)
        if (typeof refresh === 'function') {
          refresh();
        }
      }
    }

    function unsaveAttraction(){
      let stored = JSON.parse(localStorage.getItem('saved'))
      console.log(stored)
      if(stored){
        stored = stored.filter(el => {
          return el.place_id !== attraction.place_id;
        });
        localStorage.setItem('saved', JSON.stringify(stored))
        setSaved(!saved)
        if (typeof refresh === 'function') {
          refresh();
        }
      }
    }

    return(
        <div className="card m-4 text-center bg-light justify-content-center" style={attractionStyle}>
        <a href={'/info?place=' + attraction.place_id} className="h5 card-title">{attraction.name}</a>
        <h6> {attraction.rating}</h6>
        {attraction.photos != undefined && <img height="300px" width="auto" className="card-img-top" src={localStorage.getItem(attraction.place_id+'image')} alt="Something Went Wrong Loading The Image"/>}
        {attraction.photos == undefined && <img height="300px" width="auto" className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNWu7DL326sgUUD-qVgITM79_8o7GwByp_I8QYJ7u0bA&s" alt="Something Went Wrong Loading The Image"/>}
          <div className="card-body">
            <p className="card-text">{attraction.formatted_address}</p>
          </div>
          {!saved && <button style={buttonStyle} className="btn btn-success" onClick={saveAttraction}>+</button>}
        {saved && <button style={buttonStyle} className="btn btn-danger" onClick={unsaveAttraction}>-</button>}

          </div>
    )
}