const express = require('express');

const router = express.Router();
const { createTodo, 
        getTodos, 
        getTodo, 
        updateTodo,
        deleteTodo } = require('../controllers/todoController');



// GET all todos
router.get('/', getTodos)

// GET a single todo
router.get('/:id', getTodo)

// POST a new workout
router.post('/', createTodo)

// UPDATE a todo
router.patch('/:id', updateTodo)

// DELETE a todo
router.delete('/:id', deleteTodo)

module.exports = router;