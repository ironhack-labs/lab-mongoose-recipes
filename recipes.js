const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Recipe = require('./models/Recipe')
const data = require('./data');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

 
  Recipe.create({title: 'Asian Glazed Chicken Thighs',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cuisine: 'Asian',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu' })
  .then(()=>console.log(""))
  .catch((err)=>{
    console.log(err);
  },

  Recipe.insertMany(data)
  .then(()=>console.log("Done"))
  .catch((err)=>{
  console.log(err);}),


  
Recipe.update(
    {name: 'Rigatoni alla Genovese'},
    {$set: {'Duration': '100'}})

    .then(()=>console.log("Done"))
    .catch((err)=>{
     console.log(err);}),

Recipe.deleteOne({title: 'Carrot Cake'}) 
    .then(() => {console.log("Deleted Succesfully!")})
    .catch((err) => {console.log(err)}))
