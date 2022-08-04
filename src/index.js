// Import protected information from .env file
require('dotenv').config();
// Import the routes file:
const routes = require('./routes');

const express = require('express')
const path = require('path');
const PORT = 3000;
const app = express();

// Connect to database
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

app.use(express.json());

// from previous tutorial
app.use(express.static(path.join(__dirname, '../public')))

app.listen(PORT, () => {
console.log(`App running on port ${PORT} http://localhost:${PORT}`)
})

app.use('/', routes);

// check if database connected
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
