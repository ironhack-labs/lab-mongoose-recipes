const mongoose = require('mongoose');
const DB_NAME = 'recipeApp';
const MONGO_URI = `mongodb://localhost/${DB_NAME}`;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


