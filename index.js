const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose.connect(MONGODB_URI).then((x) => {
  console.log(`Connected to the database: "${x.connection.name}"`);
  // Before adding any recipes to the database, let's remove all existing ones
});

return Recipe.deleteMany()
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Lisas Special Dating Dish",
      level: "Amateur Chef",
      ingredients: [
        "A little bit of Love",
        "2x Aperol Spritz",
        "2x Portions of Pasta",
        "1x massage",
        "Cheesy music",
      ],
      cuisine: "Italian",
      dishType: "snack",
      duration: 3,
      creator: "Lisa",
    });
  })
  .then((recipe) => {
    // console.log(`${recipe.title}`);
    return Recipe.insertMany(data).then((resp) => {
      // console.log("insertMany:", resp)
    });
  })
  .then(() => {
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    ).then((resp) => console.log("resp1:", resp));
  })
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" }).then((resp) => {
      // console.log("resp:", resp);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
