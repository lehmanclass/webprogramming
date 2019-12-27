const Sequelize = require('sequelize');
const {sequelize} = require('../helpers');
const Model = Sequelize.Model;
const User = require('./User');
const List = require('./List');

class Todo extends Model {};

Todo.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  todo: Sequelize.STRING,
  listId: {
    type: Sequelize.INTEGER,
    onDelete: 'cascade',
    references: {
      model: List,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {sequelize, modelName: 'todo'});

module.exports = Todo;