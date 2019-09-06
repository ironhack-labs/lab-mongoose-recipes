const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// const recipe = new mongoose.model("Recipe",recipeSchema);
// Recipe.create({
//   title: "Apple cake",
//   cuisine: "fancy"
// })
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

// Recipe.insertMany(data)
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

// Recipe.find().then(recipes =>
//   recipes.forEach(eachRecipe => console.log(eachRecipe.title))
// );

// Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(
//   sucess => {
//     console.log(sucess);
//   }
// );

Recipe.deleteOne({ title: "Carrot Cake" }).then(sucess => {
  console.log(sucess);
  mongoose.connection.close();
});
