const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Section = require('../models/Section');
const {
  JWTSECRET
} = require('../helpers');

// Gets sections
router.get('/', (req, res) => {
  const authorization = req.headers.authorization;
  
  if (!authorization) return res.status(401).json({msg: 'Authorization denied'});

  const token = authorization.replace('JWT ', '');

  try {
    const userId = jwt.verify(token, JWTSECRET).id;

    Section.findAll({
      where: {userId},
      attributes: ['id', 'name'],
      order: [['createdAt', 'ASC']]
    })
      .then(sections => res.json({sections}))
      .catch(() => res.status(404).json({msg: 'User does not exist'}));
  } catch (e) {
    res.status(401).json({msg: 'Authorization denied'});
  }
});

module.exports = router;