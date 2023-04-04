const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const path = require('path');

const apiPath = "/api/";
const version = "v1";

const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let flights = [
    {
        "Id": 1143537, 
        "No":"FI207",
        "Departure":false,
        "InAir":false,
        "AirlineIATA":"FI",
        "Airline":"Icelandair",
        "HomeAirportIATA":"KEF",
        "HomeAirport":"KeflavikAirport",
        "OriginDestIATA":"CPH",
        "OriginDest":"Copenhagen",
        "DisplayName":"Copenhagen",
        "Gate":"C",
        "BaggageClaim":"3",
        "Scheduled":"2023-04-03T15:30:00+00:00",
        "Estimated":"2023-04-03T17:19:00+00:00",
        "NextInformation":null,
        "Actual":"2023-04-03T17:19:00+00:00",
        "AOBT":null,
        "AIBT":"2023-04-03T17:23:00+00:00",
        "Status":"Landed",
        "Additional":"AllBags onBelt",
        "Codeshare":"B65603",
        "Aircraft":"TFFIN",
        "AircraftType":"75W",
        "ServiceType":"J",
        "Stand":"78",
        "Logo":"/media/1/tailfi2.png",
        "AltDisplayName":"Kaupmannahöfn"
    },
    {
        "Id":1143546,
        "No":"W65565",
        "Departure":false,
        "InAir":false,
        "AirlineIATA":"W6",
        "Airline":"WizzAir",
        "HomeAirportIATA":"KEF",
        "HomeAirport":"KeflavikAirport",
        "OriginDestIATA":"MXP",
        "OriginDest":"Milan",
        "DisplayName":"Milan",
        "Gate":"C23",
        "BaggageClaim":"2",
        "Scheduled":"2023-04-03T17:10:00+00:00",
        "Estimated":"2023-04-03T18:05:00+00:00",
        "NextInformation":null,
        "Actual":"2023-04-03T18:05:00+00:00",
        "AOBT":null,
        "AIBT":"2023-04-03T18:10:58+00:00",
        "Status":"Landed",
        "Additional":"AllBags onBelt",
        "Codeshare":"",
        "Aircraft":"9HWAI",
        "AircraftType":"32Q",
        "ServiceType":"J",
        "Stand":"9",
        "Logo":"/media/1/tailw6.png",
        "AltDisplayName":"Mílanó"
    }
];
/* 
    ####################
    #    Endpoints     #
    ####################
*/


app.get(apiPath + version + '/flights', (req, res) => {
    // Use the map function to return specific data..
    let returnData = [];
    flights.forEach(object => {
        let newObj = {
            "No" : object.No,
            "AircraftType" : object.AircraftType,
            "Aircraft" : object.Aircraft,
            "OriginDest" : object.OriginDest,
            "Scheduled" : object.Scheduled,
            "Estimated" : object.Estimated,
            "Status" : object.Status,
            "Stand" : object.Stand,
            "BaggageClaim" : object.BaggageClaim,
            "Gate" : object.Gate
        };
        returnData.push(newObj);
    });
    return res.status(200).json(returnData);
});


app.get(apiPath + version + '/arrivals/flights', (req, res) => {
    let returnArrivalData = [];
    let arrivals = flights.filter(obj => obj.Departure === false);
    return res.status(200).json(arrivals);
});

// Get the frontpage from index.html
app.get("/", (req, res) => {
    const filePath = path.join(__dirname, '..', 'frontend', 'index.html');
    res.sendFile(filePath);
});

// Enable access to the css
app.get("/style.css", (req, res) => {
    const filePath = path.join(__dirname, '..', 'frontend', 'style.css');
    res.sendFile(filePath);
});

// Enable access to the frontend js
app.get("/index.js", (req, res) => {
    const filePath = path.join(__dirname, '..', 'frontend', 'index.js');
    res.sendFile(filePath);
});


//Default: Not supported
//Blocking all endpoints that are not defined
app.all('*', (req, res) => {
    res.status(404).json({
      error: 'This resource is not found'
    });
});


app.listen(port, () => {
  console.log("Tunes app listening on Port " + port);
});
