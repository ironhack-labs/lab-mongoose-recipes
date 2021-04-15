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

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  Recipe.insertMany(data)
  .then(recipes => {
    console.log(`Recipes added: ${recipes.length}`)
  })
  .catch(error => console.error(error));

  // const recipe1 = {
  //   title: "Pizza Ironhack",
  //   level: "Easy Peasy",
  //   ingredients: ["Flour", "Tomato", "Cheese", "Beacon", "Oregano", "Basil"],
  //   cuisine: "Italian",
  //   dishType: "main_course",
  //   image: "https://www.currizzas.co.nz/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/h/cheese_and_bacon_1.png",
  //   duration: 40,
  //   creator: "Ironhack"
  // }

  // Recipe.create(recipe1)
  // .then(recipes => {
  //   console.log(`Recipe created: ${recipe.title}`)
  // })
  // .catch(error => console.error(error));

