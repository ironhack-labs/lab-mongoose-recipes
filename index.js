const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect("mongodb://127.0.0.1:27017/recipe-app")
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const newRecipe = {
      title: "Strawberry Cake",
      level: "Amateur Chef",
      ingredients: ["2 cups sugar", "1 cup butter", "4 large eggs", "2 cups flour", "1 cup milk", "1/2 cup strawberries"],
      cuisine: "Asian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu",
    };

    return Recipe.create(newRecipe);
  })
  .then((createdRecipe) => {
    console.log("Recipe title:", createdRecipe.title);
  })
  .then(() => {
    Recipe.insertMany(data);
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].title);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// Recipe.insertMany(data)
//   .then((recipes) => {
//     console.log(recipes);

//     for (let i = 0; i < data.length; i++) {
//       console.log(data[i].title);
//     }
//   })
// .catch((err) => {
//   console.log(err);
// });

Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  .then((updatedRecipe) => {
    console.log("UpdatedRecipe: Rigatoni alla Genovese", updatedRecipe.duration);
  })
  .catch((err) => {
    console.log(err);
  });
