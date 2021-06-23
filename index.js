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
  .then(() => {
    return Recipe.syncIndexes()
  })

  //Iteration 2 : Create a recipe

  // .then(() => {

  //   Recipe

  //     .create({
  //       title: "Chocolate Chip Cookies",
  //       level: "Amateur Chef",
  //       ingredients: [
  //         "1/2 cup light brown sugar",
  //         "1 large egg",
  //         "2 tablespoons milk",
  //         "1 1/4 teaspoons vanilla extract",
  //         "2 cups semisweet chocolate chips"
  //       ],
  //       cuisine: "French",
  //       dishType: "dessert",
  //       image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4398987.jpg&w=596&h=399.32000000000005&c=sc&poi=face&q=85",
  //       duration: 30,
  //       creator: "Chef Jennifer",
  //     })

  // Iteration 3 : Insert multiple recipes
  .then(() => Recipe.create(data))
  .then(recipes => recipes.forEach((recipe) =>
    console.log('Se creó la siguiente receta: ', recipe.title)))

  // Iteration 4 : Update recipe
  .then(() => Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }))
  .then(recipe => console.log('Se modificó correctamente la receta de: ', recipe.title))

  //Iteration 5 : Remove a recipe
  .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
  .then(() => console.log('La receta se suprimió de la base de datos'))


  //Iteration 6 : Close the Database
  .then(() => mongoose.connection.close(() => {
    console.log('Mongoose disconnected')
  }))

  .catch(err => console.log('Se produjo un error.... =>', err))



  .catch(error => {
    console.error('Error connecting to the database', error);
  });
