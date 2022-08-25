import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventsHeader from './EventsHeader';
import Navigation from '../Navigation';
import SideMenu from '../SideMenu';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
const Events = () => {
    // test with zipCode -> cleanUrls with urls array -> promise array with promises containing clean urls
    // || JSON.parse(window.localStorage.getItem('bars')) !== cleanUrls)
    const [zipCode, setZipCode] = useState("24060")
    const [urlData, setUrlData] = useState([]);
    const [cleanUrls, setCleanUrls] = useState([]);
    const [zipCodeSave, setZipCodeSave] = useState(false);
    const [errors, setErrors] = useState({zipcode: ""});
    const classes = useStyles();
// get urls
    useEffect(() => {
        console.log("getting url data...", zipCode)
        axios.get("/.netlify/functions/api/test", {params: { zipCode: zipCode} })
        .then((response) => {
            console.log(response.data)
            setUrlData(response.data)
        })
        .catch((error) => {
            console.log(error);
        })


    }, [zipCode])
    // clean them 
    const cleanUrl = async (url) => {
        const response = await  axios.get("/cleanUrl", {params: { url: url } });
        const data = await response.data;
        return data;

    }
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
    // store all clean urls using cleanUrl
    useEffect(() => {
        let urls = []
        console.log("cleaning urls");
        for(const url of urlData){
            let data = cleanUrl(url);
            if(data != null){
                urls.push(data);
            }
        }
        Promise.all(urls).then((response) => {
            setCleanUrls(response);
            console.log(response, cleanUrls);
            let bars = JSON.parse(window.localStorage.getItem('bars'));
            //console.log(JSON.parse(window.localStorage.getItem('bars')), response);
            // if( bars === null || bars === undefined || bars.length == 0) {
            //    // console.log(response);
            //     window.localStorage.setItem('bars', JSON.stringify(response));
            //     //console.log(window.localStorage.getItem('bars') );
            // }
            // if(response.length > 0 && response !== bars) {
            //     console.log(response);
            //     window.localStorage.removeItem('bars');
            //     window.localStorage.setItem('bars', JSON.stringify(response));
            // }
            

        }).catch(err => {
            console.log(err);
        })


    }, [urlData])


    return (
        <div>
            <Navigation />
            <EventsHeader />
            <SideMenu />
            <div className="wineBarsContainer">
                        <br />
                        <form className={classes.root} noValidate autoComplete="off" id="zipCodeForm" onSubmit={e => {e.preventDefault();}}>
                            <label htmlFor="zipcode">Zipcode</label>
                                <TextField id="outlined-basic" label={zipCode} variant="outlined" name="zipcode" id="zipcode" placeholder={zipCode}  inputProps={{ maxLength:5 }} onChange={onChange}  />
                                {(errors.zipcode.length > 0) &&
                                <p className="error">{errors.zipCode}</p>
                                }
                                {/* <div className="buttons">
                                    <button className="button is-info is-light is-medium is-fullwidth" onClick={updateZipcode}>Update</button>
                                </div> */}
                                {zipCodeSave &&
                                    <span style={{color: "green"}}>Zip Code successfully saved.</span>
                                }
            
                        </form>         
                    </div>
            <div>
                { 
   
                cleanUrls.length === 0 ? 
                <p>Loading...</p> :
                
                cleanUrls.map((url, i) => {
                    return (
                        <p key={i}>{url}</p>
                    )
                }) 

                }
            </div>
        </div>
    );
};

export default Events;