const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost/recipe-app";

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
    Recipe.create({
      title: "Tortilla de patatas",
      level: "Easy Peasy",
      duration: 30,
    })
      .then((recipe) =>
        console.log(`Recipe created with create. Title: ${recipe.title} \n`)
      )
      .then(() => {
        Recipe.insertMany(data)
          .then((recipe) => {
            recipe.forEach((elem) =>
              console.log(`Recipe inserted. Title: ${elem.title} \n`)
            );
          })
          .then(() => {
            Recipe.findOneAndUpdate(
              { title: "Rigatoni alla Genovese" },
              { duration: 100 }
            )
              .then((recipe) =>
                console.log(`Recipe ${recipe.title} updated\n `)
              )
              .then(() => {
                Recipe.deleteOne({ title: "Carrot Cake" }).then(
                  console.log(`Recipe deleted. \n`)
                );
              });
          });
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
