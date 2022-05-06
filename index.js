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
  // .then(() => {
  //   const recipeCreated = Recipe.create({
  //     title: "Dadinho de Tapioca",
  //     level: "Easy Peasy",
  //     ingredients: [
  //       "Tapioca em grãos",
  //       "Queijo coalho",
  //       "Leite integral",
  //       "Pimenta do reino",
  //     ],
  //     cuisine:
  //       "Coloque o leite para ferver. Enquanto isso, rale o queijo coalho. Quando o leite ferver e quase vazar da panela, leve ele para um bowl e misture com a tapioca e o queijo coalho. Coloque numa assadeira envolta com um plastico filme, embrulhando-o, e depois leve a geladeira por 2h. Depois, corte a massa em cubos e leve para fritar.",
  //     dishType: "snack",
  //     duration: 150,
  //     creator: "Unknown",
  //   });
  //   console.log("new recipe: ", recipeCreated)
  // })
  .then(() => {
    const recipeList = Recipe.insertMany(data);
    console.log("Recipe list: ", recipeList);
  })
  .then(() => {
    const updateRigatoni = Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );
    console.log("You have successfully updated the recipe!");
  })
  .then(() => {
    const deleteRecipe = Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("You have successfully deleted this recipe!");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

mongoose.connection.close();
