const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// SITO TE QUIERO
let drop = Recipe.deleteMany();

let creatingRecipe = Recipe.create({
  title: "Nose",
  level: "Easy Peasy",
  ingredients: [
    "3 pounds red onions, sliced salt to taste",
    "5 (16 ounce) boxes"
  ],
  cuisine: "International",
  dishType: "Dish",
  image: "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
  duration: 500,
  creator: "Chef Luigi",
  created: 2019
});

let insertRecipes = Recipe.insertMany(data);

let updating = Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 }
  // { new: true }
);
let removing = Recipe.deleteOne({ title: "Carrot Cake" });

Promise.all([drop, creatingRecipe, insertRecipes, updating, removing])
  .then(values => {
    console.log("Hola ", values);

    //  //ITERATION 6
    mongoose.connection.close();
  })
  .catch(err => console.log("eeeerrrroooorrrrr ", err));
