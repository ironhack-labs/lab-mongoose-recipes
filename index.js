const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const myRecipe = {
  title: "Galician Soup Broth",
  level: 'Easy Peasy',
  ingredients: [
    "8 ounce (225 grams) dry white beans",
    "32 ounce (1 liter) water",
    "1 ham bone",
    "1 veal (or beef) bone",
    "1 ounces (20 gram) pork fat",
    "2 handfuls fresh turnip leaves",
    "2 pounds (1 kilogram) potatoes",
    "salt to taste"
  ],
  dishType:"soup",
  cuisine: "Galician",
  duration: 100,
  creator: "celtic ancestor",
  date: new Date()
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

  //Iteration 2 - Create a recipe
   .then(() => {
   Recipe
    .create(myRecipe)
    .then(recipe => console.log(recipe.title))
    .catch(error => console.error('Creating new recipe error:', error))
  }) 
  //Iteration 3 - Insert multiple recipes
  .then(() => {
     Recipe
      .insertMany(data)
      .then(totallistrecipes => totallistrecipes.forEach(recipe => console.log(recipe.title)))
      .catch(error => console.error('Inserting multiple recipes error:', error))
    }) 
  //Iteration 4 - Update recipe
  .then(() => {
    Recipe
    .findOneAndUpdate({title: 'Rigatoni alla Genovese'}, { $set: {duration: '100'}}, {new: true})
    .then((updated) => console.log("Success!.Recipe updated",updated))
    .catch(error => console.error('Updating recipe error:', error))
    }) 
  //Iteration 5 - Remove a recipe
  .then(() => {
      Recipe
      .deleteOne({title: 'Carrot Cake'})
      .then((res)=> console.log('Success!.Recipe deleted:', res))
      .catch(error => console.error('Recipe deletion error:', error))
    }) 
    
  // //Iteration 6 - Close the Database
  // .then(() => mongoose.connection.close() )


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
