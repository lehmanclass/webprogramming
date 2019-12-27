const Sequelize = require('sequelize');
const {sequelize} = require('../helpers');
const Model = Sequelize.Model;

class User extends Model {};

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {sequelize, modelName: 'user'});

module.exports = User;