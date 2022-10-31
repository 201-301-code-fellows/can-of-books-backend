
const { default: mongoose } = require('mongoose');
const Book = require('./models/book.js');

async function seed() {

  // title: { type: String, required: true},
  // description: { type: String, required: true},
  // available: { type: Boolean, required: true}

  await Book.create({
    title: 'The Prisoner of Azkaban',
    description: 'Harry Potter Book 3',
    available: true
  });

  console.log('new book was created');

  
  await Book.create({
    title: "Udemy, the book.",
    description: "A condensed version of all Udemy courses in written form.",
    available: true,
  });

  console.log("new book was created");

  
  await Book.create({
    title: "The Anarchist's Cookbook",
    description: "Because 2022",
    available: true,
  });

  console.log("new book was created");

  mongoose.disconnect();

}

seed();