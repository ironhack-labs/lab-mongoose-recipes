const mongoose = require("mongoose");
const express = require("express");

const app = express();

const PORT = process.env.PORT;
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const dataRecipe = {
      title: "tacos",
      level: `UltraPro Chef`,
      ingredients: ["carne", "cebolla", "cilantro", "tortilla"],
      cuisine: "Mexicana",
      dishType: `snack`,
      duration: 30,
      creator: "Sebastian Septien",
    };

    Recipe.create(dataRecipe, (error, rec) => {
      if (error) {
        console.log("An error happened:", error);
        return;
      }
      console.log("The recipe is saved and its value is: ", rec.title);
    });

    Recipe.insertMany(data)
      .then((rec) =>
        rec.map((r) =>
          console.log("The recipe is saved and its value is: ", r.title)
        )
      )
      .then(() => {
        Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
          .then((rec) => console.log(rec))
          .catch((err) => console.log(err));
      })
      .catch((error) => console.log("An error happened:", error));

    setTimeout(() => {
      Recipe.deleteOne({ title: "Carrot Cake" })
        .then((rec) => {
          console.log(rec);
        })
        .catch((err) => console.log(err));
    }, 100);
  });

//INSERT RECIPE

// Connect server
app.listen(PORT, () => {
  `Connected to Port: ${PORT}`;
});
