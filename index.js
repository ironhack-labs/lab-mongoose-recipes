const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const myRecipe = {
  "title": "Chocolate Chip",
  "level": "Easy Peasy",
  "ingredients": [
  "2 1/4 cups all purpose flour",
  "1 teaspoon baking soda",
  "1/2 teaspoon salt",
  "1 cup butter softened",
  "3/4 cup granulated sugar",
  "3/4 cup packed brown sugar",
  "1 egg",
  "1 teaspoon vanilla",
  "2 cups semisweet chocolate chips",
  "1 cup coarsely chopped nuts, if desired"
  ],
  "cuisine": "Sweets",
  "dishType": "dessert",
  "image": "https://images-gmi-pmc.edge-generalmills.com/cbe8b51a-c3c1-4dcf-8d79-76f98565d3e0.jpg",
  "duration": 130,
  "creator": "Betty Crocker"
  };

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async() => {
    // Iteration 2 - add new recipe to the database .create (myRecipe) console.log title
    const newRecipe = await Recipe.create(myRecipe);
    console.log(newRecipe.title);
    // Iteration 3 - Add all recipes in the database from data.json
    const recipes = data.map(recipe => new Recipe(recipe));
    await Recipe.insertMany(recipes);
    // Iteration 4 - Update recipe with the title "Rigatoni alla Genovese" time to be 100 minutes
    const rigatoni = await Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
    console.log(rigatoni);
    // Iteration 5 - Remove "Carrot Cake" recipe from the database with .deleteOne
    const carrotCake = await Recipe.deleteOne({ title: 'Carrot Cake' });
    // Iteration 6 - Close the connection to the database
    mongoose.connection.close();

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });