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

Recipe.deleteMany({})
  .then(deleted => {
    console.log(deleted.deletedCount + " recipes were deleted");
    Recipe.create(data)
      .then(recipe => {
        recipe.forEach(r =>
          console.log("The recipe " + r.title + " was created")
        );
        Recipe.updateOne(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        ).then(updated => {
          console.log("One Recipe was updated", updated);
          Recipe.deleteOne({ title: "Carrot Cake" }).then(deleted => {
            console.log("One Recipe was deleted", deleted);
            mongoose.connection.close(() => {
              console.log(
                "Mongoose default connection disconnected through app termination"
              );
            });
          });
        });
      })
      .catch(err => {
        console.log("An error happened:", err);
      });
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

// function myDelete(col, title) {
//   col.deleteOne({title: title})
//   .then(deleted => {
//     console.log( deleted.deletedCount + ' recipes were deleted');
//       })
//       .catch(err => {
//         console.log("An error happened:", err);
//       });
// }

// myDelete('Recipe','Carrot Cake');
