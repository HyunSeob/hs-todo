#!/usr/bin/env node --harmony

var program = require('commander');
var co      = require('co');
var prompt  = require('co-prompt');
var db      = require('./database');

program.version('0.0.0');

program.command('list')
.description('print your todo list')
.action(function() {
  db.load()
  .then(function() {
    console.log(db.Todo);
    db.save();
  });
});

program.command('new')
.description('add a new todo')
.action(function() {
  db.load()
  .then(function() {
    return co(function* (){
      var description = yield prompt('description: ');
      var category = yield prompt('category: (uncategorized) ');
      db.Todo.create(description, category);
      return db.save();
    });
  })
  .then(function() {
    console.log('New todo saved.');
    process.exit(1);
  });
});

program.parse(process.argv);
