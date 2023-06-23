const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.deleteOne({ title: "Carrot Cake" }).then(() =>
      console.log("DELETED")
    );
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

mongoose.connection.close();
/* INSERT ONE RECIPE
const newRecipe = new Recipe(data[2]);

Recipe.create(newRecipe)
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err));
*/

/* INSERT ARRAY
Recipe.insertMany(data)
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err));
*/

/* UPDATE DURATION
Recipe.updateOne(
  { title: "Rigatoni alla Genovese" },
  {
    $set: { duration: 100 },
  }
).then(() => console.log("NEW DURATION"));
*/
/* DELETE RECIPE
Recipe.deleteOne({ title: "Carrot Cake" }).then(() => console.log("DELETED"));
*/
