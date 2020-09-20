const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const newRecipe = [{
  title: 'Pancakes',
  level: 'Amateur Chef',
  ingredients: [
    '1 1/2 cups plain flour',
    '3 1/2 teaspoons baking powder',
    '1 tablespon caster sugar',
    '3 eggs',
    '1 cup milk',
    '50g unsalted butter, melted',
    '1 teaspoon vanilla extract (optional)',
    'Maple syrup, to serve',
    'Blueberries, to serve'
  ],
  cuisine: 'International',
  dishType: 'dessert',
  image: 'https://myfoodbook.com.au/sites/default/files/styles/single_recipe/public/recipe_photo/Basic-pancake-45-portrait.jpg?itok=X-tKWNrn',
  duration: 30,
  creator: 'Chef Levy',
}];

const MONGODB_URI = 'mongodb://192.168.15.38/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Iteration 2
    Recipe.create(newRecipe)
      .then((recipe) => console.log(`The recipe is saved and its title is: ${recipe.title}`))
      .catch((err) => console.log(`Error while creating a new recipe: ${err}))`));

    // Iteration 3
    Recipe.insertMany(data)
      .then(data.forEach(recipe => console.log(`The recipe is saved and its title is: ${recipe.title}`)))
      .catch(err => console.log(`Error while creating a new recipe: ${err}))`));

    // Iteration 4
    Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      .then((recipe) => console.log(`The recipe ${recipe.title} was updated successfully!`))
      .catch(err => console.log(`Error while updating the recipe: ${err}))`));

    // Iteration 5
    Recipe.deleteOne({ title: 'Carrot Cake' })
      .then((recipe) => console.log(`The recipe ${recipe.title} was deleted successfully!`))
      .catch(err => console.log(`Error while updating the recipe: ${err}))`));
  })
  .then(() => {
    // Iteration 6
    mongoose.connection.close();
    console.log('The connection was closed.');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
