const Todo = require('../models/todosModel');
const mongoose = require('mongoose');



// GET all todos
const getTodos = async (req, res) => {
    const todos = await Todo.find({}).sort({createdAt: -1});
    res.status(200).json(todos);
}

// GET a single todo
const getTodo = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such todo id'});
    }

    const todo = await Todo.findById(id);

    if(!todo) {
        return res.status(404).json({error: 'No such todo'});
    }

    res.status(200).json(todo);
}


// create a new todo
const createTodo = async (req, res) => {

    const { title, completed, deadline } = req.body;

    let emptyFields = []
    if(!title) {
        emptyFields.push('title')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Title can not be empty', emptyFields })
    }

    try {
        const todo = await Todo.create({title, completed, deadline});
        res.status(200).json(todo);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}


// UPDATE a todo
const updateTodo = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such todo id'});
    }

    const todo = await Todo.findOneAndUpdate({_id: id}, {...req.body});

    if(!todo) {
        return res.status(404).json({error: 'No such todo'});
    }

    const updatedTodo = await Todo.findById(id);
    res.status(200).json(updatedTodo);
}

// DELETE a todo
const deleteTodo = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such todo id'});
    }

    const todo = await Todo.findOneAndDelete({_id: id});

    if(!todo) {
        return res.status(404).json({error: 'No such todo'});
    }

    // res.status(200).json({mssg: "Todo successfully deleted"});
    res.status(200).json(todo);
}

module.exports = {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo
}

