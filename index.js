const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  //Data for a new recipe
  const newRecipe = {
    title: 'Pizza',
    level: 'Amateur Chef',
    ingredients: 'Tomato, cheese, dough',
    cuisine: 'Italian',
    dishType: 'main_course',
    image: 'https://images.media-allrecipes.com/images/75131.jpg',
    duration: 30,
    creator: 'John Doe',
    created: new Date()
  };  

  //An array of recipes
  const recipes = [
    { 
      title: 'Minced Meat',
      level: 'Amateur Chef',
      ingredients: 'Tomato, cheese, dough',
      cuisine: 'Italian',
      dishType: 'main_course',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 30,
      creator: 'John Doe',
      created: new Date()
    },
        { 
      title: 'Ugali',
      level: 'Easy Peasy',
      ingredients: 'Tomato, cheese, dough',
      cuisine: 'Italian',
      dishType: 'main_course',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 30,
      creator: 'John Doe',
      created: new Date()
    },
        { 
      title: 'Rice',
      level: 'Amateur Chef',
      ingredients: 'Tomato, cheese, dough',
      cuisine: 'Italian',
      dishType: 'main_course',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 30,
      creator: 'John Doe',
      created: new Date()
    },

  ]
  
  //add a new recipe document to the database by calling the Model.create

  Recipe.create(newRecipe)
  .then((recipe) => {console.log("The Recipe add is: ", recipe.title)})
  .catch((error) => {console.log("An error occured: ", error)});


  //Insert an array of recipes into the database
  Recipe.insertMany(recipes)
  .then(() => {
    console.log('Inserted recipes into the database');
  }).catch(error => {
    console.error('Error inserting recipes into the database', error);
  });

  //Update a recipe

  Recipe.findOneAndUpdate({title: 'Minced Meat'}, {title: 'Minced Meat with cheese'})
  .then(successCallback)
  .catch(errorCallback);

  //Delete a recipe

  Recipe.findOneAndDelete({title: 'Pizza'})
  .then(successCallback)
  .catch(errorCallback);

  //Close the database connection

  mongoose.connection.close();
  
  