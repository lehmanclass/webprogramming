const Sequelize = require('sequelize');
const {sequelize} = require('../helpers');
const Model = Sequelize.Model;
const User = require('./User');

class List extends Model {};

List.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    onDelete: 'cascade',
    references: {
      model: User,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
}, {sequelize, modelName: 'list'});

module.exports = List;