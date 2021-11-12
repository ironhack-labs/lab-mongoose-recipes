const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (err) {
    console.log('Error connecting to the database', err);
  }
};
connectToMongo();

// ITERATION 2

// const createRecipe = async () => {
//   try {
//     await Recipe.deleteMany();
//     const response = await Recipe.create({
//       title: 'Asian Glazed Chicken Thighs',
//       level: 'Amateur Chef',
//       ingredients: [
//         '1/2 cup rice vinegar',
//         '5 tablespoons honey',
//         '1/3 cup soy sauce (such as Silver Swan®)',
//         '1/4 cup Asian (toasted) sesame oil',
//         '3 tablespoons Asian chili garlic sauce',
//         '3 tablespoons minced garlic',
//         'salt to taste',
//         '8 skinless, boneless chicken thighs',
//       ],
//       cuisine: 'Asian',
//       dishType: 'main_course',
//       image:
//         'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
//       duration: 40,
//       creator: 'Chef LePapu',
//     });
//     console.log(response.title);
//   } catch (err) {
//     console.log('Error:', err);
//   }
// };
// createRecipe();

// ITERATION 3

const createRecipe = async () => {
  try {
    await Recipe.deleteMany();
    const response = await Recipe.create(data);
    response.forEach((recipe) => {
      console.log(recipe.title)
    })
  } catch (err) {
    console.log('Error:', err);
  }
};
createRecipe();