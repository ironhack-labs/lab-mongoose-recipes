const recettedemanon = [
  {
    title: "Recette de Manon",
    level: "Amateur Chef",
    ingredients: ["chocolate", "butter", "more chocolate"],
    cuisine: "Chocolat-lover",
    dishType: "dessert",
    image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    duration: 40,
    creator: "Morgoulette",
  },
];

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
    Recipe.create(recettedemanon)
      .then((dbRes) => console.log(dbRes[0].title))
      .catch((dbErr) => console.error(dbErr));

    Recipe.insertMany(data)
      .then((dbRes) => {
        for (let i = 0; i < dbRes.length; i++) {
          console.log(dbRes[i].title);
        }
      })
      .catch((dbErr) => console.log(dbErr));

    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      () => console.log("The rigatoni recipe was updated yay!")
    );
    Recipe.deleteOne({ title: "Carrot Cake" }, () =>
      console.log("The carrot cake recipe was deleted yay!")
    );
    mongoose
    .disconnect();
    .then (() => console.log('database disconnected'));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
