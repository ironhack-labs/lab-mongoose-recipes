const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const App = async () => {
  // Connection to the database "recipe-app"
  let db;
  try {
    db = await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    db.connection.on("success", function (event) {
      console.log(`Mongo did connect successfully ${event}`);
    });
    // Before adding any documents to the database, let's delete all previous entries
    await db.connection.dropDatabase();
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
  if (!db) return;
  // Iteration 2 - Create a recipe
  try {
    const recipe = await Recipe.create({
      title: "Hawaiian pizza",
      level: "Amateur Chef",
      ingredients: ["pineapple", "ham", "tomato sauce", "cheese"],
      cuisine: "American",
      dishType: "snack",
      creator: "PizzaMan",
      duration: 25,
    });
    console.log(
      `Added a new recipe called: ${recipe.title}, from the ${recipe.cuisine} cuisine.`
    );
    const manyRecipes = await Recipe.insertMany(data);
    console.log(`We added all new recipes ${manyRecipes}`);
  } catch (error) {
    console.log(error);
  }
  // this will update the first object with title
  const updatedRecipe = await Recipe.findOneAndUpdate(
    { title: "Rigatoni alla Genovese" }, // Dónde cambiamos algo
    {
      duration: 100, // Qué cambiamos (de 220 a 100)
    },
    { new: true } // Obligatorio para que imprima el nuevo objeto
  );

  const deleteOne = await Recipe.deleteOne({ title: "Carrot Cake" });

  db.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
  });
};

App();
