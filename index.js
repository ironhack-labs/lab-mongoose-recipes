const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
// const recipe = {
//   title: "Mashed Potatoes",
//   level: "Easy Peasy",
//   ingredients: ["potatoes", "cream", "salt", "onions"],
//   cuisine: "traditional",
//   dishType: "main_course",
//   duration: 45,
//   creator: "Aude",
// }

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Recipe.create(recipe, (error, recipe) => {
    //   if (error) {
    //     console.log(error);
    //     return;
    //   }
    //   console.log(recipe.title);
    // })
    Recipe.insertMany(data)
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].title);
        }
      })
      .then(() => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        )
          .then((dbRes) => {
            console.log("success " + dbRes.duration);
          })
          .catch((dbErr) => console.log(dbErr));
      })
      .then(() => {
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then((dbRes) => {
            console.log("success");
          })
          .then(() => mongoose.disconnect())
          .catch((dbErr) => console.log(dbErr));
      })
    .catch((error) => console.log("error when inserting the data: " + error));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

