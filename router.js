var fs = require('fs');
var url = require('url');
var fs = require('fs');
var path = __dirname + '/../Site/';

exports.home = function home(req, res) {
  var link = url.parse(req.url, true);
  filename = "/mnt/c/Users/SHIPPING/Desktop/IPC Eagle Edition/Site" + link.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(data);
    return res.end();
  });
}
