const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/Recipe.js');//En la constante importo mi archivo recipe.js

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .then(()=> {
    return Recipe.collection.drop();
  })
  .then(() => {
    return Recipe.create(      {
      title: 'Pepito de ternera',
      level: 'Amateur Chef',
      ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
      cuisine: 'Asian',
      dishType: ['Dish'],
      image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
      duration: 40,
      creator: 'Chef LePapu'
    })
  })
  .then(() => {
    return Recipe.insertMany(data);
    
  })
  .then(() => {
    return Recipe.updateOne({ title:"Rigatoni alla Genovese"}, {duration:100})
    console.log(Recipe._id);
  })
  .then(() => {
    return Recipe.deleteOne({title:"Carrot Cake" })
  })
  .then(() => {
    mongoose.disconnect()
    console.log("Disconnected ok");
  })
 