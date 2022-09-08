import axios from 'axios';
import cheerio from  'cheerio';
import React, { useEffect, useState, useContext } from 'react';
import WineBar from './WineBar';
import EventsHeader from './EventsHeader';
import '../../styles/WineBars.css';
import Navigation from '../Navigation';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SideMenu from '../SideMenu';
import Loader from '../Loader';
import { CHARLOTTE }  from '../../cities/zipcodes.js';

import { AuthContext } from '../../context/auth';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
const WineBars = () =>  {

    const { user } = useContext(AuthContext);
    const [zipCode, setZipCode] = useState(user.zipCode);
    const [data, setData] = useState([]);
    const [wineUrl, setWineUrl] = useState("");
    const [errors, setErrors] = useState({zipcode: ""});
    const [zipCodeSave, setZipCodeSave] = useState(false);
    const [loading, setLoading] = useState(true);
    const [storeMap, setStoreMap] = useState(new Map());

    const classes = useStyles();

 

    useEffect(() => {
            axios.get("/.netlify/functions/api/charlotte", {params: { zipCode: zipCode} })
            .then((response) => {
                setData(response.data); //yelp urls
                console.log(response.data[8]);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })

            axios.get("/.netlify/functions/api/wine_url", {params: { url: data[8] } })
            .then((response) => {
  
                setWineUrl(response.data); //yelp urls
            })
            .catch((error) => {
                console.log(error);
            })

            // for(let url of data){
            //     let clean_wine = getUrl(url);
            //     console.log(clean_wine);
            //     setWineUrls(wineUrls => [...wineUrls, clean_wine]);
            // }
        
    
 

    }, [zipCode])
    const onChange = (e) => {
        const { name, value } = e.target;
        setZipCodeSave(false);
        if(name === "zipcode"){
            if(value.length  === 5){
                const regEx = /^[0-9]{5}$/;
                if(value.match(regEx)){
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
                    <a href={wineUrl}>{wineUrl}</a>
                    {/* <Navigation />
                    <SideMenu />
                    <EventsHeader headline={"Fun wine events in your area 🥂"}/>
                    
               {
               loading ? <Loader /> : 
                (
                    <div className="wineBarsContainer">
                    <br />
                    <form className={classes.root} noValidate autoComplete="off" id="zipCodeForm" onSubmit={e => {e.preventDefault();}}>
             <label htmlFor="zipcode">Zipcode</label>
                <TextField id="outlined-basic" label={zipCode} variant="outlined" name="zipcode" id="zipcode" placeholder={zipCode}  inputProps={{ maxLength:5 }} onChange={onChange} />
                {(errors.zipcode.length > 0) &&
                   <p className="error">{errors.zipCode}</p>
                }
      
                {zipCodeSave &&
                    <span style={{color: "green"}}>Zip Code successfully saved.</span>
                }

            </form>
        
                    { data.hasOwnProperty("businesses") &&
                        
                        Object.entries(data.businesses).map(([key, value], i) => {
                            return (
                                <WineBar 
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
                )
               } */}

     
            </div>
        
           
        );
    
}

export default WineBars;