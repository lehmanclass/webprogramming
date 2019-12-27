const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const List = require('../models/List');
const {
  JWTSECRET
} = require('../helpers');

// Creates todo list
router.post('/', (req, res) => {
  const { name, sectionId } = req.body;
  const authorization = req.headers.authorization;

  if (!authorization) return res.status(401).json({msg: 'Authorization denied'});

  const token = authorization.replace('JWT ', '');

  try {
    const id = jwt.verify(token, JWTSECRET).id;

    List.create({
      name,
      userId: id,
      sectionId
    })
      .then(list => res.json({list}))
      .catch(() => res.status(500).json({msg: 'Failed to create list'}));
  } catch (e) {
    res.status(401).json({msg: 'Authorization denied'});
  }
});

// Gets todo lists
router.get('/section/:sectionId', (req, res) => {
  const authorization = req.headers.authorization;
  
  if (!authorization) return res.status(401).json({msg: 'Authorization denied'})

  const sectionId = req.params.sectionId;
  const token = authorization.replace('JWT ', '');

  try {
    const userId = jwt.verify(token, JWTSECRET).id;

    List.findAll({
      where: {userId, sectionId},
      attributes: ['id', 'name'],
      order: [['createdAt', 'DESC']]
    })
      .then(lists => res.json({lists}))
      .catch(() => res.status(404).json({msg: 'User does not exist'}));
  } catch (e) {
    res.status(401).json({msg: 'Authorization denied'});
  }
});

// Updates a list's name
router.put('/', (req, res) => {
  const {name, listId} = req.body;
  const authorization = req.headers.authorization;
  
  if (!authorization) return res.status(401).json({msg: 'Authorization denied'});

  const token = authorization.replace('JWT ', '');

  try {
    const userId = jwt.verify(token, JWTSECRET).id;

    List.update({name}, {
      where: {userId, id: listId}
    })
      .then(([updated]) => {
        if (!updated) return res.status(404).json({msg: 'List does not exist'})

        res.json({updated});
      })
      .catch(() => res.status(500).json({msg: 'Failed to update list name'}));
  } catch (e) {
    res.status(401).json({msg: 'Authorization denied'});
  }
});

// Deletes a list
router.delete('/', (req, res) => {
  const listId = req.body.listId;
  const authorization = req.headers.authorization;
  
  if (!authorization) return res.status(401).json({msg: 'Authorization denied'});

  const token = authorization.replace('JWT ', '');

  try {
    const userId = jwt.verify(token, JWTSECRET).id;

    List.destroy({
      where: {userId, id: listId}
    })
      .then((deleted) => {
        if (!deleted) return res.status(404).json({msg: 'List does not exist'})

        res.json({deleted});
      })
      .catch((err) => {console.log(err);res.status(500).json({msg: 'Failed to delete list'})});
  } catch (e) {
    res.status(401).json({msg: 'Authorization denied'});
  }
});

module.exports = router;