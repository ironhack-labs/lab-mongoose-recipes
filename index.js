const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'
const chalk = require("chalk");

// Connection to the database "recipeApp"
mongoose.set("useCreateIndex", true);

mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log(chalk.blue("Connected to Mongo!"));
  })
  .catch(err => {
    console.error(chalk.bgRed("Error connecting to mongo"), err);
  });

Recipe.create({
  title: "Human Soup",
  level: "Easy Peasy",
  ingredients: ["humans", "water", "salt", "spices"],
  cuisine: "French",
  dishType: "Snack",
  duration: 60,
  creator: "Keighley und Jan"
})
  .then(recipe => {
    console.log(chalk.green(recipe.title));
  })
  .catch(err => {
    console.log(error(chalk.bgRed("Error at create recipe")), err);
  });

Recipe.insertMany(data)
  .then(data => {
    data.forEach(recipe => console.log(chalk.magenta(recipe.title)));
  })
  .catch(err => {
    console.error(chalk.bgRed("Error at import recipes"), err);
  });

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(() => console.log(chalk.cyan("update successful")))
  .catch(err => {
    console.error(chalk.bgRed("Error at update recipe"), err);
  });

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(() => {
    console.log(chalk.yellow("delete sucessful"));
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(chalk.bgRed("Error at delete recipe"), err);
  });
