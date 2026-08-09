/**
 * Middleware to validate Todo creation request payload
 */
const validateCreateTodo = (req, res, next) => {
  const { title, completed } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Field "title" is required and must be a non-empty string.',
    });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Field "completed" must be a boolean value.',
    });
  }

  next();
};

/**
 * Middleware to validate Todo update request payload
 */
const validateUpdateTodo = (req, res, next) => {
  const { title, description, completed } = req.body;

  if (title === undefined && description === undefined && completed === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Please provide at least one field to update (title, description, or completed).',
    });
  }

  if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Field "title" must be a non-empty string.',
    });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Field "completed" must be a boolean value.',
    });
  }

  next();
};

module.exports = {
  validateCreateTodo,
  validateUpdateTodo,
};
