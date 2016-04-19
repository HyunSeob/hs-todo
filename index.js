#!/usr/bin/env node
var program = require('commander');
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

program.command('new [description]')
.description('add a new todo')
.action(function(description) {
  // console.log('You enter the new!');
  // console.log(description);
  db.load()
  .then(function() {
    db.Todo.create(description);
    db.save();
  });
});

program.parse(process.argv);
