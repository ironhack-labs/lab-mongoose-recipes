const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const recipes = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

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
    const recipe = {
      "title": "Asian Glazed Chicken",
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
      "duration": 60,
      "creator": "Chef LePapu"
    };
    return Recipe.create(recipe)
  })
  .then((doc) => {
    console.log(doc.title);

    return Recipe.insertMany(recipes);
  })
  .then((docs) => {
    docs.forEach((recipeDoc) => {
      console.log(recipeDoc.title);
    })
    const query = { title: "Rigatoni alla Genovese"}
    return Recipe.findOneAndUpdate(query, { duration:100 } )
  })
  .then((updatedRecipeDoc) => {
    console.log(`updated ${updatedRecipeDoc.title}`);
    const query={title:"Carrot Cake"}
    return Recipe.deleteOne(query)
  })
  .then((resp) => {
    console.log("recipe doc deleted")
  })
  .then(() => {
    return mongoose.disconnect()
  })
  .then(() => {
    console.log("db connection closed!")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
