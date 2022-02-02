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
        title: 'Bacalao al pil-pil',
        level: 'Amateur Chef',
        ingredients: ['Cod', 'Olive oil', 'Garlic', 'Chili pepper'],
        cuisine: 'Basque',
        dishType: 'main_course',
        image: 'https://www.miscosillasdecocina.com/wp-content/uploads/2014/02/bacalao-pilpil-e1491084486535.jpg',
        duration: 60,
        creator: 'Mikel Laiseca',
        creation: 02 / 02 / 2022
      })

      .then(theNewRecipe => (console.log(theNewRecipe.title)))
      .catch(error => {
        console.error('Error connecting to the database', error);
      });

    Recipe
      .insertMany(data)
      .then(NewRecipes => NewRecipes.forEach(elm => console.log(elm.title)))
      .catch(error => {
        console.error('Error connecting to the database', error);
      });

    Recipe
      .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(theNewRecipe => (console.log('Success!')))
      .catch(error => {
        console.error('Error connecting to the database', error);
      });
    Recipe
      .deleteOne({ title: "Carrot Cake" })
      .then(theNewRecipe => (console.log('Success!')))
      .catch(error => {
        console.error('Error connecting to the database', error);
      });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
mongoose.connection.close()
