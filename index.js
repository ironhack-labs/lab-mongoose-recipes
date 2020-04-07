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
    // Run your code here, after you have insured that the connection was made
    Recipe.insertMany(data, function (err, docs) {
      console.log(
        docs.forEach((e) => console.log(`New recipe added: ${e.title}`))
      );
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

function createRecipe(
  title,
  level,
  ingredients,
  cuisine,
  dishType,
  image,
  duration,
  creator,
  created
) {
  Recipe.create({
    title,
    level,
    ingredients,
    cuisine,
    dishType,
    image,
    duration,
    creator,
    created,
  })
    .then((newRecipe) =>
      console.log(`Una nueva receta se agrego: ${newRecipe.title}`)
    )
    .catch((err) => console.error(`Error al crear nueva receta: ${err}`));
}

Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { $set: { duration: 100 } },
  function (err, res) {
    console.log("duration changed");
  }
);
Recipe.deleteOne({ title: "Carrot Cake" }, function (err) {});

// createRecipe(
//   "Brocheta",
//   "Easy Peasy",
//   ["salmon", "avocado"],
//   "japanese",
//   "snack",
//   null,
//   30,
//   "Carlos G",
//   null
// );
