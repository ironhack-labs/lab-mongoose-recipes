const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");
const Recipe = require("./models/Recipe.js");

mongoose
  .connect(
    "mongodb://localhost/recipeApp",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let iteration2 = Recipe.create({
  title: "Strogonoff",
  level: "Easy Peasy",
  job: "Job?",
  ingredients: ["tomato", "beef"],
  cuisine: "Brazilian's stole it",
  dishType: "Dish",
  duration: 0,
  creator: "Rodrigo"
});
//
let iteration3 = Recipe.insertMany(data);

let iteration4 = Recipe.updateOne(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 }
);

let iteration5 = Recipe.deleteOne({ name: "Carrot Cake" });

Promise.all([iteration2, iteration3])
  .then(values => {
    Recipe.find({}).then(success => {
      success.forEach(recipes => {
        console.log(
          `${recipes.title} have been added to the Recipes collection.`
        );
      });

      Promise.all([iteration4, iteration5])
        .then(values => {
          mongoose.connection.close();
        })
        .catch(err => console.error(err));
    });
  })

  .catch(err => {
    console.log(`Error on Promise.all: ${err}`);
  });
