import './App.css';
import { Route, BrowserRouter as Router, Switch, Link, BrowserRouter } from "react-router-dom";
import LandingPage from './components/landing_page/LandingPage';
import SignUp from './components/SignUp';
import Payment from './components/Payment';
import Savings from './components/Savings';
import Recipes from './components/Recipes';
import Account from './components/Account';
import WineBars from './components/events/WineBars';
import Restaurants from './components/events/Restaurants';
import Events from './components/events/Events';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import AuthRouteLoggedOut from './util/AuthRouteLoggedOut';

function App() {
  
  return (
  <AuthProvider>
        <BrowserRouter>
    <div>
      <Switch>
          <AuthRoute exact path="/" exact component={LandingPage} />
          <AuthRouteLoggedOut exact path="/bars" component={WineBars} />
          <AuthRouteLoggedOut exact path="/restaurants" component={Restaurants} />
          <AuthRoute exact path="/signup" component={SignUp} />
          <AuthRouteLoggedOut exact path="/payment" component={Payment} />
          <AuthRouteLoggedOut exact path="/events" component={Events} />
          <AuthRouteLoggedOut exact path="/savings" component={Savings} />
          <AuthRouteLoggedOut exact path="/recipes" component={Recipes} />
          <AuthRouteLoggedOut exact path="/account" component={Account} />
        </Switch>
    </div>

    </BrowserRouter>
  </AuthProvider>
  );
}

export default App;
