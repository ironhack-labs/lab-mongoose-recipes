const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose.set('useFindAndModify', false); // Add to eliminate a warning message from mongoose, as the documentation indicate

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
    // Add manually a recipe. I use my curry spice mix ;-) For cook, stir-fry 1/2tbsp of garlic, 1/2tbsp of fresh ginger and an onion. Add the mix and tomato sauce, cream or whatever. Better use sunflower oil
    const manualRecipe = {
      title: "Curry Spices mix",
      level: "Easy Peasy",
      ingredients: ["1/2tbsp clove", "1tsp curcuma", "1-1/2tbsp cumin", "1/2tbsp nutmeg", "2tbs coriander", "1 cup tomato", "1/8tbsp cayenne (optional)"],
      cuisine: "Indian",
      dishType: "other",
      duration: 0,
    }
    Recipe.create(manualRecipe)
      .then(oneRecipe => console.log(`The recipe ${oneRecipe.title} is now in the database!`))
      .catch(err => console.log(`Ups, error: ${err}`))
  })
  .then(() => {
    // Add all the data and return to manipulate later
    return Recipe.create(data)
  })
  .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })) // Replace manually the duration of the Rigatoni alla Genovese. 
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
  }) // Remove the Carrot Cake manually. with the return, the array with all the recipes not longer exists, but allow indicate the remove with a console.log in the next line
  .then(removedRecipe=> console.log(removedRecipe)) // Delete must be the last operation because with the return, allRecipes are no longer aviable in the memory
  .catch(error => console.error('Error connecting to the database', error));



// Mongooose events
// When successfully connected
mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));

// If the connection throws an error
mongoose.connection.on('error', err => console.log(`Mongoose default connection error: ${err}`));

// When the connection is disconnected
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'))

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  })
})
