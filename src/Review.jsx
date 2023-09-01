export default function Review({review}) {
    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var am = "AM"
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        if(hour > 12){
            hour = hour -12
            am = "PM"
        }
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time =  month + ' ' + date + ' ' + year + ' ' + hour + ':' + min + ' ' + am;
        return time;
    }

    return(
        <div class="card mt-4">
            <div className="text-start card-body px-4 py-5">
                <p>{review.author_name} - {review.rating}/5</p><p>{review.text}</p>
            </div>
            <div className='card-footer'>
                <p>{timeConverter(review.time)}</p>
            </div>
        </div>

    )
}