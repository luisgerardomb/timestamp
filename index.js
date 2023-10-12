// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res) => {
  let jsonData = {}

  let today = new Date();

  jsonData = {unix: today.valueOf(), utc: today.toUTCString()};

  console.log('/api', jsonData);

  res.json(jsonData);
});

app.get("/api/:date", (req, res) => {
  let jsonData = {}

  if(/\d{5,}/.test(req.params.date)) {
    let intDate = parseInt(req.params.date)
    jsonData = {unix: req.params.date, utc: new Date(intDate).toUTCString()};
  } else {
    let date = new Date(req.params.date)

    if(date.toString() === 'Invalid Date') {
      jsonData = {error: date.toString()};
    } else {
      jsonData = {unix: date.valueOf(), utc: date.toUTCString()};
    }
  }

  console.log('/api/' + req.params.date, jsonData);

  res.json(jsonData)
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
