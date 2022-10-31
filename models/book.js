'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

//we chose to make status into available to spice it up with a boolean in our schema
const bookSchema = new Schema({ 
  title: { type: String, required: true},
  description: { type: String, required: true},
  available: { type: Boolean, required: true}
});

module.exports = mongoose.model('Book', bookSchema);
  