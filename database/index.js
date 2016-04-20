var fs      = require('fs');
var _       = require('lodash');
var Promise = require('bluebird');
var path    = require('path');

var Todo     = require('./todo');
var Category = require('./category');

var FILE_PATH = path.resolve(__dirname, 'db.json');

var db = {
  Todo: {},
  load: function() {
    var that = this;
    return new Promise(function(resolve, reject) {
      fs.readFile(FILE_PATH, 'utf-8', function(err, data) {
        if (data) data = JSON.parse(data);
        data = data || {};
        that.Todo = new Todo(data.Todo);
        resolve(that);
      });
    });
  },
  save: function() {
    var that = this;
    var json = JSON.stringify(this);
    return new Promise(function(resolve, reject) {
      fs.writeFile(FILE_PATH, json, function(err, res) {
        if (err) throw err;
        resolve(that);
      });
    });
  }
};

exports = module.exports = db;
