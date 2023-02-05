const mongoose = require('mongoose');
moongose.set ('strictQuery', true);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';


//Recipe
const newRecipe = {
  title: "XXXXX",
  level: "Amateur Chef",
  ingredients: [
    "50 g xxx",
    "50 g yyy",
    "250 g zzz",
  ],
  cuisine: "spanish",
  dishType: "soup",
  duration: 45,
  creator: "Maria",
};



// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    Recipe.create(newRecipe, () => console.log(newRecipe.title));
    Recipe.insertMany(data, () =>
      data.forEach((recipe) => console.log(recipe.title))
    );
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {$set: {duration: 100}})
  })
  .then(() => {
    return Recipe.deleteOne({"title": "Carrot Cake"})
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
