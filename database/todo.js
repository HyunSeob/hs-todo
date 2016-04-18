var moment = require('moment');
var _      = require('lodash');

function Todo(id, description) {
  if (id === null || id === undefined) throw new Error('Id is not defined.');
  if (!description) throw new Error('Description is not defined.');

  this.id = id;
  this.description = description;
  this.createdAt = moment();
}

Todo.prototype.update = function(todo) {
  this.description = todo.description;
  this.category = todo.category;
  return this;
};

function TodoList() {
  this.list = [];
}

TodoList.prototype.create = function(description) {
  var todo = new Todo(this.list.length + 1, description);
  this.list.push(todo);
  return todo;
};

TodoList.prototype.find = function(id) {
  return _.find(this.list, function(todo) {
    return todo.id === id;
  });
};

TodoList.prototype.update = function(id, newTodo) {
  var old = this.find(id);
  if (!old) throw new Error('Instance don\'t exist.');
  return old.update(newTodo);
};

TodoList.prototype.delete = function(id) {
  var index = _.findIndex(this.list, function(todo) {
    return todo.id === id;
  });

  if (index === -1) throw new Error('Instance don\'t exist.');
  this.list.splice(index, 1);
};

module.exports = TodoList;
