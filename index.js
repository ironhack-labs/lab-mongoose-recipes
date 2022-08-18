const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(async () => {
    // todo Iteration 2 - Create a recipe

    const yuanRecipe = await Recipe.create({
      title: "yuanRecipes",
      level: "UltraPro Chef",
      ingredients: "Apple",
      cuisine: "Chinese",
      dishType: "snack",
      duration: 20,
      creator: "yuan",
    });

    //todo  Iteration 3 - Insert multiple recipes
    const dataRecipes = await Recipe.insertMany(data);

    //todo Iteration 4 - Update recipe

    // const updateRigatoni = await Recipe.findOneAndUpdate(
    //   {
    //     title: "Rigatoni alla Genovese",
    //   },
    //   {
    //     duration: 100,
    //   },
    //   function () {
    //     console.log("Update Done !");
    //   }
    // );

    // todo Iteration 5 - Remove a recipe
    const res = await Recipe.deleteOne({title: "Carrot Cake" }, function(){
      console.log("finally done ");
    });
    res.deletedCount; 

    await mongoose.disconnect(); 
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
