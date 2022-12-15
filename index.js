const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';

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
      title: "Pumpkin Soup",
      level: "Easy Peasy",
      ingredients: ["pumpkin", "potato", "onion", "garlic", "vegetable broth", "olive oil", "salt", "pepper", "cream", "chili"],
      cuisine: "German",
      dishType: "soup",
      image: "https://media.healthyfood.com/wp-content/uploads/2019/07/Creamy-pumpkin-soup-1024x638.jpg",
      duration: 30,
      creator: "Chef Laura"
    }
    
    return Recipe.create(newRecipe)
    
  })
  .then((newRecipe) => {
    console.log(newRecipe)
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((data) => {
    data.forEach(object => {
      console.log(object.title)
    })
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100} )
  })
  .then(() => {
    console.log("Duration updated!")
  })
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => {
    console.log("Carrot Cake deleted!")
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
 