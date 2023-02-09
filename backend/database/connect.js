const mongoose = require('mongoose')

mongoose.connect(process.env.DB_NAME),
  () => {
    console.log('Connected to MongoDB');
  }

module.exports = mongoose