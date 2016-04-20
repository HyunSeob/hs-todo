var moment = require('moment');
var _      = require('lodash');

function Todo(obj) {
  if (obj.id === null || obj.id === undefined) throw new Error('Id is not defined.');
  if (!obj.description) throw new Error('Description is not defined.');

  this.id = obj.id;
  this.description = obj.description;
  this.category = obj.category;
  this.createdAt = obj.createdAt || moment();
}

Todo.prototype.update = function(todo) {
  this.description = todo.description;
  this.category = todo.category;
  return this;
};

function TodoList(instance) {
  instance = instance || {};
  this.lastId = instance.lastId || 1;
  this.list = [];
  _.forEach(instance.list, function(todo) {
    this.list.push(new Todo(todo));
  }.bind(this));
}

TodoList.prototype.create = function(description, category) {
  var todo = new Todo({
    id: this.lastId++,
    description: description,
    category: category || 'uncategorized'
  });
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
  if (!old) throw new Error('Instance doesn\'t exist.');
  return old.update(newTodo);
};

TodoList.prototype.delete = function(id) {
  var index = _.findIndex(this.list, function(todo) {
    return todo.id === id;
  });

  if (index === -1) throw new Error('Instance doesn\'t exist.');
  this.list.splice(index, 1);
};

module.exports = TodoList;
