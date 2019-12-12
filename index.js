const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the document model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  let newRecipe = {
    title: 'Bratkartoffeln',
    level: 'Easy Peasy',
    ingredients: ['Kartoffeln', 'Öl', 'Zwiebeln', 'Salz', 'Pfeffer'],
    cuisine: 'German',
    dishType: 'Dish',
    image: 'https://www.lecker.de/assets/styles/563x422/public/field/image/bratkartoffeln-rezept-b_0.jpg?itok=6RDuUk1M',
    duration: 30,
    creator: 'Anastasia und Dirk'};

Recipe.create(newRecipe)
      .then(recipeFromDB =>{
            console.log(`Created recipe: ${recipeFromDB.title}`);
        }) 
      .catch(err =>{
            console.error(`Error while creating recipe: ${err} `);
        });

Recipe.insertMany(data)
      .then(recipesFromDB =>{
        recipesFromDB.map((v) => {console.log('Titel:', v.title);});
          
       }) 
      .catch(err =>{
         console.error(`Error while creating recipes: ${err} `);
       });

Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
      .then(recipesUpdatedInDB =>{
        console.log(`Successfully updated duration from recipe: ${JSON.stringify(recipesUpdatedInDB)  } `);
        })
      .catch(err =>{
        console.error(`Error while updating duration: ${err} `);
      });
