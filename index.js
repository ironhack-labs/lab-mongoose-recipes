const mongoose = require("mongoose");
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const recipes = require("./data");
const recipe = require("./recipe");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const successInsertCallback = (data) => {
  console.log("\nSuccesful recipe insertion: \n");
  for (const recipe of data) console.log(recipe.title);
};
const successUpdateCallback = (data) =>
  console.log("\nRecipe: " + data.title + " updated\n");

const successDeleteCallback = (data) => {
  if (data.deletedCount > 0) console.log("\nRecipe successfuly deleted\n");
  else console.log("\nRecipe to be deleted could not be found\n");
};
const errorCallback = (error) => console.log("An error occurred", error);

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(async () => {
    // SINGLE RECIPE
    await Recipe.create(recipe).then((recipe) => successInsertCallback(recipe));
  })
  .then(async () => {
    // MULTIPLE RECIPES
    await Recipe.insertMany(recipes).then((recipes) =>
      successInsertCallback(recipes)
    );
  })
  .then(async () => {
    // UPDATING A SINGLE DOCUMENT
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    ).then((updatedRecipe) => successUpdateCallback(updatedRecipe));
  })
  .then(async () => {
    //DELETING A SINGLE DOCUMENT
    await Recipe.deleteOne({ title: "Carrot Cake" }).then((deletedRecipe) =>
      successDeleteCallback(deletedRecipe)
    );
  })
  .catch((error) => {
    errorCallback(error.message);
  })
  .finally(() => {
    console.log(mongoose.connection.readyState )
    if (mongoose.connection.readyState === 1) mongoose.connection.close();
    console.log(mongoose.connection.readyState )
  });


  //Ready states

  // 0: disconnected
  // 1: connected
  // 2: connecting
  // 3: disconnecting

 
