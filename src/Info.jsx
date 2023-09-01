import { useState, useEffect } from 'react'
import Review from './Review'

export default function Info() {
    const [location, setLocation] = useState(null)
    const [photo, setPhoto] = useState()

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const place = queryParameters.get("place")
        const storage = localStorage.getItem(place)

        if(storage){
            setLocation(JSON.parse(storage))
            setPhoto(localStorage.getItem(place+'image'))
        } else {
        function callback(att, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                if(att != ''){
                    localStorage.setItem(place, JSON.stringify(att))
                    if(att.photos){
                        localStorage.setItem(place + 'image', att.photos[0].getUrl())
                    }
                }
                setLocation(att)
                if(att.photos){
                    setPhoto(att.photos[0].getUrl())
                }
            }
        }

        let map = new google.maps.Map(document.getElementById('map'), {});

        var service = new google.maps.places.PlacesService(map);
        service.getDetails({placeId: place},callback);

        }
    }, []);


    return(
        <>
        {location != null && <> <div className='justify-content-center text-center'>
                <h1 className='text-light'>{location.name}</h1>
                <h5 className='text-light'>Rating: {location.rating}</h5>
                <h6 className='text-light'>Price Level: {location.price_level}</h6>
                {photo && <img width={location.photos[0].width * (700/location.photos[0].height)} height='700' src={photo} alt="Something Went Wrong Loading The Image"/>}
                {!photo && <img height='700' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNWu7DL326sgUUD-qVgITM79_8o7GwByp_I8QYJ7u0bA&s" alt="Something Went Wrong Loading The Image"/>}
                <p className='text-light mb-5'>{location.formatted_address}</p>
            </div>
            {location.reviews.map(result => {
                return <Review key={result.time} review = {result}/>
            })}
            </> }
            
        </>
    )
}