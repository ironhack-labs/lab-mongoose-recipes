const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  // .then(() => {
  //   return Recipe.create({
  //     title: 'pizza',
  //     level: 'UltraPro Chef',
  //     ingredients:['wheat', 'water', 'yeast', 'salt', 'tomato', 'mozarella', 'pepperoni'],
  //     cuisine: 'italian',
  //     dishType: 'main_course',
  //     duration: 2,
  //     creator: 'Luis'
  //   })
  // })
  // .then((pizza)=> {
  //   console.log(pizza);
  // })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((manyRecipes) => {
    console.log(manyRecipes);
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { returnOriginal: false }
    );
  })
  .then((Pasta) => {
    console.log("successful updated -->" + Pasta);
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("successful deleted --> Carrot Cake");
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
