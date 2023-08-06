const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    //Create new recipe, chaining into the return of .then
    return (Recipe.create({
      title: "Banitza",
      level: "Amateur Chef",
      ingredients: ["feta cheese", "yogurt", "dough", "eggs"],
      cuisine: "Bulgarian",
      dishType: "breakfast",
      duration: 30,
      creator: "Vanya",
    }))

      .then((createdRecipe) => {
        console.log(`Created recipe ${createdRecipe.title}`);
        // Chain promises adding Recipe.insertMany in the return
        return Recipe.insertMany(data);
      })
      .then(() => {
        data.forEach((recipe) => {
          console.log(`Inserted recipe: ${recipe.title}`);
        });
        // Chain promises updating recipe in the return
        return Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        );
      })
      .then((updatedRecipe) => {
        if (updatedRecipe) {
          console.log("update success");
        } else {
          console.log("Recipe not found for update");
        }

// Chain promises deleting recipe in the return
        return Recipe.deleteOne({ title: "Carrot Cake" });
      })
      .then((deletion) => {
        //.deletedCount -> an attribute that belongs to the deletion object returned when executing a delete operation in MongoDB
        if (deletion.deletedCount > 0) {
          console.log("delete success");
        } else {
          console.log("recipe not found to delete");
        }
        mongoose.connection.close();
      })
      .catch((err) => console.log("Error connecting to the database", err));
  }); 

  /* Same code done with async await (VSCode help)

   //Async Await Syntax

  const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    try {
      const createdRecipe = await (Recipe.create({
        title: "Banitza 4",
        level: "Amateur Chef",
        ingredients: ["feta cheese", "yogurt", "dough", "eggs"],
        cuisine: "Bulgarian",
        dishType: "breakfast",
        duration: 30,
        creator: "Vanya",
      }));
      console.log(`Created recipe ${createdRecipe.title}`);
      await Recipe.insertMany(data);
      data.forEach((recipe) => {
        console.log(recipe.title);
      });
      const updatedRecipe = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 160 },
        { new: true }
      );
      if (updatedRecipe) {
        console.log("update success");
      } else {
        console.log("Recipe not found for update");
      }
      const deletion = await Recipe.deleteOne({ title: "Carrot Cake" });
      if (deletion.deletedCount > 0) {
        console.log("delete success");
      } else {
        console.log("recipe not found to delete");
      }
      mongoose.connection.close();
    } catch (err) {
      return console.log("Error connecting to the database", err);
    }
  }); */
