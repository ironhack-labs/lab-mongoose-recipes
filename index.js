const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    /*    //Iteration 2
    newRecipe = new Recipe(data[0]);
    Recipe.create(newRecipe)
      .then((resp) => console.log(resp))
      .catch((err) => err);
 */
    // Iteration 3
    Recipe.insertMany(data)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  })
  // Iteration 4
  .then(() => {
    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then((resp) =>
        console.log("Successful updated the duration to 100.", resp)
      )
      .catch((err) => console.log("Error updating a recipe. ", err));
  })
  .then(() => {
    // Iteration 5
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then((resp) => console.log("Successfully deleted a recipe: ", resp))
      .catch((err) => console.log("Error delieting a recipe.", err));
  })
  .catch((error) => {
    console.error("Error connecting to the database.", error);
  });
/*   .finally(() => {
    mongoose.connection
      .close()
      .then((resp) => console.log("Succesfully closed database.", resp))
      .catch((err) => console.log("Not able to close databse.", err));
  });
 */
