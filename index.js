const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
let oneRecipe = data[0];
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany();
  })
  .then(() => {
    /* 
    Recipe.create(oneRecipe)
    .then((newRecipe) => console.log(newRecipe.title))
    .catch((err) => console.log(err));  */
    /* 
    Recipe.insertMany(data)
      .then((recipe)=> recipe.forEach((value)=> console.log(value.title)))
      .catch((err) => console.log(err));  */
    /* 
       
  Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(() => console.log("Success"))
  .catch((err) => console.log(err));  */
    /*  Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => console.log("success again"))
      .catch((err) => console.log(err)); */
  })

  .then(() => mongoose.disconnect(() => console.log("Disconnected ")))

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
