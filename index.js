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

    // Iteration 1

    // const firstRecipe = data[0];

    // const recipe1 = Recipe.create(firstRecipe).then((recipe) =>
    //   console.log("The recipe is saved and the title is", recipe.title)
    // );
    // return recipe1;

    // Iteration 2

    let addAllRecipes = Recipe.insertMany(data).then((recipes) =>
      console.log(recipes)
    );

    return addAllRecipes;
  })

  // Iteration 3: find and print titles on terminal

  .then(() => {
    Recipe.find({}, { title: 1, _id: 0 }).then((title) => console.log(title));
  })

  // // Iteration 4: Update duration
  .then(() => {
    const updateRigatoniDuration = Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then((rigatoni) => console.log("duration", rigatoni))
      .catch((err) => console.log(err));

    return updateRigatoniDuration;
  })

  // Iteration 5:Delete element

  .then(() => {
    const deleteEl = Recipe.deleteOne({ title: "Carrot Cake" })
      .then((Recipe) => console.log("Deleted", Recipe))
      .catch((error) => console.log("Error occured while deleting", error));

    return deleteEl;
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
