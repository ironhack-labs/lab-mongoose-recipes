const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const newRecipe = {
        title: 'my recipe',
        level: 'expert',
        ingredients: ['beans', 'tomato', 'cheese', 'lettuce'],
        cuisine: 'english',
        dishType: 'breakfast',
        image: 'https://iamafoodblog.b-cdn.net/wp-content/uploads/2019/02/full-english-7355w-2-1024x683.webp',
        duration: 60,
        creator: 'Mahmoud Laban',
        created: '2023-02-20'
      };
      return Recipe.create(newRecipe);
    })
    .then((recipe) => {
      console.log(`new recipe: ${recipe.title}`);
      return Recipe.insertMany(data);
    })
    .then((recipes) => {
      console.log(`Add ${recipes.length} recipes to database:`);
      recipes.forEach((recipe) => {
        console.log(recipe.title);
      });
      return Recipe.findOneAndUpdate(
        { title: 'my recipe' },
        { duration: 60 },
        { new: true }
      );
    })
    .then((updatedRecipe) => {
      console.log(`Update duration of "${updatedRecipe.title}" to ${updatedRecipe.duration} 20.`);
      return Recipe.deleteOne({ title: 'my recipe' });
    })
    .then(() => {
      console.log('removed recipe from database.');
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error('Error connecting to the database', error);
    });