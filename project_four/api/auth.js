const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  JWTSECRET,
  genToken
} = require('../helpers');

// Signs in user
router.post('/', (req, res) => {
  if (!req.body) return res.status(409).json({msg: 'No data provided'});

  const {
    email,
    password
  } = req.body;

  if (!email || !password) return res.status(409).json({msg: 'Fill in all fields'});

  User.findOne({
    where: {email},
    attributes: ['id', 'name', 'email', 'password']
  })
    .then(data => {
      const user = data.dataValues;
      
      if (password !== user.password)
        return res.status(403).json({msg: 'Invalid credentials'});

      genToken({id: user.id})
        .then((token) => {
          const {
            password,
            ...rest
          } = user;
          
          res.json({
            token,
            user: rest
          });
        })
        .catch(() => res.status(500).json({msg: 'Error occured'}));
    })
    .catch(() => res.status(401).json({msg: 'User does not exist'}));
});

// Creates a new user and  authenticates them
router.post('/register', (req, res) => {
  if (!req.body) return res.status(400).json({msg: 'No data provided'});

  const {
    name,
    email,
    password,
    confPass
  } = req.body;

  if (!name || !email || !password || !confPass)
    return res.status(409).json({msg: 'Fill in all fields'});

  if (confPass !== password) res.status(403).json({msg: 'Passwords don\'t match'});

  User.findOrCreate({
    where: {email},
    defaults: {name, email, password}
  })
    .then(([data, created]) => {
      const user = data.dataValues;
      if (!created) return res.status(409).json({msg: 'User already exists with that email'});
      
      genToken({id: user.id})
        .then((token) => {
          res.json({
            token,
            user: {
              id: user.id,
              name,
              email
            }
          });
        })
        .catch(() => res.status(500).json({msg: 'Error occured authenticating user'}));
    })
    .catch(() => res.status(500).json({msg: 'Error occured registering user'}));
});

// Gets User info, possible bug
router.get('/load', (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({msg: 'Authorization denied'});

  const token = authorization.replace('JWT ', '');

  try {
    const {id} = jwt.verify(token, JWTSECRET);

    User.findOne({
      where: {id},
      attributes: ['id', 'name', 'email']
    })
      .then(data => {
        const user = data.dataValues;

        res.json({user});
      })
      .catch(() => res.status(404).json({msg: 'User does not exist'}));
  } catch (e) {
    res.status(409).json({msg: 'Failed to verify token'});
  }
});

module.exports = router;