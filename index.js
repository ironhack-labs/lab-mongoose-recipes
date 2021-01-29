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
    // ITERATION 2 ===========================================================================
    Recipe.create({
      title: "Flan",
      level: "Easy Peasy",
      ingredients: [
        "500 ml leche entera",
        "4 huevos",
        "100 gr de azúcar",
        "1 vaina de vainilla",
      ],
      cuisine: "Spanish",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 20,
      creator: "Chef Jorge Cisneros",
    })
      .then(/* recipe => console.log(recipe) */)
      .catch((e) => console.error(e));

    // ITERATION 3 ===========================================================================
    Recipe.insertMany(data)
      .then((recipes) => {
        recipes.forEach((recipe) => {
          console.log(
            `The ${recipe.title} recipe has been added to the database`
          );
        });
      })
      .catch((error) =>
        console.log("An error happened while saving a new recipe", error)
      );
    // ITERATION 4 ===========================================================================
    //DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then((recipe) => console.log(`The recipe was updated correctly`))
      .catch((error) => console.log("An error updating recipe", error));
    // ITERATION 5 ===========================================================================
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => console.log(`The recipe was deleted correctly`))
      .catch((error) =>
        console.log("An error happened while deleting the recipe", error)
      );
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  })
})

