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
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Pizza",
      level: "Easy Peasy",
      ingredients: ["Tomatoes", "Mozzarella"],
      cuisine: "Italy",
      duration: 25
    })
  })
  .then((recipe) => {
    console.log(recipe.title);
    return Recipe.insertMany(data)
  })
  .then((recipesArr) => {
    recipesArr.forEach((recipe) => {
      console.log(recipe.title);
    })
    return Recipe.findOneAndUpdate({title : "Rigatoni alla Genovese"},{duration : 100},{returnOriginal:false})
  })
  .then((recipe)=>{
    console.log("Rigatoni is Updated");
    return Recipe.deleteOne({title: "Carrot Cake" })
  })
  .then(()=>{
    console.log("Bye bye Carrot Cake!");
    return mongoose.disconnect();
  })
  .then(()=> console.log("Mongoose is disconnected!"))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
