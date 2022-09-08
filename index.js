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
    //---------------------------------------------------------------------------------------------------- ADD INDIVIDUAL RECIPE
    // Recipe.create({
    //   title: "Authentic Italian Pasta Alfredo",
    //   level: "Amateur Chef",
    //   ingredients: ["Pasta", "Alfredo Sauce"],
    //   cuisine: "Authentic Italian",
    //   dishType: "main_course",
    //   image:
    //     "https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1.jpg",
    //   duration: 15,
    //   creator: "Mario Linguini",
    //   created: Date.now(),
    // })
    //   .then((recipe) =>
    //     console.log("Recipe has been created in the database!", recipe)
    //   )
    //   .catch((error) => console.log("An Error has occured", error));

    //---------------------------------------------------------------------------------------------------- ADD MULTIPLE RECIPES
    Recipe.insertMany(data)
      .then((data) => {
        data.forEach((e) => {
          console.log(e.title);
        });
      })
      .catch((error) => {
        console.log(error);
      });

    //---------------------------------------------------------------------------------------------------- UPDATE RECIPE
    // Recipe.findOneAndUpdate(
    //   { title: "Rigatoni alla Genovese" },
    //   { duration: 100 }
    // )
    //   .then((recipe) => {
    //     console.log("The recipe has been updated");
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });

    //---------------------------------------------------------------------------------------------------- REMOVE RECIPE
    // Recipe.deleteOne({ title: "Carrot Cake" })
    //   .then((recipe) => {
    //     console.log("Recipe Successfully deleted!");
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
