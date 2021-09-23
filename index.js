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
  .then(async() => {
    // Iteration 2
    await Recipe.insertMany(data)

    // Iteration 3
    await Recipe

    //Iteration 4
    Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},{duration: 100})
    .then((updated) => {
      console.log("updatedRecipe");
      return updated;
    })

    // Iteration 5
    Recipe.deleteOne({ title: "Carrot Cake" })
    .then((recipe) => console.log("deleted"))

    // Iteration 6
    .then(() => {
      console.log("allRecipes")
      return mongoose.connection.dropDatabase();
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
