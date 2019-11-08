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
  title: "Ukrainian Soup",
  level: "Easy Peasy",
  ingredients: [
    "potatoes",
    "beetroot",
    "carrot",
    "onions",
    "tomatoes",
    "garlic"
  ],
  cuisine: "Ukrainian",
  dishType: "Dish",
  image:
    "https://www.maggi.ru/data/images/recept/img640x500/recept_4925_bo03.jpg",
  duration: 120,
  creator: "Baba Ania",
  created: "11-08-2019"
}).then(res => console.log("added"));

Recipe.insertMany(data)
  .then(document => {
    console.log(document);
  })
  .catch(err => {
    console.log(err);
  });

Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 },
  { new: true } // the { new: true } option allows to return the document in the state it is in after the update
)
  .then(document => {
    console.log(document);
  })
  .catch(err => {
    console.log(err);
  });

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(document => {
    console.log(document);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });
