const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect(
    "mongodb://localhost/recipeApp",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const Recipe = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: Array,
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: Date }
});

const newRecipe = mongoose.model("newRecipe", Recipe);

newRecipe.collection.drop();

const myRecipe = newRecipe
  .create({
    title: "Spanish Omelette",
    level: "Amateur Chef",
    ingredients: [
      "6 eggs",
      "3 potatoes",
      "1 little onion",
      "1 green pepper",
      "600 ml olive oil",
      "salt",
      "1 parsley leave"
    ],
    cuisine: "Spanish",
    dishType: "Dish",
    image:
      "https://static.hogarmania.com/archivos/201610/tortilla-patatas-xl-848x477x80xX.jpg",
    duration: 120,
    creator: "Chef Arguiñano"
  })
  .then(myRecipe => {
    console.log(myRecipe.title);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

newRecipe
  .insertMany(data)
  .then(data => {
    data.forEach(e => {
      console.log(e.title);
    });
  })
  .then(() => {
    newRecipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 });
    console.log("Duration time has changed!");
  })
  .then(() => {
    newRecipe.deleteOne({ title: "Carrot Cake" });
    console.log("Carrot cake succesfully removed");
  })
  .then(() => mongoose.connection.close())
  .catch(err => {
    console.log("An error happened:", err);
  });
