const mongoose = require('mongoose');
//const Recipe = require('./Recipe.model');

const recipeNew = {

    'title': 'Fried rice',
    'level': 'Easy Peasy', 
    'ingredients': [
        'Rice 150g', 
        'Water 350ml', 
        'Olive oil', 
        'Salt', 
        '1 carrot', 
        '1 small onion',
        'leek, 1 piece',
        'Soy sauce, 3 tablespoons' ],
    'cusini': 'Asian',
    'dishType': 'main_course',
    'image': '/images/rice.jpg',
    'duration': 40,
    'creator': 'Roxana',
}


const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';
//mongodb://127.0.0.1:27017/recipe-app'
//1º 'mongodb://localhost:27017/recipe-app'
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //return recipeNew.create()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    console.log(recipeNew);
    //return model.create(recipeNew)
  
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });