function Category(id, name) {
  if (id === null || id === undefined) throw new Error('Id is not defined.');
  if (!name) throw new Error('Name is not defined.');

  this.name = name;
}

Category.prototype.update = function(category) {
  this.name = category.name;
}

function CategoryList() {
  this.list = [];
}

CategoryList.prototype.create = function(name) {
  var category = new Category(this.list.length, name);
  this.list.push(category);
  return category;
};

CategoryList.prototype.find = function(id) {
  this.list.forEach(function(category) {
    if (category.id === id) return category;
  });
};

CategoryList.prototype.update = function(id, newCategory) {
  this.list.forEach(function(category) {
    if (category.id === id) {
      category.update(newCategory);
      return category;
    }
  });
};

CategoryList.prototype.delete = function(id) {
  this.list.forEach(function(category, idx) {
    if (category.id === id) {
      this.list.splice(idx, 1);
      return;
    }
  });
}

module.exports = CategoryList;
