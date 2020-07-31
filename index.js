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
    //Iteration 2: add my recipe
    await Recipe.create({
      title: "Sugo al basilico",
      level: "Easy Peasy",
      cuisine: "Italian",
      ingredients: "tomatoes, basil, salt, sugar",
      creator: "Debora",
    });

    await Recipe.create(data) //Iteration 3: add recipes from data.json
      // .then((newRecipes) =>
      //   newRecipes.forEach((recipe) =>
      //     console.log(`New receipe added: ${recipe.title}`)
      //   )
      // )
      .catch((err) =>
        console.log(`Failed adding receipes from data. Err: ${err}`)
      );

    await Recipe.findOneAndUpdate(
      //Iteration 4: update value duration to 100
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } },
      { new: true }
    ).catch((err) => console.log(`Update failed: ${err}`));

    await Recipe.deleteOne({ title: "Carrot Cake" }) //Iteration 5: Remove Carrot cake
      .catch((err) => console.log(`Could not delete recipe: ${err}`));
  })
  //Iteration 6: disconnect database: once everything is executed, then it closes the
  .then(() => {
    return mongoose.disconnect();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
