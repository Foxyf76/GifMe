const mongoose = require('mongoose');
const config = require('config');
require('dotenv').config();
const db = process.env.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true, // remove deprecation error
      useCreateIndex: true, // remove deprecation error
      useFindAndModify: false, // remove deprecation error
      useUnifiedTopology: true, // remove deprecation error
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
