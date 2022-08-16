import React, { useState, useContext } from 'react';
import '../styles/Account.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Navigation from './Navigation';
import SideMenu from './SideMenu';
import { useHistory } from "react-router-dom";

import gql from 'graphql-tag';
import { useMutation } from "@apollo/client";
import { useForm } from '../util/hooks'
import { AuthContext } from '../context/auth';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
const Account = () => {
    const { user } = useContext(AuthContext);
    const classes = useStyles();
    const email = user.email;
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const context = useContext(AuthContext);
    const joinDate = new Date(user.createdAt).toDateString();

    const {onChange, onSubmit, values } = useForm(updateZip, {
        email: email,
        zipCode:''
    })

    const [changeZipCode, { loading }] = useMutation(UPDATE_ZIPCODE, {
        update(_, { data: { updateZipcode: userData } }){
            context.login(userData);
        }, 
        onError({ graphQLErrors }){
            if(graphQLErrors){
                setErrors(graphQLErrors[0].extensions.errors);
            }
        },
        variables: values
    });

    function updateZip(){
        changeZipCode();
    }


    return (
        <div>
             <div className="accountContainer">
             <Navigation />
                    <SideMenu />
                 <h3 className="header">Account Information</h3>
                 <p>Email: {email}</p>
                 <p>Member since: {joinDate}</p>
                 <form className={classes.root} onSubmit={onSubmit} noValidate autoComplete="off" id="loginForm">
                 <label htmlFor="zipcode">Zipcode</label>
                    <TextField id="outlined-basic" label={user.zipCode} variant="outlined" name="zipCode" id="zipCode" placeholder={user.zipCode}  inputProps={{ maxLength:5 }} onChange={onChange} />
                    {(errors.hasOwnProperty("zipCode")) &&
                       <p className="error">{errors.zipCode}</p>
                    }
                    <div className="buttons">
                        <button className="button is-info is-light is-medium is-fullwidth" type="submit">Update</button>
                    </div>
            
                </form>
               
             </div>
        </div>
    );
};

const UPDATE_ZIPCODE = gql`

mutation updateZipcode(
 $email: String!
 $zipCode: String!
) {
    updateZipcode(
            zipCodeInput: {
                email: $email,
                zipCode: $zipCode
            }
        ){
            id email token firstName lastName zipCode createdAt
        }
}
`;

export default Account;