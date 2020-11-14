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
  .then(
    () => {
      console.log(`Connected to the database: "${mongoose.connection.name}"`);
      // Before adding any documents to the database, let's delete all previous entries
      return mongoose.connection.dropDatabase();
    },
    (error) => {
      console.error('Error connecting to the database', error);
    }
  )
  // .then(() => {
  //   const recipeOne = data[0];
  //   Recipe.create(recipeOne)
  //     .then(recipe => console.log(recipe.title))
  //     .catch(err => console.log(`An error occurred while saving a new recipe: ${err}`));
  // })
  .then(() => manipulateRecipeDb())
  .catch(error => console.error(error));

async function manipulateRecipeDb() {
  await insertRecipes(data);
  await updateRecipe();
  await removeOneRecipe();
  await mongoose.connection.close();
}

async function insertRecipes(data) {
  const recipes = await Recipe.insertMany(data);
  recipes.forEach(recipe => {
    console.log(recipe.title);
  });
} 

async function updateRecipe() {
  await Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100});
  console.log("Successfully updated the duration of the recipe");
}

async function removeOneRecipe() {
  await Recipe.deleteOne({title: "Carrot Cake"});
  console.log("Successfully removed Carrot Cake");
}
