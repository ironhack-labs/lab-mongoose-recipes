const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const recipe1 = {
  title: "Tarte aux pommes",
  ingredients: [`pomme`, `tarte`],
  level: "Amateur Chef",
  cuisine: "3ième porte à gauche (blague nulle)",
  image: "https://www.cuisine-blog.fr/wp-content/uploads/2018/08/IMG_4274.jpeg",
  duration: 50,
  creator: "Marmiton",
};
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
    Recipe.create(recipe1)
      .then((dbRecipe) => {
        console.log("YAY DATA INSERTED!!!!");
      })
      .catch((err) => console.error(err));
  })
  .then(() => {
    Recipe.insertMany(data)
      .then((dbRecipe) => {
        console.log("YAY DATA INSERTED!!!!");
      })
      .catch((err) => console.error(err))
      .then(() => {
        Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
          .then(() => {
            console.log("UPDATED");
          })
          .catch((err) => console.error(err))
          .then(() => {
            Recipe.deleteOne({ title: "Carrot Cake" })
              .then((ress) => {
                console.log(ress);
                console.log("DELETED");
                mongoose.disconnect();
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  })

  // Run your code here, after you have insured that the connection was made
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
