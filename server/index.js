var express = require('express');
var parser = require('body-parser');
var jade = require('jade');
var markdown = require('node-markdown').Markdown;
var config = require('../src/js/app/config');
var pkg = require('../package');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var routes = require('./routes');

var cacheBust = '?v=' + pkg.version;

var app = express();

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.set('views', './src/templates/');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/prototype'));

app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

//app.get('/', routes.index);
app.use('/', express.static('prototype'));

app.listen(config.development.port, function () {
  console.log('listening at http://localhost:%s', config.development.port);
});
