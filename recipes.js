const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");
const Recipe = require("./models/recipe-model.js");

const terminate = mongoose.connection.close();

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

function creation() {
  Recipe.create({
    title: "Cocktail toasts",
    level: "Easy Peasy",
    ingredients: [
      "shrimps",
      "avocado",
      "sliced bread",
      "orange juice",
      "whisky",
      "garlic",
      "onion",
      "pepper",
      "butter"
    ],
    cuisine: "Fusion food",
    dishType: "Other",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 40,
    creator: "Bastien Tran",
    created: new Date()
  })

    // then() callbacks get called if the operation succeeded
    .then(recipeDoc => {
      console.log("Recipe CREATE success!", recipeDoc);
      batchInsert();
    })

    // catch() callbacks get called if the operation FAILS
    .catch(err => {
      console.log("Recipe CREATE failure!", err);
    });
}
function batchInsert() {
  Recipe.insertMany(data)
    .then(recipeDoc => {
      console.log("Recipe BATCH INSERT success!", recipeDoc.__title);
      batchUpdate();
    })
    .catch(err => {
      console.log("Recipe BATCH INSERT failure!", err);
    });
}

// I used updateMany since I didn't find a updateOne method but honestly I have,'t been searching much so far
function batchUpdate() {
  Recipe.updateMany(
    { title: { $eq: "Rigatoni alla Genovese" } },
    { $set: { duration: 100 } }
  )
    .then(results => {
      console.log("Rigatoni alla Genovese DURATION UPDATE SUCCESS", results);
      deletion();
    })
    .catch(err => {
      console.log("Rigatoni alla Genovese DURATION UPDATE FAILURE!", err);
    });
}

function deletion() {
  Recipe.deleteMany({ title: { $eq: "Carrot Cake" } })
    .then(results => {
      console.log("Recipe.deleteMany() SUCCESS!", results);
      mongoose.connection.close();
    })
    .catch(err => {
      console.log("Recipe.deleteMany() FAILURE", err);
    });
}

// creation(batchInsert(batchUpdate(deletion())));

// taskA()
//   .then(() => taskB())
//   .then(() => taskC())

creation();
