import React, { Component, useState } from 'react';
import '../../styles/EventsHeader.css';
import { Link } from 'react-router-dom';
const EventsHeader = ({headline}) => {
    const path = window.location.hash.substr(2)
    
        let header = "EVENTS";
        
        return (
            <div className="eventsHeaderContainer">
                <img id="party" src="https://s3.amazonaws.com/corkedup.wine/assets/birthday.png"  className="pageImg"/>
                <div className="eventContainer">
                    <div className="eventsContainer">
                        <Link to="/bars"><h4 className={path === "bars" ? "eventHeaderSelected": "eventHeader"}>Wine Bars</h4></Link>
                        <Link to="/events"><h4 className={path === "events" ? "eventHeaderSelected": "eventHeader"}>Events</h4></Link>
                        <Link to="/restaurants"><h4 className={path === "restaurants" ? "eventHeaderSelected": "eventHeader"}  style={{marginRight: "30px"}}>Restaurants</h4></Link>
                    </div>
                    <p>{headline}</p>
                </div>
            </div>
        
            
        );
}

export default EventsHeader;