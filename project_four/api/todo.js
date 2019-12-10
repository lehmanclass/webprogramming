const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');
const {
  JWTSECRET
} = require('../helpers');

// Adds todo to a list
router.post('/', (req, res) => {
  const {
    todo,
    listId
  } = req.body;
  const authorization = req.headers.authorization;

  if (!authorization) return res.status(401).json({msg: 'Authorization denied'});

  const token = authorization.replace('JWT ', '');

  try {
    const userId = jwt.verify(token, JWTSECRET).id;

    Todo.create({
      todo,
      listId,
      userId
    })
      .then(todo => res.json({todo}))
      .catch(() => res.status(500).json({msg: 'Failed to create todo'}));
  } catch (e) {
    res.status(401).json({msg: 'Authorization denied'});
  }
});

// Updates a todo's name
router.put('/', (req, res) => {
  const {todo, todoId} = req.body;
  const authorization = req.headers.authorization;
  
  if (!authorization) return res.status(401).json({msg: 'Authorization denied'});

  const token = authorization.replace('JWT ', '');

  try {
    const userId = jwt.verify(token, JWTSECRET).id;

    Todo.update({todo}, {
      where: {userId, id: todoId}
    })
      .then(([updated]) => {
        if (!updated) return res.status(404).json({msg: 'Todo does not exist'});

        res.json({updated});
      })
      .catch(() => res.status(500).json({msg: 'Failed to update todo'}));
  } catch (e) {
    res.status(401).json({msg: 'Authorization denied'});
  }
});

// Deletes a todo
router.delete('/', (req, res) => {
  const todoId = req.body.todoId;
  const authorization = req.headers.authorization;
  
  if (!authorization) return res.status(401).json({msg: 'Authorization denied'});

  const token = authorization.replace('JWT ', '');

  try {
    const userId = jwt.verify(token, JWTSECRET).id;

    Todo.destroy({
      where: {userId, id: todoId}
    })
      .then((deleted) => {
        if (!deleted) return res.status(404).json({msg: 'Todo does not exist'})

        res.json({deleted});
      })
      .catch(() => res.status(500).json({msg: 'Failed to delete todo'}));
  } catch (e) {
    res.status(401).json({msg: 'Authorization denied'});
  }
});

// Gets todos from list
router.get('/list/:listId', (req, res) => {
  const listId = req.params.listId;
  const authorization = req.headers.authorization;
  
  if (!authorization) return res.status(401).json({msg: 'Authorization denied'});

  const token = authorization.replace('JWT ', '');

  try {
    const userId = jwt.verify(token, JWTSECRET).id;

    Todo.findAll({
      where: {userId, listId},
      attributes: ['id', 'todo', 'completed'],
      order: [['createdAt', 'DESC']]
    })
      .then(todos => res.json({todos}))
      .catch(() => res.status(404).json({msg: 'User does not exist'}));
  } catch (e) {
    res.status(401).json({msg: 'Authorization denied'});
  }
});

// Updates a todo's complete status
router.put('/toggle', (req, res) => {
  const todoId = req.body.todoId;
  const authorization = req.headers.authorization;
  
  if (!authorization) return res.status(401).json({msg: 'Authorization denied'});

  const token = authorization.replace('JWT ', '');

  try {
    const userId = jwt.verify(token, JWTSECRET).id;

    Todo.findOne({
      where: {userId, id: todoId}
    })
      .then(data => {
        const completed = !data.dataValues.completed;

        Todo.update({completed}, {
          where: {id: todoId},
        })
          .then(() => res.json({completed}))
          .catch(() => res.status(500).json({msg: 'Failed to update todo'}));
      })
      .catch(() => res.status(404).json({msg: 'Todo does not exist'}));
  } catch (e) {
    res.status(401).json({msg: 'Authorization denied'});
  }
});

module.exports = router;