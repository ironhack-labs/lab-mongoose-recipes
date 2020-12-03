const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose.set("useFindAndModify", false);

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
    const pamonha = {
      title: "pamonha",
      level: "Easy Peasy",
      ingredients: ["milho", "açucar"],
      cuisine: "brazilian",
      dishType: "dessert",
      image:
        "https://s2.glbimg.com/nsABUXTkD6VQM8f5qXcaT4s5UZA=/0x0:620x500/984x0/smart/filters:strip_icc()/s.glbimg.com/po/rc/media/2015/06/23/08_49_05_778_pamonha.jpg",
      duration: 20,
      creator: "IDK",
    };

    Recipe.insertMany(data)
      .then((data) => {
        data.map((recipe) => console.log(recipe.title));
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          {
            new: true,
          }
        )
          .then((result) => console.log("Updated!"))
          .catch((error) => console.log(error));

        Recipe.deleteOne({ title: "Carrot Cake" })
          .then((result) => {
            console.log("Removed!");
            mongoose.connection.close();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

    Recipe.create(pamonha)
      .then((pamonha) => console.log(pamonha.title))
      .catch((error) => console.log(error));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
