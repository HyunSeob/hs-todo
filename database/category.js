var _ = require('lodash');

function Category(id, name) {
  if (id === null || id === undefined) throw new Error('Id is not defined.');
  if (!name) throw new Error('Name is not defined.');

  this.id = id;
  this.name = name;
}

Category.prototype.update = function(category) {
  this.name = category.name;
  return this;
}

function CategoryList() {
  this.list = [];
}

CategoryList.prototype.create = function(name) {
  var category = new Category(this.list.length + 1, name);
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
  if (!old) throw new Error('Instance don\'t exist.');
  return old.update(newCategory);
};

CategoryList.prototype.delete = function(id) {
  var index = _.findIndex(this.list, function(category) {
    return category.id === id;
  });

  if (index === -1) throw new Error('Instance don\'t exist.');
  this.list.splice(index, 1);
}

module.exports = CategoryList;
