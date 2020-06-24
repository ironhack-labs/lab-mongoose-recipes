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
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({
      title: "Arepas",
      level: "Easy Peasy",
      ingredients: ["harina de maiz", "agua", "sal"],
      cuisine: "Venezolana",
      dishType: "breakfast",
      image: "Arepas",
      duration: 1,
      creator: "Paola Martin",
    })
      .then((recipeNew) => console.log("La receta nueva es:", recipeNew.title))
      .then(() => Recipe.create(data))
      .then((recipeData) => {
        recipeData.forEach((recipes) =>
          console.log("Todas las recetas son:", recipes.title)
        );
      })
      .then(() =>
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        )
      )
      .then((updateRecipe) =>
        console.log("Se ha actualizado con exito:", updateRecipe)
      )
      .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
      .then((deleteRecipe) =>
        console.log("Se ha eliminado Carrot Cake:", deleteRecipe)
    )

      .catch((error) =>
        console.error("Error connecting to the database", error)
    );

  });

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
