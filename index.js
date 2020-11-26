const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newRecipe = {
  title: 'Chicken Soup',
  level: 'Easy Peasy',
  ingredients: ['Chicken Thighs', 'Cabbage', 'Carrot', 'Red Pepper', 'Onion', 'Celery'],
  cuisine: 'Eastern European',
  dishType: 'soup', 
  image: 'https://blog-food.ru/recipes/first-dishes/shhi-tomleno-tushenyie-navaristyie',
  duration: 20,
  creator: 'Chef'
};

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
    Recipe.create(newRecipe)
    .then(addedRecipe => console.log(`This recipe has been added: ${addedRecipe.title}`))
    .catch(error => console.log(`The recipe has not been added due to an error`, error));
  })
    //.insertMany(data.json)
    //.then(addedRecipes => {
     // addedRecipes.forEach((recipe) => console.log(`Recipes added ${recipe.title}`));
    //})
    //.catch(error => console.log(`The recipes were not added due to an error`, error));
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
