const mongoose = require("mongoose");

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

const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

// Recipe.create({
//   title: "Bananes flambées",
//   level: "Easy Peasy",
//   ingredients: ["plein de trucs"],
//   cuisine: "cuisine",
//   dishType: "Breakfast"
// });

Recipe.insertMany(data)
.then(()=>
  Recipe.findByIdAndDelete({ _id: 'Carroooooot Cake'})
  .then (() => console.log("ouii"))
  .catch(err => console.log("my error object is", err))
)

// Recipe.updateOne({ title : "Rigatoni alla Genovese"}, { $set : { duration: 100}})
// .then(console.log("C'est bon !"))
// .catch((error) => {console.log (error)});


