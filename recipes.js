

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: Array },
  cousine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now() }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

/*let recipe = new Recipe ({
  title: "tortilla de patata",
  level: "Easy Peasy",
  ingredients: ["eggs", "potatoes"],
  cousine: "spanish food",
  dishType: "Dish",
  duration: 30,
  creator: "mi abuela",
})*/

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(recipe => {
    Recipe.create({
      title: "tortilla de patata",
      level: "Easy Peasy",
      ingredients: ["eggs", "potatoes"],
      cousine: "spanish food",
      dishType: "Dish",
      duration: 30,
      creator: "mi abuela"
    });
    console.log("Connected to Mongo! 1");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  })
  .then(recipe => {
    Recipe.insertMany(data, err => {
      if (err) {
        console.log("sah petao");
      } else {
        Recipe.collection.update(
          { title: "Rigatoni alla Genovese" },
          { $set: { duration: 100 } }
        );
        console.log("Connected to Mongo! 3");
      }
      Recipe.collection.removeOne({title: "Carrot Cake"})
      console.log("carrot cake");
      mongoose.connection.close();
    });
  });
