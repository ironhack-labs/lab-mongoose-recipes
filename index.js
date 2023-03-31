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

  // interation 2
  .then(() => {
    return Recipe.create(newRecipe);
  })
  .then((oneNewRecipe) => {
    console.log("Recipe title: ", oneNewRecipe.title);
    // console.log() from interation 2
    return Recipe.insertMany(data);
  })

  // // //  interation 4
  .then((allRecipes) => {
    let titles = allRecipes.forEach((element) => {
      console.log(`Recipes titles: ${element.title}`);
    });
    // console.log() from interation 3  (it´s working, but I´m sure they have a better way to deal with it...)

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })

  // // // interation 5
  .then((updateRecipe) => {
    console.log(`Recipe ${updateRecipe} update successfully!`);
    //console.log() interation 4

    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  // // interation 6 (not finished)

  .then((deleteRes) => {
    console.log(`Recipe ${deleteRes} removed successfully!`);
    // console.log() interation 5

    return;
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
