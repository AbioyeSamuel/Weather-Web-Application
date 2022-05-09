const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
  const city = req.body.cityName;
  const apiKey = "cb26a8c914cdfd283c3572131689842b";
  const units = "metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units="+ units;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The temperature in " + city + " is " + temp + " degress celcius.</h1>");
      res.write("<p>The weather description is " + desc + "</p>");
      res.write("<img src =" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function(){
  console.log("server is running on port 3000");
});
