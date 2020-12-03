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
    const resultCreate = Recipe.create({
      title: "Beterraba",
      level: "UltraPro Chef",
      ingredients: ["Carro", "Areia"],
      cuisine: "Polonesa",
      dishType: "breakfast",
      duration: 120,
      creator: "Ludimilla",
    });

    Recipe.insertMany(data)
      .then((result) => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        )
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });

        console.log(result.duration);
      })
      .catch((err) => {
        console.error(err);
      });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
