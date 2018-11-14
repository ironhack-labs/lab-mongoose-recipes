const mongoose = require('mongoose');
const data = require('./data.js');
const Recipe = require('./models/Recipe.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  })
  .then(() => {
    Recipe.collection.drop()
  })
  .then(() => {
    return Recipe.create({
      title: 'Asian Glazed Chicken Thighs',
      level: 'Amateur Chef',
      ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
      cuisine: 'Asian',
      dishType: ['Dish'],
      image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
      duration: 40,
      creator: 'Chef LePapu'
    })
  }).then((recipe) => {
    Recipe.collection.drop()
    return recipe
  })
  .then((recipe) => {
    console.log(recipe)
    return Recipe.insertMany(data)
  })
  .then((recipes) => {
    return recipes.forEach(function (e) {
      console.log(e.title)
    })
  })
  .then(() => {
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  }).then(() => { console.log("Rigatoni alla Genovese duration updated tog 100") })
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  }).then(() => { console.log("Carrot Cake was deleted") })
  .then(() => {
    mongoose.disconnect();
    console.log("DB disconnected");
  })


  .catch(err => {
    console.error('An error happened', err);
  });