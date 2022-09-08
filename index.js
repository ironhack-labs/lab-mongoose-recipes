const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
async function main() {
  await mongoose
    .connect(MONGODB_URI)
    .then((x) => {
      console.log(`Connected to the database: "${x.connection.name}"`);
      // Before adding any recipes to the database, let's remove all existing ones
      return Recipe.deleteMany();
    })
    .then(() => {
      // Run your code here, after you have insured that the connection was made
    })
    .catch((error) => {
      console.error('Error connecting to the database', error);
    });

  const NewRecipe = mongoose.model('Recipe', Recipe.recipeSchema);

  const recipeOne = new Recipe({
    title: data[0].title,
    level: data[0].level,
    ingredients: data[0].ingredients,
    cuisine: data[0].cuisine,
    dishType: data[0].dishType,
    image: data[0].image,
    duration: data[0].duration,
    creator: data[0].creator,
  });

  await recipeOne.save();
}

main();

// const pikachu = new Pokemon({
//   name: 'Pikachu',
//   hp: 30,
//   greeting: 'Pika Pika Pikachu!',
//   pokeType: 'electro',
// });

// await pikachu.save();
