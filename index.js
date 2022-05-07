const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    async function init(params) {
      // 2
      const createdRecipe = await Recipe.create({
        title: "Insert",
        level: "UltraPro Chef",
        ingredients: [
          "3 1/2 pounds boneless pork shoulder, cut into large pieces",
          "1 tablespoon freshly ground black pepper",
          "1 tablespoon kosher salt, or more to taste",
          "2 tablespoons vegetable oil",
          "2 bay leaves",
          "2 teaspoons ground cumin",
          "1 teaspoon dried oregano",
          "1/4 teaspoon cayenne pepper",
          "1 orange, juiced and zested",
        ],
        cuisine: "American",
        dishType: "main_course",
        image:
          "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
        duration: 161,
        creator: "Chef John",
      });
      console.log(createdRecipe);
      // 3
      const manyRecipes = await Recipe.insertMany(data);

      manyRecipes.map((recipe) => console.log("Recipe title: ", recipe.title));

      // 4
      const updated = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { $set: { duration: 100 } },
        { new: true }
      );

      console.log(`the duration was updated to ${updated.duration}`);

      // 5

      const deleted = await Recipe.deleteOne({ title: "Carrot Cake" });
      console.log("deleted: ", deleted);

      // 6
      mongoose.connection.close();
    }

    init();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
