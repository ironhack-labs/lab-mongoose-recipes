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
  .then(() => {
    //Iteration 2
    const newRecipe = {
      title: "Mimi's Recipe",
      level: "Amateur Chef",
      ingredients: ["1 cup of rice", "honey", "1 steak", "Broccolis", "Corn"],
      cuisine: "Bad Cuisine",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 60,
      creator: "Meryem",
    };
    const mimiRecipe = Recipe.create(newRecipe);
    //console.log(mimiRecipe);
  })
  .then(() => {
    //Iteration 3
    const snack = Recipe.insertMany(data);
    //console.log(snack);
  })
  .then(() => {
    //Iteration 4
    const filter = { title: "Rigatoni alla Genovese" };
    const update = { duration: "100" };
    const opts = { new: true };
    const pasta = Recipe.findOneAndUpdate(filter, update, opts);
    //console.log(pasta, "update ok");
  })
  .then(() => {
    //Iteration 5
    const carrotCake = Recipe.deleteOne({ title: "Carrot Cake" });
    //console.log("carrot cake deleted");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

//Iteration 6
//mongoose.connection.close();
