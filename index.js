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
  .then(async() => {
    // Run your code here, after you have insured that the connection was made
    
    //Iteration 2

    /*const recipe = new Recipe({
      title: "Sandwich",
      level: "Easy Peasy",
      ingredients: ["Bread", "Cheese", "Ham"],
      cuisine: "American",
      dishType: "snack",
      duration: 10,
      creator: "Unknown"
      })
    await recipe.save()
    })*/

    //Iteration 3

    /*Recipe.insertMany(data)
      .then(() => console.log("Data inserted"))
      .catch(err => console.error(err))*/

    //Iteration 4

    /*Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, { $set: { duration: 100 } }, { new: true })
      .then(recipe => console.log(recipe))
      catch(error => console.error(error))*/

    //Iteration 5
    
    Recipe.deleteOne({ title: 'Carrot Cake' })
      .then(recipe => console.log(recipe))
      .catch(error => console.error(error))
    })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
