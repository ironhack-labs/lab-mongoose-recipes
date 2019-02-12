const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema({
  title: {type: String},
  level: {type: String},
  ingredients: {type: Array},
  cuisine: {type: String},
  dishType: {type: String},
  image: {type: String},
  duration: {type: Number},
  creator: {type: String},
  date: {type: Date, default: Date.now}
});

const Recipe  = mongoose.model('recipe', recipeSchema);


Recipe.create({
title: "French Onion",
 level: "Beginner",
 ingredients: ['onions', 'soup'],
 cuisine: 'French',
 dishType: 'Soup',
 images: 'url(images/image)',
 duration: 15,
creator: "Gordon Childs",
// created: ''
          })

// many recipes
Recipe.insertMany(data)
  .then(recipes => {
    recipes.forEach(recipe => {
    });
  })
  .catch(err => {
    console.log(err);
  });
//update
  Recipe.findByIdAndUpdate('5c6333731b6cb635508985e3', {duration: 100})
  .then("Changed")
  .catch("Change failed")
//delete
  Recipe.deleteOne({title: "Carrot Cake"})
  .then("Item deleted")
  .catch("Delete Failed")

//remove

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });
