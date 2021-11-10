const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect("mongodb://localhost/test", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: "Arepas",
      ingredients: ["Harina de Maiz", "Agua", "Sal"],
      cuisine: "venezolana",
    });
  })
  .then((newRecipe) => console.log(newRecipe))
  .then(() => {
    return Recipe.create(data);
  })
  .then((newArr) => newArr.forEach((arrRecipe) => console.log(arrRecipe.title)))
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((newDurationTime) => console.log(newDurationTime))
  .then(() => {
    return Recipe.deleteOne({
      title: "Carrot Cake",
    });
  })
  .then((deleteRecipe) => console.log("Delete :D"))
  .then(() => mongoose.connection.close())
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
