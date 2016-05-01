#!/usr/bin/env node --harmony

// External dependencies.
const
  program  = require('commander'),
  co       = require('co'),
  prompt   = require('co-prompt');

// Custom modules.
const
  db        = require('./database'),
  formatter = require('./formatter');

program.version('0.0.0');

program.command('list')
.description('print your todo list')
.action(() => {
  db.findAll()
  .then((todos) => {
    console.log('Here is your todo list.');
    console.log('-----------------------');
    todos.forEach((todo) => {
      console.log(formatter.formatTodo(todo));
    });
  })
  .catch((err) => {
    console.log(err);
  });
});

program.command('new')
.description('add a new todo')
.action(() => {
  co(function* () {
    const description = yield prompt('description: ');
    const category = yield prompt('category: (uncategorized) ');
    return db.create({
      description: description,
      category: category
    });
  })
  .then(() => {
    console.log('New todo saved.');
    process.exit(1);
  })
  .catch((err) => {
    console.log(err);
  });
});

program.command('mark [ID]')
.description('if your to do job is done')
.action((id) => {
  if (!id) {
    console.log('Please type the ID.');
    process.exit(1);
  }

  db.findById(id)
  .then((todo) => {
    if (!todo) {
      console.log('Todo is not found.');
      process.exit(1);
    }

    todo.isComplete = true;
    return db.update(todo);
  })
  .then(() => {
    console.log('OK. the job is marked.');
  })
  .catch((err) => {
    console.log(err);
  });
});

program.parse(process.argv);
