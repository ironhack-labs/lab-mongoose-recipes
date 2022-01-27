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
    //console.log('Connected');
    // Run your code here, after you have insured that the connection was made
    //createOne()
    //createMany()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  //Iteration 1

  
  const myRecipe = {
    "title": "Asian Glazed Chicken Thighs Something",
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
  };

  //Iteration 2
  const i2 = Recipe.create(myRecipe)
    .then(recipe => console.log(recipe.title + ' created'))
    .catch(error => console.log('An error occured' + error));
  
    
  //Iteration 3
  const i3 = Recipe.insertMany(data)
      .then(recepies => {
        for (i in recepies){
          console.log(recepies[i].title)
        }
      })
      .catch(() => console.log('Error during insert'));
    
      //Iteration 4
  const i4 = Recipe.updateOne({title: 'Rigatoni alla Genovese'},{duration:100})
        .then(() => console.log('Successfully update'))
        .catch(() => console.log('Error during update'));

        //Iteration 5
  const i5 = Recipe.deleteOne({title:'Carrot Cake'})
          .then((r) => console.log('deleted'))
          .catch(() => console.log('Error during deletion'));

    Promise.all([i2,i3,i4,i5])
      .then((v) => 
        mongoose.connection.close(() => 
          console.log('successfully closed')))