'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
})



const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})
app.get('/books', async (request, response) => {
  try {
    const books = await Book.find();
    response.status(200).send(books);
  }

  catch (error) {
    next(error)
  }

})


app.use((error, req, res, next) => {
  app.status(500).send(error.message + "error")
})



app.listen(PORT, () => console.log(`listening on ${PORT}`));
