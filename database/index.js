'use strict';

// Node.js native modules.
const path    = require('path');

// Custom modules.
const Todo       = require('./todo');
const TodoDriver = require('./todo-driver');

// Constants.
const FILE_PATH = path.resolve(__dirname, 'db.json');

const driver = new TodoDriver(FILE_PATH);

exports = module.exports;

exports.create = (obj) => {
  return new Promise((resolve, reject) => {
    let result = null;
    driver.read()
    .then((data) => {
      obj.id = ++data.lastId;
      result = new Todo(obj);
      data.list.push(result);
      return driver.write(data);
    })
    .then(() => {
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

exports.findAll = (obj) => {
  return new Promise((resolve, reject) => {
    driver.read()
    .then((data) => {
      const filtered = data.list.filter((todo) => {
        let key, result = true;
        for (key in obj) {
          if (todo.hasOwnProperty(key) && obj[key] !== todo[key]) {
            result = false;
          }
        }
        return result;
      });
      resolve(filtered);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

exports.findOne = (obj) => {
  return new Promise((resolve, reject) => {
    driver.read()
    .then((data) => {
      const found = data.list.find((todo) => {
        let key, result = true;
        for (key in obj) {
          if (todo.hasOwnProperty(key) && obj[key] !== todo[key]) {
            result = false;
          }
        }
        return result;
      });
      resolve(found);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    driver.read()
    .then((data) => {
      const found = data.list.find((todo) => todo.id === id);
      resolve(found);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

exports.update = (obj) => {
  if (!obj.id) throw new Error('\'update\' requires id.');

  return new Promise((resolve, reject) => {
    let found;
    driver.read()
    .then((data) => {
      found = data.list.find((todo) => todo.id === obj.id);
      if (!found) {
        throw new Error('Object does not exist.');
      }
      found.update(obj);
      return driver.write(data);
    })
    .then(() => {
      resolve(found);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

exports.destroy = (id) => {
  if (!id) throw new Error('\'destory\' requires id.');

  return new Promise((resolve, reject) => {
    driver.read()
    .then((data) => {
      const index = data.list.findIndex((todo) => todo.id === id);
      if (index === -1) {
        throw new Error('Object does not exist.');
      }
      data.list.splice(index, 1);
      return driver.write(data);
    })
    .then(() => {
      resolve(true);
    })
    .catch((err) => {
      reject(err);
    });
  });
};
