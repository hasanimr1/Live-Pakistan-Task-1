const express = require('express');
const router = express.Router();

const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

const {
  validateCreateTodo,
  validateUpdateTodo,
} = require('../middleware/validateTodo');

// /todos routes
router.route('/')
  .get(getTodos)
  .post(validateCreateTodo, createTodo);

// /todos/:id routes
router.route('/:id')
  .get(getTodoById)
  .put(validateUpdateTodo, updateTodo)
  .delete(deleteTodo);

module.exports = router;
