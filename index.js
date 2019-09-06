const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.insertMany(data)
  .then(data => {
    data.forEach(recipe => {
      console.log(recipe.title);
    });
    Recipe.create({
      title: "Parmigiana di Melanzane",
      level: "Easy Peasy",
      ingredients: [
        "1500g aubergine",
        "300g mozzarella",
        "2 eggs",
        "1 bunch basil",
        "as needed oil",
        "1000g tomato",
        "100g parmisan",
        "1/4 onion",
        "salt as needed"
      ],
      cuisine: "italian",
      dishType: "Dish",
      image: `
        https://www.donnamoderna.com/wp-content/uploads/2002/08/Teglia-di-parmigiana-di-melanzane-725x545.jpg`,
      duration: 80,
      creator: "Antonio Cannavacciuolo"
    })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        // console.log("Recipe not added");
        console.log(err);
      });

    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(() => {
        console.log("Success update");
      })
      .catch(() => {
        console.log("duration hasn't been updated");
      });

    Recipe.deleteOne({ creator: "Chef Nadia" })
      .then(() => {
        console.log("Carrot Cake has been deleted");
      })
      .catch(() => {
        console.log("Carrot Cake hasn't been deleted");
      });
    mongoose
      .disconnect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
      .then(() => {
        console.log("The DB is closed");
      })
      .catch(() => {
        console.log("DB is still open");
      });
  })
  .catch(err => {
    console.log("Error at creation: ", err);
  });
