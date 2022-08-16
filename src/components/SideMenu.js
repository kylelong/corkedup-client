import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';
const SideMenu = () => {
    return (
        <div className="sideMenuContainer">
            <ul className="desktopMenu">
                <Link to="/bars">
                    <li> Events</li>
                </Link>
                <Link to="/savings">
                    <li> Savings</li>
                </Link>
                <Link to="/recipes">
                    <li> Recipes</li>
                </Link>
            </ul>
        </div>
    );
};

export default SideMenu;