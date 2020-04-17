const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    const newRecipePromice = Recipe.create({
      title: "casserole",
      duration: 45,
      creator: "Olechka",
      cuisine: "ukrainian",
    });
    const promiseInsert = Recipe.insertMany(data);

    Promise.all([newRecipePromice, promiseInsert]).then(() => {
      const findOne = Recipe.findOne({ title: "casserole" }).then((recipe) => {
        console.log(recipe.title);
      });

      const title = Recipe.find().then((recipes) => {
        console.log(recipes.map((recipe) => recipe.title));
      });
      const update = Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        {
          $set: { duration: 100 },
        },
        { new: true }
      ).then((updated) => {
        console.log("Duratipon successfully updated to ", updated.duration);
      });
      const deleteOne = Recipe.deleteOne({
        title: "Carrot Cake",
      }).then((deleted) => console.log("Succesfully deleted"));
      Promise.all([findOne, title, update, deleteOne]).then(() =>
        mongoose.connection.close()
      );
    });

    // Run your code here, after you have insured that the connection was made
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
