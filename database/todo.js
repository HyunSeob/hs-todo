var moment = require('moment');
var _      = require('lodash');

function Todo(obj) {
  if (obj.id === null || obj.id === undefined) throw new Error('Id is not defined.');
  if (!obj.description) throw new Error('Description is not defined.');

  this.id = obj.id;
  this.description = obj.description;
  this.category = obj.category || 'uncategorized';
  this.createdAt = obj.createdAt || moment();
  this.isComplete = obj.isComplete || false;
}

Todo.prototype.update = function(obj) {
  this.description = obj.description || this.description;
  this.category = obj.category || this.category;
  this.isComplete = obj.isComplete || this.isComplete;
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

TodoList.prototype.create = function(obj) {
  obj.id = this.lastId++;
  var todo = new Todo(obj);
  this.list.push(todo);
  return todo;
};

TodoList.prototype.findAll = function(obj) {
  return _.filter(this.list, function(todo) {
    for (var key in obj) {
      if (todo.hasOwnProperty(key)) {
        if (todo[key] !== obj[key]) return false;
      } else {
        throw new Error('Property is not defined.');
      }
    }
    return true;
  });
};

TodoList.prototype.findOne = function(obj) {
  return _.find(this.list, function(todo) {
    for (var key in obj) {
      if (todo.hasOwnProperty(key)) {
        if (todo[key] !== obj[key]) return false;
      } else {
        throw new Error('Property is not defined.');
      }
    }
    return true;
  });
};

TodoList.prototype.findById = function(id) {
  return _.find(this.list, function(todo) {
    return todo.id == id;
  });
};

TodoList.prototype.update = function(newTodo) {
  var old = this.findById(newTodo.id);
  if (!old) throw new Error('Instance doesn\'t exist.');
  return old.update(newTodo);
};

TodoList.prototype.delete = function(id) {
  var index = _.findIndex(this.list, function(todo) {
    return todo.id == id;
  });

  if (index === -1) throw new Error('Instance doesn\'t exist.');
  this.list.splice(index, 1);
};

module.exports = TodoList;
