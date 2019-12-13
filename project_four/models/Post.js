const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/postgres');
const Model = Sequelize.Model;

class Post extends Model {};

Post.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {sequelize, modelName: 'post'});

module.exports = Post;