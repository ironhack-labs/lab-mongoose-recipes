const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

let newRecipe = {
  title: "Fish & Chips",
  level: "Easy Peasy",
  ingredients: ["salt", "vinegar"],
  cuisine: "English",
  dishType: "main_course",
  duration: 5,
  creator: "Zubair",
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
    // Run your code here, after you have insured that the connection was made
    Recipe.create(newRecipe)
      .then((data) => {
        console.log(`${data.title} is done`);
      })
      .then(() => {
        Recipe.insertMany(data).then((data) => {
          data.forEach((element) => {
            console.log(element.title);
          });
        });
      })
      .then(() => {
        const rigatoni = { title: "Rigatoni alla Genovese" };
        const update = { duration: 100 };
        Recipe.findOneAndUpdate(rigatoni, update)
          .then(() => {
            console.log("recipe updated");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .then(() => {
        Recipe.deleteOne({ title: "Carrot Cake" }).then(() => {
          console.log("remove");
        });
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

mongoose.connection.close().then(() => {
  console.log("connection closed");
});
