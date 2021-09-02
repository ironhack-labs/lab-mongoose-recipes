const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {})
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //   return Recipe.deleteMany();
  })
  .then(() => {
    /* ITERACION 2

const myRecipe = new Recipe({
  title: "Pollo al curry",
  level: "Easy Peasy",
  ingredients: [
    "Pechuga de pollo",
    "Cebolleta",
    "Dientes de ajo",
    "Jengibre fresco",
    "Guindilla pequeña",
    "Curry molido",
    "Cúrcuma molida",
  ],
  cuisine: "Version oriental",
  dishType: "main_course",
  image: "https://i.blogs.es/9ea7a4/pollo_curry-copia/1366_2000.jpg",
  duration: 25,
});

Recipe.create(myRecipe)
  .then((recipe) =>
    console.log("the recipe is saved and its title is:", recipe.title)
  )
  .catch((error) =>
    console.log("an error happened while creating the recipe:", error)
  );

  */

    /* ITERACION 3

Recipe.insertMany(data)
  .then((recipe) =>
    recipe.forEach((data) => {
      console.log("the recipe is saved and its title is:", data.title);
    })
  )
  .catch((error) =>
    console.log("an error happened while creating the recipe:", error)
  );

  */

    /* ITERACION 4

Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then((tiempo) => {
    console.log("Duration of rigatini change to:", tiempo.duration);
  })
  .catch((error) =>
    console.log("an error happened while changind the duration:", error)
  );

  */

    /* ITERACION 5

Recipe.deleteOne({ title: "Carrot Cake" })
  .then((eliminado) => {
    console.log("it's delated:");
  })
  .catch((error) => console.log("an error happened while removing:", error));

  */

    // ITERACION 6
    mongoose.connection.close(() =>
      console.log("Mongoose connection is disconnected")
    );
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
