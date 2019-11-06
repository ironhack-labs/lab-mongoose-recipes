const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

// uncomment Recipe.create otherwise it will create this recipe each time we launch the node index.js (ou npm run server if you write your script in the package.json)
// Recipe.create({
//   title: 'Tartiflette Veggie',
//   level: 'Easy Peasy',
//   ingredients: ['Potatoes', 'Zucchini', 'Peppers', 'Reblochon', 'Onions'],
//   cuisine: 'French',
//   dishType: 'Dish',
//   image: 'https://www.picard.fr/dw/image/v2/AAHV_PRD/on/demandware.static/-/Sites-catalog-picard/default/dw4f25b129/recettes/plats/R0625.jpg?sw=600&sh=336',
//   duration: 35,
//   creator: 'Camille & Helene chefs',
// }).then(recipe => {
//   console.log(recipe.title);
// }).catch(err => {
//   console.error('Error connecting to mongo', err);
// });

// Recipe // uncomment to not insertMany each time we run our code...
// how do the web dev in real life ? they uncomment their code each time ??
//   .insertMany(data)
//   .then(data.forEach(recipe => console.log(recipe.title)))
//   .catch(err => {
//     console.error('Failed to insert document', err);
//   });

Recipe
  .findByIdAndUpdate("5dc2efc85fbc5e736fcadcb9", {
    duration: 100
  })
  .then(console.log("Duration updated !"))
  .catch(err => {
    console.error('Failed to updated', err);
  });

Recipe
  .deleteOne({
    title: "Carrot Cake"
  })
  .then(console.log("Carrot cake deleted !"))
  .catch(err => {
    console.error('Failed to delete', err);
  });

mongoose.connection.close();