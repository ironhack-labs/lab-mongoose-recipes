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
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  function createRecipe(infos) {
    const {title, level, ingredients, cuisine, dishType, image, duration, creator, created } = infos;
    Recipe.create({
      title,
      level,
      ingredients,
      cuisine,
      dishType,
      image,
      duration,
      creator,
      created
    })
      .then((dbRecipeSuccess) => {
        console.log(dbRecipeSuccess);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createRecipe({
    title: "dhal",
    level: "Easy Peasy",
    ingredients: ["lentils", "ginger", "onions", "tomato", "coconut cream"],
    cuisine: "indian",
    dishType: "main_course",
    image: "https://www.kyleecooks.com/wp-content/uploads/2017/12/Spiced-Red-Lentil-Dhal-6-1024x683.jpg",
    duration: 20,
    creator: "Myriam",
    created: 24-02-2021,
  })
  // const dhalSchema = new recipeSchema({

  // })