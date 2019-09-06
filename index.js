const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// Recipe.create({ title: "Picanha", cuisine: "South-American" }).then(data => {
//   console.log(data.title);
// });

// Recipe.insertMany(data).then(data => {
//   const dataSet = data.map(el => el.title);
//   console.log(dataSet);
// });

/* Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(
  () => {
    console.log("Success!");
  }
); */

/* Recipe.deleteOne({ title: "Carrot Cake" }).then(() => {
  console.log("Sucess with deleting it!");
  mongoose.connection.close().then(() => {
    console.log("closed");
  });
});
 */
