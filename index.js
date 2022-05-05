const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

let recipe = {
  title: "Açorda Recipe",
  level: "Easy Peasy",
  ingredients: [
    "6 eggs, 8 gloves garlic, 1 bunch cilantro, 6 slices alentejano bread, 1/4 cup olive oil, 8 cups water, salt, peper",
  ],
  cuisine: "Portuguese",
  dishType: "main-course",
  duration: 25,
  creator: "me",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
     return Recipe.deleteMany();
  })
  .then(() => {
           Recipe.create(recipe)
      .then((newRecipe) => console.log(`created new user: ${newRecipe.title}`))
      .catch((err) => console.log(err));  
    // Insert multiple recipes:
      Recipe.insertMany(data)
      .then((multiRecp) => {
        multiRecp.forEach((rec) =>
          console.log(`created new user: ${rec.title}`)
        );
      })
      .catch((err) => console.log(err));
  }) 
     Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then((recipe) => console.log(recipe))
      .catch((err) => console.log(err)); 
       Recipe.deleteOne({ title: "Carrot Cake" })
      .then((recipe) => console.log("Recipe succesfully deleted!"))
      .catch((err) => console.log(err)); 
    mongoose.disconnect();
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
