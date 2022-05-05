const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

let brunch = {
  title: "Best Brunch",
  level: "Amateur Chef",
  ingredients: ["Scrambled eggs", "Vegan sausages", "Honey", "Waffles"],
  cuisine: "Sundays",
  dishType: "breakfast",
  image: "",
  creator: "Matilde",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    Recipe.create(brunch)
      .then((newRecipe) => console.log(`${newRecipe.title}`))
      .catch((err) => console.log(err));

    Recipe.insertMany(data).then((allRecipes) => {
      allRecipes.forEach((recipe) => console.log(`${recipe.title}`));
    });

    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then((recipe) =>
        console.log(
          `Now it is all correct! The duration is ${recipe.duration}! Good cooking`
        )
      )
      .catch((error) => {
        console.error("Error connecting to the database", error);
      });

    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => console.log(`Ohh noo, no more Carrot Cake!`))
      .catch((error) => {
        console.error("Error connecting to the database", error);
      });
    return Recipe.deleteMany();
  })
  .then(() => {
    mongoose.disconnect(() => console.log("Disconnected"));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

/* PERGUNTAS
  also como é que este doc tem acesso ao data se não há lá export? é por ser json? */
