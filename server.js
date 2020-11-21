const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const app = express();

// Connect to DB
connectDB();

app.use(express.json({ extended: false }));

// Default route
app.get('/', (req, res) => {
  res.send('welcome');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app; // for testing


