const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

/* Recipe.create({
  title: "tortilla de patatas",
  level: "Easy Peasy",
  ingredients: ["potatos", "eggs", "salt", "garlic", "onions"],
  cuisine: "spanish",
  dishType: "Dish",
  image:
    "https://imagenes.heraldo.es/files/image_990_v1/uploads/imagenes/2018/06/18/_unnamed_796d3acc.jpg",
  duration: 20,
  creator: "Lluís Mañas",
  created: 1 / 30 / 2020
}).then(x => console.log(recipe.title)); */

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error("Error connecting to mongo", err));

//Recipe.insertMany(data);

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(
  result => {
    console.log(result);
  }
);

Recipe.deleteOne({ title: "Carrot Cake" }).then(result => {
  mongoose.connection.close();
  console.log(result);
});
