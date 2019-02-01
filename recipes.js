//Setup

const express = require("express");
const mongoose = require("mongoose");

const data = require("./data.js");
const Recipe = require("./models/Recipe.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app = express();

app.listen(6060, () => {
  console.log("Recipes server READY !");
});

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");

var promiseArray = [];

//Routes

//Queries

// Iteration 2
/*
let promise1 = Recipe.create({
  title: "Recipe #1",
  level: "Easy Peasy",
  ingredients: ["Eggs", "Flour", "Butter"],
  cuisine: "French",
  dishType: "Dish",
  duration: 15,
  creator: "Armand"
})
  .then(recipeDoc => {
    console.log(`Recipe ${recipeDoc.title} CREATE success!`, recipeDoc);
  })
  .catch(err => {
    console.log("Recipe CREATE failure!", err);
  });

promiseArray.push(promise1);
*/

// Iteration 3
/*
let promise2 = Recipe.insertMany(data)
  .then(recipes => {
    recipes.forEach(recipe => {
      console.log(`Recipe ${recipe.title} CREATE success!`);
    });
  })
  .catch(err => {
    console.log("Recipes CREATE failure!", err);
  });

promiseArray.push(promise2);
*/

// TEST : Delete the whole collection
/*
let promise3 = Recipe.deleteMany({})
  .then(result => {
    console.log("Recipe DELETE MANY success!", result);
  })
  .catch(err => {
    console.log("Recipe DELETE MANY failure!", err);
  });

promiseArray.push(promise3);
*/

// Iteration 4
/*
// TEST : check duration before the actual update
let promise4 = Recipe.find({ title: { $eq: "Rigatoni alla Genovese" } })
  .then(recipe => {
    console.log(recipe);
    console.log(`Old duration was ${recipe[0].duration}`);
  })
  .catch(err => {
    console.log("Recipe FIND #1 failure!", err);
  });

promiseArray.push(promise4);
*/

/*
let promise5 = Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(result => {
    console.log(result);
    Recipe.find({ title: { $eq: "Rigatoni alla Genovese" } })
      .then(recipe => {
        console.log(recipe);
        console.log(`New duration is ${recipe[0].duration}`);
      })
      .catch(err => {
        console.log("Recipe FIND #2 failure!", err);
      });
  })
  .catch(err => {
    console.log("Recipe FIND & UPDATE failure!", err);
  });

promiseArray.push(promise5);
*/

// Iteration 5
/*
let promise6 = Recipe.deleteMany({ title: { $eq: "Carrot Cake" } })
  .then(result => {
    console.log(result);
    if (result.n) {
      console.log("DELETED 'Carrot Cake' successfully!");
    } else {
      console.log("Couldn't find any 'Carrot Cake' to delete!");
    }
  })
  .catch(err => {
    console.log("Recipe DELETE MANY failure!", err);
  });

promiseArray.push(promise6);
*/

// TEST : re-create 'Carrot Cake' entry in database, in case i want to re-test the delete function above.

let promise7 = Recipe.create(data[2])
  .then(recipeDoc => {
    console.log(`Recipe ${recipeDoc.title} CREATE success!`);
  })
  .catch(err => {
    console.log("Recipe 'Carrot Cake' CREATE failure!", err);
  });

promiseArray.push(promise7);

// Iteration 6

Promise.all(promiseArray)
  .then(() => {
    console.log(
      "All operations are now finished. Will close the connection to database."
    );
    mongoose.connection.close(() => {
      console.log("Mongoose default connection disconnected.");
      process.exit(0);
    });
  })
  .catch(err => console.error(err));

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination."
    );
    process.exit(0);
  });
});
