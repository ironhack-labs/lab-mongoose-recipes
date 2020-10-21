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
    // TODO Iteration #2
    const recipe = await Recipe.create({
      title: "Pastel de Chocolate",
      level: "Amateur Chef",
      ingredients: ["chocolate", "huevos", "harina"],
      cuisine: "American",
      dishType: "dessert",
      creator: "Adrián Paniagua",
      duration: 15,
    });
    console.log(
      `Added a new recipe called: ${recipe.title}, from the ${recipe.cuisine} cuisine.`
    );

    // TODO Iteration #3 - Insert multiple recipes from data.json
    const manyRecipes = await Recipe.insertMany(data);
    console.log(`We added all new recipes ${manyRecipes}`);

    // TODO Iteration #4 - Update a recipe
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" }, // Dónde cambiamos algo
      {
        duration: 100, // Qué cambiamos (de 220 a 100)
      },
      { new: true } // Obligatorio para que imprima el nuevo objeto
    );
    console.log(
      `We change the duration of ${updatedRecipe.title}, to ${updatedRecipe.duration} minutes.`
    );

    // TODO Iteration #5 - Remove a recipe
    const deletedRecipe = await Recipe.deleteOne({3
      title: "Carrot Cake",
    });
    console.log(deletedRecipe);

    // TODO Iteration #6 - Close the database
    // ? Esto cierra la sesion de node index.js cada vez que lo ejecuto. Es lo correcto? Osea ser, hace la ejecución del codigo, lo añade quita bla bla de la base de datos, y se cierra. Es como funciona?
    mongoose.connection.close();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
