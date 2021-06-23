const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe
    .create(
      [{
        "title": "Asian Glazed Chicken Thighs",
        "level": "Amateur Chef",
        "ingredients": [
          "1/2 cup rice vinegar",
          "5 tablespoons honey",
          "1/3 cup soy sauce (such as Silver Swan®)",
          "1/4 cup Asian (toasted) sesame oil",
          "3 tablespoons Asian chili garlic sauce",
          "3 tablespoons minced garlic",
          "salt to taste",
          "8 skinless, boneless chicken thighs"
        ],
        "cuisine": "Asian",
        "dishType": "main_course",
        "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
        "duration": 40,
        "creator": "Chef LePapu"
      }]
    )
    .then(recipe=> console.log('una ricetta', recipe[0].title))
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

// you should add a new recipe document to the database by calling the Model.create static,
// passing it the recipe details as an object. After inserting the recipe, 
//you should console.log the title of the recipe.
// Tip: When you have successfully created a new recipe
//(you see it in the database using Compass tool), 
//you might want to comment out this step.
//The reason for this is that next time when you run $ node index.js, 
//it will try to create a new recipe with the same name and you will get an
// error in the terminal related to the duplicate keys - the title should be unique, 
//and the dish with that title already exists in the database.