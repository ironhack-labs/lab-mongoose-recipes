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
    const myNewRecipe = {
    title: "Asian Glazed Spaghetti Thighs",
    level: "UltraPro Chef",
    ingredients: [
      "2 cup rice vinegar",
      "10 tablespoons honey",
      "2/3 cup soy sauce (such as Silver Swan®)",
      "1/2 cup Asian (toasted) sesame oil",
      "6 tablespoons Asian chili garlic sauce",
      "6 tablespoons minced garlic",
      "2 salt to taste",
      "16 skinless, boneless chicken thighs"
    ],
    cuisine: "Japanesse",
    dishType: "soup",
    image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    duration: 80,
    creator: "Eric&Hugo"
    };
    return Recipe.create(myNewRecipe)
  })
  .then(responseFromMongoose =>{
    console.log(responseFromMongoose.title)
    return Recipe.insertMany(data)
  })
  .then(responseFromBD =>{
    const condition = {title: "Rigatoni alla Genovese"}
    return Recipe.findOneAndUpdate(condition,{$set:{duration:100}})
  })
  .then(responseFromUpdate =>{
    return Recipe.deleteOne({title:"Carrot Cake"})
  })
  .then(responseFromDelete =>{
    console.log("Deleted!")
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


 