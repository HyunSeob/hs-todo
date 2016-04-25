'use strict';

// Node.js native modules.
const fs     = require('fs');

// External dependencies.
const moment = require('moment');
const _      = require('lodash');

// Custom modules.
const Todo   = require('./todo');

class JsonDriver {
  constructor(filepath) {
    this.filepath = filepath;
  }

  load() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filepath, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        }
        if (data) {
          data = JSON.parse(data);
        }
        resolve(data);
      });
    });
  }

  save() {
    return new Promise((resolve, reject) => {
      const json = JSON.stringify(this);
      fs.writeFile(this.filepath, json, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
};

exports.module = exports = JsonDriver;
