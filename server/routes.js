var config = require('../src/js/app/config');
var express = require('express');

module.exports = {
  index:  function(req, res){
    res.render('index', {
      project: config.project
    });
  },
  js: express.static('prototype/js')
};
