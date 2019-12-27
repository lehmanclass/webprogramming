const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/postgres');

const JWTSECRET = 'fb-app';

async function genToken(payload, options = {expiresIn: 3600}) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWTSECRET,
      options,
      (err, token) => {
        if (err) reject();

        resolve(token);
      }
    );
  });
}

module.exports = {
  JWTSECRET,
  genToken,
  sequelize
};