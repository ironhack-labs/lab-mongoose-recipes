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
    return Recipe.insertMany(data)
      .then(data.forEach(recipe => {
        console.log(`${recipe.title}`);
    }))
      .catch(error => {
        console.log('An error occurred inserting recipes', error);
      });
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
      .then(recipe => {
        console.log(`Update successful! ${recipe.title} now takes ${recipe.duration} minutes to make`);
      })
      .catch(error => {
        console.log('An error occurred updating the recipe', error);
      });
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
      .then(recipe => {
        console.log('The recipe has been succesfully deleted from the database');
      })
      .catch(error => {
        console.log('An error occurred deleting the recipe', error);
      });
  })
  .then(() => {
    mongoose.connection.close();
    console.log('Connection with the database closed');
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
