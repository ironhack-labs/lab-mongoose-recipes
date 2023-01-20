const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const recipe = {
  title: "Bacon and leek frittata recipe",
  level: "Amateur Chef",
  ingredients: [
    "500g potatoes, peeled and diced into 2cm chunks",
    "2 tbsp sunflower oil",
    "4 rashers smoked back bacon, finely chopped",
    "1 leek, trimmed, rinsed and thinly sliced",
    "6 eggs",
    "100g Cheddar, coarsely grated",
    "salad leaves, to serve (optional)",
  ],
  cuisine: "Spanish",
  dishType: "main_course",
  image: "",
  duration: 40,
  creator: "Tesco",
};

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
    // Run your code here, after you have insured that the connection was made
    Recipe.create(recipe);
    console.log('- Created recipe', recipe.title);
    return Recipe.insertMany(data)
  })
  .then((data) => {
    for (let recipe of data) {
      console.log('- Created recipe', recipe.title);
      }
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } }, { new: true });
  })
  .then((recipe) => {
    console.log(recipe.title, 'recipe succesfully updated!');
    return Recipe.findOneAndDelete({ title: 'Carrot Cake' });
  })
  .then((recipe) => {
    console.log(recipe.title, 'recipe succesfully deleted!');
  })
  .then(()=>{
    mongoose.connection.close();
    console.log("Connection succesfully closed!")
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

  

