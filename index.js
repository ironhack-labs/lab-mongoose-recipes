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
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error("Error connecting to mongo", err));

Recipe.create({
  title: "Pizza",
  level: "UltraPro Chef",
  ingredients: ["tomatos", "cheese", "olives"],
  cuisine: "italian",
  dishType: "Dish",
  duration: 10,
  creator: "Markus"
}).then(created => {
  console.log(created);
});

Recipe.insertMany(data).then(inserted => {
  console.log(inserted);
});

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(
  result => {
    console.log(result);
  }
);

Recipe.deleteOne({ title: "Carrot Cake" }).then(deleted => {
  console.log(deleted);
});

mongoose.connection.close();
