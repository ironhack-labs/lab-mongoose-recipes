const mongoose = require("mongoose");

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

    Recipe.create({
      title: "Gazpacho",
      level: "Easy Peasy",
      ingredients: [
        "tomatoes",
        "cucumber",
        "onion",
        "green pepper",
        "oil",
        "vinegar",
        "salt",
      ],
      cuisine: "Cold Soup",
      dishType: "drink",
      duration: 60,
      creator: "AGS",
    })
      .then((recipe) =>
        console.log(`The recipe was saved and its title is: ${recipe.title}`)
      )
      .catch((error) => console.log(`An error happened: ${error}`));

    Recipe.insertMany(data)
      .then((newRecipes) => console.log(`Recipe created: ${newRecipes}`))
      .catch((error) =>
        console.log(`Creating a new recipe went wrong! Try again 😞 ${error}`)
      );

    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } },
      { new: true }
    )
      .then((updatedRecipe) =>
        console.log(`Rigatoni Updated: ${updatedRecipe}`)
      )
      .catch((error) => console.log(`updatedRecipe failed ${error}`));

    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => console.log(`Carrot Cake Deleted`))
      .catch((error) => console.log(`error deleting Carrot Cake; ${error}`));
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
