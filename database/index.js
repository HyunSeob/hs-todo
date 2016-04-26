'use strict';

// Node.js native modules.
const path    = require('path');

// External dependencies.
const _       = require('lodash');
const Promise = require('bluebird');

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
}
