const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const myNewRecipe = {
  title: 'Cubana Rice',
  level: 'Easy Peasy',
  ingredients: 'Rice, Eggs and Tomato Sauce',
  cuisine: 'Begginers cuisine',
  dishType: 'main_course',
  duration: 30,
  creator: 'Chef Pepe',
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(myNewRecipe)
  })

  .then(() => {
    return Recipe.insertMany(data);
  })

  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true });
  })

  .then(() => {
    console.log("RigatoniUpdated")
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  .then((CarrotDeleted) => {
    console.log(CarrotDeleted)
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  .finally(() => {
    (mongoose.disconnect())
  })
