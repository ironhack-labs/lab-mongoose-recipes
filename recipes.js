const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const recipeSchema = new Schema({
  title: String,
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: Array,
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
  creator: String,
  created: { type: Date, default: new Date() }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
    let firstRecipe = new Recipe({
      title: "mi receta",
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
      cousine: "Española",
      dishType: ["Dish"],
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Pair team"
    });
    addRecipe(firstRecipe);
    pushData()
    updateRecipe();
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

function pushData() {
  /*Recipe.create(data)
    .then(recipe => {
      console.log("hola");
    })
    .catch(err => {
      console.log("error");
    });*/
    Recipe.insertMany(data);
}

function updateRecipe(){
  console.log("entrar")
  Recipe.update({title:"Rigatoni alla Genovese"},{duration:100})
}

function addRecipe(r) {
  r.save()
    .then(recipe => {
      console.log("Añadida");
    })
    .catch(err => {
      console.log("Error al añadir receta");
    });
}
