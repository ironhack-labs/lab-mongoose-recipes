const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany();
  })
  .then(() => {
    // const firstRecipe = Recipe.create({
    //   title: "Good old fashioned Pancakes",
    //   level: "Easy Peasy",
    //   ingredients: [
    //     "1 ½ cups all-purpose flour",
    //     "3 ½ teaspoons baking powder",
    //     "¼ teaspoon salt, or more to taste",
    //     "1 tablespoon white sugar",
    //     "1 ¼ cups milk",
    //     "1 egg",
    //     "3 tablespoons butter",
    //   ],
    //   cuisine: "American",
    //   dishType: "breakfast",
    //   image:
    //     "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F02%2F17%2F21014-Good-old-Fashioned-Pancakes-mfs_002.jpg",
    //   duration: 20,
    //   creator: "chefgodzilla",
    //   created: new Date(2022, 05, 06),
    // });
    // console.log("Recipe title", firstRecipe);

    // const manyRecipes = Recipe.insertMany(data);

    const updatedRecipe = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );
    // console.log(updatedRecipe, "was updated succesfully");

    const deletedRecipe = Recipe.deleteOne({ title: "Carrot Cake" });

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
