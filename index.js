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
    return Recipe.create({
      title: "scrambled eggs",
      level: "Easy Peasy",
      ingredients: ["egg", "butter", "salt", "pepper"],
      cuisine: "other",
      dishType: "breakfast",
      duration: 10,
    });
  })
  .then((recipe) => {
    console.log("new recipe created" + recipe);
    return recipe.save();
  })
  .catch((error) => {
    console.error("Erro ao Criar Receita", error);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((allRecipes) => {
    allRecipes.forEachEach((oneRecipe) => {
      console.log(oneRecipe.title);
    });
  })
  .catch((error) => {
    console.error("Erro ao Inserir os Dados", error);
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((recipe) => {
    console.log(recipe);
    console.log("Receita Atualizada com Sucesso");
  })
  .catch((error) => {
    console.log(error);
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cale" });
  })
  .then(() => {
    console.log("Erro ao remover Carrot Cake do Cardápio", error);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
