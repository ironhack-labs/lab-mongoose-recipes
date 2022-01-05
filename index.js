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
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'Crêpe',
      level: 'Easy Peasy',
      ingredients: ['Flour', 'butter', 'egg', 'sugar', 'Milk'],
      cuisine: 'french',
      dishType: 'dessert',
      duration: 15,
      creator: 'Chef Chun',
    })
    .then(recipe => console.log('The recipe is saved and its value is: ', recipe.title))
    .catch(error => console.log('An error happened while saving a new recipe:', error));
  })

  Recipe.insertMany(data)
  .then(allRecipe => {
    allRecipe.forEach(allRecipes => console.log(allRecipes.title))
  })

Recipe.findOneAndUpdate( {title: "Rigatoni alla Genovese"},{ duration: 100 },
{ new: true },)

Recipe.deleteOne({
  "title": "Carrot Cake",
  "level": "Amateur Chef",
  "ingredients": [
    "6 cups grated carrots",
    "1 cup brown sugar",
    "1 cup raisins",
    "4 eggs",
    "1 1/2 cups white sugar",
    "1 cup vegetable oil",
    "2 teaspoons vanilla extract",
    "1 cup crushed pineapple, drained",
    "3 cups all-purpose flour",
    "1 1/2 teaspoons baking soda",
    "1 teaspoon salt",
    "4 teaspoons ground cinnamon"
  ],
  "cuisine": "International",
  "dishType": "dessert",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
  "duration": 130,
  "creator": "Chef Nadia"
})
.then(successCallback)
.catch(errorCallback);

mongoose.connection.close();

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
