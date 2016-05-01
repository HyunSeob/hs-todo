'use strict';

// External dependencies.
const
  rightpad = require('rightpad'),
  chalk    = require('chalk'),
  moment   = require('moment');

module.exports = exports;

exports.formatTodo = (todo) => {
  let info = [];

  info.push(todo.isComplete ? chalk.green('\u221A') : chalk.gray('\u2610'));
  info.push(chalk.gray(todo.id));
  info.push(chalk.gray(moment(todo.createdAt).format('YYYY-MM-DD hh:mm')));
  info.push(chalk.cyan(rightpad(todo.category, 13)));
  info.push(chalk.white(todo.description));

  return info.join(' | ');
};
