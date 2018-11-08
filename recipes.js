const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
// const Schema = mongoose.Schema;
const recipeSchema = new Schema({
  title: { type: String, required: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: Array },
  cuisine: { type: String, require: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: " https://images.media-allrecipes.com/images/75131.jpg."
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  create: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("recipe", recipeSchema);

Recipe.create({
  title: "Asian Glazed Chicken Thighs",
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
  cuisine: "Asian",
  dishType: ["Dish"],
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 40,
  creator: "Chef LePapu"
})
  .then(recipeDoc => {
    console.log(`NEW RECIPE CREATED, ${recipeDoc.title}`);
  })
  .catch(err => {
    console.log("NEW RECIPE NOT CREATED", err);
  });

// Recipe.create({
//   title: "Orange and Milk-Braised Pork Carnitas",
//   level: "UltraPro Chef",
//   ingredients: [
//     "3 1/2 pounds boneless pork shoulder, cut into large pieces",
//     "1 tablespoon freshly ground black pepper",
//     "1 tablespoon kosher salt, or more to taste",
//     "2 tablespoons vegetable oil",
//     "2 bay leaves",
//     "2 teaspoons ground cumin",
//     "1 teaspoon dried oregano",
//     "1/4 teaspoon cayenne pepper",
//     "1 orange, juiced and zested"
//   ],
//   cuisine: "American",
//   dishType: ["Dish"],
//   image: "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
//   duration: 160,
//   creator: "Chef John"
// })
//   .then(recipeDoc => {
//     console.log("NEW RECIPE CREATED", recipeDoc);
//   })
//   .catch(err => {
//     console.log("NEW RECIPE NOT CREATED", err);
//   })

Recipe.insertMany(data)
  .then(recipe =>
    recipe.forEach(oneRecipe => {
      console.log(` these is the recipe ${oneRecipe.title}`);
    })
  )
  .catch(err => {
    console.log("recipe Insert many FAILURE", err);
  });

/////// task 4
Recipe.findByIdAndUpdate("5be46a479cefaeb6f2822225", {
  $set: { duration: 100 }
})
  .then(recipeDoc => {
    console.log(`Pesto alla genovese changed ${recipeDoc.duration}`);
  })
  .catch(err => {
    console.log("THERE IS AN ERROR", err);
  });

///// delete task
Recipe.findByIdAndRemove("5be46a479cefaeb6f2822224")
  .then(recipeDoc => {
    console.log(`Carrot cake IS DELETE -> ${recipeDoc.title}`);
  })
  .catch(err => {
    console.log("this is an error", err);
  });
