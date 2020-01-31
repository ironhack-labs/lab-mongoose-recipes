const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

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

Recipe.collection.drop(); // drops the collection attached to the `Recipe` model

/* Example for Callback Hell */
// Recipe.create({
//   title: "Tacos",
//   level: "Easy Peasy",
//   cuisine: "Mexican",
//   dishType: "Snack",
//   creator: "Johnny"
// })
// .then(recipe => {
//   console.log(recipe.title);
// });
// Recipe.insertMany(data)
//   .then(recipes => {
//     console.log(recipes.map(recipe => recipe.title));

//     Recipe.updateOne(
//       { title: "Rigatoni alla Genovese" },
//       { duration: 100 }
//     ).then(info => {
//       console.log("Update was a succes", info);
//     });

//     Recipe.deleteOne({ title: "Carrot Cake" })
//       .then(info => {
//         mongoose.connection.close();
//         console.log(info, "The delete was a succes");
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   })

//   .catch(err => {
//     console.log(err);
//   })

//   .catch(err => {
//     console.log(err);
//   })

//   .catch(err => {
//     console.log(err);
//   });
/* ------------------------ */

Recipe.create({
  title: "Tacos",
  level: "Easy Peasy",
  cuisine: "Mexican",
  dishType: "Snack",
  creator: "Johnny"
})
  .then(recipe => {
    console.log(recipe.title);
    return Recipe.insertMany(data).catch(err => {
      console.log("Error for insertMany: ", err);
    });
  })
  .then(recipes => {
    console.log(recipes.map(recipe => recipe.title));
    return Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(info => {
    console.log("Updated: ", info);
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(info => {
    console.log("Deleted: ", info);
    mongoose.connection.close(() => {
      console.log("Connection closed");
    });
  })
  .catch(err => {
    console.log(err);
  });
