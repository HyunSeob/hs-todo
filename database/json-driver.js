'use strict';

// Node.js native modules.
const fs = require('fs');

class JsonDriver {
  constructor(filepath) {
    this.filepath = filepath;
  }

  read() {
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

  write(data) {
    return new Promise((resolve, reject) => {
      const json = JSON.stringify(data);
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

module.exports = exports = JsonDriver;
