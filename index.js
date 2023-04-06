const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";

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
    return Recipe.create({
      title: "Spanish Omelette",
      level: "Easy Peasy",
      ingredients: ["Eggs", "Potatoes", "Onions", "Olive oil", "Salt"],
      cuisine: "Spanish",
      dishType: "main_course",
      image: "https://i.ytimg.com/vi/CYkECtk1vBE/hqdefault.jpg",
      duration: 120,
      creator: "Abuela",
    });
  })
  .then((data) => {
    console.log(data);
    return Recipe.insertMany([
      {
        title: "Shrimp Scampi",
        image:
          "https://assets.bonappetit.com/photos/58a4e12a9fda6d7fbc740e91/6:9/w_2221,h_3332,c_limit/shrimp-scampi.jpg",
      },
      {
        title: "Roscos de Semana Santa",
        image:
          "https://img-global.cpcdn.com/recipes/fafd7ce28bca540d/400x400cq70/photo.jpg",
      },
      {
        title: "Bollo preñao",
        image:
          "https://apuntococina.com/wp-content/uploads/2017/06/bolo_pren%CC%83ao.jpg",
      },
    ]);
  })
  .then((data) => {
    console.log(data);
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log("Recipe updated");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Recipe deleted");
    mongoose.connection.close(() => {
      console.log("Connection disconnected");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
