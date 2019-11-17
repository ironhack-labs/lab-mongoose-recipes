const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to recipes database!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// data.shift();
let a = Recipe.create(data[0]);

let b = Recipe.insertMany(data.slice(1, 6));
// .then(anterior => console.log(anterior))
// .catch(err => console.log(err));

let c = Promise.all([a, b])
  .then(success => {
    console.log("Insertions done:", success);
    let d = Recipe.find({ title: "Rigatoni alla Genovese" });
    // .then(receta => {
    //   console.log("Found", receta[0]._id);
    //   Recipe.findByIdAndUpdate({ duration: 100 });
    // })
    // .catch(err => console.log(err, "Couldn't find the Rigatonioni"));
    let e = Recipe.find({ title: "Carrot Cake" });
    // .then(carrot => {
    //   console.log("Deleting...", carrot);
    //   Recipe.findByIdAndRemove(carrot[0]._id)
    //     .then(succ => {
    //       console.log("Removed", succ);
    //       mongoose.disconnect();
    //     })
    //     .catch(err => {
    //       console.log("Couldn't find  the recipe", err);
    //     });
    // })
    // .catch(err => {
    //   console.log(err);
    // });
    console.log("\n\n\nProceeding to next stage...");
    Promise.all([d, e]).then(successes => {
      console.log("\n\n\nNext stage done: ", successes);
      let f = Recipe.findByIdAndUpdate(successes[0][0]._id, { duration: 100 });
      let g = Recipe.findByIdAndRemove(successes[1][0]._id);
      Promise.all([f, g])
        .then(succ => {
          console.log(
            "\n\n\n\n\nUpdate and deletion done. Here are the\
             old states: \n\n\n\n",
            succ[0],
            succ[1]
          );
          mongoose.disconnect();
        })
        .catch(errors => console.log(errors));
    });
  })
  .catch(errors => console.log("\n\n\n\n\nPromises Unfulfilled:\n", errors));

/*
Recipe.updateOne(
  { title: "Rigatoni alla Genoves" },
  { $set: { duration: 100 } }
).catch(err => console.log(err, "Couldn't update Rigatoni"));
*/
