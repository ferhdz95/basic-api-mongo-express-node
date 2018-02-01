const express = require('express');   
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let db;

if(process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
}
else{
    db = mongoose.connect('mongodb://localhost/bookAPI');
}

var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

module.exports = app;

app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.listen(port, () =>{
    console.log('Gulp is running my app on PORT: ' + port);
});