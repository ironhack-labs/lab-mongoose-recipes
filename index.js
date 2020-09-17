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
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    const recipe = await Recipe.create({
      title: "gateau chocolat",
      level: "Amateur Chef",
      ingredients: ["chocolat", "oeufs", "farine"],
      dishType: "snack",
      duration: 15,
    });

    console.log(recipe.title);

    const manyRecipes = await Recipe.insertMany(data);

    console.log(manyRecipes);

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" }, // search query !
      {
        duration: 100,
      }, // the update values
      { new: true } // mandatory if you want to retrieve the updated document as resolve value
    );

    console.log(updatedRecipe);

    const deletedRecipe = await Recipe.deleteOne({
      title: "Carrot Cake",
    });

    console.log(deletedRecipe);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

mongoose.connection.close();
