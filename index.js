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

console.log("your data is here already", data);

//Create A New Recipe
// Recipe.create({
//   title: "Test2",
//   level: `Easy Peasy`,
//   ingredients: [`Chicken`, `Stock`, `Bay Leaf`, `Carrots`],
//   cuisine: [`Asian`],
//   dishType: `Breakfast`,

//   image: `https://rasamalaysia.com/wp-content/uploads/2016/10/italian-braised-chicken.jpg`,
//   duration: 20,
//   creator: `Ryan`,
//   created: `4/7/2023`
// })
//   .then(() => {
//     console.log("Posted Data");
//   })
//   .catch(err => {
//     console.log("Error posting recipe", err);
//   });

//Insert Many from the JSON Array
// Recipe.insertMany(data, console.log(data.title));

// Recipe.updateOne({ title: `Rigatoni alla Genovese` }, { duration: `100` }).then(
//   () => {
//     console.log(`Successful Edit!`);
//   }
// );

// Recipe.deleteOne({ title: `Carrot Cake` }).then(() => {
//   console.log(`Successful deletion!`);
// });
