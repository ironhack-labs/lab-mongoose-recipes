const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    const newRecipe = {
      title: "las croquetas de la abuela",
      level: 'Amateur Chef',
      ingredients: ['500 ml of milk', '200 gr of cooked meat', '3 heaping tablespoons of flour', '2 butter spoons', 'Salt and pepper to taste', '1 teaspoon of nutmeg', 'Olive oil', '2 eggs', 'Breadcrumbs for coating' ],
      cuisine: 'Spain',
      dishType: 'main_course',
      image: "https://images.ecestaticos.com/ZXTLBoGv8UI6D8ZSUGJExlQ9CxI=/157x145:1851x1413/1200x899/filters:fill(white):format(jpg)/https%3A%2F%2Ff.elconfidencial.com%2Foriginal%2Ff0c%2F00f%2F42f%2Ff0c00f42f55595bc764727c9320c26c7.jpg",
      duration: 90,
      creator: 'Chef Fredi',
      };
      console.log(newRecipe.title)
      return Recipe.create(newRecipe)
  }).then(recipe => {
    console.log(recipe)
    return Recipe.create(data)
  }).then(recipe => {
    console.log(recipe)
    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{ duration: 100 },{new: true})
  }).then(recipe => {
    console.log(recipe)
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
