const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to DB
connectDB();

app.use(express.json({ extended: false }));

// Default route
app.get('/', (req, res) => {
  res.send('welcome');
});

// Define routes here
app.use('/api/images', require('./routes/api/images'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app; // for testing
