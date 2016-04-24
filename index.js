#!/usr/bin/env node --harmony

const program  = require('commander');
const co       = require('co');
const prompt   = require('co-prompt');
const chalk    = require('chalk');
const moment   = require('moment');
const rightpad = require('rightpad');

const db      = require('./database');

program.version('0.0.0');

program.command('list')
.description('print your todo list')
.action(function() {
  db.load()
  .then(function() {
    const todos = db.Todo.findAll();
    console.log('Here is your todo list.');
    console.log('-----------------------');
    todos.forEach((todo) => {
      todo.checkmark = todo.isComplete ? chalk.blue('\u221A') : chalk.red('\u2610');
      console.log(
        todo.checkmark + ' | ' +
        chalk.gray(todo.id) + ' | ' +
        chalk.gray(moment(todo.createdAt).format('YYYY-MM-DD hh:mm')) + ' | ' +
        chalk.green(rightpad(todo.category, 13)) + ' | ' +
        chalk.white(todo.description)
      );
    });
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
      db.Todo.create({
        description: description,
        category: category
      });
      return db.save();
    });
  })
  .then(function() {
    console.log('New todo saved.');
    process.exit(1);
  });
});

program.command('mark [ID]')
.description('if your to do job is done')
.action((id) => {
  if (!id) {
    console.log('Please type the ID.');
    process.exit(1);
  }
  db.load()
  .then(() => {
    db.Todo.update({
      id: id,
      isComplete: true
    });
    return db.save();
  })
  .then(() => console.log('OK. the job is marked.'));
});

program.parse(process.argv);
