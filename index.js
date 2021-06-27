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
    Recipe.create(oneRecipe)
    .then((createdRecipe) => console.log(createdRecipe))
    Recipe.insertMany(data)
    .then(createdRecipes => {
      createdRecipes.forEach((recipe) => console.log(recipe.title));
    }).then(() => {
      Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
      .then(console.log('Recipe updated!'))
      Recipe.deleteOne({title: 'Carrot Cake'}, {new: true})
      .then(console.log('Recipe deleted!'))
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  
  
  const oneRecipe = {
    title: 'new recipe',
    level: 'Easy Peasy', 
    ingredients: ['salt', 'pepper'], 
    cuisine: 1, 
    dishType: 'breakfast', 
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 60,
    creatory: 'Miki',
  };

mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

// this next part is listening to the node process, when it says the process is broken (SIGINT), it will disconnect from the database
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
  });