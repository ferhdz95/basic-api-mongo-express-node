const mongoose = require('mongoose');

const bookModel = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  read: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Book', bookModel);
