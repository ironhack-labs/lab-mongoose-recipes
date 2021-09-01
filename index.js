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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())

  .then(() => {

  //   ITERATION 2. Create new recipe

  //   Recipe
  //   .create({title: 'IronBurgers', level: 'UltraPro Chef', ingredients: ['meat', 'bread', 'love'], cuisine: 'spanish', dishType: 'main_course', duration: 1, creator: 'Sara' })
  //   .then(newRecipe => console.log('The new recipe is', newRecipe))
  //   .catch(err => console.log('EEERROOORR', err))


  //  ITERATION 3. Insert multiple recipes

      Recipe
      .create(data)
      .then(newRecipes => newRecipes.map((recipe) => console.log('The title of the recipe is', recipe.title)))
      .catch(err => console.log('EEERROOORR', err))
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
