const mongoose = require('mongoose');
const express = require('express');

const app = express()

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const recipes = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })

  .then(() => {

    return Recipe.create({
      "title": "Curry Japones",
      "level": "UltraPro Chef",
      "ingredients": [
        "1 cup of water",
        "2 tablets of japanese curry",
        "1 apple",
        "50 grams of mushrooms",
        "1 steak",
        "1 carrot",
      ],
      "cuisine": "Japanese",
      "dishType": "main_course",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
      "duration": 60,
      "creator": "Chef Paloma"
    })
  })

    .then((recipe) => {
      console.log(`You added the ${recipe.title} recipe`);

    return Recipe.insertMany(recipes)
    })

      .then((recipes) => {
        recipes.forEach((recipe) => console.log(`You added the ${recipe.title} recipe`)
      );
  
    return Recipe.findOneAndUpdate({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  }, {
    new: true
  })
})

  .then((recipeUpdated) => {
    console.log(`You updated the ${recipeUpdated.title} successfully`)
  })

return Recipe.deleteOne({
    title: 'Carrot Cake'
  })

  .then((recipeDeleted) => {
    console.log(`You deleted the ${recipeDeleted.title} successfully`);
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  .finally(() => {
    mongoose.connection.close(() => {
      console.log('Disconnected from database')
      process.exit(0)
    })
    
  });