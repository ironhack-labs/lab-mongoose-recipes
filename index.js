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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Tiramisu",
      level: "Amateur Chef",
      ingredients: ["Mascarpone", "Cafe", "Amaretto", "biscuit"],
      cuisine: "Italian",
      dishType: "dessert",
      duration: 45,
      creator: "IdonTKnow",
    }
    )
    .then((newRecipe) => console.log(`New recipe added ${newRecipe.title}`))
    .catch(error => {
      console.error('Error connecting to the database', error);
    });


  })
  .then(() =>  { 
    Recipe.insertMany(data)
    .then((recipes) => recipes.map(recipe => console.log(recipe.title)))
    .then(() => {
      Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese" },
      {duration: 100},
      { new : true }
      )
      .then((updtadedRecipe) => console.log(updtadedRecipe))
      .catch(error => console.error('Error connecting to the database', error))})
    .then(() => Recipe.deleteOne(
      {title: "Carrot Cake"}
    ))
    .catch(error => {
      console.error('Error connecting to the database', error)})})

      
  .then(() =>  mongoose.connection.close(() => console.log('Mongoose default connection disconnected through app termination')))

  .catch(error => {
    console.error('Error connecting to the database', error)});

  


