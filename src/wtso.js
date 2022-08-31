var Twit = require('twit')
var fs = require('fs');
const axios = require('axios')
const cheerio = require('cheerio');
const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler')

var T = new Twit({
    consumer_key:         '1LmJOyCH71wBjc5dK8yzCU6sS',
    consumer_secret:      'Iu2UDdhVAOkVNMzRQfT4G9D0bU8SskJm1XteWhl5P8hD5NGqXP',
    access_token:         '723543476-BayWgGbdB94mTOF0qXE4WeOz1HM7XOPDgnXt4nVx',
    access_token_secret:  'qNzU7Z9BPPo5rNe6W3mzvVWrmx1voiPvHeNEKd5hl4H9D'
  })
const scheduler = new ToadScheduler();

const getRating = (text) => {
    let ratingRegex = /\d{2,3} (rating)/;
    let index = 0;
    let rating = "";
    if(ratingRegex.test(text)){
        index = text.search(ratingRegex);
        rating = text.substring(index, index + 2);
    }
    return rating;
}

const getDiscount = (text) => {
    let discountRegex = /\d{2,3}(% off)!/;
    let index = 0;
    let discount = "";
    if(discountRegex.test(text)){
        index = text.search(discountRegex);
        discount = text.substring(index, index + 8);
    }
    return discount;
}

const task = new Task('wtso scraper', () => { 
    var options = { screen_name: 'wtso',
                count: 5 };

    T.get('statuses/user_timeline', options , function(err, data) {
        let posts = [];
        for(let i = 0; i < data.length; i++){
            let post = {
                text: data[i].text, 
                created_at: data[i].created_at,
                rating: '', 
                link: '',
                discount: ''
            };
            if(data[i].text.includes('% off!')){
                posts.push(post);
            }
           
        }
        let wtso = posts.shift();
        let text = wtso.text;
        let length = text.length;
        /*
        Formats 
         White Burgundy Pouilly-Fuissé Domaine Ferraud l'Entreroches  92 rating and 69% off!
        Right now on WTSO: 93 Pt. Chablis Stéphane Brocard Closerie des Alisiers Vieilles   93 rating and 47% off! #wtso  https://t.co/h5rmbphTaZ
        94 rating and 56% off! #wtso  https://t.co/noTQ4FCCKP
        76% off! #wtso  https://t.co/tItDkc8CBu
        Right now on WTSO: Bandol Provence Rosé 2020 Domaine Mas Thérèse  63% off! #wtso  https://t.co/oykYB0ONzU
         */
        //Remove right now from beginning 
        /*
        Right now on WTSO: 93 Pt. Chablis Stéphane Brocard Closerie des Alisiers Vieilles   93 rating and 47% off! #wtso  https://t.co/h5rmbphTaZ
        */
        if(text.includes("Right now on WTSO: ")){
            text = text.replace("Right now on WTSO: ","");
        }
   

         //get link
         if(text.includes("https://t.co")){
            let link = text.substr(text.indexOf("https://t.co"), length);
            wtso.link = link.split(" ")[0];
         }

        //get % off
        wtso.discount = getDiscount(text);
        

        // Rating
        wtso.rating = getRating(text);
        let ratingRegex = /\d{2,3} (rating)/;
        text = text.replace(text.substr(text.search(ratingRegex), text.length), '');
        wtso.text = text.trim();
      
        //get min index of xx rating or xx% off

        fs.writeFile ("./src/wtso.json", JSON.stringify(wtso), function(err) {
            if (err) throw err;
            }
        );
    })
})
let fast = false;
let job = new SimpleIntervalJob({ minutes: 10, }, task)
if(fast){
    job = new SimpleIntervalJob({ seconds: 3, }, task)
} 

scheduler.addSimpleIntervalJob(job)




