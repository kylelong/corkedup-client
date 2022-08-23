const express = require("express");
const cors = require('cors')
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5001;
let yelpAPI = require('yelp-api');

app.use(cors())

app.get("/wtso", function(req, res) {

    axios
    .get("https://www.wtso.com")
    .then((response) => {
        const $ = cheerio.load(response.data);
        let title = $("title").text();
        let src = $('#current-offer-bottle-image').attr().src;
        let quote = $('#wine-quote').text().trim();
        let price = $("#price").text();
        let hash = {image: src, quote: quote, price: price}; 
        res.send(hash);

    })
    .catch((err) => {
        console.log(err);
    });


});


app.get("/cleanUrl", function(req, res) {
    let { url} = req.query;

    axios
    .get(url)
    .then((response) => {
        const $ = cheerio.load(response.data);
        const links = $('a');

        $(links).each(function(i, link){
            let url_text = $(link).text();
            if(url_text.includes("http://") || url_text.includes("https://")){
               
                let text = $(link).text();
                let slug = $(link).attr('href');
                let www_index = slug.indexOf("www");
                let com_index = slug.indexOf("com");
                let clean_url = slug.substring(www_index, com_index + 3).trim();
     
                if(clean_url.lastIndexOf("F") > 0){
                    let FIndex = clean_url.lastIndexOf("F");
                    clean_url = clean_url.substring(FIndex + 1, clean_url.length);
                }

               res.send(clean_url);
            } 
           
        });

    })
    .catch((err) => {
       console.log(err);
    });

    
 })
app.get("/test", function(req, res) {

    // http://localhost:5000/test?zipCode=94109
    let { zipCode } = req.query;
        // Create a new yelpAPI object with your API key
        let apiKey = '5hObF9L_APDctOtFxXOSGDWt5bfvPdBHWm7JHoI191sQ73RjayKGTtc1lr_uzkzzmeqR8j1I8UIyxTwelsrI8i_meC8u8sbB_4fHBbCs0PPlcFmnwJ2SNuzRnW5cXnYx';
        let yelp = new yelpAPI(apiKey);

        // Set any parameters, if applicable (see API documentation for allowed params)
        let params = [{ term: "wine bars", location: zipCode }];
        let urls = [];
        // Call the endpoint
        yelp.query('businesses/search', params)
        .then(data => {
        // Success
        let result = JSON.parse(data);
        Object.entries(result.businesses).map(([key, value], i) => {
            urls.push(value.url);
        })
        res.send(urls)

        })
        .catch(err => {
        // Failure
            console.log(err);
        });

});

app.get("/lastbottle", function(req, res) {

    axios
    .get("https://www.lastbottlewines.com/")
    .then((response) => {
        const $ = cheerio.load(response.data);
        let name = $(".offer-name").text();
        let image = $("#offer-image").attr('src');
        let price = $(".amount.lb").text();
        let details = $('.details-pane').text().trim();
        details = details.replace(/\t/g, '');
        details.replace("Previous", "");
        details.replace("Next", "");
        details.replace("Technical Details", "");
        let colons = [];
        for(let i = 0; i < details.length && i < details.indexOf("About The Producer"); i++){
           
            if(details.charAt(i) == ":"){
                let end = i;
                let begin = 0;
                for(let j = i - 1; j >= 0; j--){
                    let char = details.charAt(j);
                    
                    if(char === char.toUpperCase()){
                        begin = j;
                        break;
                    }
                }
                let range = [begin, end];
                colons.push(range);
                
            }
        }
      
      let technical_details = [];
        for(let i = 0; i < colons.length - 1; i++){
            technical_details.push(details.substring(colons[i][0], colons[i + 1][0]));
        }

        // technical_details.push(details.substring(colons[colons.length-1][0], colons[colons.length-1][1] + 8));
        // let info = technical_details.join(" ");
        // console.log(info, technical_details);

        let hash = {name: name, image: image, price: price, details: details, technical_details: technical_details};
        // console.log(hash);
        res.send(hash);

    })
    .catch((err) => {
        console.log(err);
    });

});

app.get("/winebars/", function(req, res) {

        let { zipCode } = req.query;
        // Create a new yelpAPI object with your API key
        let apiKey = '5hObF9L_APDctOtFxXOSGDWt5bfvPdBHWm7JHoI191sQ73RjayKGTtc1lr_uzkzzmeqR8j1I8UIyxTwelsrI8i_meC8u8sbB_4fHBbCs0PPlcFmnwJ2SNuzRnW5cXnYx';
        let yelp = new yelpAPI(apiKey);

        // Set any parameters, if applicable (see API documentation for allowed params)
        let params = [{ term: "wine bars", location: zipCode }];

        // Call the endpoint
        yelp.query('businesses/search', params)
        .then(data => {
        // Success
        res.send(data);
        })
        .catch(err => {
        // Failure
        console.log(err);
        });

});
//#endregion

app.get("/restaurants/", function(req, res) {

    let { zipCode } = req.query;
    // Create a new yelpAPI object with your API key
    let apiKey = '5hObF9L_APDctOtFxXOSGDWt5bfvPdBHWm7JHoI191sQ73RjayKGTtc1lr_uzkzzmeqR8j1I8UIyxTwelsrI8i_meC8u8sbB_4fHBbCs0PPlcFmnwJ2SNuzRnW5cXnYx';
    let yelp = new yelpAPI(apiKey);

    // Set any parameters, if applicable (see API documentation for allowed params)
    let params = [{ categories: "restaurants, winetastingroom", location: zipCode }];

    // Call the endpoint
    yelp.query('businesses/search', params)
    .then(data => {
    // Success
    res.send(data);
    })
    .catch(err => {
    // Failure
    console.log(err);
    });

});
app.get("/events/", function(req, res) {

    let { zipCode } = req.query;
    // Create a new yelpAPI object with your API key
    let apiKey = '5hObF9L_APDctOtFxXOSGDWt5bfvPdBHWm7JHoI191sQ73RjayKGTtc1lr_uzkzzmeqR8j1I8UIyxTwelsrI8i_meC8u8sbB_4fHBbCs0PPlcFmnwJ2SNuzRnW5cXnYx';
    let yelp = new yelpAPI(apiKey);

    // Set any parameters, if applicable (see API documentation for allowed params)
    let params = [{ location: zipCode }];

    // Call the endpoint
    yelp.query('events', params)
    .then(data => {
    // Success
    res.send(data);
    })
    .catch(err => {
    // Failure
    console.log(err);
    });

});

 app.listen(port, () => console.log(`CORS-enabled web server listening on port ${port}!`));