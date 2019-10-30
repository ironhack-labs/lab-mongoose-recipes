const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to the data base!');
  }).catch(err => {
    console.error('Error connecting to the database', err);
  });

mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));
