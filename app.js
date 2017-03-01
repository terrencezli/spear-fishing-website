#!/usr/bin/env node

var express = require("express"),
  app = express(),
  bodyParser = require('body-parser'),
  errorHandler = require('errorhandler'),
  methodOverride = require('method-override'),
  hostname = process.env.HOSTNAME || 'localhost',
  port = parseInt(process.env.PORT, 10) || 4567,
  publicDir = process.argv[2] || __dirname + '/public',
  path = require('path');

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(publicDir, {
  extensions: ['html']
}));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

var router = express.Router();

router.get("/", function (req, res) {
  res.sendFile(path.join(publicDir, "/index.html"));
});

router.get("/checkout", function (req, res) {
  res.sendFile(path.join(publicDir, "/checkout.html"));
});

app.use('/WWCConnect2017', router);

console.log("Simple static server showing %s listening at http://%s:%s", publicDir, hostname, port);
app.listen(port, hostname);
