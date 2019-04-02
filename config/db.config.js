const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/lab-mongoose-recipes';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

