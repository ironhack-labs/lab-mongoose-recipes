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

let recepte = {
  title: "Tortilla",
  level: "Easy Peasy",
  ingredients: "Huevos",
  cuisine: "española",
  dishType: "Dish",
  duration: 5,
  creator: "Pep",
};


// Create a recipe  using the [`Model.create`] method
// Recipe.create(recepte, (err, result) => {
//   if (err) console.log(err);
//   else console.log("Document inserted", result);
// });



// Insert Many recipes with insertMany method
// Recipe.insertMany(data, (err, result) =>{
//   if (err) console.log(err);
//   else console.log("Document inserted", result);
// })


//Not working, deprecationWarning
Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { $set: { duration: 100 } }
)
  .then(result => console.log(result))
  .catch(err => console.log(err));


// it is working well
// Recipe.deleteOne({title: "Carrot Cake"})
//   .then(result => mongoose.connection.close()
//   .then(console.log("cerrado"))
//   .catch(err => console.log(err)));
