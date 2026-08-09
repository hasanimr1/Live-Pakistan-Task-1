const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Core Middleware
app.use(cors());
app.use(express.json());

// Root Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Todo List REST API (Live Pakistan Internship - Week 1)',
    version: '1.0.0',
    endpoints: {
      getAllTodos: 'GET /todos',
      getTodoById: 'GET /todos/:id',
      createTodo: 'POST /todos',
      updateTodo: 'PUT /todos/:id',
      deleteTodo: 'DELETE /todos/:id',
    },
  });
});

// Mount Todo Routes
app.use('/todos', todoRoutes);

// Catch-all for Undefined Routes (404)
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}. Route does not exist.`,
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;
