const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create({
  title: "Pao de Queijo",
  level: "UltraPro Chef",
  ingredients: ["queijo", "leite", "oleo", "sal", "polvilho doce", "ovos"],
  cuisine: "Mineira",
  dishType: "Snack",
  image:
    "https://www.anamariabrogui.com.br/assets/uploads/receitas/fotos/usuario-2223-08572f71591323d28da7f659c742eaf5.jpg",
  duration: 35,
  creator: "Minerin"
})
  .then(recipe => {
    console.log(recipe.title);
  })
  .catch(erro => {
    console.log("Error :(", erro);
  });

Recipe.insertMany(data)
  .then(recipes => {
    recipes.forEach(item => console.log(item.title));
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => console.log("Uhhuuuul :)"))
      .catch(() => console.log("Crying :("));
  })
  .catch(err => console.log(err));

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(() => console.log("We did it :)"))
  .catch(() => console.log("Ohh No :("));

// mongoose.connection.close(() => {
//   console.log("Mongoose default connection disconnected ");
//   process.exit(0);
// });
