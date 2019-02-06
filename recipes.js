let mongoose = require('mongoose');
//const Schema   = mongoose.Schema;
//let Recipe = require('./models/Recipe');
//const data = require('./data.js');

mongoose.connect('mongodb://localhost:27017/firstDatabase')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


