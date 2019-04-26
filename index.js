const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/ironhack", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo Successfully!");
    // Create Recipe After Connecting to Mongo
    Recipe.create({
      title: "Ojja",
      level: "Amateur Chef",
      ingredients: ["Eggs", "Green Peppers", "Onions", "Tomatoes"],
      cuisine: "Tunisian",
      dishtype: "Dish",
      image:
        "https://static1.squarespace.com/static/580bb690d1758e509eb28292/580bb7aa46c3c4e1c73dacc8/5871f503d482e9490a252016/1483903298428/IMG_1185.JPG?format=1500w",
      duration: 30,
      creator: "Nour"
    })
      .then(recipe => {
        console.log("The Recipe is saved and its value is: ", recipe);
      })
      .catch(err => {
        console.log("Cannot insert!");
      });

    // Inserting data After Connecting to Mongo
    Recipe.insertMany(data)
      .then(res => {
        console.log(res);
        // Update Carrot Cake after inserting data
        Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
          .then(res => console.log("Updated Successfully"))
          .catch(err => {
            console.error(err);
          });
        // Deleting Carrot Cake after inserting data
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then(res => {
            console.log("Successfully Deleted.");
            mongoose.connection.close();
          })
          .catch(err => console.log("Cannot Delete."));
      })
      .catch(err => console.log("Cannot Insert!"));
  })
  .catch(err => {
    console.error("Error Connecting to Mongo", err);
  });
