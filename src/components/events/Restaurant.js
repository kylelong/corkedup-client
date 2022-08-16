import React from 'react';
import '../../styles/WineBar.css';
const Restaurant = ({name, display_name, display_address, url, price}) => {
    return (
        <a href={url} target="_blank" className="restaurantLink">
            <div className="wineBarItem">
                <h1>{name} <span className="price">{price}</span></h1>
                <p>{display_name}</p>
                <p>{display_address}</p>
            </div>
        </a>
    );
};

export default Restaurant;