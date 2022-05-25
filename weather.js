// api key
// 840695df8e39e8e4efc9d8b05a02d0d0
// api get request
// https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=840695df8e39e8e4efc9d8b05a02d0d0


// accessing data
const {Navigator} = require("node-navigator");
const navigator = new Navigator();
const bodyparser = require("body-parser")
const https = require("https");
const express = require("express");
const app = express();

app.set("view engine", "hbs")
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static( __dirname +"/public"));

// set the server
const port = process.env.PORT || 3000 ;
app.listen( port , ()=>{
    console.log(`listening...${port} port`)
})
//home
app.get("/", async(req,res)=>{
    res.render("index");
});
//BY city
app.get("/city", async(req,res)=>{
    getcity =  req.query.cityInput;
        
    let urllink = `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=840695df8e39e8e4efc9d8b05a02d0d0&units=metric&q=${getcity}` ;
    
    https.get( urllink, (response)=>{
        response.on("data",   function(data){
        const weatherdata =  JSON.parse(data);
        let tempmax = Array(10);
        let tempmin =new Array(10);
        let humidity = new Array(10);
        let weathericon = Array(10);
        
        tempmin[0] = weatherdata.list[0].main.temp_min;
        tempmax[0] = weatherdata.list[0].main.temp_max;
        humidity[0] = weatherdata.list[0].main.humidity
        let windspeed = weatherdata.list[0].wind.speed
        weathericon[0] = weatherdata.list[0].weather[0].icon
        let j=0;

        
        for(let i =1; i<weatherdata.cnt; i++){
            if(weatherdata.list[i].dt_txt[11] ==='0' && weatherdata.list[i].dt_txt[12]==='0'){
                tempmin[j] = weatherdata.list[i].main.temp_min;
                tempmax[j] = weatherdata.list[i].main.temp_max;
                humidity[j] = weatherdata.list[i].main.humidity
                weathericon[j] = weatherdata.list[i].weather[0].icon
                j++;
            }
        }
       
        res.render("index", {
                // i am using dublicate data because it's not giving the required data. however, its working will be similar
                day0img: weathericon[0],
                day1img: weathericon[1],
                day2img: weathericon[2],
                day3img: weathericon[3],
                day4img: weathericon[4],
                day5img: weathericon[4],
                day6img: weathericon[4],

                day0windspeed : windspeed+" Kmph",
                day0night : tempmin[0],
                day1night : tempmin[1],
                day2night : tempmin[2],
                day3night : tempmin[3],
                day4night : tempmin[4],
                day5night : tempmin[4],
                day6night : tempmin[4],

                day0day : tempmax[0],
                day1day : tempmax[1],
                day2day : tempmax[2],
                day3day : tempmax[3],
                day4day : tempmax[4],
                day5day : tempmax[4],
                day6day : tempmax[4],

                
                day0humidity : humidity[0],
                day1humidity : humidity[1],
                day2humidity : humidity[2],
                day3humidity : humidity[3],
                day4humidity : humidity[4],
                day5humidity : humidity[4],
                day6humidity : humidity[4] 
            });
        });
        
        response.on("end", function(err){
            if(err){
                console.log('error...');
            }
            else{
                console.log("end");
            }
        })
        
    });
})
//BY Location
app.get("/location", (req,res)=>{

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((success, error)=>{
            if(error)console.log(error);
            else locdata(success.latitude, success.longitude);
        });
     } else {
       alert(" browser does not support the navigator function, please switch to another browser. thankyou!");
     } 
    
function locdata(lat , long){
    // console.log(long,lat);
    let urllink;
    
    urllink = `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=840695df8e39e8e4efc9d8b05a02d0d0&units=metric&lat=${lat}&lon=${long}` ;    
    
    
    https.get( urllink, (response)=>{
        response.on("data",   function(data){
        const weatherdata =  JSON.parse(data);
        let tempmax = Array(10);
        let tempmin =new Array(10);
        let humidity = new Array(10);
        let weathericon = Array(10);
        
        tempmin[0] = weatherdata.list[0].main.temp_min;
        tempmax[0] = weatherdata.list[0].main.temp_max;
        humidity[0] = weatherdata.list[0].main.humidity
        let windspeed = weatherdata.list[0].wind.speed
        weathericon[0] = weatherdata.list[0].weather[0].icon
        let j=0;

        
        for(let i =1; i<weatherdata.cnt; i++){
            if(weatherdata.list[i].dt_txt[11] ==='0' && weatherdata.list[i].dt_txt[12]==='0'){
                tempmin[j] = weatherdata.list[i].main.temp_min;
                tempmax[j] = weatherdata.list[i].main.temp_max;
                humidity[j] = weatherdata.list[i].main.humidity
                weathericon[j] = weatherdata.list[i].weather[0].icon
                j++;

            }
        }
       
        res.render("index", {
                // i am using dublicate data because it's not giving the required data. however, its working will be similar
                day0img: weathericon[0],
                day1img: weathericon[1],
                day2img: weathericon[2],
                day3img: weathericon[3],
                day4img: weathericon[4],
                day5img: weathericon[4],
                day6img: weathericon[4],

                day0windspeed : windspeed+" Kmph",
                day0night : tempmin[0],
                day1night : tempmin[1],
                day2night : tempmin[2],
                day3night : tempmin[3],
                day4night : tempmin[4],
                day5night : tempmin[4],
                day6night : tempmin[4],

                day0day : tempmax[0],
                day1day : tempmax[1],
                day2day : tempmax[2],
                day3day : tempmax[3],
                day4day : tempmax[4],
                day5day : tempmax[4],
                day6day : tempmax[4],

                
                day0humidity : humidity[0],
                day1humidity : humidity[1],
                day2humidity : humidity[2],
                day3humidity : humidity[3],
                day4humidity : humidity[4],
                day5humidity : humidity[4],
                day6humidity : humidity[4] 
            });
        });
        
        response.on("end", function(err){
            if(err){
                console.log('error...');
            }
            else{
                console.log("end");
            }
        })
        
    });
}
})
