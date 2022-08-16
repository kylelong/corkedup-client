import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

//user is logged out -> go to landing page
function AuthRouteLoggedOut({ component: Component, ...rest }){
    const { user } = useContext(AuthContext);

    return (
        <Route 
            {...rest}
            render={props =>
                user ? <Component {...props}/> : <Redirect to="/"/>
            }
        />
    )
}

export default AuthRouteLoggedOut;