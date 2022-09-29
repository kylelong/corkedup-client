import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import EventsHeader from './EventsHeader';
import '../../styles/WineBars.css';
import Navigation from '../Navigation';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SideMenu from '../SideMenu';
import Loader from '../Loader';
import EventItem from './EventItem';
import '../../styles/Events.css'

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
    const [errors, setErrors] = useState({zipcode: ""});
    const [zipCodeSave, setZipCodeSave] = useState(false);
    const [loading, setLoading] = useState(true);

    const classes = useStyles();

    const getEvents = () => {
        axios.get('/.netlify/functions/api/events', {params: { zipCode: zipCode }})
        .then((response) => {
            if(response.data.error){
                setData(response.data);
            } else{
                const frequencies = ["once", "daily", "weekly", "monthly", "quaterly"];
                let content = [];
                for(let freq of frequencies){
                     content.push(response.data.filter(item => item.frequency === freq));
                }
               content = [].concat.apply([], content)
               setData(content);
            }


        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
       setLoading(false);
       getEvents();


    }, [zipCode])
    const onChange = (e) => {
        const { name, value } = e.target;
        setZipCodeSave(false);
        if(name === "zipcode"){
        
            if(value === "" || value.length == 0){
                setZipCode(user.zipCode);
                getEvents();
            }     

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
            
                    <Navigation />
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
                            {data.error ? 
                            <div className='notSupportedContainer'>
                                <p id="notSupported">Zipcode <span className='zipCodeText'>{zipCode}</span> is in a city that is not supported</p>
                                <p>Corked Up cities:</p>
                                {
                                    data.cities.map((item, index) => {
                                        return (
                                            <p className="supportedCities" key={index}>{item}</p>
                                        )
                                    })
                                }
                            </div>
                            
                            : (

                                data.map((item, index) => {
                                    return (
                                    <EventItem {...item} key={index} />
                                    );
                                })
                            )

                            }
                       
                        </div>
                            )
                    }
          

     
            </div>
        
           
        );
    
}

export default WineBars;