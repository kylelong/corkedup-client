import React from 'react';
import ImageList from './ImageList';
const Features = () => {

    let list = [
        {
          title: "Events",
          img: "https://s3.amazonaws.com/corkedup.wine/assets/calendar.png",
          text:"Local and virtual events happening around the world so you are always in the loop."
        },
        {
          title: "Savings",
          img: "https://s3.amazonaws.com/corkedup.wine/assets/dollar.png",
          text:"Flash wine sales and giveaways that save you money."
        },
        {
          title: "Recipes",
          img: "https://s3.amazonaws.com/corkedup.wine/assets/diet.png",
          text:"Weekly tailored wine pairings to expand your palette."
        }
      ]

    return (
        <div id="features">
          <p className="sectionHeader">Features</p>
          <ImageList list={list} />
        </div>
    );
};

export default Features;