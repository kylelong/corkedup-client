import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import Restaurant from './Restaurant';
import EventsHeader from './EventsHeader';
import Navigation from '../Navigation';
import '../../styles/WineBars.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SideMenu from '../SideMenu';

import { AuthContext } from '../../context/auth';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
const Restaurants = () =>  {

    const { user } = useContext(AuthContext);

    const [zipCode, setZipCode] = useState(user.zipCode);
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({zipcode: ""});
    const [zipCodeSave, setZipCodeSave] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        axios.get("/restaurants", {params: { zipCode: zipCode} })
        .then((response) => {
            setData(response.data)
        })
        .catch((error) => {
            console.log(error);
        })

    }, [zipCode])
    const onChange = (e) => {
        const { name, value } = e.target;
        setZipCodeSave(false);
        if(name === "zipcode"){
            if(value.length  === 5){
                const regEx = /^[0-9]{5}$/;
                if(value.match(regEx)){
                    console.log(value);
                    setZipCode(value);
                    setErrors(prevErrors => ({ ...prevErrors, zipCode: "" }));
                }
                else{
                    setErrors(prevErrors => ({ ...prevErrors, zipCode: "Zipcode must be 5 digits" }));
                }
            }
        }
    }
    
        return (
                <div className="parent">
                    <Navigation />
                    <SideMenu />
                     <EventsHeader headline={"Restaurants where you can enjoy a glass with a nice meal"} />
                    <div className="wineBarsContainer">
                        <br />
                        <form className={classes.root} noValidate autoComplete="off" id="zipCodeForm" onSubmit={e => {e.preventDefault();}}>
                            <label htmlFor="zipcode">Zipcode</label>
                                <TextField id="outlined-basic" label={zipCode} variant="outlined" name="zipcode" id="zipcode" placeholder={zipCode}  inputProps={{ maxLength:5 }} onChange={onChange}  />
                                {(errors.zipcode.length > 0) &&
                                <p className="error">{errors.zipCode}</p>
                                }
                            
                                {zipCodeSave &&
                                    <span style={{color: "green"}}>Zip Code successfully saved.</span>
                                }
            
                        </form>
                        {data.hasOwnProperty("businesses") &&
                        
                        Object.entries(data.businesses).map(([key, value], i) => {
                            return (
                                <Restaurant
                                    key={value.id}
                                    name={value.name} 
                                    display_name={value.display_phone}
                                    display_address={value.location.display_address.join("\n")}
                                    price={value.price}
                                    url={value.url}
                                />
                            )
                        })

                        }
                        
                    
                    </div>
            </div>
           
        );
    
}

export default Restaurants;