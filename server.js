require('dotenv').config();
const express = require('express');
const parser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');
var cors = require('cors');

// key for APIs
const owm_key = process.env.OWM_KEY

// start express
const app = express();
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// allow cors for development
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// call to openweathermap
app.post('/forecastData', (req, res) => {
    reqData = req.body;
    console.log(req.body);
    let owm_api = "https://api.openweathermap.org/data/2.5/onecall?lat=" + reqData.lat + "&lon=" + reqData.lon + "&units=" + reqData.units + "&appid=" + owm_key;
    fetch(owm_api)
    .then(res => res.json())
    .then((json) => {
        // console.log(json);
        res.json(json);
    });
});

// deliver client build (Heroku)
if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
    app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on ${port}`));
