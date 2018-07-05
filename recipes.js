const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: [String],
  cousine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: " https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  creater: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

mongoose
  .connect(
    "mongodb://localhost:27017/recipeApp",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Mongo!");
  })
  //.then(create())
  //.then(insert())
  //.then(update())
  //.then(erase())
  .then(mongoose.connection.close())
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

function create() {
  return Recipe.create(
    {
      title: "Asian Glazed",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      cousine: "Asian",
      dishType: ["Dish"],
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu"
    },
    (err, recipe) => {
      if (err) console.log(err);
      else console.log(recipe.title);
    }
  );
}
 function insert(){
  Recipe.insertMany(data, (err, recipe) => {
    if (err) console.log(err);
    else console.log(recipe.title);
  });
}
 function update() {
  Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    .then(() =>console.log("Succes!!"))
    .catch(err => console.log("error"));
}
 function erase() {
   Recipe.deleteOne({ title: "Carrot Cake"})
   .then(() =>console.log("Succes!!"))
    .catch(err => console.log("error"));
 }

