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
  title: "Jollof Rice",
  cuisine: "Ghanaian"
}).then(created => {
  console.log(created);
});

Recipe.insertMany(data)
  .then(recipes => {
    console.log(recipes);
  })
  .catch(err => {
    console.log(err);
  });

Recipe.updateOne({ duration: 220 }, { duration: 100 }).then(result => {
  console.log(result);
});

Recipe.deleteMany({ title: "Carrot Cake" }).then(result => {
  console.log(result);
});
