import React from 'react';
import PropTypes from 'prop-types';
import ImageListItem from './ImageListItem';
const ImageList = props => {
    return (
        <div className="featuresList">
            {/* <h3 id="imageListHeader">Sip Away</h3> */}
            <ul id="imageList">
                {props.list.map((item, index) => (
                    <ImageListItem key={index} title={item.title} img={item.img} text={item.text} />
                ))}
            </ul>
        </div>
    );
};

ImageList.propTypes = {
    list: PropTypes.array
    
};

export default ImageList;