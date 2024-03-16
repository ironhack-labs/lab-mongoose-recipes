const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
   Recipe
    .create({title: "brownie", level: "Easy Peasy", ingredients: ["chocolate","eggs","flour"], cuisine: "American", dishtType: "dessert", duration: 45, creator: "Raul and Chiara"})
    .then(recipe => console.log("El titulo de la receta es:", recipe.title ))

  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  Recipe
    .insertMany(data)
    .then(recipe => {
      recipe.forEach(recipe => console.log("FUNCIONA?", recipe.title))
    } )
    .catch(err => console.log("yay", err))

  Recipe
  .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(() => {
    console.log("Updated Rigatoni alla Genovese duration to 100 minutes");
  })
  .catch(error => {
    console.error('Error updating recipe', error);
  });

  Recipe
    .deleteOne({title : "Carrot Cake"})
    .then(() => {
      console.log("Removed Carrot Cake from the database")
    })
    .catch(error => {
      console.log("Removed Carrot Cake from the database", error)
    })

process.on('SIGINT', () => {
  mongoose.connection.close()
  console.log('Mongoose default connection disconnected through app termination')
})