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

// Recipe.create(data)
//   .then(createdRecipe => {
//     console.log(createdRecipe);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Recipe.insertMany(data)
//   .then(createdRecipe => {
//     console.log(createdRecipe);
//   })
//   .catch(err => {
//     console.log(err);
//   });

 // Recipe.updateOne(query, changes) -> will update the first document matching the given query and merge the changes onto the fields of that document
Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });

  Recipe.deleteOne({ title: "Carrot Cake" }).then(result => {
  console.log(result);
});

