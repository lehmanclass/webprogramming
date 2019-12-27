const Sequelize = require('sequelize');
const {sequelize} = require('../helpers');
const Model = Sequelize.Model;
const User = require('./User');

class Section extends Model {};

Section.init({
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
}, {sequelize, modelName: 'section'});

module.exports = Section;