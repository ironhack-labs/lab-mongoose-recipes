const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const { model } = require("./models/Recipe.model");

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
    // Run your code here, after you have insured that the connection was made
    // Recipe.create({
    //   title: "Lasagna",
    //   level: "Easy Peasy",
    //   ingredients: ["italian sausage", "onion", "garlic"],
    //   cuisine: "Italian",
    //   dishType: "main_course",
    //   duration: 30,
    //   creator: "Carlo",
    // })
    //   .then((recipeFromDB) => {
    //     console.log(`A new recipe was created: ${recipeFromDB.title}`);
    //   })
    //   .catch((err) => {
    //     console.log(`Error while creating recipe: ${err}`);
    //   });
    Recipe.insertMany(data).then((reciepes) =>
      reciepes.forEach((element) => console.log(element.title))
    );
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 },
  { new: true }
).then((recipe) => {
  console.log(`The ${recipe.title} recipe was updated`);
});

Recipe.deleteOne({ title: "Carrot Cake" }).then(() =>
  console.log("Recipe succesfully deleted")
);

mongoose.connect(MONGODB_URI, {
  useCreateIndex: false,
  useNewUrlParser: false,
  useUnifiedTopology: false,
});
