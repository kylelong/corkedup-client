import React from 'react';
import '../../styles/EventItem.css';
const EventItem = ({name, url, event, type, days, date, frequency, cost, details, phone, address}) => {
return (
         <div className="eventItemContainer">
        <div className='rowOne'>
            <p id="venue">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
            <p id="type">{type}</p>
            <p id="frequency">{frequency}</p>
        </div>

        <div className="details">
       {event !== type ? <p className='event'>{event}</p> : ""}
         { details.length > 0 &&
             details.map((item, index) => {
                return (
                    <p key={index}>{item}</p>
                )
             })
         }
        </div>

        <div className="eventDays">
         { days.length > 0 &&
             days.map((item, index) => {
                return (
                    <p key={index}>{item}</p>
                )
             })
         }
         {
             date.length > 0 && <p>{date}</p>
         }
        </div>


        <div className='detailsContainer'>
            {address && <a href={`https://maps.google.com/?q=${address}`} target="_blank">{address}</a>}
            <br />
            {phone && <a href={`tel:${phone}`}>{phone}</a>}
            <br />
            <a href={url} target="_blank">more details</a>
        </div>

        


    </div>

   
);

}
export default EventItem;