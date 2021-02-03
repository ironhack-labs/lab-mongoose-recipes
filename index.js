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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // EJERCICIO 2 Crea una receta
    Recipe
      .create({
        "title": "Tacos al pastor",
        "level": "UltraPro Chef",
        "ingredients": [
          "tortillas de maíz",
          "cerdo",
          "...y muchos ingredientes secretos",
        ],
        "cuisine": "Mexican Power",
        "dishType": "main_course",
        "image": "https://images.media-allrecipes.com/images/75131.jpg",
        "duration": 240,
        "creator": "Le Monch"
      })
      .then(recipe => console.log(recipe))
  })


  // EJERCICIO 3, 4 y 5
  .then(() => {
    Recipe
      .insertMany(data)
      .then(recipes => {
        recipes.forEach((recipe) => {
          console.log(`Title: ${recipe.title}`)
          Recipe
            .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
            .then(newRecipe => {
              console.log(`Well done Monch, the duration has been changed!`, newRecipe)
              Recipe
                .deleteOne({ title: 'Carrot Cake' })
                .then(deleteRecipe => console.log('Well done Monch, the recipe has been removed!', deleteRecipe))
              mongoose.disconnect(() => {
                console.log('Mongoose default connection disconnected through app termination')

              })
            })
        })
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
