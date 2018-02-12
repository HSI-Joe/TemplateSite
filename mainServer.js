// Set up =================================================
var express = require('express');               // create web app
var app = express();                            // creat web app
var fs = require('fs');                         // access files
var db = require('./DBLoader');                 // load database
var path = __dirname + "/Public/";
var bodyParser = require('body-parser');        // for html forms


//Config =======================================================================
app.use(express.static(__dirname + '/Public/'));
app.use(bodyParser.json({ type: '*' }));
app.use(bodyParser.urlencoded({extended: false}));

// Server api ==================================================================
/*  api/parts:  Returns a JSON array of the parts for the given manufacturer
                Requres a part_man variable in the query */
app.get('/api/parts', function(req, res) {
  var manufacturer = req.query.part_man
  db.getDatabaseParts(manufacturer, function(err, result) {
    if (err) {
      console.error("Error getting parts in api...");
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

// api/manufacturers: returns a JSON array of the manufacturers
app.get('/api/manufacturers', function(req, res) {
  db.getManufacturers(function(err, result) {
    if (err) {
      console.error("Error finding mans");
    } else {
      res.send(result)
    }
  })
});

// General Site ================================================================
app.get('/', function (req, res) {
  res.sendFile('Public/index.html', {root: __dirname })
});

app.get('*', function (req, res) {
  res.sendFile('Public/404.html', {root: __dirname })
});

// Launch server
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port);
});
