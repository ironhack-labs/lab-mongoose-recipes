const mongoose = require("mongoose");
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
// ???
/* Model.create(Recipe); */
let wrong = { name: "Rigatoni alla Genovese" };
let recipe1 = data[0];
const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  /* .then(() => {
    Recipe.create(recipe1).then((y) => {
      console.log(y.title);
    });

    // Run your code here, after you have insured that the connection was made
  }) */
  .then(() => {
    Recipe.insertMany(data)
      .then((recipes) => {
        recipes.forEach((element) => {
          console.log(element.title);
        });
      })
      .then(() => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        ).then((el) => console.log(el.duration));
      })
      .then(() => {
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then(() => console.log("Sucessfuly deleted"))
          .then(() => mongoose.disconnect())
          .then(() => console.log("Disconnected"));
      });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
