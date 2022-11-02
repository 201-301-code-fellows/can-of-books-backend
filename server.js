'use strict';
// Required modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const Book = require('./models/book.js');
mongoose.connect(process.env.DB_URL);

// MongoDB Connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
})

//Middleware
const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3001;

// ------ ENDPOINTS ------

// Catch-all
app.get('/', (request, response) => {

  response.send('Server is online')

})

// app.get('/test', (request, response) => {
//   response.send('test request received')
// })

// CREATE
app.post('/books', postBooks);

async function postBooks(request, response, next) {
  try {
    let createdBook = await Book.create(request.body);
    response.status(201).send(createdBook);
  } catch (error) {
    next(error);
  }
}

// READ
app.get('/books', async (request, response, next) => {
  try {
    const books = await Book.find();
    console.log(books)
    response.status(200).send(books);
  } catch (error) {
    next(error)
  }
})

// DELETE

app.delete('/books/:bookId', deleteBooks);

async function deleteBooks(request, response, next) {
  try {
    let id = request.params.bookId;
    await Book.findByIdAndDelete(id);
    response.status(204).send('Book deleted.')
  } catch (error) {
    next(error);
  }
}

// UPDATE

app.put('/books/:bookId', updateBooks);

async function updateBooks(req, res, next) {
  try {
    const id = req.params.bookId;
    const data = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true, overwrite: true });
    res.status(200).send(updatedBook)
  } catch (error) {
    next(error);
  }
}


// Improper URL handling
app.get('*', (request, response) => {
  response.send('Page not found')
})

// Server error handling
app.use((error, req, res, next) => {
  res.status(500).send(error.message + "error")
})



app.listen(PORT, () => console.log(`listening on ${PORT}`));
