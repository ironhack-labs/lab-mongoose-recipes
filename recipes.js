const mongoose = require('mongoose');
const Recipes = require('./models/recipes.model')
const Schema   = mongoose.Schema;
const data = require('./data.js');

const email = 'jeannette.coleman@example.us';


mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipes.create(data)
  .then(data => console.info(data))
  .then(()=>{
    console.info('Insert some data... piiiiiii. ')
    return Recipes.insertMany(data)
  })
  .then(() => {
    console.info('- Finding users by email', )
    return User.find({}, {email})
      .then(users => console.info(users))
  })
  .catch(error => console.error(`Looser fix this errror: ${error}`))
