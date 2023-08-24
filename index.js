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
    return Recipe.create({
      title: "Ice cream",
      level: "Easy Peasy",
      cuisine: "asian",
    }
    )
    .then((myRecipe)=>{
      console.log(`${myRecipe.title}`);

     return Recipe.insertMany(data)
    })
    .then((recipeArr)=>{
      data.forEach(element => {
        console.log(element.title)
      });

      return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    })
    .then((updatedRecipe)=>{
      console.log("We updated the duration!!!")

      const deleteCake = Recipe.deleteOne({title: "Carrot Cake"})
      return deleteCake
    })
    .then((deleteCake) => {
      console.log("You deleted the cake :c")
      mongoose.disconnect();
      console.log("you are no longer connected")
    })

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
