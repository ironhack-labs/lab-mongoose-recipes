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
  .then((recipe) => {
    // Run your code here, after you have insured that the connection was made

        const ourRecipe = {
          title: "Lasagne",
          level: "Amateur Chef",
          ingredients: [
            "1L tomato sauce",
            "5 Pasta slice",
            "250g Meat",
            "salt to taste",
          ],
          cuisine: "Italian",
          dishType: "main_course",
          duration: 40,
          creator: "Chef Pierre & Paula"
        }
    return Recipe.create(ourRecipe)
  })
  .then((ourRecipe) => {
    console.log(ourRecipe.title);
    return Recipe.insertMany(data)
  })
  .then((arr)=> {
    console.log(arr);
    const nameFindOne = { title: "Rigatoni alla Genovese"};
    return Recipe.findOneAndUpdate(nameFindOne, {duration: 100},{ returnDocument : 'after'})
  })
  .then((modif) =>{
    console.log("Recipes Updated");
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then(() => {
    console.log("Carrot Cake Remove ! </3");

    console.log('pls close');
    
    mongoose.connection.close()

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

