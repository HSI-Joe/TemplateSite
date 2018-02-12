// Variables ===================================================================
var mongo = require('mongodb');                 // Require
var client = mongo.MongoClient;                 // Client
var url = "mongodb://localhost:27017/";         // Database url
var db;                                         // database

// Connect to the database
client.connect(url + "HarrisSupply", function (err, datab) {
  if (err) {
    console.error("Error connecting to the database");
  }
  console.log("Connected to database...");
  db = datab;
});


// Functions ===================================================================

// getDatabaseParts: Returns an array of Jsons containing parts for a given collection
exports.getDatabaseParts = function (collection, callback) {
  db.collection(collection).find({}).sort( { name : 1 } ).toArray(function(err, result) {
    if (err) {
        console.error('Error connecting to parts directory of database: ' + err.stack);
        callback(err);
        return;
    }
    console.log("Fetching " + result.length + " " + collection + " parts from database...");
    callback(0, result);
  });
}

// getManufacturers: Returns a json array of all collections (aka manufactureres)
exports.getManufacturers = function (callback) {
  db.listCollections().toArray(function(err, collInfos) {
    if (err) {
      console.error('Error gettings mans');
      callback(err);
    }
    var names = [];
    for (i=0; i < collInfos.length; i++) {
      names.push(collInfos[i].name)
    }
    names.sort();
    callback(0, names)
  });
}

// addPart: Adds a part given in JSON format to a given collection
exports.addPart = function (collection, part, callback) {
  db.collection(collection).insertOne(part);
  db.close();
}
