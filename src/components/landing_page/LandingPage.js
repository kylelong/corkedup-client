import wineParty from '../../assets/wine_date.svg';
import LargeLogo from '../LargeLogo';
import '../../styles/LandingPage.css';

import LoginForm from './LoginForm';

import Features from "./Features";


function LandingPage() {

  return (
    <div className="mainContainer">

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

    </div>
  );
}

export default LandingPage;