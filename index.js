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
// iteration 2
Recipe.create({
  title: "Waffle",
  level: "Easy Peasy",
  ingredients: [
    "200g of flour",
    "30g of granulated sugar",
    "3 eggs",
    "20g of butter",
    "25cl of milk",
    "1 minch of salt"
  ],
  cuisine: "Cook in a lightly buttered waffle iron",
  dishType: "Snack",
  image:
    "https://odelices.ouest-france.fr/images/recettes/gaufres-970x1024.jpg",
  duration: 17,
  creator: "My mummy",
  created: Date.now()
})
  .then(Recipe => {
    console.log(Recipe.title);
  })
  .catch(dbError => console.error(dbError));
console.log("One!");
// iteration 3
Recipe.insertMany(data);
console.log("Two!");
//iteration 4
Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 });
console.log("Three!");
// iteration 5
Recipe.findOneAndDelete({ title: "Carrot Cake" });
console.log("Four!");

// Iteration 6
mongoose.connection.close();
console.log("Five!");
