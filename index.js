const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const data = require("./data");
const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const firstRecipe = data[0];

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    /*     return Recipe.deleteMany() */
  })

  .then(() => {
    /*     Recipe.create(firstRecipe)
    .then((newRecipe) => console.log(`New recipe added: ${newRecipe.title}`))
    .catch((err) => console.log(err)); */
    /*     Recipe.insertMany(data)
    .then((recipes) => recipes.forEach((recipe) => console.log(`New Recipe added: ${recipe.title}`)))
    .catch((err) => console.log(err)) */
    /*     Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese' }, {duration: 100})
      .then((recipe) => console.log(`Recipe Updated: ${recipe}`))
      .catch((err) => console.log(err)); */
    /*     Recipe.deleteOne({ title: "Carrot Cake" })
      .then((recipe) => console.log(`Recipe Deleted`))
      .catch((err) => console.log(err)); */
  })

  .then(() => mongoose.disconnect(() => console.log("Disconnected")))

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
