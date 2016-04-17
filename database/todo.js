var moment = require('moment');

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
};

function TodoList() {
  this.list = [];
}

TodoList.prototype.create = function(description) {
  var todo = new Todo(this.list.length, description);
  this.list.push(todo);
  return todo;
};

TodoList.prototype.find = function(id) {
  this.list.forEach(function(todo) {
    if (todo.id === id) return todo;
  });
};

TodoList.prototype.update = function(id, newTodo) {
  this.list.forEach(function(todo) {
    if (todo.id === id) {
      todo.update(newTodo);
      return todo;
    }
  });
};

TodoList.prototype.delete = function(id) {
  this.list.forEach(function(todo, idx) {
    if (todo.id === id) {
      this.list.splice(idx, 1);
      return;
    }
  });
};

module.exports = TodoList;
