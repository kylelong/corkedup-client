import React, { Component } from 'react';

//List item for landing page
const ImageListItem = (props) => {
    return(
        <li className="imageListItem">
            <img className="imageListItemImg" alt="img" src={props.img} height="55" width="55"/>
            <h3 className="imageListItemTitle">{props.title}</h3>
            <p className="imageListItemText">{props.text}</p>
        </li>
    )

}
export default ImageListItem;