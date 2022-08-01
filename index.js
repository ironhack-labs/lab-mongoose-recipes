const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then((newRecipe) => {
    newRecipe = new Recipe({
      title: "Biryani",
      level: "Amateur Chef",
      ingredients: [
        "Basmati Rice",
        "Lamb meat",
        "Veggies",
        "Garlic",
        "Spicy Sauce",
      ],
      cuisine: "Indian",
      dishType: "main_course",
      image: "https://mejoresrecetas.me/pollo-biryani/",
      duration: 60,
      creator: "Mughals",
      created: "1600's", 
    });
    console.log(newRecipe);
    return Recipe.create(newRecipe);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.findOneAndUpdate({
      title: "Rigatoni alla Genovese",
      duration: 100,
    }).then(() => {
      console.log(`Success!`);
    });
  })
  .then(() => {
    return Recipe.deleteOne({
      title: "Carrot Cake",
    });
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  }); */



const myRecipe = {
  title: "Biryani",
  level: "Amateur Chef",
  ingredients: [
    "Basmati Rice",
    "Lamb meat",
    "Veggies",
    "Garlic",
    "Spicy Sauce",
  ],
  cuisine: "Indian",
  dishType: "main_course",
  image: "https://mejoresrecetas.me/pollo-biryani/",
  duration: 60,
  creator: "Mughals",
  created: "1600's",
};

async function recipes() {
  // Connecting to DB
  try {
  await mongoose.connect(MONGODB_URI);

  //Resetting the DB
  await Recipe.deleteMany()

  // Inserting 1 recipe
  let singleRecipe = await Recipe.create(myRecipe);
  console.log(singleRecipe.title);

  // Inserting multiple recipes
  let multipleRecipes = await Recipe.insertMany(data)
  multipleRecipes.forEach((recipe) => console.log(recipe.title));

  // Update one recipe
  await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
  console.log('Duration updated');

  // Delete recipe
  await Recipe.deleteOne({title: 'Carrot Cake'})
  console.log('Cake deleted');

  // mongoose.connection.close();
  mongoose.disconnect();

} catch(err) {
  console.log(err)
}};

recipes();

