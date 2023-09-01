import { useEffect, useState } from "react";
import Attraction from "./Attraction";

export default function Saved() {
    const [saved, setSaved] = useState([])
    const [refresh, setRefresh] = useState(true)

    useEffect(()=>{
        let stored = JSON.parse(localStorage.getItem('saved'))
        
        if(stored){
            setSaved(stored)
        }
    }, [refresh])

    function refreshComp(){
        console.log(refresh)
        setRefresh(!refresh)
    }

    return(
        <>
        <div className="row justify-content-center text-center align-items-center">
        {saved.map(result => {
            return <Attraction key={result.place_id} attraction = {result} refresh={refreshComp}/>
        })}
        </div>
        {saved.length === 0 && <div className="alert alert-danger text-center">No Saved Attractions</div>}
        </>
    )
}