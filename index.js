const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newRecipe = {
  title: "Feijoada",
  level: "Ultrapro Chef",
  ingredients: [ "Feijão preto, Pé de porco, Orelha de porco, Joelho de porco, Carne de sol" ],
  cousine: "Brasileira",
  dishType: [ "main course" ],
  image: "https://images.app.goo.gl/5q72qENghaqCYxdx9",
  duaration: 90,
  creator: "Negada da senzala",
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const createRecipe = Recipe.create(newRecipe);
    return createdRecipe;
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
