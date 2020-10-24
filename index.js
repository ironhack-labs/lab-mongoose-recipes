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
    //Recipe.create(data[0]).then(recipe => console.log(recipe.title));
    return Recipe.insertMany(data)
  })
  .then(recipes => {
    return recipes.forEach(recipe => {
      console.log(recipe.title)
    })
  })
  .then(() => {
    return Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  })
  .then(() => {
    return console.log("Succesfully updated")
  })
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => {
    console.log("Successfully removed")
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

