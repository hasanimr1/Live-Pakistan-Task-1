const Todo = require('../models/Todo');

/**
 * @desc    Get all todo items
 * @route   GET /todos
 */
const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single todo item by ID
 * @route   GET /todos/:id
 */
const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Todo item with ID '${req.params.id}' not found.`,
      });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new todo item
 * @route   POST /todos
 */
const createTodo = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: completed || false,
    });
    res.status(201).json({
      success: true,
      message: 'Todo item created successfully.',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing todo item
 * @route   PUT /todos/:id
 */
const updateTodo = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Todo item with ID '${req.params.id}' not found.`,
      });
    }

    if (title !== undefined) todo.title = title.trim();
    if (description !== undefined) todo.description = description.trim();
    if (completed !== undefined) todo.completed = completed;

    await todo.save();

    res.status(200).json({
      success: true,
      message: 'Todo item updated successfully.',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a todo item
 * @route   DELETE /todos/:id
 */
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Todo item with ID '${req.params.id}' not found.`,
      });
    }

    await todo.deleteOne();

    res.status(200).json({
      success: true,
      message: `Todo item with ID '${req.params.id}' deleted successfully.`,
      data: { id: req.params.id },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
