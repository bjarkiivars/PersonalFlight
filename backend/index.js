const express = require("express");
const cors = require("cors");
const axios = require('axios');

const path = require('path');

const app = express();
const apiPath = "/api/";
const version = "v1";
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: 'https://fi-fids.herokuapp.com'
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

// Test data
let arrivals = [
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

// Test data
let departures = [
    {
        "Id":1143880,
        "No":"FI562",
        "Departure":true,
        "InAir":true,
        "AirlineIATA":"FI",
        "Airline":"Icelandair",
        "HomeAirportIATA":"KEF",
        "HomeAirport":"KeflavikAirport",
        "OriginDestIATA":"FCO",
        "OriginDest":"Rome",
        "DisplayName":"Rome",
        "Gate":"A15",
        "BaggageClaim":"",
        "Scheduled":"2023-04-04T08:30:00+00:00",
        "Estimated":"2023-04-04T10:30:00+00:00",
        "NextInformation":null,
        "Actual":"2023-04-04T11:15:00+00:00",
        "AOBT":"2023-04-04T11:08:00+00:00",
        "AIBT":null,
        "Status":"Departed",
        "Additional":null,
        "Codeshare":"",
        "Aircraft":"TFFIV",
        "AircraftType":"75W",
        "ServiceType":"J",
        "Stand":"5",
        "Logo":"/media/1/tailfi2.png",
        "AltDisplayName":null
    },
    {
        "Id":1143889,
        "No":"SK596",
        "Departure":true,
        "InAir":true,
        "AirlineIATA":"SK",
        "Airline":"SAS",
        "HomeAirportIATA":"KEF",
        "HomeAirport":"KeflavikAirport",
        "OriginDestIATA":"CPH",
        "OriginDest":"Copenhagen",
        "DisplayName":"Copenhagen",
        "Gate":"C23",
        "BaggageClaim":"",
        "Scheduled":"2023-04-04T10:30:00+00:00",
        "Estimated":"2023-04-04T11:20:00+00:00",
        "NextInformation":null,
        "Actual":"2023-04-04T11:49:00+00:00",
        "AOBT":"2023-04-04T11:34:22+00:00",
        "AIBT":null,
        "Status":"Departed",
        "Additional":null,
        "Codeshare":"",
        "Aircraft":"OYJYA",
        "AircraftType":"73H",
        "ServiceType":"J",
        "Stand":"9",
        "Logo":"/media/1/tailsk.png",
        "AltDisplayName":"Kaupmannahöfn"
    },
    {
        "Id":1143890,
        "No":"SK4788",
        "Departure":true,
        "InAir":true,
        "AirlineIATA":"SK",
        "Airline":"SAS",
        "HomeAirportIATA":"KEF",
        "HomeAirport":"KeflavikAirport",
        "OriginDestIATA":"OSL",
        "OriginDest":"Oslo",
        "DisplayName":"Oslo",
        "Gate":"A11",
        "BaggageClaim":"",
        "Scheduled":"2023-04-04T11:05:00+00:00",
        "Estimated":null,
        "NextInformation":null,
        "Actual":"2023-04-04T11:21:00+00:00",
        "AOBT":"2023-04-04T11:12:26+00:00",
        "AIBT":null,
        "Status":"Departed",
        "Additional":null,
        "Codeshare":"",
        "Aircraft":"SERUD",
        "AircraftType":"32N",
        "ServiceType":"J",
        "Stand":"1",
        "Logo":"/media/1/tailsk.png",
        "AltDisplayName":"Osló"
    }
];

// Test data
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
    },
    {
        "Id":1143880,
        "No":"FI562",
        "Departure":true,
        "InAir":true,
        "AirlineIATA":"FI",
        "Airline":"Icelandair",
        "HomeAirportIATA":"KEF",
        "HomeAirport":"KeflavikAirport",
        "OriginDestIATA":"FCO",
        "OriginDest":"Rome",
        "DisplayName":"Rome",
        "Gate":"A15",
        "BaggageClaim":"",
        "Scheduled":"2023-04-04T08:30:00+00:00",
        "Estimated":"2023-04-04T10:30:00+00:00",
        "NextInformation":null,
        "Actual":"2023-04-04T11:15:00+00:00",
        "AOBT":"2023-04-04T11:08:00+00:00",
        "AIBT":null,
        "Status":"Departed",
        "Additional":null,
        "Codeshare":"",
        "Aircraft":"TFFIV",
        "AircraftType":"75W",
        "ServiceType":"J",
        "Stand":"5",
        "Logo":"/media/1/tailfi2.png",
        "AltDisplayName":null
    },
    {
        "Id":1143889,
        "No":"SK596",
        "Departure":true,
        "InAir":true,
        "AirlineIATA":"SK",
        "Airline":"SAS",
        "HomeAirportIATA":"KEF",
        "HomeAirport":"KeflavikAirport",
        "OriginDestIATA":"CPH",
        "OriginDest":"Copenhagen",
        "DisplayName":"Copenhagen",
        "Gate":"C23",
        "BaggageClaim":"",
        "Scheduled":"2023-04-04T10:30:00+00:00",
        "Estimated":"2023-04-04T11:20:00+00:00",
        "NextInformation":null,
        "Actual":"2023-04-04T11:49:00+00:00",
        "AOBT":"2023-04-04T11:34:22+00:00",
        "AIBT":null,
        "Status":"Departed",
        "Additional":null,
        "Codeshare":"",
        "Aircraft":"OYJYA",
        "AircraftType":"73H",
        "ServiceType":"J",
        "Stand":"9",
        "Logo":"/media/1/tailsk.png",
        "AltDisplayName":"Kaupmannahöfn"
    },
    {
        "Id":1143890,
        "No":"SK4788",
        "Departure":true,
        "InAir":true,
        "AirlineIATA":"SK",
        "Airline":"SAS",
        "HomeAirportIATA":"KEF",
        "HomeAirport":"KeflavikAirport",
        "OriginDestIATA":"OSL",
        "OriginDest":"Oslo",
        "DisplayName":"Oslo",
        "Gate":"A11",
        "BaggageClaim":"",
        "Scheduled":"2023-04-04T11:05:00+00:00",
        "Estimated":null,
        "NextInformation":null,
        "Actual":"2023-04-04T11:21:00+00:00",
        "AOBT":"2023-04-04T11:12:26+00:00",
        "AIBT":null,
        "Status":"Departed",
        "Additional":null,
        "Codeshare":"",
        "Aircraft":"SERUD",
        "AircraftType":"32N",
        "ServiceType":"J",
        "Stand":"1",
        "Logo":"/media/1/tailsk.png",
        "AltDisplayName":"Osló"
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

// filter = {keyProperty: valueProperty}
// filter[No]=FI&filter[Name]=Finland
app.get(apiPath + version + '/arrivals/flights', async (req, res) => {
    try {
        // Call to the Isavia API to get flight information
        const response = await axios.get('https://www.isavia.is/fids/arrivals.aspx');
        
        const data = response.data.Items;
        const filter = req.query.filter;

        if (!filter) {
            return res.status(200).json(data);
        } else {
            const filterArrivals = data.filter(obj => {
                
                return Object.keys(filter).every(key => {
                    if(filter[key].toString().includes('outside')) {
                        return obj.hasOwnProperty('Stand') && parseInt(obj['Stand']) > 14;
                    }
                    return obj.hasOwnProperty(key) && obj[key].toString().includes(filter[key].toString());
                });
            });
            res.status(200).json(filterArrivals);
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send('An error occured when fetching the data.');
    };

});


app.get(apiPath + version + '/departures/flights', async (req, res) => {
    try {
        const response = await axios.get('https://www.isavia.is/fids/departures.aspx');
        
        const data = response.data.Items;
        const filter = req.query.filter;
        
        if (!filter) {
            return res.status(200).json(data);
        } else {
            const filterDepartures = data.filter(obj => {
                return Object.keys(filter).every(key => {
                    if(filter[key].toString().includes('outside')) {
                        return obj.hasOwnProperty('Stand') && parseInt(obj['Stand']) > 14;
                    }
                    return obj.hasOwnProperty(key) && obj[key].toString().includes(filter[key].toString());
                });
            });
            res.status(200).json(filterDepartures);
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send('An error occured when fetching the data.');
    }
    
});


// Serve the frontend as a static file, so we can access all of it's children
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Serve the img folder as a static folder and we can access all of it's children from here.
app.use("/img", express.static(path.join(__dirname, "..", "frontend", "img")));


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
