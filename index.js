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
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// Iteration 2
const newRecipe = {
  title: "Spice burger",
  level: "Easy Peasy",
  ingredients: [
    "bun",
    "cheese",
    "patty",
    "lettuce",
    "tomato",
    "onion",
    "pickles",
    "bacon",
  ],
  cuisine: "American",
  dishType: "snack",
  image: {
    type: String,
    default:
      "https://st2.depositphotos.com/1000339/5752/i/600/depositphotos_57527967-stock-photo-burger-and-french-fries.jpg",
  },
  duration: 30,
  creator: "Dino",
};

Recipe.create(newRecipe)
  .then((result) => {
    console.log(`New user name ${result.title} saved in db`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
  });

// Iteration 3

Recipe.insertMany(data)
  .then((result) => {
    result.map((e) => {
      console.log(`New user name ${e.title} saved in db`);
    });
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
  });

// Iteration 4

const updateRecipe = async (filter, updateInfo) => {
  try {
    const result = await Recipe.findOneAndUpdate(filter, updateInfo, {
      new: true,
    });
    console.log(`New duration ${result.duration}`);
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
};

updateRecipe({ title: "Rigatoni alla Genovese" }, { duration: 100 });

// Iteration 5

const deleteRecipe = async (filter) => {
  try {
    await Recipe.deleteOne(filter);
    console.log(`Receipe ${filter.title} deleted!`);
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
};

deleteRecipe({ title: "Carrot Cake" });
