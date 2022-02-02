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
  .then(() => Recipe.syncIndexes())
  .then(() => {

    Recipe

      .create({
        title: 'Lasaña',
        level: 'Easy Peasy',
        ingredients: ['Tomate', 'Carne', 'Queso'],
        cuisine: 'italiana',
        dishType: 'breakfast',
        image: "https://images.media-allrecipes.com/images/75131.jpg",
        duration: 20,
        creator: 'Ana',

        created: 02 / 02 / 2022,

      })

      .then(newRecipe => console.log(newRecipe.title))

      .catch(error => {
        console.error('Error connecting to the database', error);
      });

    Recipe

      .insertMany(data)
      .then(theNewRecipes => theNewRecipes.forEach(elm => console.log(`The title of each recipe is ${elm.title}`)))
      .catch(error => {
        console.error('Error connecting to the database', error);
      });


    Recipe

      .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(newRecipe => console.log('changed!'))
      .catch(error => {
        console.error('Error connecting to the database', error);
      });

    Recipe

      .deleteOne({ title: "Carrot Cake" })
      .then(newRecipe => console.log('removed!'))
      .catch(error => {
        console.error('Error connecting to the database', error);
      });

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

mongoose.disconnect();
