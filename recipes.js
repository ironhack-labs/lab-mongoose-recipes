const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open');

  User.create({ title: 'Raphael' })
    .then((usr) => {
      console.log('User created!', usr);
    })
    .catch((err) => {
      console.log('Error when user created!', err);
    });
});