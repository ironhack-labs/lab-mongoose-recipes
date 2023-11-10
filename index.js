const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

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
    Recipe.create({
      title: "Aloo Sandwich",
      level: "Easy Peasy",
      ingredients: [
        "bread",
        "butter",
        "boiled potatoes",
        "sliced vegetables",
        "spices",
      ],
      cuisine: "Indian",
      dishType: "snack",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 15,
      creator: "Banashree",
      created: new Date(),
    });
  })
  .then(() => {
    return Recipe.insertMany(data);
  })

  .then(() => {
    return Recipe.findOneAndUpdate({
      title: "Rigatoni alla Genovese",
      duration: 100,
    });
  })

  .then((result) => {
    console.log(
      `Updated ${result.title} and new duration is: ${result.duration}`
    );

    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  .then((result) => {
    console.log("The recipe was deleted", result);
  })

  .catch((error) => {
    console.error("Error: ", error);
  })

  .finally(() => mongoose.connection.close());
