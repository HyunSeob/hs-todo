'use strict';

// Node.js native modules.
const path = require('path');

// External dependencies.
const _ = require('lodash');

// Custom modules.
const JsonDriver = require('./json-driver');
const Todo       = require('./todo');

// Constants.
const DEFAULT_PATH = path.resolve(__dirname, 'db.json');

class TodoDriver {
  constructor(filepath) {
    filepath = filepath || DEFAULT_PATH;
    this.json = new JsonDriver(filepath);
  }

  read() {
    return new Promise((resolve, reject) => {
      this.json.read().then((data) => {
        let payload = {
          lastId: data.lastId || 0,
          list: []
        };
        _.forEach(data.list, (todo) => {
          payload.list.push(new Todo(todo));
        });
        resolve(payload);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  write(data) {
    return this.json.write(data);
  }
};

exports = module.exports = TodoDriver;
