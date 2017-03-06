#!/usr/bin/env node

var express = require("express"),
  app = express(),
  bodyParser = require('body-parser'),
  errorHandler = require('errorhandler'),
  methodOverride = require('method-override'),
  hostname = '10.144.203.115',
  port = parseInt(process.env.PORT, 10) || 80,
  publicDir = process.argv[2] || __dirname + '/public',
  path = require('path');

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var options = {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['htm', 'html'],
  index: 'index.html',
  lastModified: true,
  maxAge: '1d',
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
    res.header('Cache-Control', 'public, max-age=1d');
  }
};

app.use(express.static(publicDir, options));

var router = express.Router();

router.get("/", function (req, res) {
  res.sendFile(path.join(publicDir, "/index.html"));
});

router.get("/checkout", function (req, res) {
  res.sendFile(path.join(publicDir, "/checkout.html"));
});

router.post("/checkout", function (req, res) {
  res.sendFile(path.join(publicDir, "/checkout.html"));
});

console.log("Simple static server showing %s listening at http://%s:%s", publicDir, hostname, port);
app.listen(port, hostname);
