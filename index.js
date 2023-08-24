const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

const myFirstRecipe = {
  title: "Orzo With Mozarella and Smoked Mushrooms",
  level: "Easy Peasy",
  ingredients: [
    "champinions",
    "spice mixonion",
    "garlic",
    "cherry tomatoes",
    "tomato pesto",
    "grated hard cheese",
    "basil",
  ],
  cuisine: "Extra Stuff",
  dishType: "main_course",
  duration: 40,
  creator: "HalloFResh",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany()
  })
  .then(() => {

    return Recipe.create(myFirstRecipe)
  })
  .then(() => { console.log(myFirstRecipe.title) })
  .then(()=>{
    Recipe.insertMany(data)
    data.forEach((element)=>{console.log(element.title)})
  }).then(()=>{
   return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration : 100})
  })
  .then(()=>{
    console.log("success")
  })
  .then(()=>{
  return Recipe.deleteOne({title:"Carrot Cake"})
  })
  .then(()=>{
    console.log("bye bye Carote Cake") 
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

