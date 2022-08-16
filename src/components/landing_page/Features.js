import React from 'react';
import dollar from '../../assets/dollar.png';
import meal from '../../assets/diet.png';
import calendar from '../../assets/calendar.png';
import ImageList from './ImageList';
const Features = () => {

    let list = [
        {
          title: "Events",
          img: calendar,
          text:"Local and virtual events happening around the world so you are always in the loop."
        },
        {
          title: "Savings",
          img: dollar,
          text:"Flash wine sales and giveaways that save you money."
        },
        {
          title: "Recipes",
          img: meal,
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