import React, { useState } from 'react';
import Logo from './Logo';
import '../styles/Navigation.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { useContext } from 'react';
const Navigation = (props) => {
    const { user, logout } = useContext(AuthContext);
    //onclick menu shows
    /*
    Events
    Savings
    Recipes

    --------
    Profile
    Logout
     */
    const [buttonText, setButtonText] = useState("Menu");
    const clickedButton = () => {
        buttonText === "Menu" ? setButtonText("X Menu") : setButtonText("Menu");
    }
    const navigationMenu = user ? (
        <div className="navContainer">

        <Logo />
        <ul className="navbarMenu">
            <Link to="/account">
            <li>
               Account
            </li>
            </Link>
            <Link to="/">
            <li onClick={logout}>
                Logout
            </li>
            </Link>
        </ul>
        
    </div>
    ) : (
        <div className="navContainer">

        <Logo />
        <ul className="navbarMenu">
            <Link to="/account">
            <li>
               Account
            </li>
            </Link>
            <Link to="/">
            <li>
                Login
            </li>
            </Link>
        </ul>
        
    </div>
    )

   return navigationMenu;
};

export default Navigation;