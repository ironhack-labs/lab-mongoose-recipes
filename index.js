const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    // await Recipe.create({
    //   title: "Spécialité du chef W",
    //   level: "UltraPro Chef",
    //   ingredients: ["1/2 cup rice ", "2 cup of sauce tomato", "salt to taste", "steak"],
    //   cuisine: "Original",
    //   dishType: "snack",
    //   image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    //   duration: 50,
    //   creator: "Chef Jamili",
    // });
    await Recipe.insertMany(data);
    await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 });
    await Recipe.deleteOne({ title: "Carrot Cake" });
    await mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
