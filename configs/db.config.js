const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/recipesApp';

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
.then(() => {
  console.log('Connected to Mongo!');
})
.catch(err => {
  console.error('Error connecting to mongo', err);
});