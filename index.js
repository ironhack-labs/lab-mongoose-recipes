const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err));

let recipe1 = {
  title: "Orange and Milk-Braised Pork Carnitas",
  level: "UltraPro Chef",
  ingredients: [
    "3 1/2 pounds boneless pork shoulder, cut into large pieces",
    "1 tablespoon freshly ground black pepper",
    "1 tablespoon kosher salt, or more to taste",
    "2 tablespoons vegetable oil",
    "2 bay leaves",
    "2 teaspoons ground cumin",
    "1 teaspoon dried oregano",
    "1/4 teaspoon cayenne pepper",
    "1 orange, juiced and zested"
  ],
  cuisine: "American",
  dishType: "Dish",
  image: "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
  duration: 160,
  creator: "Chef John"
};
//iteration 2

Recipe.create(recipe1)
  .then(result => {
    console.log("New recipe", result.title);
  })
  .catch(err => {
    console.log(err);
  });

//iteration 3
Recipe.insertMany(data)
  .then(result => {
    console.log("New recipe", result.length);
  })
  .catch(err => {
    console.log(err);
  });

//iteration 4

Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { $set: { duration: 100 } },
  { new: true } // thanks Uros
)
  .then(result => {
    console.log("Recipe successfully update", result);
  })
  .catch(err => {
    console.log(err);
  });

//iteration 5
Recipe.deleteOne({ title: `Carrot Cake` }).then(result =>
  console.log(`Recipe successfuly deleted`, result.deletedCount)
);
mongoose.connection.close().catch(err => console.log(err));
