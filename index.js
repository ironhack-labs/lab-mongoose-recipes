const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const maccarroni = {
  title: "Macarroni Bolognese",
  level: "Easy Peasy",
  ingrdients: [
    "macarrones",
    "tomate triturado",
    "calabacin",
    "ajo",
    "zanahoria",
    "cebolla",
    "carne picada",
    "parmesano",
  ],
  cuisine: "italiana",
  dishType: "main_course",
  image: 'https://images.media-allrecipes.com/images/75131.jpg"',
  duration: 40,
  creator: "someopne",
  created: 22 / 07 / 202,
};

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
    Recipe.create(maccarroni)
      .then((recipe) => console.log(`${recipe.title}`))
      .catch((err) => console.log(err));

    // Run your code here, after you have insured that the connection was made
  })

  .then(() => {
    Recipe.insertMany(data)
      .then((dataRecipe) => dataRecipe.forEach(recipes => {
        console.log('Que rica receta de ', recipes.title)

      }))
  })


  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

Recipe.findOneAndUpdate({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  }, {
    new: true
  })
  .then((recipeUpdate) => console.log(recipeUpdate))
  .catch((error) => console.log(error))

Recipe.deleteOne({
    title: "Carrot Cake"
  })
  .then((recipeDelete) => console.log("receta eliminada: ", recipeDelete))
  .catch((e) => console.log(e));

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log();
    process.exit(0);
  });
});