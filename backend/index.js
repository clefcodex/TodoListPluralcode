require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const todoRoutes = require('./routes/todos');
const cors = require('cors');
const PORT = process.env.PORT || 3000;



app.use(cors())


// Middleware to parse JSON
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
    res.send("Hello, Express!");
});


// routes
app.use('/api/todos/', todoRoutes);



mongoose.connect(process.env.MONG_URI)
    .then(() => {
        console.log('connected to db');

        // Start server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })