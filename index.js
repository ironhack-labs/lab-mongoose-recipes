//Work from: Ronny Skaraboto and Lena Imdahl

const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const newRecipe = {
  title: "Vegetable pasta bake",
  level: "Amateur Chef",
  ingredients: [
    "300g dried penne pasta",
    "3 tbsp olive oil",
    "1 large aubergine, chopped",
    "1 red onion, finely chopped",
    "2 peppers, deseeded and finely sliced",
    "2 courgettes",
    "3 garlic cloves",
    "2 tbsp tomato purée",
    "400g can cherry tomatoes",
    "small bunch of basil",
    "25g vegetarian hard cheese, grated",
    "25g grated mozzarella",
    "75g mature cheddar, grated",
    "20g panko breadcrumbs",
  ],
  cuisine: "Italian",
  dishType: "main_course",
  image:
    "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4398987.jpg&w=596&h=399.32000000000005&c=sc&poi=face&q=85",
  duration: 30,
  creator: "Chef Alisa",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })

  // iteration 2
  .then(() => {
    return Recipe.create(newRecipe);
  })
  .then((oneNewRecipe) => {
    console.log("Recipe title: ", oneNewRecipe.title);
  })

  // iteration 3
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((allRecipes) => {
    allRecipes.forEach((element) => {
      console.log(`Recipes titles: ${element.title}`);
    });
  })

  // iteration 4
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then((updateRecipe) => {
    console.log(`Recipe ${updateRecipe.title} update successfully!`);
  })

  //  iteration 5
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((deleteRes) => {
    console.log(`Recipe ${deleteRes.title} removed successfully!`);
  })

  // iteration 6
  .then(() => {
    mongoose.connection.close();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
