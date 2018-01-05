var mongo = require('mongodb');
var client = mongo.MongoClient;

exports.getDatabaseParts = function (url, collection, callback) {
  client.connect(url + "HarrisSupply", function(err, db) {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      callback(error);
      return;
    }

    db.collection(collection).find({}).sort( { name : 1 } ).toArray(function(err, result) {
      if (err) {
          console.error('Error connecting to parts directory of database: ' + err.stack);
          callback(err);
          return;
      }
      console.log("Fetching " + result.length + " " + collection + " parts from database...");
      callback(0, result);

      db.close;
    });
  });
}

exports.getManufacturers = function (url, callback) {
  client.connect(url + "HarrisSupply", function(err, db) {
    if (err) {
      console.error('Error connecting to database: ' + error.stack);
      callback(error);
      return;
    }

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

    db.close()
  });
}

exports.addPart = function (url, collection, part, callback) {
  client.connect(url + "HarrisSupply", function(err, db) {
    if (err) {
      console.error('Error connecting to database: ' + error.stack);
      callback(err);
      return;
    }
    db.collection(collection).insertOne(part);
    db.close();
  });
}
