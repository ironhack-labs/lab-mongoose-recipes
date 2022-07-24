const mongoose = require('mongoose');

const recipes = require('./data.json');
// Import of the data from './data.json'

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model")

// Connection to the database "recipe-app"
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
mongoose
  .connect(MONGODB_URI)
  .then(async (x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones

    return Recipe.deleteMany()
  })
  .then(async (x) => {
    await Recipe.create({
      title: "Banana Cake",
      level: "basic",
      ingredients: ["banana", "sugar", "milk"],
      cuisine: "American",
      dishType: "dessert",
      image: "https://www.delish.com/cooking/recipe-ideas/a22745193/easy-banana-cake-recipe/",
      duration: 30,
      creator: "elvan",
      created: new Date(),
    })
    console.log(`Banana Cake Recipe`)
  })
  .then(async (x) => {
    await Recipe.deleteMany()
  })
  .then(async (x) => {
    await Recipe.insertMany(recipes)
  })
  .then(async (x) => {
    await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  })
  .then(async (x) => {
    await Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(async () => {
    await mongoose.connection.close()
  });


