const mongoose = require("mongoose");
const data = require("./data.js");
const Recipe = require("./recipe.js");
let arrData = [...data];
console.log(arrData);
mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
    Recipe.create({
      title: "Macarrones",
      level: "Easy Peasy",
      ingredients: ["macarrones", "chorizo"],
      cuisine: "mediterranea",
      dishType: "Snack",
      duration: 35,
      creator: "Diverxo"
    })
      .then(() => {
        return Recipe.insertMany(arrData);
      })

      // Recipe.forEach(recipe => console.log(recipe.title);
      //   });
      // });
      .then(() => {
        return Recipe.updateOne(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        );
      })
      .then(() => {
        return Recipe.deleteOne({ title: "Carrot Cake" });
      })
      .then(() => {
        // console.log('La receta se ha eliminado ', recipe.title);
        // return process.on("SIGINT", () => {
        mongoose.connection.close(() => {
          console.log(
            "Mongoose default connection disconnected through app termination"
          );
          //   process.exit(0);
        });
      });
    // });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
