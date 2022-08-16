import wineParty from '../../assets/wine_date.svg';
import LargeLogo from '../LargeLogo';
import { HashLink as Link } from 'react-router-hash-link';
import '../../styles/LandingPage.css';

import LoginForm from './LoginForm';

import Features from "./Features";
import Pricing from "./Pricing";
import Questions from "./Questions";

function LandingPage() {

  return (
    <div className="mainContainer">
          <ul className="homeNavbarMenu">
            <Link to="#features">
              <li>
                  Features
              </li>
            </Link>
            <Link to="#pricing">
              <li>
                  Pricing
              </li>
            </Link>
            <Link to="#faq">
              <li>
                  FAQ
              </li>
            </Link>
          </ul>

      <div className="row1">
        <div className="loginContainer">
              <LargeLogo />
              <p id="slogan">The best wine experience wherever you are.</p>
              <LoginForm />
        </div>
        <div className="photoContainer">
          <img id="wineParty" src={wineParty}/>
        </div>

        </div>

      
        <Features />

        <Pricing />

        <Questions /> 

      

    </div>
  );
}

export default LandingPage;