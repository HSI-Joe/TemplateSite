// set up =================================================
var express = require('express');               // create web app
var app = express();                            // creat web app
var fs = require('fs');                         // access files
var db = require('./DBLoader');                 // load database
var path = __dirname + "/Public/";
var bodyParser = require('body-parser');        // for html forms
var url = "mongodb://localhost:27017/";         // Database url

//Config ==================================================

app.use(express.static(__dirname + '/Public/'));
app.use(bodyParser.json({ type: '*' }));
app.use(bodyParser.urlencoded({extended: false}));

// Server api =============================================

app.get('/api/parts', function(req, res) {
  var manufacturer = req.query.part_man
  db.getDatabaseParts(url, manufacturer, function(err, result) {
    if (err) {
      console.error("Error getting parts in api...");
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

app.get('/api/manufacturers', function(req, res) {
  db.getManufacturers(url, function(err, result) {
    if (err) {
      console.error("Error finding mans");
    } else {
      console.log(result);
      res.send(result)
    }
  })
});

app.post('/api/addpart', function(req, res) {
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
  console.log(req.body.passwd);
  if (req.body.passwd == "nGpnzBFxjNWyADxcZZDs2yRss") {
    db.addPart(url, req.body.type, newPart, function(err, result) {
      if (err) {
        res.send("Error adding part");
      } else {
        res.send("success");
      }
    })
  } else {
    res.send("Wrong password")
  }
});

app.post('/api/removepart/', function(req, res) {
  console.log("Removing part");
  console.log(res.body);
});

app.get('/api/strings', function(req, res) {
  var dict = {
    name: "NSS"
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
