var _ = require('lodash');

function Category(obj) {
  if (obj.id === null || obj.id === undefined) throw new Error('Id is not defined.');
  if (!obj.name) throw new Error('Name is not defined.');

  this.id = obj.id;
  this.name = obj.name;
}

Category.prototype.update = function(category) {
  this.name = category.name;
  return this;
}

function CategoryList(instance) {
  instance = instance || {};
  this.lastId = instance.lastId || 1;
  this.list = [];
  _.forEach(instance.list, function(category) {
    this.list.push(new Category(category));
  }.bind(this));
}

CategoryList.prototype.create = function(name) {
  var category = new Category({
    id: this.lastId++,
    name: name
  });
  this.list.push(category);
  return category;
};

CategoryList.prototype.find = function(id) {
  return _.find(this.list, function(category) {
    return category.id === id;
  });
};

CategoryList.prototype.update = function(id, newCategory) {
  var old = this.find(id);
  if (!old) throw new Error('Instance doesn\'t exist.');
  return old.update(newCategory);
};

CategoryList.prototype.delete = function(id) {
  var index = _.findIndex(this.list, function(category) {
    return category.id === id;
  });

  if (index === -1) throw new Error('Instance doesn\'t exist.');
  this.list.splice(index, 1);
}

module.exports = CategoryList;
