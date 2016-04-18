var fs      = require('fs');
var _       = require('lodash');
var Promise = require('bluebird');

var Todo     = require('./todo');
var Category = require('./category');

var db = {
  Todo: new Todo(),
  Category: new Category(),
  load: function() {
    var that = this;
    return new Promise(function(resolve, reject) {
      fs.readFile('db.json', function(err, data) {
        if (data) data = JSON.parse(data);
        data = data || {};
        that.Todo = new Todo(data.Todo);
        that.Category = new Category(data.Category);
        resolve(that);
      });
    });
  },
  save: function() {
    var that = this;
    var json = JSON.stringify(this);
    return new Promise(function(resolve, reject) {
      fs.writeFile('db.json', json, function() {
        resolve(that);
      });
    });
  }
};

db.load()
.then(function() {
  db.Todo.create('This is first todo.');
  db.Todo.create('This is second todo.');
  db.Category.create('This is first category.');
  var todo = db.Todo.find(1);
  todo.description = 'This is fake todo.';
  db.Todo.update(1, todo);
  db.Category.create('This is real first category.');
  return db.save();
})
.then(function() {
  console.log('done');
});
