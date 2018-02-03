const express = require('express');

const routes = (Book) => {
  const bookRouter = express.Router();
  const bookController = require('../controllers/bookController')(Book); // eslint-disable-line global-require
  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

  bookRouter.use('/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        res.status(500).send(err);
      } else if (book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('No book found');
      }
    });
  });

  bookRouter.route('/:bookId')
    .get((req, res) => {
      const returnBook = req.book.toJSON();
      returnBook.links = {};
      const newLink = `http://${req.headers.host}/api/books/?genre=${returnBook.genre}`;
      returnBook.links.FilterByGenre = newLink.replace(' ', '%20');
      res.json(returnBook);
    })
    .put((req, res) => {
      req.book.title = req.body.title;
      req.book.author = req.body.author;
      req.book.genre = req.body.genre;
      req.book.read = req.body.read;
      req.book.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.book);
        }
      });
    })
    .patch((req, res) => {
      const keys = Object.keys(req.body);
      for (let i = 0; i < keys.length; i += 1) {
        if (keys[i] === '_id') {
          delete keys[i];
        } else {
          req.book[keys[i]] = req.body[keys[i]];
        }
      }
      req.book.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.book);
        }
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Removed');
        }
      });
    });
  return bookRouter;
};

module.exports = routes;
