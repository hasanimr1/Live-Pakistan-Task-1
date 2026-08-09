/**
 * Centralized Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[API Error] ${err.name}: ${err.message}`);

  // Mongoose invalid ObjectId error
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: `Invalid ID format: '${err.value}' is not a valid MongoDB ObjectId.`,
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: messages.join(', '),
    });
  }

  // Default server error (500)
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.name || 'Server Error',
    message: err.message || 'An unexpected error occurred on the server.',
  });
};

module.exports = errorHandler;
