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
    // const firstRecipe = {
    //   title: "Fluffy Buttermilk Pancakes",
    //   level: "Easy Peasy",
    //   ingredients: [
    //     "2 cups flour",
    //     "2 Tbsp sugar",
    //     "1 tsp baking soda",
    //     "2 tsp baking powder",
    //     "3/4 tsp salt",
    //     "2 eggs, lightly beaten",
    //     "2 tsp vanilla extract",
    //     "2 cups buttermilk",
    //   ],
    //   cuisine: "American",
    //   dishType: "breakfast",
    //   image: null,
    //   duration: 30,
    //   creator: "Derek Noble",
    //   created: null,
    // };
    // Recipe.create(firstRecipe)
    //   .then((recipe) => console.log(`A new recipe "${recipe.title}"`))
    //   .catch((error) =>
    //     console.log("An error happened while saving the first recipe: ", error)
    //   );

    return Recipe.insertMany(data)
      .then((recipes) => {
        recipes.forEach((recipe) => console.log(recipe.title));
        Recipe.deleteOne({ title: "Carrot Cake" }, (error) => {
          if (error) console.log("error during deletion: ", error);
          else console.log("Deleted: Carrot Cake");
          Recipe.find({}, (error, recipes) => {
            if (error) console.log("Error finding recipes: ", error);
            else recipes.forEach((recipe) => console.log(recipe.title));
          });
        });
      })
      .catch((error) =>
        console.log("there was an error inserting recipe data: ", error)
      );
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
