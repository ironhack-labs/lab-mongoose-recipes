const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const newRecipe = {
      title: "Tiarmisu",
      level: "Amateur Chef",
      ingredients:["eggs","sugar","ladyfingers","coffee","marscapone","rum","vanille","cream"],
      cuisine: "Italian",
      dishType: "dessert",
      image: "https://www.sandravalvassori.com/wp-content/uploads/2022/04/Tiramisu-11484.jpg",
      duration: 240,
      creator: "Ado Campeol"
    }
    console.log(newRecipe.title);
    return Recipe.create(newRecipe)
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.findOneAndUpdate({
      title: "Rigatoni alla Genovese"
      },
      {
        duration: 100
      })
  })
  .then(() => console.log("Update the duration of Rigatoni alla Genovese successfully!"))
  .then(() => {
    return Recipe.deleteOne({
      title: "Carrot Cake"
      })
  })
  .then(() => console.log("Remove the Carrot cake successfully!"))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
