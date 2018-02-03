const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

if (process.env.ENV === 'Test') {
  mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
  mongoose.connect('mongodb://localhost/bookAPI');
}

const Book = require('./models/bookModel');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

module.exports = app;

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(port, () => {
  console.log(`Gulp is running my app on PORT:  ${port}`);
});
