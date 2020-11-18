const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

let newRecipe = {
  title: 'Tandoori Chicken',
  level: 'Easy Peasy',
  ingredients: ['Chicken', 'Paprika', 'Rice', 'Chickpeas', 'Tandoori Sauce'],
  cuisine: 'Indian',
  dishType: 'main_course',
  image: 'https://www.leukerecepten.nl/wp-content/uploads/2019/08/Kip-tandoori.jpg',
  duration: 15,
  creator: 'Chef Shirley'
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
    return self.connection.dropDatabase();
  })
  .then(() => {
  //   // Iteration 2
  //   Recipe
  //     .create(newRecipe)
  //     .then(addedRecipe => console.log(`This recipe has been added: ${addedRecipe.title}`))
  //     .catch(error => console.log(`The recipe has not been added due to an error`, error));
  // });

  //   // Iteration 3
  //   Recipe
  //     .insertMany(data)
  //     .then(addedRecipes => {
  //       addedRecipes.forEach((recipe) => console.log(`Recipes added ${recipe.title}`));
  //     })
  //     .catch(error => console.log(`The recipes were not added due to an error`, error));
    
  //   // Iteration 4
  //   Recipe
  //     .findOneAndUpdate({
  //       title: "Rigatoni alla Genovese"
  //     }, {
  //       duration: 100
  //     })
  //     .then(updatedRecipe => console.log(`The following recipe has been updated: ${updatedRecipe.title}`))
  //     .catch(error => console.log(`The recipe could not be updated due to an error`, error));
    
  //   // Iteration 5
  //   Recipe
  //     .deleteOne({
  //       title: "Carrot Cake"
  //     })
  //     .then(() => console.log(`The 'Carrot Cake' recipe has been deleted`))
  //     .catch(error => console.log(`The 'Carrot Cake' recipe could not be deleted`, error));
    
    
  //   // Iteration 6
  //   mongoose.connection.close()
  //     .then(() => console.log(`The connection has been closed`))
  //     .catch(error => console.log(`The connection could not be closed due to an error`, error))

  .catch(error => {
    console.error('Error connecting to the database', error);
  });