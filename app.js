'use strict';

var express = require('express');

var server = express();
server.use(function(req, res, next) {
  console.log(req.url);
  next();
});

var port = 8080;
server.listen(port, function() {
  console.log('server listening on port ' + port);
});