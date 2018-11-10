const mongoose = require("mongoose");
const data = require("./data.js");
const Recipe = require("./Recipe");

mongoose
  .connect(
    "mongodb://localhost/recipeApp",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// delete all collection
Recipe.collection.drop();

// create one recipe
Recipe.create({
  title: "Mi primera receta",
  level: "Easy Peasy",
  cuisine: "French",
  dishType: "Dish",
  duration: 8,
  creator: "Teresa"
})
  .then(recipe => {
    console.log("Just added the recipe: ", recipe.title);

    // insert all recipes of data
    Recipe.insertMany(data)
      .then(recipe => {
        for (let i = 0; i < recipe.length; i++) {
          console.log("Just added recipe " + recipe[i].title);
        }

        // update the recipe when the insert has finished
        Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
          .then(recipe => {
            console.log("The recipe was updated");

            // delete Recipe when the update has ended
            Recipe.deleteOne({ title: "Carrot Cake" })
              .then(recipe => {
                console.log("The recipe was deleted");

                mongoose.disconnect()
              })
              .catch(err => {
                console.log("An error happened:");
              });
          })
          .catch(err => {
            console.log("An error happened:");
          });
      })
      .catch(err => {
        console.log("An error happened:");
      });
  })
  .catch(err => {
    console.log("An error happened:", err);
  });
