const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

require('./config/db')
const bookController = require('./controllers/book');
const authController = require('./controllers/auth');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/auth/signup', authController.signUp);
app.post('/auth/signin', authController.signIn);

app.get('/books', bookController.allBooks);
app.put('/books', authController.authRequired, bookController.toggleFavorites);
app.get('/books/favorites', authController.authRequired, bookController.favorites);
app.get('/books/:id', bookController.singleBook);
app.delete('/books/:id', authController.authRequired, bookController.deleteBook);
app.put('/books/:id', authController.authRequired, bookController.updatedBook);
app.post('/books', authController.authRequired, bookController.newBook);




module.exports = app.listen(port, () => console.log(`Server running at http://localhost:${port}`));