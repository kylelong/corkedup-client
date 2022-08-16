import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from "react-router-dom";

import gql from 'graphql-tag';
import { useMutation } from "@apollo/client";
import { AuthContext } from '../../context/auth';
import { useForm } from '../../util/hooks';
/*
TODO: Login for email and password.
 Make sure it matches from db before redirecting to profile
*/
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function LoginForm(props) {
  const context = useContext(AuthContext);
  const classes = useStyles();
  const [errors, setErrors] = useState({})
  const history = useHistory();

  const {onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: ''
})


const [loginUser, { loading }] = useMutation(LOGIN_USER, {
  update(_, 
    { 
      data: {login: userData}}) {

    context.login(userData);
    history.push('/bars');
  },
  onError({ graphQLErrors, networkError }){
    if(graphQLErrors){
      setErrors(graphQLErrors[0].extensions.errors);
    }
    if(networkError){
      console.log(networkError);
    }

  },
  variables: values
});

function loginUserCallback() {
  loginUser();
}

  return (

    <form onSubmit={onSubmit} className={classes.root} noValidate autoComplete="off" id="loginForm">
      <TextField id="outlined-basic" label="Email" variant="outlined" name="email" onChange={onChange} />
      {   errors.hasOwnProperty("email") &&
          <p className="error">{errors.email}</p>
       }
      <TextField id="outlined-basic" label="Password" variant="outlined" type="password" name="password" onChange={onChange} />
      {   errors.hasOwnProperty("password") &&
          <p className="error">{errors.password}</p>
       }

        <div className="buttons">
          <button className="button is-info is-light is-medium is-fullwidth" type="submit">Login</button>
        </div>

        {   errors.hasOwnProperty("general") &&
          <span className="error">{errors.general}</span>
       }

        <Link to="/signup">Don't have an account? Sign up</Link>

    </form>

  );
}

const LOGIN_USER = gql`
  mutation login($email: String!,$password: String!) {
    login (
        email: $email,
        password: $password  
    ){
      id email token firstName lastName zipCode createdAt
    }
  }
`;