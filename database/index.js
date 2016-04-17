var fs = require('fs');

var Todo = require('./todo');
var Category = require('./category');

// console.log(TodoList);

var db = {
  Todo: new Todo(),
  Category: new Category(),
  save: function() {
    var json = JSON.stringify(this);
    fs.writeFile('db.json', json, function() {
      console.log('saved');
    });
  }
};

db.Todo.create('This is first todo.');
db.Todo.create('This is second todo.');
db.Category.create('This is first category.');
var todo = db.Todo.find(1);
todo.description = 'This is fake todo.';
db.Todo.update(2, todo);
db.Category.delete(1);
db.Category.create('This is real first category.');

db.save();
