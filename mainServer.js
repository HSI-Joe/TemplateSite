// set up =================================================
var express = require('express');               // create web app
var app = express();                            // creat web app
var fs = require('fs');                         // access files
var db = require('./DBLoader');                 // load database
var path = __dirname + "/Public/";
var bodyParser = require('body-parser');        // for html forms
var url = "mongodb://localhost:27017/";         // Database url
var manufacturer = "IPC Eagle"                  // *NAME_REPLACE*

//Config ==================================================

app.use(express.static(__dirname + '/Public/'));
app.use(bodyParser.urlencoded({extended: true}));

// Server api =============================================

app.get('/api/parts', function(req, res) {
  db.getDatabaseParts(url, manufacturer, function(err, result) {
    if (err) {
      console.error("Error getting parts in api...");
    } else {
      console.log("Loading parts from server...");
      res.send(JSON.stringify(result));
    }
  });
});

app.get('/api/manufacturers', function(req, res) {
  db.getManufacturers(url, function(err, result) {
    if (err) {
      console.error("Error finding mans");
    } else {
      console.log("Found manufacuturers");
      res.send(result)
    }
  })
});

app.post('/api/parts', function(req, res) {
  var fav = false
  if (req.body.favorite == "on") {
    fav = true
  }
  var newPart = {
    "name": req.body.name,
    "operationManual": req.body.opm,
    "partManual": req.body.pm,
    "favorite": fav
  }
  db.addPart(url, req.body.type, newPart, function(err, result) {
    if (err) {
      console.error("Error");
    }
  })
});

app.get('/api/strings', function(req, res) {
  var dict = {
    name: manufacturer
  };

  res.send(JSON.stringify(dict));

});

// Site ===================================================

app.get('/', function (req, res) {
  res.sendFile('Public/index.html', {root: __dirname })
});

app.get('*', function (req, res) {
  res.sendFile('Public/404.html', {root: __dirname })
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port);
});
